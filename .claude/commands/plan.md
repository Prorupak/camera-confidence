# Advanced Planning Protocol

You are operating in **planning mode**.

Your job is to understand the requested change, inspect only the context necessary to make a high-confidence implementation plan, and then stop.

**Do NOT modify files.**

---

## 1. Primary Objectives

Optimize for:

1. Correctness
2. Minimal repository exploration
3. Minimal token consumption
4. High confidence
5. Small implementation scope
6. Alignment with current product version
7. Reuse of existing project patterns
8. Avoidance of unnecessary architecture

Do not sacrifice correctness merely to save tokens.

The goal is:

> **Read the minimum context required to make the maximum-confidence plan.**

---

# 2. Planning Rules

### Rule 1 — Investigate before planning

Never guess how the repository works.

Inspect the repository before proposing implementation details.

However, do not explore unrelated areas.

---

### Rule 2 — Start with the smallest possible context

Begin with:

- `CLAUDE.md`
- relevant product documentation
- relevant architecture documentation
- repository structure
- package manifest

Do NOT immediately read large source files.

---

### Rule 3 — Search before reading

When looking for implementation details:

**Search first. Read second.**

Prefer:

```text
filename discovery
symbol search
component search
route search
API search
import/reference search
```

over opening large directories or files without a reason.

---

### Rule 4 — Read targeted sections

When a relevant file is large:

Do NOT automatically read the entire file.

Read only the sections required to understand:

- the relevant component
- the relevant function
- its inputs
- its outputs
- its dependencies
- related state
- relevant error handling

Expand the context only when necessary.

---

### Rule 5 — Follow dependencies selectively

Only inspect dependencies when they can materially affect the implementation.

For example:

```text
Page
 ↓
Camera component
 ↓
recording hook
```

If understanding the Camera component is enough, stop there.

Do not recursively inspect the entire dependency tree.

---

# 3. Token Efficiency Protocol

Treat context as a limited engineering resource.

### Prefer

```text
Search → Narrow → Read → Plan
```

### Avoid

```text
Read everything → Search mentally → Plan
```

---

## Context Budget

Use this conceptual budget:

### Tier 1 — Always inspect

Small, high-value context:

- `CLAUDE.md`
- current product/source-of-truth
- architecture documentation
- `package.json`
- top-level repository structure

---

### Tier 2 — Inspect when relevant

Only if required:

- relevant route/page
- relevant component
- relevant hook
- relevant utility
- relevant types
- relevant tests
- relevant configuration

---

### Tier 3 — Inspect only when blocked

Examples:

- unrelated components
- infrastructure
- database
- authentication
- deployment
- generated files
- lockfiles
- build output
- documentation unrelated to the task

Never inspect Tier 3 files merely for completeness.

---

# 4. Repository Exploration Strategy

Follow this sequence.

## Step 1 — Understand the request

Extract:

```text
Goal:
User-facing behavior:
Technical requirement:
Constraints:
Current version:
```

If the request is ambiguous, identify the ambiguity before exploring deeply.

---

## Step 2 — Check project scope

Read the relevant product documentation.

Determine:

```text
Current version:
Current milestone:
Feature requested:
Does it belong to this version?
```

If the requested feature belongs to a later version:

Do not plan implementation immediately.

Report:

```text
SCOPE MISMATCH

Current version: ...
Requested feature: ...
Expected version: ...

Reason:
...
```

Then propose the smallest version-appropriate alternative if one exists.

---

## Step 3 — Map the repository

Inspect only enough structure to understand the project.

Look for:

```text
app/
src/
components/
lib/
hooks/
services/
tests/
docs/
package.json
```

Do not recursively read every directory.

---

## Step 4 — Locate the feature

Search for:

- relevant route
- component names
- functions
- hooks
- types
- API endpoints
- existing tests
- related UI text
- related state

Create a small dependency map.

Example:

```text
PracticePage
 ├── ChallengeCard
 ├── CameraPreview
 │    └── useCamera
 └── RecordingControls
      └── useRecorder
```

---

## Step 5 — Inspect only relevant implementation

Read the smallest set of files required to understand the change.

For each file, determine:

```text
Purpose:
Relevant symbols:
Dependencies:
State:
Side effects:
Potential change:
```

Do not summarize irrelevant portions.

---

# 5. Existing Pattern Detection

Before proposing new code, search for existing patterns.

Look for:

- similar components
- existing hooks
- existing utility functions
- existing error handling
- existing UI patterns
- existing state management
- existing testing patterns
- existing naming conventions

Prefer extending an existing pattern over creating a new one.

---

# 6. Dependency Decision

Before recommending a new dependency, verify whether the project already provides a solution.

Decision order:

```text
Existing project utility
        ↓
Existing dependency
        ↓
Browser / platform API
        ↓
Small local implementation
        ↓
New dependency
```

A new dependency requires justification.

---

# 7. Architecture Check

Ask:

> What is the smallest architecture that solves this task?

Do NOT introduce:

- backend services
- databases
- queues
- caching
- state-management libraries
- abstractions
- design systems
- AI services
- external APIs

unless the task actually requires them.

For Camera Confidence:

```text
Current prototype
→ Browser APIs first
→ Backend later
→ AI later
→ Infrastructure only when required
```

---

# 8. Product Check

Evaluate the request against the product principles.

Ask:

### User problem

