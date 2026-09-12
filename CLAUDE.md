# Camera Confidence — Claude Code Instructions

## 1. Project Overview

Camera Confidence is a guided practice product designed to help people become more comfortable speaking on camera.

The core product loop is:

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

The product is intentionally designed to feel like a:

> **Supportive coach, not an AI judge.**

The goal is not to help users produce perfect videos.

The goal is to make it easier for them to practice repeatedly.

---

# 2. Current Product Version

The current development version is:

> **`v0.2.0 — Camera Prototype`**

The immediate product question is:

> **Does basic camera practice feel simple and low-pressure?**

Current scope:

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

Do not implement functionality belonging to later versions unless explicitly requested.

---

# 3. Source of Truth

Before making meaningful changes, consult the relevant documentation.

Documentation hierarchy:

```text
Product Principles
        ↓
Design Principles
        ↓
Design System
        ↓
Engineering Architecture
        ↓
Technical Stack
        ↓
Feature Specification
        ↓
Implementation
```

Relevant documentation lives under:

```text
docs/
├── product/
├── design/
├── engineering/
├── specs/
└── decisions/
```

---

# 4. Documentation Reading Rules

Before implementing a feature:

1. Read `CLAUDE.md`.
2. Identify the current product version.
3. Identify the relevant GitHub issue or task.
4. Read relevant product documentation.
5. Read relevant design documentation.
6. Read relevant engineering documentation.
7. Read the relevant feature specification.
8. Read relevant ADRs if the task touches an architectural decision.
9. Inspect the existing implementation.
10. Only then create the implementation plan.

Do not blindly read every document for every small task.

Read the documents relevant to the work.

---

# 5. Product Principles

The following principles are mandatory product constraints.

Prioritize:

- Practice over performance
- Coach, not judge
- Lower the barrier to pressing record
- Start small
- Progress through repetition
- One improvement at a time
- Actionable feedback over scores
- Encourage attempts, not perfection
- Privacy by default
- Personal progress over competition
- Simplicity before intelligence
- Technology follows the problem
- Validate before expanding
- Optimize for repetition
- Avoid overwhelming the user
- Build for emotional context
- Celebrate courage
- Avoid shame-based motivation
- Accessibility as part of the product
- Protect the core loop

If a proposed implementation conflicts with these principles, stop and reassess.

---

# 6. Current Technical Constraints

For `v0.2.0`, the application is intentionally browser-first.

Current architecture:

```text
Next.js
   ↓
React
   ↓
Browser Camera APIs
   ↓
MediaRecorder
   ↓
Local Blob
   ↓
Playback
```

Current technology:

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
└── Local browser data

Backend
└── None

Database
└── None

AI
└── None
```

---

# 7. Do Not Prematurely Introduce Future Architecture

For `v0.2.0`, do not introduce:

- NestJS
- PostgreSQL
- Prisma
- Redis
- BullMQ
- Object storage
- Authentication
- AI services
- Speech-to-text
- LLM feedback
- Persistent recording history
- Complex analytics
- Microservices
- Cloud video infrastructure

unless the user explicitly changes the scope.

Future architecture exists in the documentation to guide evolution, not to justify premature implementation.

---

# 8. Technology Philosophy

Prefer:

> **The simplest technology that reliably solves the current problem.**

Before adding a dependency, ask:

```text
Can the browser/platform already solve this?
        ↓
Can existing project code solve this?
        ↓
Can a small local abstraction solve this?
        ↓
Is a dependency genuinely necessary?
```

Do not add libraries because:

- They are popular.
- They look sophisticated.
- Another project uses them.
- We might need them later.
- They theoretically scale better.

---

# 9. Architecture Philosophy

Keep responsibilities clear.

For the current prototype:

```text
Presentation
     ↓
Practice Flow
     ↓
Camera / Recording
     ↓
Local Session State
```

Camera and recording logic should not become tightly coupled to unrelated UI components.

Prefer small, understandable abstractions.

Do not create an architecture framework around a feature that can be implemented with straightforward React code.

---

# 10. Camera Architecture

Use:

```text
navigator.mediaDevices.getUserMedia()
```

for camera/microphone access.

Use:

```text
MediaRecorder
```

for recording.

Expected flow:

```text
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

Handle:

