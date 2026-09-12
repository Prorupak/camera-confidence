"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  recordingFailedError,
  recordingStoppedUnexpectedlyError,
  recordingUnsupportedError,
  type MediaError,
} from "@/lib/camera/errors";

export type RecordingStatus =
  | "idle"
  | "recording"
  | "stopping"
  | "stopped"
  | "error";

interface UseMediaRecorderResult {
  status: RecordingStatus;
  elapsedMs: number;
  recordingUrl: string | null;
  error: MediaError | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const MIME_CANDIDATES = [
  "video/webm;codecs=vp9,opus",
  "video/webm;codecs=vp8,opus",
  "video/webm",
  "video/mp4",
];

/** Picks the first browser-supported recording MIME type, or undefined to let MediaRecorder choose its default. */
function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === "undefined") return undefined;
  return MIME_CANDIDATES.find((candidate) =>
    MediaRecorder.isTypeSupported(candidate),
  );
}

/**
 * Owns the MediaRecorder lifecycle for a single practice attempt, consuming
 * the MediaStream from useMediaStream. Never touches the stream's tracks —
 * stopping a recording must not stop the camera/microphone, per
 * docs/specs/camera/camera-recording.md §30 and ADR-001.
 */
export function useMediaRecorder(
  stream: MediaStream | null,
): UseMediaRecorderResult {
  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsedMs, setElapsedMs] = useState(0);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [error, setError] = useState<MediaError | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(0);
  const urlRef = useRef<string | null>(null);
  const mountedRef = useRef(true);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const revokeUrl = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  const cleanupRecorder = useCallback(() => {
    const recorder = mediaRecorderRef.current;
    if (recorder) {
      recorder.ondataavailable = null;
      recorder.onerror = null;
      recorder.onstop = null;
      mediaRecorderRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    revokeUrl();
    cleanupRecorder();
    chunksRef.current = [];
    setStatus("idle");
    setElapsedMs(0);
    setRecordingUrl(null);
    setError(null);
  }, [clearTimer, revokeUrl, cleanupRecorder]);

  const start = useCallback(() => {
    // Guard against duplicate starts (rapid clicks) and missing prerequisites.
    if (status === "recording" || status === "stopping") return;
    if (!stream) {
      setStatus("error");
      setError(recordingFailedError());
      return;
    }
    if (typeof MediaRecorder === "undefined") {
      setStatus("error");
      setError(recordingUnsupportedError());
      return;
    }

    // A fresh attempt must never carry over a previous attempt's chunks or URL.
    revokeUrl();
    cleanupRecorder();
    chunksRef.current = [];
    setRecordingUrl(null);
    setError(null);

    const mimeType = pickMimeType();

    let recorder: MediaRecorder;
    try {
      recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
    } catch {
      setStatus("error");
      setError(recordingFailedError());
      return;
    }

    recorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onerror = () => {
      if (!mountedRef.current) return;
      clearTimer();
      cleanupRecorder();
      chunksRef.current = [];
      setStatus("error");
      setError(recordingFailedError());
    };

    recorder.onstop = () => {
      clearTimer();
      const blob = new Blob(chunksRef.current, {
        type: recorder.mimeType || mimeType || "video/webm",
      });
      chunksRef.current = [];

      if (!mountedRef.current) {
        // Component left the screen while the final chunk was flushing —
        // don't create a URL nobody will revoke.
        return;
      }

      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      setRecordingUrl(url);
      setStatus("stopped");
    };

    mediaRecorderRef.current = recorder;
    startTimeRef.current = performance.now();
    setElapsedMs(0);

    try {
      recorder.start();
    } catch {
      mediaRecorderRef.current = null;
      setStatus("error");
      setError(recordingFailedError());
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedMs(performance.now() - startTimeRef.current);
    }, 250);

    setStatus("recording");
  }, [status, stream, clearTimer, revokeUrl, cleanupRecorder]);

  const stop = useCallback(() => {
    // Guard against duplicate stops and stopping a recorder that never started.
    if (status !== "recording") return;

    const recorder = mediaRecorderRef.current;
    if (!recorder || recorder.state !== "recording") return;

    setStatus("stopping");
    clearTimer();
    recorder.stop();
  }, [status, clearTimer]);

  // If the stream is lost mid-recording (device unplugged/revoked), the
  // recorder can't keep going — surface a distinct, recoverable error rather
  // than leaving the UI stuck showing "Recording".
  useEffect(() => {
    if (stream) return;
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      recorder.stop();
    }
    if (status === "recording" || status === "stopping") {
      clearTimer();
      cleanupRecorder();
      chunksRef.current = [];
      // Reacting to the stream disappearing out from under an active
      // recording, not synchronizing render state.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("error");
      setError(recordingStoppedUnexpectedlyError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      clearTimer();
      const recorder = mediaRecorderRef.current;
      if (recorder && recorder.state === "recording") {
        recorder.stop();
      }
      cleanupRecorder();
      revokeUrl();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, elapsedMs, recordingUrl, error, start, stop, reset };
}
