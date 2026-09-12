import { Button } from "@/components/ui/Button";
import type { MediaError } from "@/lib/camera/errors";

interface MediaPermissionErrorProps {
  error: MediaError;
  onRetry: () => void;
}

/**
 * Calm, actionable error state for camera/microphone failures. Never shows
 * raw DOMException text — see docs/specs/camera/camera-recording.md §43.
 */
export function MediaPermissionError({
  error,
  onRetry,
}: MediaPermissionErrorProps) {
  return (
    <div
      role="alert"
      className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 rounded-lg border border-border bg-surface px-6 text-center"
    >
      <div className="flex flex-col gap-1.5">
        <p className="text-body font-semibold text-text-primary">
          {error.title}
        </p>
        <p className="text-body-sm text-text-secondary">{error.message}</p>
      </div>
      <Button variant="secondary" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}
