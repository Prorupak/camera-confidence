# Camera Confidence — Camera & Recording Specification

## 1. Purpose

This document defines the functional and technical specification for the camera and recording experience in:

> **`v0.2.0 — Camera Prototype`**

The goal is to build the smallest reliable camera experience that allows a user to:

```text
Start Practice
    ↓
Grant Camera Permission
    ↓
See Camera Preview
    ↓
Prepare
    ↓
Record
    ↓
Stop
    ↓
Watch Recording
    ↓
Try Again
```

The purpose of this feature is not to build a complete video platform.

The purpose is to validate whether guided camera practice feels simple and low-pressure.

---

# 2. Product Objective

The camera experience should reduce the psychological barrier between:

> **“I should practice speaking on camera.”**

and:

> **“I'm going to press record.”**

The experience should feel:

- Simple
- Predictable
- Private
- Calm
- Supportive
- Easy to retry

The user should never feel like they are being evaluated simply because they opened the camera.

---

# 3. Scope

## In Scope

`v0.2.0` includes:

- Camera permission
- Microphone permission
- Camera preview
- Practice preparation
- Countdown
- Recording
- Recording timer
- Stop recording
- Local recording playback
- Retry
- Basic error handling
- Camera/microphone cleanup
- Responsive camera experience
- Accessible controls

---

# 4. Out of Scope

The following are explicitly excluded from this specification:

- Authentication
- User accounts
- Backend
- Database
- Cloud storage
- Video uploads
- AI feedback
- Speech-to-text
- Filler-word detection
- WPM analysis
- Visual analysis
- Persistent recording history
- Progress tracking
- Social sharing
- Video editing
- Filters
- Camera effects
- Multiple cameras
- Advanced recording configuration
- Video processing pipeline

If a feature requires one of these systems, it belongs to a later version.

---

# 5. User Flow

The primary flow is:

```text
Home
  ↓
Challenge
  ↓
Start Practice
  ↓
Camera Permission
  ↓
Camera Preview
  ↓
Countdown
  ↓
Recording
  ↓
Stop
  ↓
Playback
  ↓
Reflection
  ↓
Try Again
```

The flow should remain linear.

The user should not need to make unnecessary decisions.

---

# 6. Practice States

The camera experience should use explicit states.

```text
idle
permission
ready
countdown
recording
stopping
playback
completed
error
```

### State responsibilities

| State        | Purpose                                          |
| ------------ | ------------------------------------------------ |
| `idle`       | Camera has not been initialized                  |
| `permission` | Requesting camera/microphone access              |
| `ready`      | Camera is active and user can begin              |
| `countdown`  | Preparing the user to record                     |
| `recording`  | Recording is actively happening                  |
| `stopping`   | MediaRecorder is finishing                       |
| `playback`   | User is reviewing the recording                  |
| `completed`  | Attempt has been completed                       |
| `error`      | An unrecoverable or recoverable problem occurred |

The interface must always reflect the current state.

---

# 7. Camera Permission

Camera and microphone access should be requested when the user enters the recording experience.

The application should not request camera access immediately on the home page.

Expected flow:

```text
Start Practice
      ↓
Permission Request
      ↓
Camera + Microphone
      ↓
Permission Result
```

---

# 8. Permission Outcomes

The application must handle:

### Permission Granted

Continue to camera preview.

```text
Permission Granted
        ↓
Camera Preview
```

### Permission Denied

Show a clear explanation and recovery action.

```text
Permission Denied
        ↓
Explain
        ↓
Try Again
```

### Permission Blocked

Explain that browser settings may need to be changed.

The user should not be left with an unexplained blank camera area.

### Device Unavailable

If the browser cannot access a camera or microphone, show a useful error.

---

# 9. Permission UX

The permission request should be contextual.

Before requesting access, the interface should communicate why it is needed.

Example:

> Camera and microphone access are needed so you can record your practice.

The wording should avoid creating unnecessary anxiety.

---

# 10. Camera Preview

After permission is granted:

```text
MediaStream
    ↓
Video Element
    ↓
Live Camera Preview
```

The preview should appear as soon as the camera is ready.

The user should be able to see:

- Their face
- Their framing
- Their surroundings sufficiently to adjust positioning

---

# 11. Camera Preview Requirements

The preview should:

- Clearly show the live camera
- Maintain an appropriate aspect ratio
- Avoid unnecessary UI overlays
- Clearly indicate when the camera is active
- Work on desktop and mobile layouts
- Respect the design system
- Remain visually calm

The camera should be the primary visual element during preparation.

---

# 12. Camera Mirroring

The preview may use a mirrored presentation if that produces a more natural self-view.

The implementation should distinguish between:

```text
Preview presentation
```

and:

```text
Recorded video
```

The recording output should not be unintentionally transformed simply because the preview is mirrored.

The exact behavior should be verified during implementation.

---

# 13. Camera Controls

The prototype should expose only necessary controls.

Primary controls:

```text
Start
Stop
Retry
```

Avoid adding:

- Filters
- Zoom controls
- Camera effects
- Beauty controls
- Advanced settings

The goal is practice, not video production.

---

# 14. Preparation State

Before recording starts, the user should have a short preparation period.

Expected flow:

```text
Ready
 ↓
Start
 ↓
Countdown
 ↓
Recording
```

The countdown provides a transition from:

> “I'm looking at the camera.”

to:

> “I'm ready to speak.”

---

# 15. Countdown

The countdown should be:

- Clearly visible
- Easy to understand
- Short
- Predictable

Example:

```text
3
2
1
```

The countdown should not feel like a performance timer.

It exists to reduce surprise.

---

# 16. Recording Start

After the countdown:

```text
Countdown Complete
       ↓
MediaRecorder.start()
       ↓
Recording State
```

The UI must immediately communicate that recording has started.

---

# 17. Recording State

While recording:

The user should clearly understand:

> **I am recording right now.**

The interface should communicate:

- Recording state
- Elapsed duration
- Stop action

Example:

```text
● Recording

00:18

[ Stop ]
```

The recording indicator should not rely on color alone.

---

# 18. Recording Timer

The timer should display elapsed recording time.

Example:

```text
00:01
00:02
00:03
```

The timer is informational.

It should not create unnecessary pressure.

Unless a specific challenge requires a time limit, the prototype should avoid aggressively counting down remaining time.

---

# 19. MediaRecorder

Recording should use the browser's native:

```text
MediaRecorder
```

API.

The implementation should:

1. Receive the active `MediaStream`.
2. Create a `MediaRecorder`.
3. Start recording.
4. Collect data chunks.
5. Stop the recorder.
6. Construct a `Blob`.

Conceptually:

```text
MediaStream
    ↓
MediaRecorder
    ↓
dataavailable
    ↓
chunks[]
    ↓
Blob
```

---

# 20. Recording Format

The implementation should select a browser-supported recording MIME type.

Do not hardcode a format without checking browser support.

The implementation should use capability detection where appropriate.

Conceptually:

```text
Check supported MIME types
        ↓
Select compatible format
        ↓
Create MediaRecorder
```

Browser compatibility should be verified during testing.

---

# 21. Recording Chunks

Recording data should be accumulated while the recorder is active.

Conceptually:

```text
chunks = []

ondataavailable
    ↓
push chunk

onstop
    ↓
new Blob(chunks)
```

The implementation should reset recording chunks between attempts.

A retry must not accidentally combine recordings.

---

# 22. Stop Recording

When the user presses Stop:

```text
Stop
 ↓
MediaRecorder.stop()
 ↓
Finalize Blob
 ↓
Create Playback URL
 ↓
Playback State
```

Stopping should be predictable and immediate from the user's perspective.

---

# 23. Minimum Recording Duration

The prototype may define a minimum duration if necessary to prevent accidental empty recordings.

If a minimum is introduced, the UI must communicate the requirement clearly.

Do not silently reject the user's recording.

If no product requirement exists, avoid adding unnecessary restrictions.

