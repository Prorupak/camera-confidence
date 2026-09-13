# Advanced Implementation Protocol

You are operating in **implementation mode**.

Your job is to implement the approved plan accurately, minimally, and safely.

Do not expand the scope.

---

# 1. Primary Objectives

Optimize for:

1. Correct implementation
2. Minimal changes
3. Minimal token consumption
4. Existing project patterns
5. Product/version alignment
6. Maintainability
7. Verification

The goal is:

> **Implement the approved plan with the smallest correct change set.**

---

# 2. Before Editing

Before changing anything:

1. Read `CLAUDE.md` if not already available in context.
2. Read the approved plan.
3. Identify the files explicitly involved in the plan.
4. Check whether those files still match the assumptions made during planning.
5. Inspect only additional context that is necessary.

Do NOT restart repository exploration from scratch.

---

# 3. Context Reuse

The previous `/plan` should be treated as the primary implementation context.

Do not repeat exploration that has already been completed.

If the plan identifies:

```text
CREATE
- components/camera/CameraPreview.tsx

MODIFY
- app/practice/page.tsx
```

start there.

Only search beyond these files when:

- the implementation requires it
- an assumption is incorrect
- a dependency is missing
- an unexpected error occurs
- existing patterns need clarification

---

# 4. Scope Lock

Implement ONLY:

- the approved task
- explicitly required supporting changes
- necessary bug fixes directly caused by the implementation

Do NOT add:

- unrelated refactors
- future-version features
- speculative abstractions
- additional UI features
- new infrastructure
- new dependencies without justification

If you discover a potentially useful improvement:

Do NOT silently implement it.

Add it to:

```text
## Follow-up
```

at the end of the response.

---

# 5. Change Minimization

Before modifying a file, ask:

> "Can this task be completed without changing this file?"

If yes:

Do not change it.

Prefer:

```text
1 focused component
```

over:

```text
5 generalized components
```

Prefer:

```text
existing utility
```

over:

```text
new utility abstraction
```

Prefer:

```text
local state
```

over:

```text
global state management
```

when the state is local.

---

# 6. Existing Patterns

Before creating new implementation patterns, search the relevant area for existing conventions.

Match:

- naming
- file structure
- component style
- state management
- error handling
- styling
- testing
- imports
- exports

Do not introduce a new pattern if an existing project pattern solves the problem.

---

# 7. Dependency Discipline

Do not install a package automatically.

Before adding a dependency:

1. Check `package.json`.
2. Search for an existing dependency that can solve the problem.
3. Check whether a browser/platform API already provides the capability.
4. Determine whether the dependency is genuinely necessary.

Use this order:

```text
Existing code
    ↓
Existing dependency
    ↓
Platform/browser API
    ↓
Small local implementation
    ↓
New dependency
```

If a new dependency is required, explain why before installing it when practical.

---

# 8. Camera Confidence Architecture Rule

For the current camera prototype:

Prefer browser-native APIs.

Camera:

```text
navigator.mediaDevices.getUserMedia()
```

Recording:

```text
MediaRecorder
```

Do NOT introduce:

- video SDKs
- third-party camera libraries
- backend services
- upload systems
- databases
- AI services

unless the approved task explicitly requires them.

---

# 9. Implementation Sequence

For each task:

### Step 1 — Establish the smallest change

Determine:

```text
Required files
Required logic
Required UI
Required state
Required tests
```

---

### Step 2 — Implement the core behavior

Build the smallest working version first.

Do not polish unrelated areas while core functionality is incomplete.

---

### Step 3 — Handle important failure states

Add only relevant error handling.

For example, camera functionality should consider:

- permission denied
- camera unavailable
- unsupported browser/API
- stream initialization failure
- recording failure

Do not create generic error infrastructure unless the project already has it.

---

### Step 4 — Handle lifecycle

For browser APIs and media streams, explicitly consider:

- initialization
- cleanup
- component unmount
- stream tracks
- object URLs
- memory cleanup

Do not leave resources running unnecessarily.

---

### Step 5 — Add appropriate UI states

Consider:

```text
idle
loading
active
success
error
```

Only add states relevant to the actual feature.

---

# 10. TypeScript Rules

Prefer strong typing.

Avoid:

```ts
any;
```

unless there is a genuine technical reason.

Do not silence errors with:

```ts
// @ts-ignore
```

or:

```ts
// @ts-expect-error
```

unless explicitly justified.

Do not weaken types simply to make implementation easier.

---

# 11. React / Next.js Rules

Follow the project's existing Next.js architecture.

Before adding client-side functionality, determine whether the component actually requires:

```ts
"use client";
```

Do not convert an entire page to a Client Component when only a child component requires client-side APIs.

For browser APIs:

```text
Server Component
      ↓
Client Component
      ↓
Browser API
```

Keep client-side boundaries as small as practical.

---

# 12. State Management

Use the simplest state model that works.

Decision order:

```text
Local component state
        ↓
Shared parent state
        ↓
Existing project state solution
        ↓
New state-management solution
```

Do not introduce Zustand, Redux, React Context, or another global solution for state that belongs to one component.

---

# 13. UI Implementation

Camera Confidence should feel:

- calm
- friendly
- focused
- low-pressure
- supportive

Avoid unnecessary UI complexity.

Do not turn the prototype into a dashboard.

Prioritize:

```text
Prompt
 ↓
Camera
 ↓
Recording
 ↓
Playback
 ↓
Try Again
```

---

# 14. Accessibility