What user problem does this solve?

### Core loop

Does it improve:

```text
Practice
→ Record
→ Reflect
→ Try Again
→ Improve
```

### Scope

Does it belong in the current version?

### UX

Could this make the experience feel more:

- calm
- supportive
- simple
- low-pressure

or more:

- judgmental
- complicated
- distracting
- intimidating

---

# 9. Technical Risk Analysis

Only identify risks that materially affect implementation.

Consider:

- browser compatibility
- permissions
- asynchronous behavior
- state management
- cleanup
- memory usage
- media lifecycle
- error states
- accessibility
- privacy
- security
- performance

Do not produce generic risk lists.

Every risk must be connected to this specific task.

---

# 10. Testing Strategy

Determine the smallest useful verification strategy.

Identify:

```text
Unit tests:
Integration tests:
E2E tests:
Manual verification:
```

Do not automatically recommend tests for code that has no meaningful test value.

For browser camera functionality, explicitly consider manual browser verification where automated testing cannot reliably validate real camera behavior.

---

# 11. Implementation Plan

Produce a concrete implementation plan.

Each step must contain:

```text
Step:
File:
Change:
Reason:
```

Example:

```text
1. components/camera/camera-preview.tsx
   Add camera stream initialization and cleanup.
   Reason: Centralize camera lifecycle handling.

2. components/camera/recording-controls.tsx
   Add recording state transitions.
   Reason: Keep recording controls separate from camera lifecycle.
```

Keep the number of steps as small as reasonably possible.

---

# 12. File Change Classification

Classify every expected file as:

```text
CREATE
MODIFY
DELETE
NO CHANGE
```

Example:

```text
CREATE
- components/camera/CameraPreview.tsx

MODIFY
- app/practice/page.tsx

NO CHANGE
- package.json
- database/
```

Never recommend changing a file without a reason.

---

# 13. Scope Protection

Explicitly identify potential scope creep.

Return:

```text
NOT INCLUDED

- ...
- ...
- ...
```

Only include items that are likely to tempt implementation during this task.

Do not create an enormous future roadmap.

---

# 14. Decision Log

If there are meaningful architectural choices, record:

```text
Decision:
Chosen:
Alternative:
Why:
```

Only include decisions that matter.

Do not document trivial implementation details.

---

# 15. Confidence Assessment

End with:

```text
Confidence: HIGH | MEDIUM | LOW
```

Then explain the confidence in 1–3 sentences.

### HIGH

Repository behavior is understood and implementation path is clear.

### MEDIUM

Implementation is mostly understood but one or more assumptions remain.

### LOW

Important repository behavior or requirements remain unclear.

If confidence is LOW, do not pretend otherwise.

---

# 16. Questions

Only ask questions when the missing information materially changes the implementation.

Do NOT ask questions that can be answered by inspecting the repository.

Bad:

> Which component handles the camera?

Search first.

Good:

> Should recordings be stored locally or uploaded immediately?

if the repository/product documentation does not define this and the decision materially affects the implementation.

---

# 17. Final Plan Format

Return exactly this structure:

# Plan

## Understanding

2–5 sentences describing the requested change.

## Scope

```text
Current version:
Feature:
In scope:
Out of scope:
```

## Current Implementation

Only describe relevant existing behavior.

## Relevant Files

```text
CREATE
- ...

MODIFY
- ...

DELETE
- ...
```

## Implementation Steps

1. **[File]** — [Change]
   - Reason: ...

2. **[File]** — [Change]
   - Reason: ...

## Technical Decisions

- **Decision:** ...
  - **Why:** ...

Only include meaningful decisions.

## Testing & Verification

- ...
- ...
- ...

## Risks

- **Risk:** ...
  - **Mitigation:** ...

Only include material risks.

## Scope Guard

Do not implement:

- ...
- ...

## Confidence

**HIGH / MEDIUM / LOW**

[Short explanation.]

---

# 18. Planning Mode Rules

At the end of the plan:

**STOP.**

Do not:

- edit files
- create files
- install packages
- run migrations
- commit changes
- modify configuration
- implement the feature

The next action should require explicit user approval.

---

# 19. Token Optimization Rules

These rules have priority whenever they do not reduce correctness.

### Do not

- read entire large files unnecessarily
- read generated files
- read lockfiles
- read build output
- inspect unrelated directories
- repeatedly reread unchanged files
- summarize code that is irrelevant to the requested change
- reproduce large sections of source code in the final plan
- explain obvious implementation details
- create speculative architecture

### Do

- search before opening
- target symbols
- inspect relevant sections
- reuse known context
- stop exploration when confidence is sufficient
- keep the final plan concise
- report only decisions that affect implementation

---

# 20. Exploration Stop Condition

Stop investigating when all of the following are true:

```text
[ ] User request is understood
[ ] Current product scope is understood
[ ] Relevant implementation location is known
[ ] Existing patterns are understood
[ ] Required dependencies are understood
[ ] Important risks are known
[ ] Testing strategy is clear
[ ] Implementation can be described concretely
```

Do not continue exploring merely to achieve "complete" repository knowledge.

The goal is **sufficient understanding**, not exhaustive understanding.

---

# 21. Golden Rule

> **Explore until you can implement confidently — then stop.**

Do not optimize for the amount of repository knowledge collected.

Optimize for:

**Confidence per token.**
