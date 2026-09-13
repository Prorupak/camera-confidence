# Camera Confidence — UX Guidelines

## 1. Purpose

This document defines practical UX guidelines for designing and implementing Camera Confidence.

It translates the product and design principles into interaction rules that can be applied consistently across the product.

The primary objective is:

> **Make every step toward practicing feel clear, calm, and low-pressure.**

---

# 2. Core UX Principles

Every interaction should aim to be:

- Clear
- Simple
- Predictable
- Supportive
- Forgiving
- Accessible
- Focused

When possible, prefer the simplest interaction that accomplishes the user's goal.

---

# 3. User Should Always Know What to Do

Every screen should have an obvious next action.

A user should rarely need to ask:

> "What am I supposed to do here?"

For example:

```text
Today's Challenge

Introduce yourself in 30 seconds.

[ Start Practice ]
```

The primary action should be immediately understandable.

---

# 4. Keep the Primary Flow Linear

The initial practice flow should follow a simple sequence:

```text
Challenge
   ↓
Prepare
   ↓
Permission
   ↓
Camera
   ↓
Record
   ↓
Playback
   ↓
Reflect
   ↓
Retry
```

Avoid unnecessary branching.

The user should not have to navigate through the application to complete a basic practice session.

---

# 5. Minimize Decisions

Every additional decision creates friction.

Before recording, the user should not need to decide:

- Which camera mode to use
- Which analysis model to use
- Which feedback type to enable
- Which recording settings to configure

The product should choose sensible defaults.

Advanced configuration can come later if users actually need it.

---

# 6. Explain Before Asking

When an interaction requires something that may surprise the user, provide context.

For example, before requesting camera access:

> Camera Confidence needs your camera and microphone so you can record your practice.

Then request the browser permission.

This is preferable to unexpectedly triggering a permission dialog.

---

# 7. Permission UX

Camera and microphone permissions are critical to the core experience.

### Before permission

Explain:

- What is needed
- Why it is needed

### During permission

Allow the browser to handle the actual permission request.

### If permission succeeds

Immediately show the camera preview.

### If permission fails

Explain how to recover.

Example:

```text
Camera access is unavailable.

Camera Confidence needs camera access
to record your practice.

Check your browser permissions and try again.

[ Try Again ]
```

Do not expose unnecessary browser or implementation details.

---

# 8. Camera Preview

Once the camera is available, the user should immediately see themselves.

The preview should communicate:

> **You're ready.**

The interface should avoid unnecessary controls around the preview.

Prioritize:

```text
Camera
+
Challenge
+
Recording action
```

---

# 9. Preparation State

Do not immediately begin recording after the user enters the camera.

Provide a short preparation period when appropriate.

Example:

```text
Get ready...

3
2
1
```

This gives the user a moment to:

- Adjust their position
- Take a breath
- Remember the prompt
- Prepare to speak

The preparation state should feel reassuring, not like a countdown to a test.

---

# 10. Recording State

Recording must be visually obvious.

The user should immediately know:

> **"I'm recording."**

Show a clear recording indicator and timer.

Conceptually:

```text
● Recording

00:24
```

The Stop action should remain easy to find.

---

# 11. Recording Controls

Recording controls should remain minimal.

The initial experience should primarily require:

```text
Start
Stop
```

Potential supporting controls can include:

```text
Cancel
Mute
Camera toggle
```

only when genuinely necessary.

Do not turn the recording screen into a video-production interface.

---

# 12. Prevent Accidental Recording

Starting a recording is a meaningful action.

The interface should make the transition from:

```text
Ready
```

to:

```text
Recording
```

clear.

Avoid ambiguous buttons or interactions that could cause accidental recording.

---

# 13. Stopping a Recording

Stopping should be immediate and predictable.

After stopping:

```text
Recording
   ↓
Playback
```

Do not introduce unnecessary confirmation dialogs such as:

> "Are you sure you want to stop recording?"

unless there is a specific reason.

