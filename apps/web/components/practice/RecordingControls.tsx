import { Button } from "@/components/ui/Button";
import type { RecordingStatus } from "@/hooks/useMediaRecorder";

interface RecordingControlsProps {
  status: RecordingStatus;
  onStart: () => void;
  onStop: () => void;
}

/**
 * Swaps between Record/Stop as a single control so the active action is
 * always obvious and duplicate start/stop clicks can't create two recorders —
 * see docs/specs/camera/camera-recording.md §22-24.
 */
export function RecordingControls({
  status,
  onStart,
  onStop,
}: RecordingControlsProps) {
  const isActive = status === "recording" || status === "stopping";

  if (isActive) {
    return (
      <Button
        variant="destructive"
        size="lg"
        className="w-full"
        disabled={status === "stopping"}
        onClick={onStop}
      >
        {status === "stopping" ? "Stopping…" : "Stop Recording"}
      </Button>
    );
  }

  return (
    <Button size="lg" className="w-full" onClick={onStart}>
      Start Recording
    </Button>
  );
}
