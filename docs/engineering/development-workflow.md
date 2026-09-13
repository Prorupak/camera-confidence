# Camera Confidence — Development Workflow

## 1. Purpose

This document defines how Camera Confidence is developed, reviewed, tested, and released.

The workflow exists to keep development:

- Focused
- Predictable
- Small
- Reviewable
- Version-aware
- Consistent with product decisions

The goal is not to create bureaucracy.

The goal is to make sure every piece of code moves the product forward.

---

# 2. Development Philosophy

Camera Confidence follows:

> **Understand → Plan → Implement → Review → Test → Ship → Learn**

We should avoid:

```text
Idea
 ↓
Immediately code
 ↓
Keep adding things
 ↓
Discover scope later
```

Instead:

```text
Problem
 ↓
Product decision
 ↓
Issue
 ↓
Plan
 ↓
Implementation
 ↓
Review
 ↓
Test
 ↓
Ship
 ↓
Learn
```

---

# 3. Source of Truth Hierarchy

When making implementation decisions, use the following hierarchy:

```text
Product Principles
        ↓
Design Principles
        ↓
Design System
        ↓
Architecture
        ↓
Tech Stack
        ↓
Feature Specification
        ↓
Implementation
```

Higher-level decisions should guide lower-level implementation.

Code should not silently override documented product decisions.

If implementation reveals that a documented decision no longer works, update the appropriate documentation rather than creating an undocumented exception.

---

# 4. Work Should Start From an Issue

Every meaningful piece of work should begin with a GitHub issue.

An issue should describe:

- What needs to be done
- Why it matters
- Scope
- Acceptance criteria
- Relevant version
- Relevant documentation

Example:

```text
[v0.2.0] Implement Camera Preview
```

The issue should answer:

> What are we building and how do we know it is complete?

---

# 5. Issue Scope

Issues should be small enough to understand and complete independently.

Prefer:

```text
Implement camera permission state
Implement camera preview
Implement recording countdown
Implement recording controls
Implement playback
```

over:

```text
Build entire camera experience
```

Large work can be represented by an epic/milestone with smaller issues underneath it.

---

# 6. Version Alignment

Every feature should belong to a product version.

Example:

```text
v0.2.0 — Camera Prototype

├── Camera permission
├── Camera preview
├── Countdown
├── Recording
├── Stop recording
├── Playback
└── Retry
```

Do not implement functionality belonging to a later version unless explicitly decided.

For example, while working on `v0.2.0`, do not silently introduce:

- Authentication
- Persistent recordings
- PostgreSQL
- AI feedback
- User profiles
- Progress history

unless the scope is intentionally changed.

---

# 7. Before Coding

Before implementation, answer:

### Product

- What user problem does this solve?
- Which part of the core loop does it support?

### Scope

- What exactly are we building?
- What are we explicitly not building?

### UX

- What should the user experience?
- What happens on success?
- What happens on failure?

### Engineering

- Which existing components can be reused?
- What architecture layer owns this?
- Are new dependencies actually required?

### Validation

- How will we know it works?

If these questions cannot be answered, the issue may not be ready for implementation.

---

# 8. Planning

Complex or multi-step work should be planned before implementation.

The plan should contain:

```text
1. Context
2. Objective
3. Existing architecture
4. Files likely to change
5. Implementation steps
6. Edge cases
7. Testing strategy
8. Acceptance criteria
9. Out of scope
```

The plan should be proportional to the task.

A small UI change does not require a massive architectural plan.

---

# 9. Claude Code Planning

Claude Code should be used as an implementation partner, not as the product decision-maker.

Before making changes, Claude should read the relevant project documentation.

At minimum:

```text
CLAUDE.md
↓
Relevant Product Docs
↓
Relevant Design Docs
↓
Relevant Engineering Docs
↓
Feature Specification
↓
GitHub Issue
```

Claude should determine:

- Current product version
- Relevant constraints
- Existing architecture
- Existing components
- Required files
- Out-of-scope functionality

before writing code.

---

# 10. Planning Rule

Claude should prefer modifying existing code over creating unnecessary abstractions.

Before introducing:

- New library
- New abstraction
- New service
- New state-management system
- New architectural layer

ask:

> **Does the current architecture already solve this problem?**

If yes, use it.

---

# 11. Implementation

Implementation should happen in small logical steps.

Preferred pattern:

```text
Plan
 ↓
Small implementation
 ↓
Run checks
 ↓
Inspect result
 ↓
Continue
```

Avoid making hundreds of unrelated changes before validating anything.

---

# 12. Keep Changes Focused

A pull request should ideally represent one logical change.

Avoid combining:

```text
Feature
+
Refactor
+
Dependency upgrade
+
Design redesign
+
Unrelated bug fixes
```

unless there is a clear reason.

Focused changes are easier to:

- Review
- Test
- Debug
- Revert
- Understand

---

# 13. Reuse Before Abstraction

Before creating a new component or utility, search the codebase.

Ask:

```text
Does this already exist?
```

If something similar exists:

1. Reuse it if appropriate.
2. Extend it if necessary.
3. Refactor it if the abstraction is genuinely shared.
4. Create a new abstraction only when justified.

Do not create abstractions for hypothetical future requirements.

---

# 14. UI Implementation Rules

UI implementation must follow:

```text
Design System
      ↓
Existing Components
      ↓
Feature-specific Components
```

Do not introduce arbitrary:

- Colors
- Spacing
- Typography
- Border radii
- Shadows
- Animations

when an existing design-system token or component already represents the intended behavior.

---

# 15. Camera Feature Rules

Camera-related implementation requires special care.

Before considering camera functionality complete, verify:

- Permission request
- Permission denied
- Permission blocked
- Camera unavailable
- Microphone unavailable
- Camera preview
- Recording state
- Countdown
- Stop recording
- Playback
- Retry
- Stream cleanup

The UI must always communicate the current camera/recording state clearly.

---

# 16. Error Handling

Errors are part of the feature.

Every important operation should consider:

```text
Success
Loading
Failure
Recovery
```

For example:

```text
Request Camera
      ↓
   Loading
      ↓
 ┌────┴────┐
 ▼         ▼
Success   Failure
 │         │
 ▼         ▼
Preview   Recovery
```

Do not treat error handling as a final polish step.

---

# 17. Testing Strategy

Testing should happen continuously during implementation.

### Level 1 — Type Checking

Verify TypeScript correctness.

### Level 2 — Linting

Verify code quality and project rules.

### Level 3 — Unit / Component Tests

Use when logic is sufficiently meaningful to justify them.

### Level 4 — End-to-End Tests

Use for important user flows where automated browser testing provides meaningful confidence.

### Level 5 — Manual Testing

Especially important for camera functionality.

---

# 18. Manual Camera Testing

Camera features should be tested in a real browser.

Minimum scenarios:

```text
✓ Camera permission granted
✓ Camera permission denied
✓ Microphone permission denied
✓ Camera unavailable
✓ Preview appears
✓ Countdown works
✓ Recording starts
✓ Recording timer works
✓ Recording stops
✓ Playback works
✓ Retry works
✓ Camera is released after leaving
```

Browser-specific behavior should not be assumed from unit tests alone.

---

# 19. Definition of Done

An issue is not complete merely because the code compiles.

A feature is done when:

- Implementation matches the issue scope.
- UX matches the relevant documentation.
- Design follows the design system.
- Accessibility requirements are considered.
- Error states are handled.
- Relevant tests pass.
- Manual testing is complete where required.
- No unnecessary scope was introduced.
- Documentation is updated when behavior or architecture changes.

---

# 20. Code Review

Every meaningful change should receive a review.

The reviewer should check:

### Product

- Does this solve the intended problem?
- Does it support the current version?

### UX

