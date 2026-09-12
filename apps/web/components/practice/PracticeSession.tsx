"use client";

import { useMediaStream } from "@/hooks/useMediaStream";
import { useMediaRecorder } from "@/hooks/useMediaRecorder";
import { Button } from "@/components/ui/Button";
import { CameraPreview } from "@/components/practice/CameraPreview";
import { MediaPermissionError } from "@/components/practice/MediaPermissionError";
import { RecordingIndicator } from "@/components/practice/RecordingIndicator";
import { RecordingControls } from "@/components/practice/RecordingControls";
import { PlaybackView } from "@/components/practice/PlaybackView";

/**
 * Owns the camera/microphone permission flow and recording lifecycle for the
 * practice screen. Camera access is only requested when the user presses
 * Start Practice, and recording only starts when the user presses Start
 * Recording — never automatically — per
 * docs/specs/camera/camera-recording.md §7, §10.
 */
export function PracticeSession() {
  const { status: streamStatus, stream, error: streamError, requestAccess } =
    useMediaStream();
  const {
    status: recordingStatus,
    elapsedMs,
    recordingUrl,
    error: recordingError,
    start: startRecording,
    stop: stopRecording,
    reset: resetRecording,
  } = useMediaRecorder(stream);

  // A recording-specific error (e.g. the stream was lost mid-recording) is
  // more actionable than the generic camera error surfaced from the same
  // event, so it takes priority when both are present.
  if (recordingStatus === "error" && recordingError) {
    return <MediaPermissionError error={recordingError} onRetry={resetRecording} />;
  }

  if (streamStatus === "error" && streamError) {
    return <MediaPermissionError error={streamError} onRetry={requestAccess} />;
  }

  if (recordingStatus === "stopped" && recordingUrl) {
    return (
      <PlaybackView recordingUrl={recordingUrl} onRetry={resetRecording} />
    );
  }

  const isRecordingActive =
    recordingStatus === "recording" || recordingStatus === "stopping";

  return (
    <>
      <CameraPreview stream={stream} status={streamStatus} />

      {isRecordingActive ? (
        <RecordingIndicator
          elapsedMs={elapsedMs}
          isStopping={recordingStatus === "stopping"}
        />
      ) : (
        <div className="flex flex-col items-center gap-1 text-center text-body text-text-secondary">
          {streamStatus === "ready" ? (
            <p>You&apos;re ready.</p>
          ) : (
            <>
              <p>Take a breath.</p>
              <p>There&apos;s no perfect way to do this.</p>
            </>
          )}
        </div>
      )}

      {streamStatus === "ready" ? (
        <RecordingControls
          status={recordingStatus}
          onStart={startRecording}
          onStop={stopRecording}
        />
      ) : (
        <Button
          size="lg"
          className="w-full"
          disabled={streamStatus === "requesting"}
          onClick={requestAccess}
        >
          {streamStatus === "requesting" ? "Preparing…" : "Start Practice"}
        </Button>
      )}
    </>
  );
}
