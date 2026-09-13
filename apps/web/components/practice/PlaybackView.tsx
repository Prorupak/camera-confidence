import { Button } from "@/components/ui/Button";

interface PlaybackViewProps {
  recordingUrl: string;
  onRetry: () => void;
}

/**
 * Local playback of the just-completed recording. Unlike the live preview,
 * this is NOT mirrored — it must show the recording as it actually is.
 * See docs/specs/camera/camera-recording.md §26-27.
 */
export function PlaybackView({ recordingUrl, onRetry }: PlaybackViewProps) {
  return (
    <>
      <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-[#292524]">
        <video
          src={recordingUrl}
          controls
          playsInline
          className="h-full w-full object-cover"
        >
          Your browser can&apos;t play this recording.
        </video>
      </div>

      <div className="flex flex-col items-center gap-1 text-center text-body text-text-secondary">
        <p>Recording complete.</p>
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="w-full"
        onClick={onRetry}
      >
        Try Again
      </Button>
    </>
  );
}