- Is the flow clear?
- Does it reduce unnecessary friction?
- Does it create unnecessary pressure?

### Design

- Does it follow the design system?
- Are states represented correctly?

### Engineering

- Is the implementation simple?
- Is existing code reused appropriately?
- Are abstractions justified?
- Are there unnecessary dependencies?

### Reliability

- Are errors handled?
- Are resources cleaned up?
- Are edge cases considered?

### Accessibility

- Keyboard navigation
- Focus
- Semantic elements
- Labels
- Screen-reader behavior
- Contrast
- Reduced motion where relevant

---

# 21. Frontend Review

Frontend changes should receive a dedicated frontend review when appropriate.

The reviewer should evaluate:

```text
Component structure
State management
Rendering behavior
Responsiveness
Accessibility
Design-system usage
Performance
Error states
Loading states
```

The review should focus on meaningful problems rather than stylistic nitpicking.

---

# 22. Commit Strategy

Commits should represent logical changes.

Prefer:

```text
feat: add camera preview
feat: add recording controls
fix: release camera stream on unmount
test: add recording state coverage
docs: update camera architecture
```

Avoid:

```text
update
changes
fix stuff
final
final-final
```

Commit messages should make project history understandable.

---

# 23. Branch Strategy

Feature work should use dedicated branches.

Example:

```text
main
 │
 ├── feat/camera-preview
 ├── feat/recording-controls
 ├── fix/camera-cleanup
 └── docs/architecture
```

Do not develop unrelated features directly on `main`.

---

# 24. Pull Requests

A pull request should explain:

```text
What changed?
Why?
How was it tested?
What remains?
```

Example structure:

```text
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

---

# 25. PR Size

Prefer small PRs.

A small PR is easier to:

- Review
- Test
- Merge
- Revert
- Debug

If a feature becomes too large, split it into logical changes.

---

# 26. Documentation Updates

Documentation should change when the underlying decision changes.

Examples:

### Product change

Update:

```text
docs/product/
```

### Design change

Update:

```text
docs/design/
```

### Architecture change

Update:

```text
docs/engineering/architecture.md
```

### Technology change

Update:

```text
docs/engineering/tech-stack.md
```

### Significant technical decision

Create/update an ADR.

---

# 27. Architecture Decision Records

Significant architectural decisions should be documented.

Example:

```text
docs/decisions/
└── ADR-001-media-recorder.md
```

An ADR should explain:

```text
Context
Decision
Alternatives
Reasoning
Consequences
```

This prevents important decisions from existing only inside chat conversations.

---

# 28. When to Create an ADR

Create an ADR when a decision:

- Changes architecture
- Introduces an important technology
- Has meaningful long-term consequences
- Is difficult to reverse
- Could reasonably be questioned later

Do not create ADRs for every small implementation detail.

---

# 29. Dependency Changes

Before adding a dependency:

1. Check whether the browser/platform already provides the capability.
2. Check whether an existing project dependency can solve it.
3. Evaluate maintenance cost.
4. Evaluate bundle/runtime impact.
5. Confirm it fits the current architecture.

Then add it only if justified.

---

# 30. Scope Control

If implementation reveals a new idea, do not automatically build it.

Classify it:

```text
Required for current issue
        ↓
Implement

Useful but not required
        ↓
Create follow-up issue

Future version
        ↓
Add to roadmap/backlog

Unclear value
        ↓