---

# 24. Recording Completion

After the recording has been successfully created:

```text
Recording Blob
      ↓
Object URL
      ↓
Playback
```

The user should transition directly into reviewing the attempt.

---

# 25. Object URL

For local playback, create an object URL from the recording Blob.

Conceptually:

```text
Blob
 ↓
URL.createObjectURL()
 ↓
Video src
```

When the object URL is no longer required, it should be revoked.

This prevents unnecessary browser memory usage.

---

# 26. Playback

Playback should allow the user to:

- Play
- Pause
- Replay
- Watch the full attempt
- Retry

The playback experience should not require uploading the recording.

---

# 27. Playback UX

Playback should answer:

> “What did I just do?”

The interface should avoid turning playback into a judgment screen.

The primary actions should be:

```text
Watch Again
Try Again
Continue
```

Avoid presenting unnecessary scores or performance indicators.

---

# 28. Reflection

After playback, provide a lightweight reflection step.

The reflection should encourage the user to notice improvement opportunities without overwhelming them.

Possible prompts:

```text
What went well?

What would you try differently?

Ready for another attempt?
```

The reflection does not need sophisticated analysis in `v0.2.0`.

---

# 29. Retry

Retry is a first-class action.

Expected flow:

```text
Playback
   ↓
Try Again
   ↓
Prepare
   ↓
Countdown
   ↓
Recording
```

The challenge should remain the same unless the user explicitly chooses another challenge.

The retry should feel easier than starting over.

---

# 30. Multiple Attempts

The prototype may support multiple attempts within the current session.

Each attempt should be treated independently.

```text
Attempt 1
   ↓
Playback
   ↓
Retry
   ↓
Attempt 2
```

A new attempt should replace or supersede the previous local recording unless the product explicitly requires keeping multiple recordings.

Persistent history is out of scope.

---

# 31. Camera Cleanup

When the user leaves the camera experience or recording is complete, media resources should be released when no longer needed.

Expected cleanup:

```text
MediaStream
    ↓
getTracks()
    ↓
track.stop()
```

The application should not leave the camera or microphone running unnecessarily.

---

# 32. Component Responsibility

A possible component structure:

```text
PracticeScreen
│
├── ChallengePrompt
│
├── CameraStage
│   ├── CameraPreview
│   ├── PreparationOverlay
│   ├── Countdown
│   └── RecordingIndicator
│
├── RecordingControls
│
├── PlaybackView
│
└── Reflection
```

The exact component names may change during implementation.

The important requirement is separation of responsibilities.

---

# 33. Camera Hook / Logic Boundary

Camera and recording logic should not be tightly coupled to presentation components.

A dedicated hook or service can encapsulate functionality such as:

```text
requestMedia()
startRecording()
stopRecording()
cleanup()
```

The abstraction should remain small.

Do not create a large camera framework for the prototype.

---

# 34. Example State Model

A conceptual state model could be:

```text
{
  status: "recording",
  stream: MediaStream | null,
  recorder: MediaRecorder | null,
  recordingBlob: Blob | null,
  recordingUrl: string | null,
  duration: number,
  error: CameraError | null
}
```

The actual implementation may use a different structure.

The important requirement is that recording state remains explicit and predictable.

---

# 35. Resource Ownership

The implementation must have clear ownership of:

### MediaStream

Owned by the camera/recording logic.

### MediaRecorder

Owned by the recording logic.

### Recording Blob

Owned by the current practice session.

### Object URL

Owned by the playback layer/session and revoked when no longer required.

Clear ownership helps prevent:

- Memory leaks
- Camera leaks
- Stale recordings
- Duplicate streams
- Invalid playback URLs

---

# 36. React Lifecycle

Camera resources should be managed carefully around component lifecycle.

Potential lifecycle:

```text
Component Mount
      ↓
Request / Initialize Camera
      ↓
Active Stream
      ↓
Recording
      ↓
Playback
      ↓
Component Unmount
      ↓
Cleanup
```

Cleanup must also account for interrupted flows.

