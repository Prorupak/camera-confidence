"use client";

import { useEffect, useRef } from "react";
import type { MediaStreamStatus } from "@/hooks/useMediaStream";

interface CameraPreviewProps {
  stream: MediaStream | null;
  status: MediaStreamStatus;
}

/**
 * Live camera preview once a stream is available; falls back to a calm
 * placeholder before the user starts practice or while access is being
 * requested. Uses srcObject (not an object URL) for the live MediaStream —
 * see docs/specs/camera/camera-recording.md §10, §28.
 */
export function CameraPreview({ stream, status }: CameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.srcObject = stream;

    return () => {
      video.srcObject = null;
    };
  }, [stream]);

  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-[#292524]">
      {stream ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="h-full w-full scale-x-[-1] object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-2.5 text-[#78716c]">
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M23 7 16 12l7 5V7Z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <span className="text-body-sm">
            {status === "requesting" ? "Preparing your camera…" : "Camera Preview"}
          </span>
        </div>
      )}
    </div>
  );
}
