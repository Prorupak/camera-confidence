"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  browserUnsupportedError,
  deviceEndedError,
  getMediaErrorMessage,
  type MediaError,
} from "@/lib/camera/errors";

export type MediaStreamStatus = "idle" | "requesting" | "ready" | "error";

interface UseMediaStreamResult {
  status: MediaStreamStatus;
  stream: MediaStream | null;
  error: MediaError | null;
  requestAccess: () => Promise<void>;
  stop: () => void;
}

/**
 * Owns the getUserMedia lifecycle for the practice camera preview. Requests
 * camera + microphone together, only when requestAccess() is called
 * explicitly (never on mount) — see docs/specs/camera/camera-recording.md §7.
 */
export function useMediaStream(): UseMediaStreamResult {
  const [status, setStatus] = useState<MediaStreamStatus>("idle");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<MediaError | null>(null);

  const streamRef = useRef<MediaStream | null>(null);
  const requestInFlightRef = useRef(false);
  const mountedRef = useRef(true);

  const stop = useCallback(() => {
    const current = streamRef.current;
    if (current) {
      current.getTracks().forEach((track) => {
        track.onended = null;
        track.stop();
      });
      streamRef.current = null;
    }
    setStream(null);
  }, []);

  const requestAccess = useCallback(async () => {
    if (requestInFlightRef.current) return;

    // A retry after an error, or after leaving devices active, should never
    // stack a second stream on top of the first.
    stop();

    if (
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setStatus("error");
      setError(browserUnsupportedError());
      return;
    }

    requestInFlightRef.current = true;
    setStatus("requesting");
    setError(null);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (!mountedRef.current) {
        // Component left the screen while permission was pending — release
        // the stream immediately rather than leaving the camera active.
        mediaStream.getTracks().forEach((track) => track.stop());
        return;
      }

      mediaStream.getTracks().forEach((track) => {
        track.onended = () => {
          if (!mountedRef.current) return;
          stop();
          setStatus("error");
          setError(deviceEndedError());
        };
      });

      streamRef.current = mediaStream;
      setStream(mediaStream);
      setStatus("ready");
    } catch (caught) {
      if (!mountedRef.current) return;
      setStatus("error");
      setError(getMediaErrorMessage(caught));
    } finally {
      requestInFlightRef.current = false;
    }
  }, [stop]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, stream, error, requestAccess, stop };
}
