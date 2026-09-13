# ADR-001 — Use MediaRecorder API for Browser Recording

**Status:** Accepted
**Date:** 2026-09-12
**Decision:** Use the browser-native MediaRecorder API for `v0.2.0`.

---

## 1. Context

Camera Confidence `v0.2.0` needs a simple browser-based recording experience.

The user should be able to:

```text
Start Practice
    ↓
Camera Preview
    ↓
Countdown
    ↓
Record
    ↓
Stop
    ↓
Playback
    ↓
Retry
```

At this stage, recordings do not need to be uploaded, stored permanently, edited, or processed by AI.

The prototype therefore needs only a reliable way to capture camera and microphone streams and produce a playable local recording.

---

## 2. Decision

We will use the browser-native:

```text
MediaRecorder API
```

together with:

```text
MediaDevices / getUserMedia()
```

for recording.

The basic pipeline is:

```text
getUserMedia()
      ↓
MediaStream
      ↓
MediaRecorder
      ↓
Recording Chunks
      ↓
Blob
      ↓
Object URL
      ↓
Video Playback
```

---

## 3. Why MediaRecorder

MediaRecorder provides the capabilities required by the prototype without introducing another dependency.

It allows us to:

- Record a `MediaStream`
- Capture audio and video
- Receive recording chunks
- Stop recording
- Create a Blob
- Play the recording locally

This is sufficient for the current product hypothesis.

---

## 4. Alternatives Considered

### Video Recording Library

A third-party recording library could provide a higher-level abstraction.

However, introducing one at this stage would add:

- Dependency overhead
- Additional maintenance
- Another API abstraction
- Potential browser compatibility issues
- More code before validating the product

There is currently no demonstrated need for that complexity.

---

### Cloud Recording Service

A cloud video service would provide persistent recording infrastructure.

This is intentionally rejected for `v0.2.0`.

The prototype does not require:

- Uploads
- Persistent storage
- Server-side processing
- User accounts

Cloud recording can be evaluated when persistence becomes a real product requirement.

---

### Custom Recording Pipeline

Building a custom recording pipeline would be significantly more complex than necessary.

It would solve problems we do not currently have.

---

## 5. Decision Criteria

The chosen solution should:

- Work directly in the browser
- Support camera and microphone streams
- Require minimal infrastructure
- Keep recordings local
- Minimize dependencies
- Be understandable by the development team
- Allow future migration if requirements change

MediaRecorder satisfies the current requirements.

---

## 6. Consequences

### Positive

Using MediaRecorder means:

- No recording backend is required.
- No video upload is required.
- No storage infrastructure is required.
- The prototype can remain browser-first.
- Development can move quickly.
- The implementation stays relatively small.

---

### Negative

MediaRecorder behavior can vary between browsers.

We may need to handle:

- MIME type differences
- Codec differences
- Browser-specific behavior
- Permission differences
- Recording limitations

Therefore, browser testing is part of the feature's definition of done.

---

## 7. Implementation Requirements

The implementation should:

1. Request camera and microphone access through `getUserMedia()`.
2. Verify that the required media capabilities are available.
3. Select a supported MediaRecorder MIME type.
4. Create the recorder from the active stream.
5. Collect recording chunks.
6. Stop the recorder cleanly.
7. Create a Blob from the chunks.
8. Create an object URL for playback.
9. Revoke the object URL when it is no longer needed.
10. Stop media tracks when the camera experience ends.

---

## 8. Resource Lifecycle

The expected lifecycle is:

```text
Request Media
     ↓
Create Stream
     ↓
Preview
     ↓
Create Recorder
     ↓
Recording
     ↓
Stop Recorder
     ↓
Create Blob
     ↓
Playback
     ↓
Cleanup
```

The application must avoid leaving:

- Active camera tracks
- Active microphone tracks
- Unused MediaRecorder instances
- Unused object URLs

after the relevant session has ended.

---

## 9. Browser Compatibility

Because the implementation depends on browser APIs, compatibility must be verified during development.

The application should not blindly assume that one MIME type works everywhere.

Capability detection should be preferred where necessary.

---

## 10. When This Decision Should Be Revisited

This ADR should be reconsidered if a real requirement appears that MediaRecorder cannot reasonably satisfy.

Examples:

- Advanced video editing
- Professional recording controls
- Browser compatibility becomes unacceptable
- Recording quality requirements exceed native capabilities
- Advanced media processing becomes necessary
- A third-party recording solution substantially reduces complexity

Until such a requirement exists, MediaRecorder remains the default.

---

## 11. Relationship to Product Versions

### `v0.2.0`

Use:

```text
getUserMedia()
+
MediaRecorder
+
Local Blob
+
Playback
```

### Future versions

If recordings become persistent:

```text
MediaRecorder
    ↓
Upload
    ↓
Object Storage
```

If AI analysis is introduced:

```text
Recording
    ↓
Upload
    ↓
Speech-to-Text
    ↓
Analysis
    ↓
LLM Feedback
```

The introduction of backend infrastructure does not invalidate this decision.

MediaRecorder can remain the browser-side capture mechanism.

---

## 12. Final Decision

> **Use the browser-native MediaRecorder API for Camera Confidence `v0.2.0`.**

Do not introduce a recording library or cloud recording service until a concrete product or technical requirement justifies it.

### Principle

> **Use the platform before adding infrastructure.**
