# Camera Confidence

> Practice speaking. Build confidence. One recording at a time.

## What It Is

Camera Confidence is a guided practice product that helps people become more comfortable speaking on camera. It is built as a **supportive coach, not an AI judge** — the goal isn't to help users produce a perfect video, it's to make it easier for them to practice repeatedly.

The core product loop:

```text
Practice → Record → Reflect → Try Again → Improve
```

## Current Status

**`v0.2.0` — Camera Prototype**

This version proves out the basic camera practice experience end to end, entirely in the browser:

```text
Home → Challenge → Start Practice → Camera Permission → Camera Preview
     → Countdown → Recording → Stop → Playback → Reflection → Try Again
```

The question this version is trying to answer:

> **Does basic camera practice feel simple and low-pressure?**

There is intentionally no backend, database, authentication, persistence, or AI in this version. See [Roadmap](docs/product/roadmap.md) for what's excluded and why.

## How to Run Locally

Requirements: Node.js and [pnpm](https://pnpm.io) (this repo uses `pnpm@10.15.0`, managed via the `packageManager` field).

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Type-check
pnpm typecheck

# Lint
pnpm lint

# Production build
pnpm build
```

The app runs at `http://localhost:3000` by default. Camera and microphone access require a secure context — `localhost` works out of the box; testing over the network requires HTTPS.

## How to Use

1. Open the **Home** screen and pick a practice challenge.
2. Start practice and grant camera/microphone permission when prompted.
3. Use the **camera preview** to get comfortable before recording.
4. A **countdown** gives you a moment to prepare, then recording starts.
5. **Stop** the recording whenever you're ready.
6. **Play back** your recording locally — nothing leaves your browser.
7. **Try again** as many times as you like. Repetition is the point, not perfection.

Recordings stay local to your browser session (in-memory `Blob`/object URLs) and are not uploaded anywhere.

## Tech Stack

```text
Frontend    Next.js, React, TypeScript
Styling     Tailwind CSS
Camera      MediaDevices API (getUserMedia)
Recording   MediaRecorder API
State       React state
Storage     Local browser data only
Backend     None
Database    None
AI          None
```

See [Tech Stack](docs/engineering/tech-stack.md) and [Architecture](docs/engineering/architecture.md) for the full rationale.

## Current Version

| Version  | Name             | Status         |
| -------- | ---------------- | -------------- |
| `v0.1.0` | Concept          | Complete       |
| `v0.2.0` | Camera Prototype | **Current**    |

## Roadmap

Camera Confidence evolves incrementally — each version tests a specific hypothesis before expanding scope.

| Version  | Name              | Primary Goal                                |
| -------- | ----------------- | -------------------------------------------- |
| `v0.1.0` | Concept           | Define the problem and product direction     |
| `v0.2.0` | Camera Prototype  | Prove the basic recording experience         |
| `v0.3.0` | Practice Loop     | Prove repeated practice is engaging          |
| `v0.4.0` | AI Feedback       | Prove feedback can improve practice          |
| `v0.5.0` | Persistence       | Enable users to maintain a practice history  |
| `v0.6.0` | Early Beta        | Validate the product with real users         |
| `v0.7.0` | Better Coaching   | Improve coaching quality                     |
| `v0.8.0` | Adaptive Practice | Personalize challenges                       |
| `v0.9.0` | Public Beta       | Prepare for broader usage                    |
| `v1.0.0` | Product           | Establish a reliable, validated product      |

Full detail, including exit criteria and what's explicitly out of scope for each version, lives in [Roadmap](docs/product/roadmap.md).

## Project Structure

```text
apps/
  web/
    app/            # Next.js app router pages (home, practice flow)
    components/     # challenge, practice, and shared UI components
    hooks/          # useMediaStream, useMediaRecorder
```

## Documentation

### Product
- [Vision](docs/product/vision.md)
- [Problem](docs/product/problem.md)
- [User Experience](docs/product/user-experience.md)
- [Product Principles](docs/product/product-principles.md)
- [Roadmap](docs/product/roadmap.md)

### Design
- [Design Principles](docs/design/design-principles.md)
- [Design System](docs/design/design-system.md)

### Engineering
- [Architecture](docs/engineering/architecture.md)
- [Tech Stack](docs/engineering/tech-stack.md)
- [Development Workflow](docs/engineering/development-workflow.md)

### Specifications
- [Camera Recording](docs/specs/camera/camera-recording.md)

### Decisions
- [ADR-001: MediaRecorder](docs/decisions/ADR-001-media-recorder.md)