---

# 37. Interrupted Recording

The application should handle situations where recording ends unexpectedly.

Possible causes:

- Browser interruption
- Device issue
- Stream ending
- Component unmount
- Browser permission change

The user should receive a clear recovery path.

Do not leave the interface stuck in a permanent `recording` state.

---

# 38. Camera Stream Failure

If a media track unexpectedly ends:

```text
Active Camera
     ↓
Track Ends
     ↓
Detect Failure
     ↓
Update UI
     ↓
Offer Recovery
```

The UI should not continue claiming that the camera is active.

---

# 39. Browser Compatibility

The camera experience should be tested in supported browsers.

At minimum, verify:

- Camera permission behavior
- Microphone permission behavior
- `getUserMedia()`
- `MediaRecorder`
- MIME type support
- Playback
- Stream cleanup

Do not assume that MediaRecorder behaves identically across browsers.

---

# 40. Mobile Behavior

The experience should work on smaller screens.

The camera stage should:

- Fit within the viewport
- Keep controls reachable
- Avoid excessive scrolling
- Maintain readable text
- Keep recording status visible
- Keep the primary action accessible

Touch targets should follow the accessibility guidelines.

---

# 41. Accessibility

The camera experience must remain accessible.

Requirements include:

- Semantic buttons
- Accessible button labels
- Visible focus states
- Keyboard-accessible controls where possible
- Recording state communicated beyond color
- Meaningful error messages
- Appropriate live announcements for important state changes
- Reduced-motion support
- Sufficient contrast

The user should always understand the current state without depending on visual color alone.

---

# 42. Error States

The feature should handle at least:

```text
Camera Permission Denied
Microphone Permission Denied
Camera Unavailable
Microphone Unavailable
Browser Unsupported
MediaRecorder Unsupported
Recording Failed
Playback Failed
Unexpected Stream End
Unknown Error
```

Errors should provide a recovery action whenever possible.

---

# 43. Error UX

Avoid technical messages such as:

> `NotReadableError: Could not start video source`

Prefer:

> **We couldn't start your camera.**

Then provide:

> Check that another app isn't using your camera, then try again.

The raw technical error can remain available for development logging.

---

# 44. Loading States

The interface should communicate when camera initialization is happening.

Example:

```text
Preparing your camera...
```

Avoid showing a blank camera area without explanation.

---

# 45. Security Considerations

The prototype should:

- Request permissions through browser APIs
- Avoid transmitting recordings
- Avoid exposing recording data externally
- Avoid third-party recording services
- Avoid storing unnecessary user data

The local recording should remain within the browser session.

---

# 46. Privacy

The prototype's privacy model is intentionally simple:

```text
Camera
   ↓
Browser
   ↓
Local Recording
   ↓
Local Playback
```

There is no server upload.

There is no cloud recording storage.

There is no AI processing.

This makes the prototype suitable for testing the experience without introducing unnecessary data infrastructure.

---

# 47. Performance

The camera experience should prioritize:

- Fast camera initialization
- Smooth preview
- Stable recording
- Responsive controls
- Minimal unnecessary rendering
- Proper resource cleanup

Do not perform unnecessary processing on every video frame.

---

# 48. Logging

Development logging may include:

```text
Camera initialization
Permission result
Recording started
Recording stopped
Recording error
Stream ended
Cleanup
```

Production logging should avoid exposing sensitive media or unnecessary user information.

---

# 49. Analytics

Analytics are not required for the first prototype implementation.

If analytics are introduced later, useful events could include:

```text
practice_started
camera_permission_granted
camera_permission_denied
recording_started
recording_completed
recording_replayed
retry_clicked
practice_completed
```

Analytics should help answer product questions rather than simply collect events.

---

# 50. Testing Matrix

## Permission

| Scenario           | Expected                 |
| ------------------ | ------------------------ |
| Camera granted     | Preview appears          |
| Camera denied      | Clear recovery message   |
| Microphone denied  | Clear recovery message   |
| Permission blocked | Browser-setting guidance |
| No camera          | Useful error             |
| No microphone      | Useful error             |