- Camera permission
- Microphone permission
- Permission denial
- Permission blocking
- Camera unavailable
- Microphone unavailable
- MediaRecorder availability
- MIME type compatibility
- Recording failure
- Stream interruption
- Cleanup

---

# 11. Resource Cleanup

Camera and microphone resources must be released when they are no longer required.

Media tracks should be stopped appropriately.

Object URLs should be revoked when they are no longer needed.

Avoid:

- Active camera streams after leaving the experience
- Multiple active MediaRecorders
- Stale recording chunks
- Stale object URLs
- Recording state surviving an abandoned session

---

# 12. Recording State

Recording state should be explicit.

Typical states:

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

The UI must reflect the actual state.

Do not allow contradictory states such as:

```text
UI says "Recording"
while
MediaRecorder is stopped
```

---

# 13. Error Handling

Errors are expected states, not exceptional afterthoughts.

For important operations, consider:

```text
Loading
Success
Failure
Recovery
```

User-facing errors should explain:

1. What happened.
2. What the user can do.
3. How to recover.

Prefer:

> We couldn't start your camera.

over:

> `NotReadableError`

Technical errors may be logged for development purposes but should not be the primary user experience.

---

# 14. Design System Rules

All UI changes must follow:

```text
docs/design/design-system.md
docs/design/design-principles.md
docs/design/ux-guidelines.md
docs/design/accessibility.md
```

Prefer existing:

- Tokens
- Components
- Patterns
- Typography
- Spacing
- Colors
- Interaction states

Do not introduce arbitrary visual values when an existing design-system value is appropriate.

---

# 15. UX Rules

The interface should:

- Make the next action obvious.
- Minimize unnecessary decisions.
- Keep the core flow linear.
- Explain before requesting permissions.
- Make recording state obvious.
- Make stopping predictable.
- Make playback immediate.
- Make retry easy.
- Avoid unnecessary scores.
- Avoid judgmental language.
- Avoid shame-based feedback.
- Keep feedback limited and actionable.
- Preserve challenge context during retry.

The user should never wonder:

> “What am I supposed to do now?”

---

# 16. Accessibility Rules

Accessibility is part of implementation, not a later phase.

Pay attention to:

- Semantic HTML
- Button semantics
- Keyboard navigation
- Focus states
- Focus management
- Accessible names
- Screen-reader announcements
- Color contrast
- Do not use color alone to communicate state
- Reduced motion
- Touch targets
- Responsive layouts
- Error messaging

Recording state should be understandable without relying only on color or animation.

---

# 17. Scope Control

One of the most important rules:

> **Do not expand scope without explicit approval.**

When implementation reveals additional work, classify it:

```text
Required for current issue
        ↓
Implement

Useful but not required
        ↓
Create follow-up issue

Future version
        ↓
Document / backlog

Unclear value
        ↓
Do not build
```

Do not silently turn a small issue into a larger feature.

---

# 18. Existing Code First

Before creating a new component, hook, utility, or abstraction:

Search the repository.

Ask:

> Does this already exist?

Prefer:

```text
Reuse
  ↓
Extend
  ↓
Refactor
  ↓
Create new
```

Create a new abstraction only when there is a real need.

---

# 19. Avoid Premature Abstraction

Do not build abstractions for hypothetical requirements.

Bad:

```text
GenericCameraProvider
AbstractRecordingEngine
UniversalMediaService
ConfigurableRecordingPipeline
```

when the application only needs a straightforward browser recorder.

Prefer simple code until repeated complexity demonstrates the need for abstraction.

---

# 20. Dependency Rules

Before installing a package:

1. Search the existing repository.
2. Check existing dependencies.
3. Check whether native browser functionality is sufficient.
4. Consider bundle size.
5. Consider maintenance cost.
6. Consider whether the dependency fits the architecture.
7. Explain why it is necessary.

Do not install dependencies automatically during implementation.

---

# 21. File Organization

Follow the existing repository structure.

Keep:

- UI components focused
- Feature logic close to its feature
- Shared utilities genuinely shared
- Product-specific logic out of generic utilities

Do not reorganize the entire repository while implementing a feature unless explicitly requested.

---

# 22. `/plan`

When `/plan` is requested, do not immediately write code.

First:

```text
Read Context
    ↓
Identify Version
    ↓
Read Relevant Docs
    ↓
Inspect Existing Code
    ↓
Understand Issue
    ↓
Identify Constraints
    ↓
Create Plan
```

The plan should contain:

```text
## Objective

## Context

## Relevant Documentation

## Current State

## Proposed Changes

## Files to Change

## Implementation Steps

## Edge Cases

## Testing Strategy

## Out of Scope

## Definition of Done
```

---

# 23. `/plan` Token Efficiency

Plans should be useful without becoming unnecessarily verbose.

Prefer:

- Relevant information only
- Existing code references
- Specific files
- Concrete implementation steps
- Clear assumptions

Avoid:

- Repeating the entire documentation
- Explaining obvious programming concepts
- Speculating about unrelated future architecture
- Generating huge theoretical designs

The goal is:

> **Maximum implementation clarity with minimum unnecessary context.**

---

# 24. `/plan` Scope Protection

Every plan must explicitly identify:

```text
Current Version
Current Issue
In Scope
Out of Scope
```

If the requested implementation conflicts with the current version, call it out.

Do not quietly implement future-version functionality.

---

# 25. `/status`

When `/status` is requested, provide a concise project snapshot.

Use:

```text
## Current Version

## Current Goal

## Completed

## In Progress

## Blocked

## Next

## Relevant Issues
```

The purpose is to answer:

> **Where are we and what should we work on next?**

Do not turn `/status` into a long project report unless specifically requested.

---

# 26. Verification

Never claim an implementation is complete without verification.

After making changes:

1. Inspect changed files.
2. Run appropriate type checks.
3. Run linting.
4. Run relevant tests.
5. Verify the actual user flow.
6. Check for obvious regressions.
7. Review the final diff.

For camera functionality, perform real browser testing where appropriate.

---

# 27. Testing Priorities

Testing should prioritize user-critical behavior.

For the camera prototype:

```text
Camera Permission
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
Retry
      ↓
Cleanup
```

Also test failure paths.

---

# 28. Camera Manual Testing

Camera functionality must not be considered fully tested through unit tests alone.

Verify in a real browser:

- Camera permission granted
- Camera permission denied
- Microphone permission denied
- Camera unavailable
- Preview appears
- Countdown works
- Recording starts
- Recording timer works
- Recording stops
- Playback works
- Retry works
- Camera is released
- Microphone is released

---

# 29. Git Workflow

Use focused branches.

Examples:

```text
feat/camera-preview
feat/recording-controls
fix/camera-cleanup
docs/camera-spec
```

Avoid unrelated work in the same branch.

---

# 30. Commit Rules

Commits should represent logical changes.

Preferred examples:

```text
feat: add camera preview
feat: add recording controls
fix: release camera stream on unmount
fix: handle denied camera permission
test: add recording state coverage
docs: update camera specification
```

Avoid vague commits such as:

```text
update
changes
fix
stuff
final
```

---

# 31. Pull Request Rules

A meaningful PR should communicate:

```text
What changed?
Why?
How was it tested?
What remains?
```

Keep PRs focused and reviewable.

Do not include unrelated refactors unless they are necessary for the feature.

---

# 32. Documentation Updates

Update documentation when implementation changes an established decision.

Examples:

```text
Product behavior
→ docs/product/

Design behavior
→ docs/design/

Architecture
→ docs/engineering/architecture.md

Technology
→ docs/engineering/tech-stack.md

Feature behavior
→ docs/specs/

Architectural decision
→ docs/decisions/
```

Do not modify documentation simply to make it agree with incorrect implementation.

If implementation conflicts with documentation, determine whether:

1. The implementation is wrong.
2. The documentation is outdated.
3. The scope has intentionally changed.

---

# 33. ADR Rules

Use an ADR for significant technical decisions.

Examples:

- Choosing a recording technology
- Choosing a database
- Choosing object storage
- Major architecture changes
- Significant infrastructure decisions

Do not create an ADR for every small implementation detail.

---

# 34. Agents

Specialized agents should focus on their assigned responsibility.

Examples:

```text
frontend-reviewer
architecture-reviewer
accessibility-reviewer
```

Agents should:

- Read relevant project documentation.
- Inspect the actual implementation.
- Identify concrete problems.
- Explain why they matter.
- Suggest focused improvements.

Agents must not independently expand product scope.

---

# 35. Review Philosophy

