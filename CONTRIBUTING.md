# Contributing to Camera Confidence

Thanks for helping build Camera Confidence. This guide covers the practical steps for setting up, working on, and submitting changes. For the philosophy behind these rules, see [`CLAUDE.md`](./CLAUDE.md) and [`docs/engineering/development-workflow.md`](./docs/engineering/development-workflow.md).

## Table of Contents

- [Project Status](#project-status)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Before You Start Coding](#before-you-start-coding)
- [Branching](#branching)
- [Commit Messages](#commit-messages)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Manual Camera Testing](#manual-camera-testing)
- [Pull Requests](#pull-requests)
- [Documentation](#documentation)
- [Scope Control](#scope-control)
- [Dependencies](#dependencies)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [Security & Privacy](#security--privacy)
- [Using Claude Code](#using-claude-code)

## Project Status

Current version: **`v0.2.0` — Camera Prototype**

This version validates one question:

> Does basic camera practice feel simple and low-pressure?

The scope is intentionally limited to browser-only camera practice (`Home → Challenge → Start Practice → Camera Permission → Camera Preview → Countdown → Recording → Stop → Playback → Reflection → Try Again`). No backend, database, authentication, persistence, or AI belongs in this version. See [`docs/product/roadmap.md`](./docs/product/roadmap.md) for what's out of scope and why.

## Getting Started

Requirements: Node.js and [pnpm](https://pnpm.io) (`pnpm@10.15.0`, pinned via the `packageManager` field).

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev          # http://localhost:3000

# Type-check
pnpm typecheck

# Lint
pnpm lint

# Production build
pnpm build
```

Camera and microphone access require a secure context. `localhost` works out of the box; testing over a network requires HTTPS.

## Project Structure

```text
apps/
└── web/            # Next.js app (App Router, TypeScript, Tailwind)
docs/
├── product/        # Product principles, roadmap, vision
├── design/          # Design principles, design system, UX & accessibility guidelines
├── engineering/     # Architecture, tech stack, development workflow
├── specs/           # Feature specifications (e.g. docs/specs/camera)
└── decisions/       # Architecture Decision Records (ADRs)
```

When in doubt about a decision, follow the documentation hierarchy:

```text
Product Principles → Design Principles → Design System
  → Engineering Architecture → Tech Stack → Feature Spec → Implementation
```

## Before You Start Coding

Every meaningful change should start from a GitHub issue that answers:

- What is being built, and why?
- Which part of the core loop (`Practice → Record → Reflect → Try Again → Improve`) does it support?
- What's explicitly out of scope?
- Which product version does this belong to?
- How will we know it's done?

For anything non-trivial, read the relevant docs first (product → design → engineering → spec) and inspect the existing implementation before writing a plan. Use `/plan` if you're working with Claude Code — see [Using Claude Code](#using-claude-code).

## Branching

Use focused, descriptive branch names tied to one change:

```text
feat/camera-preview
feat/recording-controls
fix/camera-cleanup
docs/camera-spec
```

Don't mix unrelated work into a single branch.

## Commit Messages

Write commits that describe a logical change, using a conventional prefix:

```text
feat: add camera preview
fix: release camera stream on unmount
test: add recording state coverage
docs: update camera specification
```

Avoid vague messages like `update`, `changes`, `fix stuff`, `final`.

## Making Changes

1. **Reuse before creating.** Search the codebase for an existing component, hook, or utility before adding a new one. Prefer: reuse → extend → refactor → create new.
2. **Avoid premature abstraction.** Don't build generic frameworks (`AbstractRecordingEngine`, `ConfigurableRecordingPipeline`) for a problem that a straightforward React component or hook already solves.
3. **Follow existing architecture layering:**

   ```text
   Presentation → Practice Flow → Camera / Recording → Local Session State
   ```

4. **Keep camera/recording logic decoupled** from unrelated UI components.
5. **Handle errors as first-class states**, not afterthoughts — consider loading, success, failure, and recovery for every meaningful operation. Show user-facing messages ("We couldn't start your camera.") rather than raw technical errors.
6. **Clean up media resources.** Stop media tracks and revoke object URLs when they're no longer needed. Don't leave active streams, stale recorders, or stale blobs behind when a user leaves the flow.
7. **Make recording state explicit and consistent** (`idle`, `permission`, `ready`, `countdown`, `recording`, `stopping`, `playback`, `completed`, `error`) — the UI must never contradict the actual `MediaRecorder` state.

## Testing

Apply the level of testing proportional to the change:

1. **Type checking** — `pnpm typecheck`
2. **Linting** — `pnpm lint`
3. **Unit / component tests** — where logic is meaningful enough to justify them
4. **End-to-end tests** — for important user flows
5. **Manual testing** — required for camera functionality (see below)

Run checks after every meaningful implementation step, not just before opening a PR.

## Manual Camera Testing

Camera features are not considered tested through unit tests alone. Before calling camera work done, verify in a real browser:

- [ ] Camera permission granted
- [ ] Camera permission denied
- [ ] Microphone permission denied
- [ ] Camera unavailable
- [ ] Preview appears
- [ ] Countdown works
- [ ] Recording starts
- [ ] Recording timer works
- [ ] Recording stops
- [ ] Playback works
- [ ] Retry works
- [ ] Camera is released after leaving the flow
- [ ] Microphone is released after leaving the flow

## Pull Requests

Keep PRs small and focused on one logical change. A good PR description answers:

```text
What changed?
Why?
How was it tested?
What remains?
```

Example:

```markdown
## Summary
Implemented camera preview for the practice flow.

## Changes
- Added camera permission handling
- Added MediaStream management
- Added preview component
- Added error states

## Testing
- Chrome: tested
- Permission denied: tested
- Camera cleanup: tested

## Notes
No backend or persistence introduced.
```

Don't bundle unrelated refactors, dependency upgrades, or redesigns into a feature PR unless necessary for the change itself.

## Documentation

Update documentation when a change alters an established decision:

| Change type            | Update                                |
|-------------------------|----------------------------------------|
| Product behavior        | `docs/product/`                        |
| Design behavior         | `docs/design/`                         |
| Architecture            | `docs/engineering/architecture.md`     |
| Technology choice       | `docs/engineering/tech-stack.md`       |
| Feature behavior        | `docs/specs/`                          |
| Significant tech decision | `docs/decisions/` (new ADR)          |

Don't edit documentation just to make it agree with an implementation that's actually wrong — decide whether the code, the docs, or the intended scope needs to change first.

## Scope Control

If implementation reveals extra work, classify it before acting on it:

```text
Required for current issue   → implement
Useful but not required      → open a follow-up issue
Belongs to a future version  → add to the roadmap/backlog
Unclear value                → don't build it
```

Never silently expand a small issue into a larger feature.

## Dependencies

Before adding a package, work through:

1. Can the browser/platform already do this?
2. Can existing project code do this?
3. Can a small local abstraction do this?
4. Is a dependency genuinely necessary?

Don't add a library because it's popular, looks sophisticated, or "might be needed later." For `v0.2.0`, this also means not introducing future-version infrastructure (NestJS, PostgreSQL, Prisma, Redis, object storage, auth, AI services, etc.) — see [`CLAUDE.md`](./CLAUDE.md#7-do-not-prematurely-introduce-future-architecture) for the full list.

## Design System

All UI changes should follow the existing tokens, components, and patterns defined in:

- [`docs/design/design-system.md`](./docs/design/design-system.md)
- [`docs/design/design-principles.md`](./docs/design/design-principles.md)
- [`docs/design/ux-guidelines.md`](./docs/design/ux-guidelines.md)

Don't introduce arbitrary colors, spacing, or typography when a design-system value already fits.

## Accessibility

Accessibility is part of implementation, not a follow-up task. Pay attention to semantic HTML, keyboard navigation, focus management, accessible names, screen-reader announcements, color contrast, reduced motion, and touch targets. Recording state must be understandable without relying only on color or animation. See [`docs/design/accessibility.md`](./docs/design/accessibility.md).

## Security & Privacy

- Never commit secrets, API keys, credentials, or tokens.
- Camera and microphone data stays local (`Camera → Browser → Local Recording → Local Playback`) — don't introduce external transmission without an explicit, approved product requirement.

## Using Claude Code

This repo includes a [`CLAUDE.md`](./CLAUDE.md) that governs how Claude Code should work in this project: which docs to read, product/architecture constraints for the current version, and rules around scope, dependencies, and verification. If you're using Claude Code:

- Use `/plan` before implementing anything non-trivial.
- Use `/status` to get a project snapshot.
- Let Claude read relevant docs before writing code — don't skip straight to implementation.
- Hold Claude to the same scope-control and verification rules as a human contributor: no premature architecture, no unverified claims of "done."
