# Camera Confidence — Accessibility Guidelines

## 1. Purpose

This document defines the accessibility standards for Camera Confidence.

Accessibility should be considered part of the product experience from the beginning rather than treated as a final QA step.

The goal is to make Camera Confidence usable by as many people as reasonably possible while maintaining the simplicity of the core practice experience.

---

# 2. Accessibility Principle

> **Accessibility is part of the product, not an additional feature.**

Every new feature should consider accessibility before implementation.

Accessibility decisions should be reflected in:

- Design
- Components
- Interactions
- Content
- Media
- Error handling
- Testing

---

# 3. Core Accessibility Goals

Camera Confidence should provide:

- Clear information
- Predictable interactions
- Keyboard access
- Visible focus
- Sufficient contrast
- Accessible controls
- Understandable errors
- Reduced-motion support
- Accessible media alternatives
- Flexible interaction where possible

---

# 4. Semantic HTML

Use semantic HTML whenever possible.

Prefer:

```html
<button>Start Practice</button>
```

over:

```html
<div onclick="startPractice()">Start Practice</div>
```

Use appropriate semantic elements for:

- Buttons
- Links
- Headings
- Navigation
- Forms
- Lists
- Sections

Semantic structure improves accessibility without requiring additional complexity.

---

# 5. Heading Structure

Pages should have a logical heading hierarchy.

Example:

```text
H1
Today's Challenge

H2
Challenge Details

H2
Your Progress
```

Avoid using heading levels only for visual styling.

Typography should be controlled through the design system rather than incorrect semantic elements.

---

# 6. Keyboard Navigation

All applicable interactive functionality should be usable with a keyboard.

Users should be able to:

- Navigate between controls
- Activate buttons
- Navigate links
- Complete forms
- Close dialogs
- Move through relevant interactive elements

The camera itself may require device interaction, but the surrounding application controls should not unnecessarily depend on a mouse or touch input.

---

# 7. Focus States

Every interactive element must have a visible focus state.

Focus should:

- Be clearly visible
- Have sufficient contrast
- Remain consistent
- Not rely only on color

Do not remove browser focus indicators without providing an accessible replacement.

Avoid:

```css
outline: none;
```

unless a suitable focus treatment replaces it.

---

# 8. Focus Management

When opening an interactive overlay or modal:

1. Move focus into the new context.
2. Keep focus within the context when appropriate.
3. Restore focus when the context closes.

For example:

```text
Delete Recording
      ↓
Confirmation Dialog
      ↓
Confirm / Cancel
      ↓
Return focus to previous context
```

Focus should never appear to disappear unexpectedly.

---

# 9. Screen Reader Support

Interactive controls should have meaningful accessible names.

Prefer:

```text
Start recording
```

over:

```text
Button
```

Icon-only controls require accessible labels.

Examples:

```text
Play recording
Pause recording
Stop recording
Close
Retry practice
Delete recording
```

---

# 10. Buttons vs Links

Use buttons for actions.

Use links for navigation.

### Button

```text
Start Practice
```

### Link

```text
View Practice History
```

Do not use links as buttons or buttons as navigation simply for visual reasons.

---

# 11. Color Contrast

Text and important interface elements should have sufficient contrast against their backgrounds.

Do not rely on the design system's visual appearance alone.

Contrast should be verified during implementation.

Important information should remain understandable without perfect color perception.

---

# 12. Don't Use Color Alone

Color should never be the only way to communicate meaning.

Avoid:

```text
Red = Recording
Green = Complete
```

without additional indicators.

Prefer:

```text
● Recording
```

and:

```text
✓ Practice complete
```

Color can reinforce meaning but should not carry it alone.

---

# 13. Recording State

Recording state must be communicated through multiple cues.

For example:

```text
● Recording
00:24
```

rather than only changing the color of a button.

This benefits users who:

- Have color-vision differences
- May not notice subtle visual changes
- Need explicit state information

---

# 14. Camera Preview

The camera preview is central to the product, but it should not become an accessibility barrier.

Important controls surrounding the preview should have:

- Accessible names
- Clear focus states
- Keyboard access where applicable
- Understandable state changes

The user should not have to interpret the visual preview to understand basic application state.

---

# 15. Camera Permission

Before requesting permission, explain why it is needed.

Example:

> Camera Confidence needs access to your camera and microphone so you can record your practice.

If permission is denied:

- Explain what happened.
- Explain what the user can do.
- Provide a recovery action.

Example:

> **Camera access is unavailable**
>
> Check your browser permissions and try again.

[ Try Again ]

---

# 16. Microphone Permission

Microphone access should follow the same principles as camera access.

Explain why it is required.

Do not request microphone access earlier than necessary.

If microphone access fails, provide a clear recovery path.

---