Stopping an imperfect attempt should be allowed.

---

# 14. Canceling a Recording

If the user chooses to leave during recording, the product should clearly communicate the consequence.

For example:

> Leave this practice?

> Your current recording will not be saved.

[ Keep Recording ] [ Leave ]

Use confirmation when an action could cause meaningful loss.

---

# 15. Playback UX

After recording, playback should be immediately available.

The user should be able to:

- Play
- Pause
- Replay
- Retry
- Finish

The recording should not automatically become a public or shared asset.

---

# 16. Playback Should Not Feel Like Evaluation

The playback screen should not immediately present negative analysis.

Give the user space to see the attempt.

The experience should communicate:

> **"Let's see what you did."**

not:

> **"Let's see how badly you performed."**

---

# 17. Reflection UX

Reflection should help the user understand their next improvement.

The preferred structure is:

```text
What went well
      ↓
Try next
      ↓
Encouragement
```

Avoid presenting too many observations at once.

---

# 18. Feedback Hierarchy

Feedback should prioritize:

### 1. Positive observation

What worked?

### 2. One meaningful improvement

What should the user try next?

### 3. Encouragement

Why should they continue?

For example:

```text
Nice work.

What went well
Your introduction was clear.

Try next
Pause briefly between ideas.

Keep going
Your delivery became more natural toward the end.
```

---

# 19. Feedback Should Be Actionable

Avoid vague feedback:

> "Speak better."

> "Be more confident."

> "Improve your delivery."

Prefer specific actions:

> "Try slowing down slightly."

> "Pause for a moment before your next idea."

> "Look toward the camera when starting your answer."

The user should know what to do differently.

---

# 20. Limit Feedback

Do not overwhelm users with every detected issue.

Prefer:

```text
1–2 useful improvements
```

over:

```text
10+ metrics and recommendations
```

The purpose of feedback is to improve the next attempt.

---

# 21. Scores

Scores should not be the default feedback mechanism.

If scores are introduced later, they should:

- Have a clear meaning
- Be explainable
- Support improvement
- Avoid making users feel judged

A score without an actionable explanation should not be considered useful feedback.

---

# 22. Retry UX

Retry should always be easy to find after a practice attempt.

Preferred:

```text
Feedback

[ Try Again ]
```

Avoid forcing the user through:

```text
Feedback
→ Home
→ Challenge
→ Challenge Details
→ Start Practice
→ Camera
```

just to repeat the same challenge.

---

# 23. Preserve Context on Retry

When the user retries, preserve the relevant challenge context.

The user should not need to remember:

- What the prompt was
- How long they were supposed to speak
- What they were trying to improve

The product should carry that context forward.

---

# 24. Completing a Challenge

Completion should recognize effort.

Example:

```text
Practice complete.

You showed up and practiced.

[ Try Again ]
[ Done ]
```

Avoid excessive celebration.

The experience should feel sincere.

---

# 25. Don't Punish Failure

There should not be a "failure" state for ordinary imperfect practice.

These should generally remain valid practice attempts:

- Stumbling
- Pausing
- Speaking too quickly
- Forgetting part of the prompt
- Stopping early
- Restarting

The system can provide guidance without labeling the attempt as a failure.

---

# 26. Navigation

Navigation should be minimal during practice.

The user should not need the full application navigation while recording.

The practice environment should feel focused.

Outside the practice flow, navigation can provide access to:

- Home
- Practice
- Progress
- Settings

Only introduce sections when they provide real value.

---

# 27. Back Navigation

Back navigation should behave predictably.

If leaving a screen could cause loss of an active recording or other meaningful state, warn the user.

Otherwise, navigation should remain immediate.

Avoid unnecessary confirmation dialogs.

---

# 28. Forms

Forms should:

- Use clear labels
- Provide sensible defaults
- Validate close to the relevant field
- Explain errors clearly
- Avoid unnecessary fields

Do not ask users for information that the product doesn't currently need.

---

# 29. Error Handling

Errors should help users recover.