Do not build yet
```

This is especially important for Camera Confidence because the product is still being validated.

---

# 31. Product vs Technical Decisions

Not every technical possibility should become a product feature.

For example:

```text
"Can we analyze eye contact?"
```

does not automatically mean:

```text
"We should build eye-contact analysis."
```

First ask:

> Does this help users become more comfortable speaking on camera?

The product problem remains the deciding factor.

---

# 32. AI Development Rule

AI should not be introduced into a feature simply because an LLM can perform the task.

Before adding AI, identify:

- User problem
- Expected improvement
- Required input
- Expected output
- Evaluation method
- Cost
- Privacy implications
- Failure behavior

AI must improve the practice loop rather than distract from it.

---

# 33. Performance Rule

Optimize based on observed problems.

Do not prematurely introduce:

- Caching layers
- Queues
- Workers
- Complex state management
- CDN strategies
- Microservices
- Database optimization

before they are necessary.

The current prototype should prioritize reliable camera interaction over theoretical scalability.

---

# 34. Security and Privacy Review

Features involving:

- Camera
- Microphone
- Video
- Audio
- User accounts
- Recordings
- AI analysis

should consider privacy and security before implementation.

For persistent recordings, verify:

```text
Private storage
Access control
Secure upload
Secure playback
Deletion
Minimal data collection
```

---

# 35. Release Workflow

A version should move through:

```text
Planned
   ↓
In Progress
   ↓
Implemented
   ↓
Reviewed
   ↓
Tested
   ↓
Validated
   ↓
Released
```

A version should not be considered complete merely because all GitHub issues are closed.

The product question for that version should also have been investigated.

---

# 36. Version Completion

A version is complete when:

- Intended scope is implemented.
- Important acceptance criteria pass.
- Relevant UX is tested.
- Relevant technical behavior is tested.
- Documentation is up to date.
- The intended product question has been investigated.
- Learnings are documented.
- The next step is clear.

This follows the project's roadmap philosophy that versions are checkpoints for learning, not merely feature bundles.

---

# 37. v0.2.0 Workflow

For the current Camera Prototype:

```text
GitHub Issue
     ↓
Read Relevant Docs
     ↓
/plan
     ↓
Implementation
     ↓
Run Checks
     ↓
Frontend Review
     ↓
Manual Camera Testing
     ↓
Fix Issues
     ↓
Commit
     ↓
PR
     ↓
Merge
```

The primary goal is validating:

> **Does basic camera practice feel simple and low-pressure?**

---

# 38. Claude Code Workflow

Claude Code should follow this sequence:

```text
Understand
    ↓
Inspect
    ↓
Plan
    ↓
Implement
    ↓
Verify
    ↓
Review
```

Claude should not:

- Invent product requirements
- Expand scope without approval
- Introduce future architecture unnecessarily
- Ignore existing documentation
- Rewrite unrelated files
- Add dependencies without justification
- Declare work complete without verification

---

# 39. `/plan` Expectations

The project's `/plan` workflow should produce:

```text
## Objective

What are we trying to accomplish?

## Context

Why does this matter?

## Relevant Docs

Which project documents apply?

## Current State

What already exists?

## Proposed Changes

What needs to change?

## Files

Which files are expected to change?

## Implementation Steps

What should happen in order?

## Edge Cases

What could go wrong?

## Verification

How will we test it?

## Out of Scope

What should not be built?

## Definition of Done

What proves completion?
```

Plans should be concise enough to be useful and detailed enough to prevent unnecessary implementation.

---

# 40. `/status` Expectations

The `/status` workflow should provide a concise project snapshot.

At minimum:

```text
Current Version
Current Goal
Completed
In Progress
Blocked
Next
Relevant Issues
```

The purpose is to quickly answer:

> **Where are we and what should we do next?**

---

# 41. Agent Workflow

Specialized agents should review specific concerns rather than independently redesign the project.

Examples:

```text
frontend-reviewer
architecture-reviewer
accessibility-reviewer
```

An agent should:

- Read relevant documentation.
- Inspect the implementation.
- Identify concrete issues.
- Explain why they matter.
- Suggest focused improvements.

Agents should not expand product scope.

---

# 42. Final Development Principle

The development workflow exists to protect the product from unnecessary complexity.

The rule is:

> **Small issue → Clear plan → Focused implementation → Verified result.**

And above everything:

> **Protect the core loop.**

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

Every technical decision should ultimately help make that loop easier, clearer, safer, or more useful.