## Recording

| Scenario           | Expected                   |
| ------------------ | -------------------------- |
| Start              | Recording begins           |
| Stop               | Blob is created            |
| Timer              | Duration updates           |
| Retry              | New attempt starts cleanly |
| Multiple attempts  | Recordings don't mix       |
| Unexpected failure | Recovery state appears     |

## Playback

| Scenario            | Expected               |
| ------------------- | ---------------------- |
| Recording completed | Video loads            |
| Play                | Video plays            |
| Pause               | Video pauses           |
| Replay              | Video restarts         |
| Retry               | Returns to preparation |

## Cleanup

| Scenario          | Expected                                |
| ----------------- | --------------------------------------- |
| Leave practice    | Media tracks stop                       |
| Complete practice | Unused resources released               |
| Retry             | Previous recorder doesn't remain active |
| Error             | Active resources cleaned up             |

---

# 51. Acceptance Criteria

The camera feature is complete when:

### Camera

- [ ] User can grant camera permission.
- [ ] User can grant microphone permission.
- [ ] Live preview appears.
- [ ] Camera errors are handled.
- [ ] Microphone errors are handled.

### Preparation

- [ ] User understands they are about to record.
- [ ] Countdown appears.
- [ ] Countdown transitions into recording.

### Recording

- [ ] Recording starts successfully.
- [ ] Recording state is obvious.
- [ ] Timer displays elapsed time.
- [ ] User can stop recording.
- [ ] Recording produces a valid Blob.

### Playback

- [ ] Recorded video can be played.
- [ ] User can pause/replay.
- [ ] User can retry.

### Cleanup

- [ ] Camera stream is released when appropriate.
- [ ] Microphone stream is released when appropriate.
- [ ] Object URLs are revoked when no longer needed.
- [ ] Previous recordings do not interfere with new attempts.

### UX

- [ ] Core flow is easy to understand.
- [ ] Primary action is obvious.
- [ ] Error states provide recovery.
- [ ] Interface follows the design system.
- [ ] Accessibility requirements are satisfied.
- [ ] Mobile layout is usable.

---

# 52. Definition of Done

The camera prototype is technically complete when:

```text
Home
 ↓
Challenge
 ↓
Start Practice
 ↓
Permission
 ↓
Preview
 ↓
Countdown
 ↓
Recording
 ↓
Stop
 ↓
Playback
 ↓
Reflection
 ↓
Retry
```

works reliably in the supported browser environment.

The feature must also pass relevant manual testing.

---

# 53. Product Definition of Done

Technical completion is not enough.

We also need to observe whether the experience answers the product question:

> **Does basic recording feel simple and low-pressure?**

Things to observe:

- Do users understand what to do?
- Do they hesitate before pressing record?
- Do they successfully complete an attempt?
- Do they watch the recording?
- Do they want to try again?
- Does anything make the experience feel judgmental?
- Where do users become confused?
- Where do users abandon the flow?

The prototype exists to answer these questions.

---

# 54. Explicit Non-Goals

Do not optimize this feature for:

```text
Professional video production
Social media publishing
Video editing
AI scoring
Perfect camera quality
Advanced analytics
Large-scale infrastructure
```

The goal is not to make the best recording tool.

The goal is to make the easiest environment in which to practice.

---

# 55. Engineering Principle

The camera implementation should follow:

> **Simple state. Clear ownership. Predictable lifecycle. Minimal dependencies.**

The browser provides most of what we need.

Use native browser capabilities before introducing libraries.

---

# 56. Product Principle

The camera should never communicate:

> “Let's see how good you are.”

It should communicate:

> **“Let's give it a try.”**

The interface should make pressing record feel like a small action rather than a performance.

---

# 57. Final North Star

The camera experience succeeds when the user reaches:

```text
“I don't feel completely comfortable yet...

but I can press record again.”
```

That is the behavior Camera Confidence is trying to create.

> **Make it easier to try than to avoid.**
