"use client";

import { useMediaStream } from "@/hooks/useMediaStream";
import { Button } from "@/components/ui/Button";
import { CameraPreview } from "@/components/practice/CameraPreview";
import { MediaPermissionError } from "@/components/practice/MediaPermissionError";

/**
 * Owns the camera/microphone permission flow for the practice screen.
 * Access is only requested when the user presses Start Practice — never on
 * mount — per docs/specs/camera/camera-recording.md §7.
 */
export function PracticeSession() {
  const { status, stream, error, requestAccess } = useMediaStream();

  if (status === "error" && error) {
    return <MediaPermissionError error={error} onRetry={requestAccess} />;
  }

  return (
    <>
      <CameraPreview stream={stream} status={status} />

      <div className="flex flex-col items-center gap-1 text-center text-body text-text-secondary">
        {status === "ready" ? (
          <p>You&apos;re ready.</p>
        ) : (
          <>
            <p>Take a breath.</p>
            <p>There&apos;s no perfect way to do this.</p>
          </>
        )}
      </div>

      {status !== "ready" && (
        <Button
          size="lg"
          className="w-full"
          disabled={status === "requesting"}
          onClick={requestAccess}
        >
          {status === "requesting" ? "Preparing…" : "Start Practice"}
        </Button>
      )}
    </>
  );
}
