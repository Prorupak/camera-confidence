# Project Status Protocol

You are operating in **project status mode**.

Your job is to provide a concise, evidence-based snapshot of the current state of the project.

Do NOT modify files.

Do NOT implement anything.

Do NOT fix anything.

Do NOT perform broad repository exploration unless necessary to determine status.

---

# 1. Primary Objective

Answer:

> **Where are we now, what is complete, what is incomplete, and what should we do next?**

The status should reflect the actual repository state, not assumptions.

Prioritize:

1. Current product version
2. Current milestone
3. Completed work
4. In-progress work
5. Remaining work
6. Git state
7. Verification state
8. Scope/roadmap alignment
9. Recommended next task

---

# 2. Token Efficiency

Status should be extremely cheap to run.

Do NOT:

- read the entire repository
- inspect every source file
- reread the complete product documentation
- inspect unrelated modules
- run the entire test suite
- perform deep architectural analysis
- repeat historical implementation details

Prefer:

```text id="v5fh3e"
Git status
    ↓
Git diff summary
    ↓
Project metadata
    ↓
Relevant roadmap/issues
    ↓
Targeted evidence
    ↓
Status
```

Only inspect source files when necessary to determine whether a task is actually complete.

---

# 3. Sources of Truth

Use this priority order:

```text id="qv3y5u"
1. Product Source of Truth
2. Current Git repository
3. GitHub Issues / project tracking
4. Architecture documentation
5. Recent implementation evidence
```

When sources conflict:

Report the conflict.

Do not silently choose one.

---

# 4. Determine Current Version

Identify the current development version from project documentation.

For Camera Confidence, versions include:

```text id="5jkr9p"
v0.1.0 — Concept
v0.2.0 — Camera Prototype
v0.3.0 — Practice Loop
v0.4.0 — First AI Feedback
v0.5.0 — Accounts + Persistence
v0.6.0 — Early Beta
v0.7.0 — Better Coaching
v0.8.0 — Adaptive Practice
v0.9.0 — Public Beta
v1.0.0 — Product
```

Do not assume a version is complete merely because the version exists in documentation.

---

# 5. Determine Milestone State

For the current version, determine:

```text id="n4j1px"
NOT STARTED
IN PROGRESS
BLOCKED
READY FOR REVIEW
COMPLETE
```

Use actual evidence.

Examples:

### NOT STARTED

No meaningful implementation exists.

### IN PROGRESS

Some work exists but milestone requirements remain incomplete.

### BLOCKED

Progress cannot continue because of an unresolved dependency or decision.

### READY FOR REVIEW

Implementation appears complete and requires review/validation.

### COMPLETE

All known milestone requirements are implemented and verified.

---

# 6. Roadmap Progress

For the current version, summarize:

```text id="0xw8or"
Completed
In Progress
Remaining
```

Do not reproduce the entire roadmap.

Only show the current version and immediate next milestone.

---

# 7. Git Status

Inspect:

```text id="p8m2v8"
git status
```

Report:

```text id="t4d6bq"
Branch:
Clean / Dirty:
Changed files:
Untracked files:
```

Do not include massive diffs.

If changes exist, summarize their purpose where identifiable.

---

# 8. Current Work Detection

Determine whether there is obvious unfinished work.

Look for evidence such as:

- TODOs directly related to the current task
- incomplete components
- failing tests
- unfinished implementation
- placeholder UI
- unimplemented handlers
- temporary code
- current Git diff

Do not search the entire repository for every TODO.

Only inspect TODOs relevant to the current milestone.

---

# 9. GitHub Issue Alignment

If GitHub issue context is available:

Determine:

```text id="c5v6z2"
Current issue:
Open issues for current milestone:
Recently completed issues:
Blocked issues:
```

Prioritize the current milestone.

Do not dump every repository issue.

---

# 10. Verification State

Use existing evidence.

Report:

```text id="1b0i4d"
Typecheck:
Lint:
Tests:
Build:
Manual verification:
```

Possible values:

```text id="m0y4c9"
PASS
FAIL
NOT RUN
UNKNOWN
NOT APPLICABLE
```

Do not run expensive verification simply to generate a status report.

If verification status is unknown:

Say so.

Do not assume PASS.

---

# 11. Product Alignment

Check whether current work appears aligned with the current product version.

For example, during:

```text id="v3w7r9"
v0.2.0 — Camera Prototype
```

the expected core flow is:

```text
Home
→ Challenge
→ Start Practice
→ Camera Permission
→ Camera Preview
→ Start Recording
→ Stop Recording
→ Playback
→ Try Again
```

