# Camera Confidence — Architecture

## 1. Purpose

This document defines the technical architecture of Camera Confidence.

It describes:

- How the application is structured
- How data moves through the system
- Which responsibilities belong to each layer
- What architecture is required for the current version
- How the architecture can evolve as the product grows

The architecture should remain proportional to the current product stage.

> **Build the smallest architecture that can validate the current product hypothesis.**

---

# 2. Architecture Philosophy

Camera Confidence should follow a simple architectural principle:

> **Technology follows the problem.**

The system should not introduce infrastructure before there is a product requirement for it.

This means:

- No backend before backend functionality is needed.
- No database before persistence is needed.
- No queue before asynchronous processing is needed.
- No AI before useful feedback is required.
- No distributed architecture before scale creates a real problem.

The architecture should evolve with the product.

---

# 3. Current Architecture

## `v0.2.0 — Camera Prototype`

The current architecture is intentionally minimal.

```text
┌──────────────────────────────┐
│          Next.js App         │
│                              │
│  Home                        │
│    ↓                         │
│  Challenge                   │
│    ↓                         │
│  Practice                    │
│    ↓                         │
│  Camera Preview              │
│    ↓                         │
│  Recording                   │
│    ↓                         │
│  Playback                    │
└──────────────┬───────────────┘
               │
               ▼
      Browser Camera APIs
               │
       ┌───────┴────────┐
       │                │
getUserMedia()     MediaRecorder
       │                │
       └───────┬────────┘
               ▼
          Local Blob
               │
               ▼
           Playback
```

There is:

- No backend
- No database
- No authentication
- No object storage
- No AI processing
- No external recording service

The source of truth explicitly defines the prototype as:

```text
Next.js
   ↓
Browser Camera
   ↓
MediaRecorder API
   ↓
Local Video
   ↓
Playback
   ↓
Mock Feedback
```

---

# 4. Current System Boundary

For `v0.2.0`, the system boundary is the user's browser.

```text
┌──────────────────────────────────────┐
│              Browser                 │
│                                      │
│  ┌──────────────┐                    │
│  │ Next.js App  │                    │
│  └──────┬───────┘                    │
│         │                            │
│         ▼                            │
│  ┌──────────────┐                    │
│  │ Camera API   │                    │
│  └──────┬───────┘                    │
│         │                            │
│         ▼                            │
│  ┌──────────────┐                    │
│  │ MediaRecorder│                    │
│  └──────┬───────┘                    │
│         │                            │
│         ▼                            │
│  ┌──────────────┐                    │
│  │ Local Blob   │                    │
│  └──────┬───────┘                    │
│         │                            │
│         ▼                            │
│  ┌──────────────┐                    │
│  │  Playback    │                    │
│  └──────────────┘                    │
│                                      │
└──────────────────────────────────────┘
```

Nothing needs to leave the browser for the core prototype experience.

---

# 5. Application Layers

Even though the prototype is small, responsibilities should remain separated.

```text
Presentation
     ↓
Practice Flow
     ↓
Camera / Recording
     ↓
Local Session State
```

## Presentation Layer

Responsible for:

- UI
- Layout
- Visual states
- User interactions
- Accessibility

Examples:

```text
Home
Challenge
Practice
CameraPreview
RecordingControls
Playback
```

---

## Practice Flow Layer

Responsible for:

- Current challenge
- Current practice state
- Moving between practice stages
- Starting and stopping recording
- Completing an attempt
- Retrying

Example states:

```text
idle
permission
ready
countdown
recording
stopped
playback
completed
```

---

## Camera / Recording Layer

Responsible for:

- Requesting camera/microphone access
- Managing `MediaStream`
- Starting `MediaRecorder`
- Receiving recording chunks
- Creating the final recording Blob
- Releasing media resources

This layer should hide browser-specific recording details from the UI where practical.

---

## Local Session State

Responsible for temporary information such as:

```text
currentChallenge
cameraPermission
cameraStatus
recordingStatus
recordingDuration
recordedVideo
error
```

For `v0.2.0`, React state is sufficient.