Use:

```text
Problem
   ↓
Explanation
   ↓
Recovery action
```

Example:

```text
We couldn't access your camera.

Check your browser permissions.

[ Try Again ]
```

Avoid exposing raw technical errors such as:

```text
NotAllowedError: Permission denied
```

unless the user or developer explicitly needs that information.

---

# 30. Network Errors

If an operation requires the network and fails, explain the situation without blaming the user.

Example:

> We couldn't upload your recording.

> Check your connection and try again.

[ Retry ]

Do not automatically discard user data when recovery is possible.

---

# 31. Loading States

Every potentially slow operation should communicate its state.

Examples:

```text
Preparing your practice...
```

```text
Uploading your recording...
```

```text
Analyzing your recording...
```

Loading indicators should appear only when there is meaningful waiting.

---

# 32. Empty States

An empty state should answer:

1. What is empty?
2. Why might it be empty?
3. What can the user do next?

Example:

```text
No practice sessions yet.

Your first practice starts here.

[ Start Practice ]
```

---

# 33. Destructive Actions

Destructive actions include:

- Delete recording
- Delete account
- Remove saved data

These actions should be clearly distinguished.

For meaningful irreversible actions, provide confirmation.

Example:

```text
Delete this recording?

This recording will be permanently deleted.

[ Cancel ] [ Delete ]
```

---

# 34. Saving

Avoid unnecessary "Save" actions when changes can safely happen automatically.

For example, completing a challenge can automatically record completion.

Explicit saving should be used when users expect to review or modify information before committing it.

---

# 35. Notifications

Notifications should be purposeful.

Do not interrupt users unnecessarily.

Avoid notifications that create pressure such as:

> "You haven't practiced today."

Prefer supportive communication:

> "Ready for a quick practice?"

If notifications are introduced, they should be opt-in and user-controlled.

---

# 36. Streaks

Streaks should not become a source of pressure.

If used later, avoid:

> "Your streak is broken."

Prefer:

> "Ready to practice again?"

The product should encourage consistency without punishing breaks.

---

# 37. Responsive UX

The experience should adapt to viewport size while preserving the core interaction.

On smaller screens:

- Keep the camera visible.
- Keep controls reachable.
- Prevent important text from being hidden.
- Avoid overly dense layouts.

On larger screens:

- Use available space intentionally.
- Avoid stretching content unnecessarily.

---

# 38. Mobile Camera Experience

Mobile devices may eventually become a major platform for Camera Confidence.

The mobile experience should consider:

- Portrait and landscape orientation
- Camera positioning
- Touch controls
- Safe areas
- Device permissions
- Front-facing camera
- Audio input

These should be validated through implementation rather than prematurely over-engineered.

---

# 39. Keyboard Interaction

All non-camera interactions should support keyboard navigation where applicable.

Users should be able to:

- Move through interactive elements
- See focus clearly
- Activate buttons
- Close dialogs
- Navigate forms

Keyboard interaction should never depend solely on mouse input.

---

# 40. Screen Readers

Interactive elements should communicate their purpose through semantic structure and accessible names.

For example, an icon-only button should have a meaningful accessible label:

```text
"Start recording"
```

rather than:

```text
"Button"
```

---

# 41. Color and State

Do not communicate important information through color alone.

For example, a recording state should not be represented only by:

```text
Red
```

It should also communicate:

```text
● Recording
```

Similarly, errors should use:

- Text
- Icons where appropriate
- Clear explanations

in addition to color.

---

# 42. Reduced Motion

Respect users who prefer reduced motion.

Animations should not be necessary to understand or operate the product.

The core experience must remain usable with reduced motion enabled.

---

# 43. Microcopy

Microcopy should be:

- Short
- Human
- Clear
- Encouraging

Prefer:

> Give it a try.

over:

> Initiate recording session.

Prefer:

> Try again.

over:

> Restart recording workflow.

The product should sound like a supportive human, not a technical system.

---