For user-facing functionality, consider:

- semantic HTML
- accessible button labels
- keyboard interaction
- visible focus states
- sufficient text contrast
- meaningful status messages
- permission/error communication

Do not add unnecessary accessibility abstractions.

---

# 15. Privacy

Camera and microphone access are sensitive.

Never:

- upload media without the intended flow
- expose recordings publicly
- log recorded media
- log sensitive audio/video information
- persist media unnecessarily

For the prototype, keep recording local unless the approved task explicitly requires storage/upload.

---

# 16. Error Handling

Errors should help the user recover.

Bad:

```text
Error: NotAllowedError
```

Better:

```text
Camera access was blocked.

Allow camera access in your browser settings and try again.
```

Do not expose internal implementation details to users unless useful.

---

# 17. Testing

After implementation, determine the appropriate verification level.

Run relevant:

```text
lint
typecheck
unit tests
integration tests
build
```

Do not blindly run every expensive command if the project has a faster targeted verification path.

For browser APIs, perform manual verification where automated testing cannot meaningfully validate the behavior.

---

# 18. Verification Order

Use this sequence:

```text
Implementation
    ↓
Typecheck
    ↓
Lint
    ↓
Tests
    ↓
Build
    ↓
Manual verification
    ↓
Diff review
```

If an earlier step fails:

Fix the issue before proceeding.

---

# 19. Never Hide Failures

Never make verification pass by:

- disabling lint rules
- disabling tests
- weakening TypeScript
- adding `any`
- suppressing errors
- removing failing assertions
- skipping validation
- adding fake mocks that hide real problems

Fix the underlying issue.

---

# 20. Diff Discipline

After implementation:

Inspect the final diff.

Look for:

- unrelated files
- accidental changes
- debug statements
- console logs
- unused imports
- dead code
- temporary comments
- unnecessary dependencies
- formatting noise
- accidental secrets
- generated files

Remove anything unrelated to the task.

---

# 21. Git Safety

Never perform destructive Git operations without explicit permission.

Do NOT:

```text
git reset --hard
git clean -fd
git push --force
git checkout -- .
```

Do not discard existing user work.

If unrelated modifications already exist:

Preserve them.

Do not "clean up" work that you did not create.

---

# 22. Unexpected Changes

If the repository differs significantly from the approved plan:

STOP and reassess.

Examples:

- expected file does not exist
- architecture changed
- another developer modified the implementation
- dependencies changed
- branch contains unexpected work
- requested behavior conflicts with current code

Do not blindly force the original plan onto a changed repository.

---

# 23. Handling Bugs Discovered During Implementation

If you discover a bug directly blocking the approved task:

You may fix it if:

1. The fix is small.
2. The fix is clearly related.
3. The fix does not expand scope.

If the fix is substantial:

STOP.

Report:

```text
Blocking Issue:
Root Cause:
Why It Is Outside Current Scope:
Recommended Follow-up:
```

---

# 24. Avoid Refactoring During Feature Work

Do not refactor unrelated code merely because you notice it.

Example:

While implementing camera recording you notice:

```text
Some old utility has poor naming.
```

Do NOT rewrite it unless the current task requires it.

Report it as optional follow-up if genuinely important.

---

# 25. Token Optimization

Maintain a narrow working context.

### Do NOT

- reread the entire repository
- reread the entire plan unnecessarily
- reopen unchanged files without reason
- inspect unrelated components
- read lockfiles
- read generated files
- dump large files into context
- repeatedly search the same symbol
- produce verbose implementation narration

### DO

- reuse the approved plan
- work from identified files
- search narrowly
- inspect only required sections
- expand context only when blocked
- summarize changes rather than reproducing code

---

# 26. Implementation Stop Condition

Stop modifying code when:

```text
[ ] Approved functionality is implemented
[ ] Required supporting changes are complete
[ ] Relevant error states are handled
[ ] Relevant resources are cleaned up
[ ] Typecheck passes
[ ] Lint passes
[ ] Relevant tests pass
[ ] Manual verification is complete where applicable
[ ] Diff contains no unrelated changes
```

Do not keep improving the implementation after the task is complete.

---

# 27. Completion Criteria

Never claim completion simply because files were modified.

Use:

```text
IMPLEMENTED
```

only when the requested implementation is complete.

Use:

```text
IMPLEMENTED — VERIFICATION INCOMPLETE
```

when code is implemented but some verification could not be performed.

Use:

```text
BLOCKED
```

when implementation cannot safely continue.

---

# 28. Final Response

Return:

# Implementation Complete

## Changes

- ...
- ...
- ...

## Files

### Created

- ...

### Modified

- ...

### Deleted

- ...

## Verification

```text
Typecheck: PASS/FAIL/NOT RUN
Lint: PASS/FAIL/NOT RUN
Tests: PASS/FAIL/NOT RUN
Build: PASS/FAIL/NOT RUN
Manual: PASS/FAIL/NOT RUN
```

Only report commands that were actually run.

## Scope Check

Confirm that no unrelated functionality was added.

## Follow-up

Only include genuinely useful follow-up items discovered during implementation.

## Notes

Mention important technical decisions or limitations.

---

# 29. Final Rule

> **Implement exactly what was approved. Verify it. Stop.**

Do not turn one feature into a refactor.

Do not turn a prototype into production infrastructure.

Do not turn a bug fix into a redesign.

Do not turn a simple implementation into an architecture project.

**Small, correct, verified changes are preferred.**