---

# 6. Core Recording Flow

The recording lifecycle should follow:

```text
User enters Practice
        ↓
Request camera + microphone
        ↓
Permission granted
        ↓
Create MediaStream
        ↓
Display camera preview
        ↓
User starts practice
        ↓
Countdown
        ↓
Create MediaRecorder
        ↓
Start recording
        ↓
Collect chunks
        ↓
User stops recording
        ↓
Stop MediaRecorder
        ↓
Create Blob
        ↓
Create Object URL
        ↓
Display Playback
```

---

# 7. Camera Lifecycle

Camera access should be treated as a lifecycle rather than simply turning the camera on.

```text
Idle
 ↓
Request Permission
 ↓
Permission Granted
 ↓
Camera Active
 ↓
Recording / Preview
 ↓
Practice Finished
 ↓
Stop MediaStream
 ↓
Camera Released
```

The application should release camera and microphone resources when they are no longer needed.

This prevents:

- Camera remaining active unnecessarily
- Microphone remaining active unnecessarily
- Browser permission indicators staying active
- Resource leaks

---

# 8. Permission Flow

Camera and microphone permissions should be requested only when needed.

The expected flow is:

```text
Challenge
   ↓
Start Practice
   ↓
Explain camera requirement
   ↓
Request Permission
   ↓
Permission Result
```

Possible outcomes:

```text
Granted
Denied
Blocked
Unavailable
Error
```

Each state should have a clear user-facing response.

The permission experience should reduce anxiety rather than unexpectedly interrupt the user.

---

# 9. Recording State Machine

Recording should be modeled as explicit states.

```text
IDLE
 │
 ▼
REQUESTING_PERMISSION
 │
 ▼
READY
 │
 ▼
COUNTDOWN
 │
 ▼
RECORDING
 │
 ▼
STOPPING
 │
 ▼
PLAYBACK
 │
 ├──────────────► RETRY
 │                  │
 │                  ▼
 │              COUNTDOWN
 │
 ▼
COMPLETED
```

Errors should be able to exit the flow safely from relevant states.

Example:

```text
RECORDING
    ↓
ERROR
    ↓
Recovery
```

The UI should always reflect the actual recording state.

---

# 10. Recording Data Flow

The browser recording pipeline is:

```text
MediaStream
    ↓
MediaRecorder
    ↓
ondataavailable
    ↓
Blob Chunks
    ↓
Blob
    ↓
Object URL
    ↓
HTMLVideoElement
```

The recording should remain local for `v0.2.0`.

No upload is required.

---

# 11. Playback Flow

After recording:

```text
Recorded Blob
      ↓
Object URL
      ↓
Video Element
      ↓
Play / Pause / Replay
      ↓
Try Again
```

The user should be able to immediately review their attempt.

Playback is important because the prototype is not simply testing whether recording works.

It is testing whether the complete experience of:

> **Prepare → Record → See Yourself → Try Again**

feels comfortable.

---

# 12. Retry Architecture

Retry should reuse the existing challenge context.

```text
Challenge
    ↓
Attempt #1
    ↓
Playback
    ↓
Reflection
    ↓
Try Again
    ↓
Attempt #2
```

The user should not have to restart the entire application flow.

The challenge should remain available while the user practices.

---

# 13. Error Architecture

Errors should be treated as expected states.

Potential errors include:

```text
CameraUnavailable
MicrophoneUnavailable
PermissionDenied
PermissionBlocked
RecordingFailed
PlaybackFailed
BrowserUnsupported
UnknownError
```

Errors should provide:

1. What happened
2. What the user can do
3. A recovery action

Example:

```text
We couldn't access your camera.

Check your browser permissions and try again.

[ Try Again ]
```

Avoid exposing raw browser errors directly to users.

---

# 14. v0.2.0 Data Model

The prototype does not require a persistent database.

Conceptually, the session contains:

```text
PracticeSession
├── challenge
├── status
├── cameraState
├── recordingState
├── recordingBlob
└── recordingDuration
```

This data exists only for the current practice session.

It does not need to become a database schema yet.