# 44. Empty, Loading, Error, and Success States

Every important feature should consider its complete state model:

```text
Default
   ↓
Loading
   ↓
Success
   ↓
Error
   ↓
Empty
```

Not every feature requires every state, but missing states should be intentional.

---

# 45. UX Consistency

The same action should behave consistently across the application.

For example:

If:

```text
Try Again
```

means recording another attempt in one place, it should not mean something different elsewhere.

Consistency reduces cognitive load.

---

# 46. Don't Hide Important Information

Critical information should not depend on:

- Hover-only interactions
- Hidden menus
- Tooltips alone
- Tiny icons without labels

Especially during recording, important information should remain visible.

---

# 47. Don't Interrupt the User

Avoid unnecessary:

- Modals
- Toasts
- Popups
- Notifications
- Permission requests
- Confirmation dialogs

during active practice.

The user's attention is valuable.

---

# 48. Practice Is a Focus Mode

The recording experience should behave almost like a temporary focus mode.

Conceptually:

```text
Application UI
      ↓
Practice Mode
      ↓
Focused Camera Experience
      ↓
Practice Complete
      ↓
Application UI
```

During practice, secondary application features should fade into the background.

---

# 49. Privacy UX

Privacy should be understandable to the user.

Users should know:

- Whether a recording is saved
- Where it is stored
- Whether it is analyzed
- Who can access it
- How it can be deleted

Do not hide important recording-data behavior in obscure settings.

---

# 50. Trust

Users are giving the product access to their:

- Camera
- Microphone
- Voice
- Face
- Personal speech

Trust should therefore be earned through clear communication.

Avoid vague statements such as:

> "We may use your data to improve our services."

When possible, explain what actually happens.

---

# 51. First-Time User Experience

The first session should minimize setup.

The preferred experience is:

```text
Open Camera Confidence
        ↓
Understand Challenge
        ↓
Start Practice
        ↓
Allow Camera/Microphone
        ↓
See Yourself
        ↓
Record
        ↓
Playback
        ↓
Try Again
```

The user should experience the core value before being asked to configure unnecessary things.

---

# 52. V0.2.0 UX Rules

For the current camera prototype:

### Must

- Clear challenge
- Clear start action
- Permission explanation
- Camera preview
- Preparation state
- Obvious recording state
- Simple stop action
- Playback
- Easy retry
- Responsive layout
- Accessible controls

### Should not

- Require authentication
- Require a profile
- Show AI scores
- Show analytics dashboards
- Add social features
- Add unnecessary settings
- Require cloud uploads
- Introduce complex navigation

---

# 53. UX Review Checklist

Before shipping a user-facing experience, ask:

### Clarity

- [ ] Is the next action obvious?
- [ ] Does the user understand what is happening?
- [ ] Are important states visible?

### Simplicity

- [ ] Can anything be removed?
- [ ] Are there unnecessary decisions?
- [ ] Are there unnecessary screens?

### Emotional Experience

- [ ] Does this reduce pressure?
- [ ] Does the interface feel supportive?
- [ ] Could anything feel judgmental?

### Recovery

- [ ] Can the user recover from errors?
- [ ] Can they retry easily?
- [ ] Is accidental data loss prevented?

### Accessibility

- [ ] Can the interaction be completed with a keyboard where applicable?
- [ ] Are focus states visible?
- [ ] Are controls accessible?
- [ ] Is information communicated without color alone?

### Product

- [ ] Does this support the practice loop?
- [ ] Does it help the user practice, reflect, retry, or improve?
- [ ] Is this necessary for the current version?

---

# 54. The UX Rule

When there are two solutions that achieve the same outcome:

> **Choose the one that requires less thinking from the user.**

When there are two equally simple solutions:

> **Choose the one that makes the user feel more comfortable.**

When a feature makes the product technically better but emotionally worse:

> **Reconsider the feature.**

---

# 55. UX North Star

Every interaction should reinforce:

> **"You don't have to be perfect. You're here to practice."**