Flag obvious scope drift such as:

- backend infrastructure
- authentication
- database
- AI feedback
- payments
- advanced analytics

unless those are explicitly part of the current task.

Do not perform a full code review here.

---

# 12. Scope Drift Detection

Look for meaningful signs that development is moving ahead of the roadmap.

Classify:

```text id="9mx6by"
ON TRACK
MINOR DRIFT
SIGNIFICANT DRIFT
```

### ON TRACK

Implementation matches current milestone.

### MINOR DRIFT

Small unnecessary work exists but does not materially affect scope.

### SIGNIFICANT DRIFT

Development is spending meaningful effort on future-version functionality.

---

# 13. Blockers

Only report actual blockers.

Examples:

```text id="v4s9bh"
Build failure
Missing dependency
Unresolved product decision
Broken environment
API unavailable
Permission issue
Missing asset
```

Do not call an inconvenience a blocker.

---

# 14. Next Action

Recommend exactly **one primary next action**.

It should be:

- concrete
- small
- version-appropriate
- directly connected to current progress

Good:

```text id="e8s4m1"
Next:
Implement camera permission handling.
```

Bad:

```text id="3k7v6q"
Next:
Continue improving the product.
```

---

# 15. Next Issue Recommendation

If GitHub issues exist, identify the most appropriate next issue.

Prefer:

1. Blocking issue
2. Current milestone issue
3. Dependency issue
4. Smallest high-value unfinished issue

Do not recommend a future-version issue while current-version work remains.

---

# 16. Progress Percentage

Do NOT invent a precise percentage.

Only provide a percentage if the project has explicit milestone/task data that supports calculation.

If task data exists:

```text
Progress = completed milestone tasks / total milestone tasks
```

Otherwise use qualitative progress:

```text
Early
Underway
Mostly complete
Ready for validation
Complete
```

---

# 17. Confidence

Report:

```text id="3k1c0a"
Status confidence:
HIGH / MEDIUM / LOW
```

### HIGH

Repository and project tracking provide sufficient evidence.

### MEDIUM

Some state is inferred.

### LOW

Important project state cannot be determined.

---

# 18. Status Output

Return exactly:

# Camera Confidence Status

## Version

```text id="n2a3hz"
Current version:
Milestone:
State:
```

## Progress

```text id="0q3q3j"
Completed:
- ...

In progress:
- ...

Remaining:
- ...
```

Keep this focused on the current version.

---

## Git

```text id="4a6h8n"
Branch:
Working tree:
Changed files:
Untracked files:
```

---

## Verification

```text id="m7h9c4"
Typecheck:
Lint:
Tests:
Build:
Manual:
```

---

## Blockers

If none:

```text id="f4m1yr"
None.
```

Otherwise list only real blockers.

---

## Scope

```text id="q7v8ka"
Roadmap alignment:
ON TRACK / MINOR DRIFT / SIGNIFICANT DRIFT
```

If drift exists, briefly explain why.

---

## Next Action

> **[One concrete next action]**

---

## Status Confidence

**HIGH / MEDIUM / LOW**

[One short explanation.]

---

# 19. Compact Mode

If the user asks:

```text
/status
```

without additional instructions, prefer a compact response.

Target:

```text id="z6t7pq"
# Camera Confidence Status

Version: v0.2.0 — Camera Prototype
State: IN PROGRESS

Progress:
✅ App setup
✅ Challenge UI
🟡 Camera access
⬜ Recording
⬜ Playback
⬜ Retry

Git:
Branch: ...
Working tree: ...

Verification:
Typecheck: PASS
Lint: PASS
Tests: NOT RUN
Build: NOT RUN

Scope: ON TRACK

Next:
→ Complete camera access + preview.

Confidence: HIGH
```

Do not expand unless useful.

---

# 20. Detailed Mode

If the user asks:

```text
/status detailed
```

provide the full status structure.

Even in detailed mode:

Do not dump large amounts of repository information.

---

# 21. Historical Context

Do not summarize the entire project history.

Only mention previous versions when necessary to explain the current state.

Example:

```text id="9w8n4r"
v0.1.0 is complete.
Current focus is v0.2.0.
```

That's enough.

---

# 22. No Modification Rule

Status mode is strictly read-only.

Never:

- edit files
- create files
- install packages
- modify configuration
- change Git state
- commit
- push
- close issues
- update roadmap files

---

# 23. Final Rule

> **Status should tell the truth about where the project is without wasting tokens proving what it already knows.**

Be concise.

Be evidence-based.

Never invent progress.

Never report assumptions as facts.

Always end with:

> **One clear next action.**
