/**
 * Maps browser media-access failures to calm, actionable product copy.
 * Keeps DOMException details out of the UI — see docs/design/accessibility.md
 * §29/§34 and docs/specs/camera/camera-recording.md §42-43.
 */
export type MediaErrorType =
  | "permission-denied"
  | "camera-unavailable"
  | "microphone-unavailable"
  | "browser-unsupported"
  | "device-error"
  | "unknown";

export interface MediaError {
  type: MediaErrorType;
  title: string;
  message: string;
}

function fromErrorName(name: string): MediaError | null {
  switch (name) {
    case "NotAllowedError":
    case "SecurityError":
      return {
        type: "permission-denied",
        title: "Camera and microphone access is needed",
        message:
          "To practice, we need access to your camera and microphone. Please allow access in your browser settings, then try again.",
      };
    case "NotFoundError":
      return {
        type: "camera-unavailable",
        title: "No camera or microphone found",
        message:
          "We couldn't find a camera or microphone on this device. Connect or enable one and try again.",
      };
    case "NotReadableError":
      return {
        type: "device-error",
        title: "We couldn't access your camera or microphone",
        message:
          "It may already be in use by another app or browser tab. Close other apps using your camera or microphone and try again.",
      };
    case "OverconstrainedError":
      return {
        type: "device-error",
        title: "We couldn't start your camera",
        message:
          "Your camera or microphone doesn't support what we asked for. Try again, or use a different device.",
      };
    case "AbortError":
      return {
        type: "device-error",
        title: "We couldn't start your camera",
        message:
          "Something interrupted camera setup. Please try again.",
      };
    case "TypeError":
      return {
        type: "browser-unsupported",
        title: "Camera access isn't supported",
        message:
          "Your browser doesn't support the camera and microphone features needed for practice. Please use a modern browser such as Chrome, Safari, Edge, or Firefox.",
      };
    default:
      return null;
  }
}

/** Browser lacks the mediaDevices/getUserMedia APIs entirely. */
export function browserUnsupportedError(): MediaError {
  return {
    type: "browser-unsupported",
    title: "Camera access isn't supported",
    message:
      "Your browser doesn't support the camera and microphone features needed for practice. Please use a modern browser such as Chrome, Safari, Edge, or Firefox.",
  };
}

/** A previously granted device stopped working mid-session (unplugged, revoked, etc). */
export function deviceEndedError(): MediaError {
  return {
    type: "device-error",
    title: "Your camera or microphone stopped",
    message:
      "The connection to your camera or microphone was lost. Check your device and try again.",
  };
}

/** MediaRecorder is unavailable in this browser. */
export function recordingUnsupportedError(): MediaError {
  return {
    type: "browser-unsupported",
    title: "Recording isn't supported",
    message:
      "Your browser doesn't support local video recording. Please try a modern browser such as Chrome, Safari, Edge, or Firefox.",
  };
}

/** MediaRecorder failed to start or threw during recording. */
export function recordingFailedError(): MediaError {
  return {
    type: "device-error",
    title: "Recording couldn't be started",
    message:
      "Something went wrong while starting the recording. Please try again.",
  };
}

/** The camera/microphone connection was lost while a recording was in progress. */
export function recordingStoppedUnexpectedlyError(): MediaError {
  return {
    type: "device-error",
    title: "Recording stopped unexpectedly",
    message:
      "We couldn't finish that recording. Your camera is still available — you can try again.",
  };
}

export function getMediaErrorMessage(error: unknown): MediaError {
  if (error instanceof DOMException) {
    const mapped = fromErrorName(error.name);
    if (mapped) return mapped;
  }

  return {
    type: "unknown",
    title: "We couldn't access your camera or microphone",
    message:
      "Something prevented the media devices from starting. Check that your camera and microphone aren't being used by another application, then try again.",
  };
}