# 17. Camera and Microphone Indicators

The application should make active recording states clear.

Users should understand:

- Whether the camera is active
- Whether the microphone is active
- Whether recording is happening
- Whether recording has stopped

Do not depend solely on subtle visual changes.

---

# 18. Audio Feedback

Important feedback should not rely exclusively on sound.

For example, if recording starts:

```text
Visual:
● Recording
```

can accompany any optional audio cue.

Users who cannot hear the cue should still understand the state.

---

# 19. Video Playback

Recorded videos should provide accessible controls.

Users should be able to:

- Play
- Pause
- Replay
- Control volume
- Control playback position

Controls should have meaningful accessible labels.

---

# 20. Captions and Transcripts

As speech analysis becomes part of the product, transcripts should be available where appropriate.

A transcript can provide an alternative way to access spoken content.

For example:

```text
Your recording

[Video]

Transcript
"Hi, my name is..."
```

The exact implementation will depend on the recording and analysis system.

---

# 21. AI Feedback Accessibility

AI-generated feedback should remain understandable.

Avoid relying on:

- Color-coded scores
- Charts without explanations
- Icons without labels
- Visual indicators without text

Feedback should be understandable as plain language.

Example:

> Try slowing down slightly between ideas.

should remain meaningful without requiring the user to interpret a graph.

---

# 22. Motion

Motion should communicate useful information rather than create distraction.

Animations should:

- Be purposeful
- Be reasonably short
- Not block interaction
- Not be required to understand the interface

---

# 23. Reduced Motion

Respect the user's reduced-motion preference.

When reduced motion is enabled:

- Remove unnecessary animations.
- Reduce transition effects.
- Avoid decorative movement.
- Preserve functional state changes.

The product should remain fully usable.

---

# 24. Touch Targets

Interactive controls should have sufficiently large touch targets.

This is especially important for:

- Start recording
- Stop recording
- Play/pause
- Retry
- Close
- Navigation
- Icon buttons

The visual icon itself does not necessarily need to be large if its interactive area is sufficiently accessible.

---

# 25. Responsive Accessibility

Accessibility should be maintained across viewport sizes.

Do not allow responsive layouts to:

- Hide important controls
- Create horizontal scrolling unnecessarily
- Make text unreadable
- Reduce touch targets
- Cut off important content

The core practice flow must remain usable on smaller screens.

---

# 26. Text Scaling

The interface should tolerate increased text size without breaking essential functionality.

Avoid layouts that depend on:

- Fixed text heights
- Text being truncated unnecessarily
- Important information fitting on one line

Content should be allowed to wrap where appropriate.

---

# 27. Forms

Forms should provide:

- Explicit labels
- Clear instructions
- Understandable validation
- Accessible error messages
- Logical keyboard order

Do not rely exclusively on placeholders as labels.

---

# 28. Form Errors

Errors should be associated with the relevant field.

Bad:

> Something went wrong.

Better:

> Challenge title is required.

The user should understand:

1. What is wrong.
2. Where it is wrong.
3. How to fix it.

---

# 29. Error Messages

Errors should use plain language.

Avoid exposing raw technical errors to users.

Instead of:

```text
NotAllowedError: Permission denied
```

prefer:

> Camera access is unavailable. Check your browser permissions and try again.

Technical details can still be logged for developers.

---

# 30. Loading States

Loading states should communicate what is happening.

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

Avoid relying exclusively on a spinning animation.

The user should be able to understand the state through text.

---

# 31. Live Regions

Dynamic information that changes without navigation should be communicated appropriately to assistive technologies.

Potential examples include:

- Recording started
- Recording stopped
- Upload completed
- Analysis completed
- Error occurred

The implementation should use appropriate ARIA mechanisms only where necessary.

Do not add ARIA attributes unnecessarily.

---

# 32. Modals and Dialogs

Dialogs should:

- Have an accessible name
- Move focus appropriately
- Provide keyboard interaction
- Allow clear dismissal
- Return focus appropriately

For destructive actions, the consequence should be clearly communicated.

Example:

> Delete this recording?

> This recording will be permanently deleted.

---

# 33. Language

Use clear and simple language.

Prefer:

> Start Practice

over:

> Initiate Practice Session

Prefer:

> Try Again

over:

> Restart Recording Workflow

Simple language benefits everyone, including users who:

- Are unfamiliar with the product
- Have cognitive disabilities
- Are using a second language
- Are under stress

---

# 34. Avoid Jargon

Avoid technical terminology unless the user needs it.

Do not say:

> MediaRecorder initialization failed.

Say:

> We couldn't start the recording. Please try again.

Technical details belong in developer logs.

---

# 35. Cognitive Load

The product should minimize unnecessary cognitive effort.

During practice, the user should primarily focus on:

```text
What am I being asked?
        ↓
What should I say?
        ↓
Am I recording?
        ↓
When am I finished?
```

Avoid presenting unnecessary information during these moments.

---

# 36. Consistent Interactions

The same action should behave the same way throughout the product.

For example:

```text
Try Again
```

should consistently mean:

> Start another attempt at the current practice challenge.

Predictability is an accessibility feature.

---

# 37. Avoid Time Pressure

The product should avoid unnecessary time limits.

If a challenge has a recommended duration, communicate it as guidance where possible.

For example:

> About 30 seconds

can feel less restrictive than:

> You have exactly 30 seconds.

Time limits should exist only when they serve the practice objective.

---

# 38. Don't Penalize Imperfection

Accessibility is also about emotional accessibility.

Users should not be punished for:

- Pausing
- Stumbling
- Restarting
- Speaking slowly
- Taking longer to prepare

The practice environment should remain supportive.

---

# 39. Feedback Accessibility

Feedback should be understandable without requiring visual interpretation.

For example, instead of:

```text
Speaking Speed
██████████████░░
72%
```

provide:

> You were speaking slightly faster than the recommended pace. Try slowing down a little next time.

Visual information can supplement the explanation.

It should not replace it.

---

# 40. Keyboard Shortcuts

Keyboard shortcuts may be introduced later for frequent actions.

If introduced:

- They should not be required.
- They should not conflict with browser/system shortcuts unnecessarily.
- They should be documented.
- Users should be able to use the product without learning them.

The basic interface must remain accessible without shortcuts.

---

# 41. Screen Reader Testing

Important user journeys should be tested with at least one screen reader environment during development.

Prioritize:

```text
Home
 ↓
Challenge
 ↓
Start Practice
 ↓
Permissions
 ↓
Recording
 ↓
Playback
 ↓
Retry
```

The objective is to ensure the user can understand the application state and operate the important controls.

---

# 42. Keyboard Testing

Before shipping an important flow, test it using only a keyboard.

Verify:

- Focus order
- Focus visibility
- Button activation
- Dialog interaction
- Form interaction
- Navigation
- Error recovery

---

# 43. Automated Accessibility Testing

Where practical, use automated accessibility testing during development and CI.

Automated testing can help detect issues such as:

- Missing accessible names
- Invalid ARIA usage
- Some contrast problems
- Missing labels
- Structural issues

Automated tools should supplement, not replace, manual testing.

---

# 44. Accessibility Testing Checklist

Before shipping a feature:

### Structure

- [ ] Semantic HTML is used.
- [ ] Heading hierarchy is logical.
- [ ] Landmarks are meaningful.

### Keyboard

- [ ] Interactive controls are keyboard accessible.
- [ ] Focus is visible.
- [ ] Focus order is logical.
- [ ] Dialogs manage focus correctly.

### Screen Reader

- [ ] Controls have accessible names.
- [ ] Dynamic states are communicated where necessary.
- [ ] Important information is available without visual interpretation.

### Visual

- [ ] Text has sufficient contrast.
- [ ] Information does not rely on color alone.
- [ ] Text can scale appropriately.
- [ ] Focus states are visible.

### Motion

- [ ] Reduced-motion preferences are respected.
- [ ] No essential information depends on animation.

### Media

- [ ] Video controls are accessible.
- [ ] Important spoken content can be accessed through text where appropriate.
- [ ] Recording state is clearly communicated.

### Errors

- [ ] Errors are understandable.
- [ ] Errors identify the problem.
- [ ] Recovery is clear.

---

# 45. V0.2.0 Accessibility Priorities

For the current Camera Prototype, prioritize:

```text
1. Semantic HTML
2. Keyboard-accessible controls
3. Visible focus states
4. Accessible button labels
5. Camera/microphone permission messaging
6. Clear recording state
7. Accessible playback controls
8. Color-independent state communication
9. Reduced-motion support
10. Responsive interaction
```

Advanced accessibility infrastructure can evolve alongside the product.

---

# 46. Accessibility Definition of Done

A feature should not be considered complete if its core interaction cannot reasonably be used by people who:

- Navigate with a keyboard
- Use assistive technologies
- Need larger text
- Cannot distinguish certain colors
- Prefer reduced motion
- Need clear textual explanations

Accessibility should be part of the feature's definition of done.

---

# 47. Guiding Principle

> **If the user cannot understand what is happening, the interface has failed—even if the underlying feature works.**

Accessibility and usability therefore overlap heavily in Camera Confidence.

Clear state, clear language, predictable interaction, and simple navigation benefit everyone.

---

# 48. Final Rule

Camera Confidence should not ask users to adapt themselves to the interface.

> **The interface should adapt to the user's needs wherever reasonably possible.**