Reviews should prioritize:

1. Correctness
2. Product alignment
3. User experience
4. Accessibility
5. Reliability
6. Maintainability
7. Performance
8. Code style

Do not spend disproportionate effort on stylistic preferences when the implementation is already clear and correct.

---

# 36. Security

Never expose:

- API keys
- Secrets
- Credentials
- Private tokens

Do not commit secret values.

Camera and microphone data should not be transmitted anywhere unless the feature explicitly requires it.

---

# 37. Privacy

Camera Confidence deals with potentially sensitive media.

For the prototype:

```text
Camera
 ↓
Browser
 ↓
Local Recording
 ↓
Local Playback
```

Do not introduce external transmission without an explicit product requirement.

Future persistent recordings must support private storage and controlled access.

---

# 38. Performance

Optimize based on actual problems.

Do not prematurely introduce:

- Redis
- Queues
- Workers
- Complex caching
- Microservices
- Advanced state management
- Complex video processing

The current priority is:

> **Reliable camera interaction.**

---

# 39. Product Feedback

Camera Confidence is an evolving product.

If implementation reveals that a product assumption is questionable, do not hide that information inside code.

Surface it clearly.

Examples:

```text
UX friction discovered
→ Mention in review

Product assumption questionable
→ Recommend validation

Architecture limitation discovered
→ Document / create ADR if significant

Future opportunity discovered
→ Create follow-up issue
```

Code should not become the place where unresolved product decisions live.

---

# 40. Decision-Making Framework

When uncertain, ask:

### Product

Does this solve the user's problem?

### Current Version

Is this required now?

### UX

Does this reduce friction or increase it?

### Design

Does this follow the design system?

### Engineering

Can the existing architecture handle it?

### Complexity

Is this the simplest reasonable solution?

### Validation

What are we trying to learn?

### Scope

Can this wait?

If a simpler solution works, choose the simpler solution.

---

# 41. What Claude Must Not Do

Claude must not:

- Invent requirements.
- Invent APIs.
- Invent product behavior.
- Expand scope without approval.
- Introduce future architecture prematurely.
- Add dependencies without justification.
- Rewrite unrelated files.
- Replace existing patterns without reason.
- Ignore the design system.
- Ignore accessibility.
- Claim tests passed without running them.
- Claim functionality works without verification.
- Hide uncertainty.
- Treat assumptions as requirements.

---

# 42. When Claude Should Ask

Claude should ask for clarification when:

- Requirements conflict.
- Documentation contains a genuine ambiguity.
- The implementation requires a product decision.
- The requested change would significantly alter scope.
- A destructive action is required.
- There are multiple materially different architectural options.
- The correct behavior cannot reasonably be inferred.

Claude may make reasonable low-risk implementation decisions without asking when the decision:

- Is local
- Is reversible
- Fits documented patterns
- Does not affect product behavior
- Does not expand scope

---

# 43. When Claude Should Proceed

Claude should proceed without unnecessary clarification when:

- Requirements are clear.
- The architecture already defines the solution.
- Existing patterns provide the answer.
- The change is local and reversible.
- The issue contains sufficient acceptance criteria.

Do not ask questions merely to avoid making normal engineering decisions.

---

# 44. Current v0.2.0 Priorities

In the current version, prioritize:

```text
1. Reliable camera access
2. Clear camera preview
3. Calm preparation experience
4. Countdown
5. Reliable recording
6. Clear recording state
7. Playback
8. Easy retry
9. Error recovery
10. Resource cleanup
11. Accessibility
12. Responsive behavior
```

Do not prioritize future AI, persistence, or infrastructure.

---

# 45. Core Product Loop

Every meaningful feature should support:

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

If a feature does not support this loop, its value should be questioned.

---

# 46. Engineering North Star

The engineering system should make it easy to:

```text
Understand
   ↓
Plan
   ↓
Implement
   ↓
Verify
   ↓
Review
   ↓
Ship
```

without unnecessary process.

---

# 47. Final Rule

When there is a choice between:

```text
Simple + sufficient
```

and:

```text
Complex + theoretically scalable
```

choose:

> **Simple + sufficient**

unless a real requirement proves otherwise.

The objective is not to build the most impressive technical system.

The objective is to build Camera Confidence.

> **Make it easier to try than to avoid.**