---

# 15. Future Architecture

When the product requires persistence and AI feedback, the architecture can evolve.

## `v0.4.0+`

```text
┌──────────────┐
│   Browser    │
│   Next.js    │
└──────┬───────┘
       │
       │ Upload
       ▼
┌──────────────┐
│   NestJS     │
│     API      │
└──────┬───────┘
       │
       ├───────────────┐
       │               │
       ▼               ▼
 Object Storage    PostgreSQL
       │               │
       │               │
       ▼               │
 Speech-to-Text        │
       │               │
       ▼               │
 Speech Analysis       │
       │               │
       ▼               │
      LLM              │
       │               │
       └───────┬───────┘
               ▼
            Feedback
```

The source of truth describes this future direction as:

```text
Next.js
   ↓
Camera
   ↓
MediaRecorder
   ↓
Upload
   ↓
NestJS API
   ↓
Object Storage
   ↓
Speech-to-Text
   ↓
LLM Feedback
   ↓
Postgres
```

---

# 16. Backend Boundary

When introduced, NestJS becomes the boundary between the frontend and persistent services.

```text
Browser
   │
   │ HTTPS
   ▼
NestJS API
   │
   ├── Users
   ├── Challenges
   ├── Recordings
   ├── Analysis
   ├── Feedback
   └── Progress
```

The frontend should not directly manage database operations.

---

# 17. Persistence Boundary

Persistent data should eventually be separated into two broad categories.

### Application Data

Stored in PostgreSQL:

```text
User
Challenge
Recording metadata
Analysis
Progress
```

### Media Data

Stored in object storage:

```text
Video
Audio
Potential derived media
```

Video files should not be stored directly inside PostgreSQL.

The source of truth explicitly identifies PostgreSQL + Prisma for future persistence and object storage for recordings.

---

# 18. AI Processing Boundary

AI processing should remain separated from the main application flow.

Conceptually:

```text
Recording
    ↓
Audio Extraction
    ↓
Speech-to-Text
    ↓
Transcript
    ↓
Speech Metrics
    ↓
LLM
    ↓
Structured Feedback
```

The first AI system should remain simple.

Potential analysis:

```text
Transcript
Words Per Minute
Filler Words
Pauses
Content Relevance
```

The source of truth identifies these as useful initial speech-analysis areas.

---

# 19. Feedback Boundary

The AI system should return structured feedback rather than directly controlling the interface.

Conceptually:

```text
AI
 ↓
Feedback Object
 ↓
Feedback UI
```

Example:

```json
{
  "summary": "Good first attempt.",
  "strengths": ["Clear introduction"],
  "improvements": ["Slow down slightly"],
  "encouragement": "Nice work. Try again when you're ready."
}
```

This keeps AI logic separate from presentation logic.

---

# 20. Background Processing

Initially, analysis can be synchronous:

```text
Upload
 ↓
Process
 ↓
Return Feedback
```

If processing becomes slow:

```text
NestJS
   ↓
Create Analysis Job
   ↓
Queue
   ↓
Worker
   ├── Speech-to-Text
   ├── Speech Analysis
   └── LLM Feedback
```

Redis and BullMQ are possible future technologies.

They should only be introduced when processing actually requires asynchronous jobs.

The source of truth explicitly treats Redis/BullMQ as a future option rather than a current requirement.

---

# 21. Authentication Boundary

Authentication should not exist in the prototype.

When persistence becomes necessary:

```text
Browser
   ↓
Authentication
   ↓
NestJS
   ↓
User-specific data
```

Authentication should primarily establish ownership and access control for:

- Recordings
- Challenges
- Progress
- Feedback
- User preferences

---

# 22. Privacy Architecture

Because Camera Confidence handles video, audio, and potentially personal speech, privacy must influence architecture.

Future architecture should support:

```text
Private Recording
      ↓
Private Object Storage
      ↓
Controlled Access
      ↓
Signed URL
      ↓
Playback
```

Users should eventually be able to delete their recordings.

Deletion should remove both:

```text
Database Metadata
        +
Stored Media
```

