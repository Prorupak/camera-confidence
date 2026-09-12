/**
 * Visual-only camera preview placeholder for v0.2.0. Real camera access,
 * getUserMedia, and MediaRecorder are implemented in a later issue — see
 * docs/specs/camera/camera-recording.md.
 */
export function CameraPlaceholder() {
  return (
    <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg bg-[#292524]">
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
        <span className="text-body-sm">Camera Preview</span>
      </div>
    </div>
  );
}
