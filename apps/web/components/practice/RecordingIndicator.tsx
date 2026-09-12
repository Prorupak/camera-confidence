import { formatDuration } from "@/lib/camera/format";

interface RecordingIndicatorProps {
  elapsedMs: number;
  isStopping: boolean;
}

/**
 * Makes the recording state unmistakable without relying on color alone —
 * see docs/specs/camera/camera-recording.md §21, §41.
 */
export function RecordingIndicator({
  elapsedMs,
  isStopping,
}: RecordingIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-body text-text-primary">
      <span
        aria-hidden="true"
        className="h-2.5 w-2.5 shrink-0 rounded-full bg-recording motion-safe:animate-pulse"
      />
      <span className="font-semibold">
        {isStopping ? "Stopping…" : "Recording"}
      </span>
      <span className="tabular-nums text-text-secondary">
        {formatDuration(elapsedMs)}
      </span>
      {/* Announce only the state transition, not every timer tick. */}
      <span className="sr-only" role="status" aria-live="polite">
        {isStopping ? "Recording stopped" : "Recording started"}
      </span>
    </div>
  );
}