The source of truth explicitly identifies private recordings, signed URLs, deletion, and minimal data collection as privacy requirements.

---

# 23. Frontend → Backend Contract

When the backend exists, the frontend should communicate through explicit API contracts.

Conceptually:

```text
Next.js
   │
   ├── GET  /challenges
   ├── POST /recordings
   ├── GET  /recordings/:id
   ├── GET  /analysis/:id
   └── GET  /progress
             │
             ▼
          NestJS
```

The exact API design should be defined when backend development begins.

Do not create API contracts for functionality that does not yet exist.

---

# 24. Architecture Evolution

The architecture should evolve in stages.

### Stage 1 — Prototype

```text
Next.js
 ↓
Browser APIs
 ↓
Local Recording
```

### Stage 2 — Practice Loop

```text
Next.js
 ↓
Browser APIs
 ↓
Local Practice State
```

### Stage 3 — AI Feedback

```text
Next.js
 ↓
NestJS
 ↓
Storage
 ↓
Speech-to-Text
 ↓
LLM
```

### Stage 4 — Persistence

```text
Next.js
 ↓
NestJS
 ├── PostgreSQL
 └── Object Storage
```

### Stage 5 — Scale

```text
Next.js
 ↓
NestJS
 ↓
Queue
 ↓
Workers
 ├── Speech
 ├── Analysis
 └── AI
```

The architecture should move to the next stage only when the product requires it.

---

# 25. What We Explicitly Avoid

Camera Confidence should avoid:

- Microservices during the prototype
- Multiple databases without a reason
- Kubernetes
- Complex event-driven architecture
- Redis before asynchronous processing is necessary
- Queues before processing requires them
- AI agents
- Complex computer vision
- Custom video infrastructure
- Premature caching
- Premature scaling infrastructure

The project is not trying to demonstrate infrastructure sophistication.

---

# 26. Architecture Decision Rules

When making an architectural decision, ask:

### 1. What problem are we solving?

If there is no clear problem, stop.

### 2. Does the current architecture already solve it?

If yes, don't add technology.

### 3. Is this required for the current version?

If no, defer it.

### 4. Does it reduce complexity?

If it adds more complexity than it removes, reconsider it.

### 5. Does it improve the core product loop?

```text
Practice
 ↓
Record
 ↓
Reflect
 ↓
Try Again
 ↓
Improve
```

If not, it should probably not be prioritized.

---

# 27. Architecture and Versioning

Architecture decisions must respect product versions.

```text
v0.2.0
Browser-first
No backend

v0.3.0
Local practice loop

v0.4.0
Backend + AI

v0.5.0
Persistence

v0.6.0
Early beta reliability

v0.7.0
Better coaching

v0.8.0
Adaptive system

v0.9.0
Public beta infrastructure

v1.0.0
Validated production architecture
```

A future architecture must not become a reason to prematurely implement future functionality.

---

# 28. Architecture Definition of Done

An architectural change is complete when:

- The responsibility is clearly defined.
- The data flow is understood.
- The boundary is documented.
- Failure states are considered.
- Privacy implications are considered where relevant.
- The implementation is tested.
- The architecture does not introduce unnecessary complexity.
- The decision is documented if it is significant.

---

# 29. Current Architecture Definition of Done

For `v0.2.0`, the architecture is successful when a user can:

```text
Open Camera Confidence
        ↓
See a challenge
        ↓
Start practice
        ↓
Grant camera permission
        ↓
See camera preview
        ↓
Complete countdown
        ↓
Record video + audio
        ↓
Stop recording
        ↓
Watch the recording
        ↓
Try again
```

The source of truth identifies this exact flow as the immediate technical priority.

---

# 30. The Current Rule

For `v0.2.0`:

> **The browser is the backend.**

More precisely:

> **Use the browser to prove the experience before building the infrastructure behind it.**

The current product question is not whether we can build a scalable video-processing platform.

It is:

> **Does recording feel less intimidating when Camera Confidence guides the user through it?**

If the answer is no, we improve the experience.

If the answer is yes, we earn the right to build the next layer.
