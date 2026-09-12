# Camera Confidence — Technical Stack

## 1. Purpose

This document defines the technology choices for Camera Confidence and the reasoning behind them.

The stack should remain:

- Simple
- Familiar
- Cost-conscious
- Easy to iterate
- Easy to maintain
- Appropriate for the current product stage

Technology should follow product needs rather than drive them.

---

# 2. Current Development Stage

Camera Confidence is currently in:

> **`v0.2.0 — Camera Prototype`**

The immediate objective is to validate the camera and recording experience.

Therefore, the current stack is intentionally small.

```text
Next.js
   ↓
React
   ↓
TypeScript
   ↓
Browser Camera APIs
   ↓
Local Browser State
```

There is currently no requirement for a backend, database, authentication system, or AI pipeline.

---

# 3. Frontend

## Next.js

**Primary frontend framework:** Next.js

Next.js is used to build the Camera Confidence web application.

### Why

- Familiar React ecosystem
- Strong TypeScript support
- Suitable for the eventual product
- Supports both simple prototypes and more advanced applications
- Provides a clear path toward a production application

For the current prototype, we should use only the parts of Next.js that are actually necessary.

---

# 4. React

Camera Confidence uses React for its user interface.

React should be used to compose the product from focused, reusable components.

Example:

```text
PracticeScreen
├── PracticeHeader
├── ChallengePrompt
├── CameraPreview
├── RecordingTimer
└── RecordingControls
```

Avoid creating large components that manage unrelated responsibilities.

---

# 5. TypeScript

**Language:** TypeScript

TypeScript should be used throughout the application.

### Goals

- Catch errors during development
- Make component contracts explicit
- Improve refactoring safety
- Improve maintainability
- Make shared data structures easier to understand

Avoid unnecessarily complex type abstractions.

Prefer simple, readable types.

---

# 6. Styling

## Tailwind CSS

Tailwind CSS is the preferred styling approach.

It should be used together with the design tokens defined in:

`docs/design/design-system.md`

The application should avoid scattering arbitrary visual values throughout components.

Prefer semantic design-system values where possible.

---

# 7. Component Architecture

The frontend should use reusable components where reuse provides meaningful value.

Conceptually:

```text
UI
│
├── Primitives
│   ├── Button
│   ├── Text
│   └── Container
│
├── Product Components
│   ├── ChallengeCard
│   ├── CameraPreview
│   ├── RecordingControls
│   └── FeedbackCard
│
└── Screens
    ├── Home
    ├── Challenge
    ├── Practice
    └── Playback
```

Do not build a large component library before the product needs one.

---

# 8. Camera Access

The prototype should use the browser's native camera APIs.

Primary API:

```text
navigator.mediaDevices.getUserMedia()
```

This provides access to:

- Camera
- Microphone

The application should request access only when the user enters the recording experience.

---

# 9. Recording

The prototype should use:

```text
MediaRecorder API
```

for browser-based recording.

Conceptually:

```text
getUserMedia()
      ↓
MediaStream
      ↓
MediaRecorder
      ↓
Recorded Chunks
      ↓
Blob
      ↓
Video Playback
```

This keeps the prototype simple and avoids introducing unnecessary recording infrastructure.

---

# 10. Local Recording

For `v0.2.0`, recordings should remain local to the browser.

The prototype does not need persistent cloud storage.

The immediate goal is:

```text
Record
  ↓
Create Blob
  ↓
Generate Object URL
  ↓
Playback
```

This allows us to validate the experience without building backend infrastructure.

---

# 11. Browser APIs

The prototype should prefer native browser capabilities when they adequately solve the problem.

Relevant APIs include:

```text
MediaDevices API
MediaRecorder API
URL.createObjectURL()
```

Additional APIs should be introduced only when required.

---

# 12. State Management

For `v0.2.0`, use local React state where practical.

Examples:

```text
isCameraReady
isRecording
recordingDuration
recordedBlob
cameraError
permissionState
```

Do not introduce a global state management library simply because the project may eventually become larger.

Global state should be introduced when multiple parts of the application genuinely need shared state.

---

# 13. Server State

There is no meaningful server state requirement for the camera prototype.

When backend functionality is introduced, server-state management can be evaluated based on actual requirements.

Potential future technologies may include:

- TanStack Query
- Server Actions
- API clients

The choice should be made when the backend exists.

---

# 14. Backend

## Future Direction

When persistent functionality is required, the planned backend direction is:

> **NestJS**

Potential responsibilities:

```text
Authentication
Challenges
Recordings
Analysis
Feedback
Progress
```

The backend should not be introduced into `v0.2.0` unless a concrete requirement appears.

---

# 15. Database

## Future Direction

The planned persistent database is:

> **PostgreSQL**

with:

> **Prisma**

as the ORM/database toolkit.

Potential core entities:

```text
User
Challenge
Recording
Analysis
Progress
```

This belongs to a later version when persistence becomes necessary.

---

# 16. Object Storage

Recorded videos should eventually be stored in object storage rather than directly in PostgreSQL.

Potential options include:

- Cloudflare R2
- Amazon S3
- Supabase Storage

The final provider should be selected when persistent recording storage becomes necessary.

Requirements should include:

- Private objects
- Signed access
- Deletion support
- Reasonable storage costs
- Reliable uploads

No provider is locked in for `v0.2.0`.

---

# 17. AI

AI is a future product capability, not a requirement for the camera prototype.

The intended future flow is:

```text
Recording
    ↓
Audio
    ↓
Speech-to-Text
    ↓
Transcript
    ↓
Speech Analysis
    ↓
LLM
    ↓
Structured Feedback
```

The first AI implementation should remain simple.

AI should only be introduced when it can provide meaningful improvement to the practice experience.

---

# 18. Speech-to-Text

Future speech analysis may use a speech-to-text service to generate:

- Transcript
- Word timing
- Speaking duration
- Potential filler words

The specific provider is not yet locked.

Provider selection should consider:

- Accuracy
- Cost
- Latency
- Language support
- Privacy
- API reliability

---

# 19. LLM Feedback

The eventual coaching layer should use an LLM to transform analysis into supportive feedback.

The output should be structured rather than uncontrolled text.

Conceptually:

```json
{
  "summary": "...",
  "strengths": [],
  "improvements": [],
  "encouragement": "..."
}
```

The exact schema should be defined in the future AI specification.

---

# 20. Visual Analysis

Visual analysis is a future capability.

Potential areas include:

- Face presence
- Camera engagement
- Head position
- Framing
- Excessive movement

It should not be introduced until there is a clear product reason.

Because this involves camera-derived information, privacy implications must be considered before implementation.

---

# 21. Background Processing

If recording analysis becomes slow, processing can eventually move to background jobs.

Potential architecture:

```text
API
 ↓
Job Queue
 ↓
Worker
 ├── Transcription
 ├── Speech Analysis
 └── AI Feedback
```

Potential technologies:

- Redis
- BullMQ

These should only be introduced when synchronous processing creates a real problem.

---

# 22. Authentication

Authentication is not required for the camera prototype.

It should be introduced when persistent user data becomes necessary.

The authentication solution should be evaluated based on:

- Security
- Developer experience
- Integration with Next.js
- Integration with the future backend
- User experience

Do not add authentication merely to make the prototype look like a production SaaS.

---

# 23. Analytics

Product analytics will eventually help us understand whether people actually use the product.

A potential solution is:

> **PostHog**

Potential events:

```text
challenge_viewed
practice_started
recording_started
recording_completed
recording_replayed
retry_clicked
challenge_completed
```

Analytics should focus on behavior that helps us validate the product.

---

# 24. Infrastructure

Infrastructure should evolve with the product.

### `v0.2.0`

```text
Browser
   ↓
Next.js
```

### Later

```text
Browser
   ↓
Next.js
   ↓
NestJS
   ↓
PostgreSQL
   ↓
Object Storage
```

### Later, if required

```text
NestJS
   ↓
Redis / Queue
   ↓
Workers
   ↓
AI / Analysis Services
```

The architecture should grow only when product requirements justify it.

---

# 25. Deployment

The deployment platform is not a core product decision at the prototype stage.

The chosen platform should prioritize:

- Simple deployment
- Low cost
- Good developer experience
- Environment variable management
- Reliable builds
- Easy rollback

The deployment strategy can evolve as the architecture evolves.

---

# 26. Environment Configuration

Environment-specific configuration should use environment variables.

Do not hardcode:

- API keys
- Service credentials
- Database credentials
- Private URLs
- Secrets

The repository should contain an example environment file documenting required variables without containing secrets.

---

# 27. Package Management

Use a single package manager consistently across the project.

Do not mix package managers unnecessarily.

Lockfiles should be committed.

Dependencies should be added only when they provide meaningful value.

Before adding a dependency, ask:

> **Can the platform or existing stack already solve this?**

---

# 28. Dependency Philosophy

Every dependency introduces:

- Maintenance cost
- Security considerations
- Upgrade requirements
- Bundle impact
- Learning overhead

Therefore:

> **Prefer the platform when the platform is good enough.**

For example, use:

```text
MediaRecorder
```

instead of adding a recording library when native browser capabilities meet our requirements.

---

# 29. Testing

The testing strategy should evolve with product complexity.

For the prototype, prioritize:

### Manual testing

Especially:

- Camera permission
- Microphone permission
- Recording
- Stopping
- Playback
- Retry
- Browser behavior

### Automated testing

Add automated tests where they provide meaningful confidence.

Potential layers:

```text
Unit
Integration
End-to-End
```

Do not build an extensive testing framework before there is meaningful application logic to test.

---

# 30. Browser Compatibility

The camera experience depends on browser support.

At minimum, test the primary target browsers during development.

Pay particular attention to:

- `getUserMedia()`
- `MediaRecorder`
- Audio/video MIME support
- Permission behavior
- Mobile browser behavior

Browser compatibility should be verified rather than assumed.

---

# 31. Performance

For the prototype, prioritize:

- Fast initial load
- Responsive UI
- Smooth camera preview
- Stable recording
- Minimal unnecessary JavaScript
- Avoiding expensive processing on the main thread

Do not prematurely optimize for large-scale traffic.

---

# 32. Security

Security should be considered from the beginning even though the prototype is simple.

Do not:

- Expose secrets
- Store unnecessary sensitive information
- Create public recording URLs
- Trust client input blindly once a backend exists
- Add unnecessary third-party integrations

Future recording storage must use private access controls.

---

# 33. Privacy

Camera Confidence handles potentially sensitive media.

Technical architecture should support:

- Private recordings
- Controlled access
- Secure storage
- Deletion
- Minimal data collection

Privacy requirements should influence technical decisions rather than being added after implementation.

---

# 34. Current Stack

For `v0.2.0`:

```text
Frontend
├── Next.js
├── React
└── TypeScript

Styling
└── Tailwind CSS

Camera
├── MediaDevices API
└── MediaRecorder API

State
└── React state

Storage
└── Browser memory / local object URLs

Backend
└── None

Database
└── None

AI
└── None
```

---

# 35. Future Stack Direction

As the product evolves:

```text
Frontend
├── Next.js
├── React
└── TypeScript

Styling
└── Tailwind CSS

Backend
└── NestJS

Database
├── PostgreSQL
└── Prisma

Storage
└── Object Storage

Processing
├── Redis
├── BullMQ
└── Workers

AI
├── Speech-to-Text
└── LLM

Analytics
└── PostHog
```

These are planned directions, not mandatory commitments.

---

# 36. Technology Introduction Rule

A new technology should be introduced only when at least one of these is true:

- The current stack cannot reasonably solve the problem.
- The new technology significantly reduces complexity.
- It provides a necessary capability.
- It solves an observed performance or reliability issue.
- It enables a validated product requirement.

Avoid introducing technology because:

- It is popular.
- It looks impressive.
- Another project uses it.
- We might need it someday.
- It makes the architecture "more scalable."

---

# 37. Architecture Evolution

The expected progression is:

```text
Simple
  ↓
Functional
  ↓
Persistent
  ↓
Analyzed
  ↓
Personalized
  ↓
Scalable
```

Not:

```text
Microservices
+
Queues
+
Redis
+
AI
+
Multiple databases
+
Complex infrastructure
```

before the product has users.

---

# 38. Current Engineering Principle

> **Use the simplest technology that can reliably validate the current product hypothesis.**

For `v0.2.0`, that means the browser itself should do most of the work.

---

# 39. Final Rule

Technology is an implementation detail in service of the product.

The goal is not to build the most sophisticated architecture.

The goal is:

> **Build a reliable product that helps people become more comfortable speaking on camera.**
