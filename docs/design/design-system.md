# Camera Confidence — Design System

## 1. Purpose

This document defines the visual and component foundations of Camera Confidence.

The design system exists to keep the product:

- Consistent
- Calm
- Accessible
- Predictable
- Easy to maintain
- Easy to extend

The design system should support the product principles defined in:

`docs/product/product-principles.md`

and the design principles defined in:

`docs/design/design-principles.md`.

---

# 2. Design System Philosophy

The Camera Confidence design system should feel:

```text
Calm
+
Warm
+
Modern
+
Human
+
Trustworthy
```

The system should prioritize usability and emotional comfort over visual complexity.

---

# 3. Design System Layers

The system should be organized into four layers:

```text
Design Tokens
     ↓
Primitives
     ↓
Components
     ↓
Patterns
```

### Design Tokens

Foundational values such as:

- Colors
- Typography
- Spacing
- Radius
- Shadows
- Motion
- Breakpoints

### Primitives

Basic building blocks such as:

- Text
- Icon
- Button
- Stack
- Container

### Components

Reusable interface elements such as:

- Challenge Card
- Recording Controls
- Progress Indicator
- Feedback Card

### Patterns

Complete interaction structures such as:

- Practice Flow
- Recording Experience
- Feedback Experience
- Empty States

---

# 4. Source of Truth

Design tokens should have a single source of truth.

Do not define visual values independently inside individual components.

Avoid:

```tsx
<div className="rounded-[13px] text-[#9370DB]">
```

when the value represents a system-level design decision.

Prefer semantic tokens:

```tsx
<div className="rounded-card bg-primary">
```

The exact implementation mechanism may evolve, but the principle remains:

> **Define once. Reuse everywhere.**

---

# 5. Color System

Color should communicate hierarchy, state, and interaction.

It should not be used excessively for decoration.

The system should eventually contain:

```text
Brand
├── Primary
├── Primary Hover
├── Primary Active
└── Primary Subtle

Neutral
├── Background
├── Surface
├── Surface Elevated
├── Border
├── Text Primary
├── Text Secondary
└── Text Muted

Semantic
├── Success
├── Warning
├── Error
└── Info

Practice
├── Recording
├── Ready
└── Completed
```

---

# 6. Semantic Colors

Components should consume semantic colors rather than raw color values.

For example:

```text
text-primary
text-secondary
surface-default
surface-elevated
border-default
action-primary
state-success
state-error
recording-active
```

This allows the visual theme to evolve without rewriting component logic.

---

# 7. Color States

Interactive elements should have predictable states.

For example:

```text
Default
   ↓
Hover
   ↓
Active
   ↓
Focus
   ↓
Disabled
```

A component should not invent its own interaction colors.

States should be defined consistently across the system.

---

# 8. Dark Mode

Dark mode should not be assumed as a requirement for the first prototype.

If introduced later, it should be implemented using semantic tokens rather than component-specific overrides.

Example:

```text
surface-default
```

can map to different values depending on the theme.

Components should not need to know whether the application is light or dark.

---

# 9. Typography

Typography should prioritize:

1. Readability
2. Clear hierarchy
3. Comfort
4. Consistency

The system should define:

```text
Display
Heading 1
Heading 2
Heading 3
Body Large
Body
Body Small
Caption
Label
```

The exact font family and values should be finalized as part of the visual design implementation.

---

# 10. Typography Hierarchy

The hierarchy should communicate importance without requiring excessive font-size differences.

Conceptually:

```text
Page Title
   ↓
Section Heading
   ↓
Challenge / Primary Content
   ↓
Supporting Content
   ↓
Metadata
```

The most important information should be visually obvious.

---

# 11. Font Weight

Use a limited set of font weights.

Prefer a small system such as:

```text
Regular
Medium
Semibold
Bold
```

Avoid using many weights simply for visual variation.

Weight should communicate hierarchy.

---

# 12. Line Height

Line height should prioritize comfortable reading.

Body text should have sufficient spacing between lines.

Headings may use tighter line height.

The final values should be defined in the token implementation.

---

# 13. Spacing

Spacing should use a consistent scale.

A base spacing system can follow a predictable progression such as:

```text
4
8
12
16
20
24
32
40
48
64
80
96
```

The exact scale may be refined during implementation.

The important rule is:

> **Avoid arbitrary spacing values whenever a system value can be used.**

---

# 14. Layout

Layouts should use consistent:

- Containers
- Gaps
- Padding
- Alignment
- Breakpoints

Content should have comfortable maximum widths.

The product should avoid unnecessarily wide text blocks.

---

# 15. Border Radius

Rounded corners can contribute to a friendly visual language.

Use a small, consistent radius scale.

Conceptually:

```text
radius-sm
radius-md
radius-lg
radius-xl
radius-full
```

Do not give every component a unique radius.

---

# 16. Borders

Borders should be subtle and primarily used for:

- Separation
- Input boundaries
- Cards
- Interactive controls
- Focus states

Avoid heavy borders that make the interface feel dense.

---

# 17. Shadows

Shadows should communicate elevation rather than decoration.

Use a limited scale:

```text
shadow-none
shadow-sm
shadow-md
shadow-lg
```

Most screens should rely on spacing, surfaces, and hierarchy rather than heavy shadows.

---

# 18. Icons

Icons should:

- Be simple
- Be recognizable
- Use a consistent visual style
- Have predictable sizing
- Support accessible labels

Avoid mixing multiple icon styles.

Icons should support the action rather than become the primary visual element.

---

# 19. Icon Sizes

A small standard scale should be used.

For example:

```text
icon-sm
icon-md
icon-lg
icon-xl
```

The exact values should be defined alongside the implementation tokens.

---

# 20. Buttons

Buttons are one of the most important components.

The system should provide:

```text
Primary
Secondary
Tertiary / Ghost
Destructive
Icon Button
```

Each button should have:

```text
Default
Hover
Active
Focus
Disabled
Loading
```

---

# 21. Button Hierarchy

Use one primary action per important screen.

Example:

```text
Challenge

[ Start Practice ]
```

Supporting actions should have lower visual priority.

Avoid presenting multiple buttons with identical visual weight when one action is clearly more important.

---

# 22. Button Language

Buttons should describe the action.

Prefer:

```text
Start Practice
Try Again
Stop Recording
Delete Recording
```

over ambiguous labels:

```text
Continue
Submit
Proceed
Action
```

when the actual action can be named directly.

---

# 23. Inputs

Inputs should have:

- Clear labels
- Predictable focus states
- Helpful validation
- Accessible error messages
- Comfortable touch targets

Inputs should not rely solely on placeholder text to communicate their purpose.

---

# 24. Cards

Cards should be used to group related information.

Potential system variants:

```text
Card
Card Interactive
Card Selected
Card Disabled
```

Cards should not become the default container for every piece of UI.

---

# 25. Challenge Card

The Challenge Card is a core Camera Confidence component.

It should communicate:

- Challenge title
- Prompt
- Difficulty
- Approximate duration
- Primary action

Conceptually:

```text
┌─────────────────────────────┐
│ Today's Challenge           │
│                             │
│ Introduce yourself          │
│ in 30 seconds.              │
│                             │
│ 30 sec · Beginner           │
│                             │
│ [ Start Practice ]          │
└─────────────────────────────┘
```

The component should feel inviting rather than evaluative.

---

# 26. Recording Controls

Recording controls are a critical component.

The user must be able to clearly understand:

```text
Ready
Recording
Stopped
```

The control should provide clear visual state changes.

The recording action should be visually prominent without creating unnecessary pressure.

---

# 27. Recording Indicator

When recording is active, the interface should clearly communicate the state.

Possible information:

```text
● Recording
00:24
```

The indicator should be visible without becoming distracting.

---

# 28. Timer

The timer should be:

- Easy to read
- Clearly associated with recording
- Stable
- Non-distracting

The timer should not visually imply that the user is racing against the clock unless the challenge specifically requires it.

---

# 29. Progress Indicators

Progress indicators should communicate meaningful personal progress.

Potential components:

- Practice count
- Challenge completion
- Streak
- Improvement indicator

Avoid turning every interaction into a progress metric.

---

# 30. Feedback Card

Feedback should have a consistent structure.

```text
┌─────────────────────────────┐
│ Nice work                   │
│                             │
│ What went well              │
│ Your introduction was clear.│
│                             │
│ Try next                    │
│ Slow down slightly between  │
│ ideas.                      │
│                             │
│ [ Try Again ]               │
└─────────────────────────────┘
```

The feedback component should prioritize:

- Clarity
- Encouragement
- Actionability

---

# 31. Empty States

Empty states should include:

```text
Context
   ↓
Explanation
   ↓
Next action
```

Example:

```text
No practice sessions yet.

Your first recording starts here.

[ Start Practice ]
```

---

# 32. Loading States

Loading states should clearly communicate what is happening.

Examples:

```text
Preparing your practice...
```

```text
Analyzing your recording...
```

Use skeletons or spinners only when they improve perceived clarity.

---

# 33. Error States

Errors should follow:

```text
What happened
      ↓
Why it matters
      ↓
What to do
```

Example:

```text
Camera access is unavailable.

Camera Confidence needs camera access
to record your practice.

[ Try Again ]
```

Technical details should only be shown when they help the user recover.

---

# 34. Toasts and Notifications

Transient notifications should be used sparingly.

Use them for:

- Successful actions
- Important state changes
- Recoverable errors

Do not use notifications for information the user needs to remember.

Important information should remain visible in the interface.

---

# 35. Modal Dialogs

Modals should be reserved for actions that genuinely require interruption.

Examples:

- Confirming deletion
- Important permission explanations
- Critical decisions

Do not use modals for routine interactions that could happen inline.

---

# 36. Focus States

Every interactive element must have a visible focus state.

Focus indicators should be:

- Clearly visible
- Consistent
- Accessible
- Not dependent only on color

Keyboard users should always be able to understand where focus is.

---

# 37. Touch Targets

Interactive elements should have sufficiently large touch targets.

This is particularly important for:

- Recording controls
- Play/pause
- Retry
- Navigation
- Icon buttons

Small visual icons may still have larger invisible interaction areas.

---

# 38. Motion

Motion should use a small set of consistent patterns.

Potential categories:

```text
Micro
Small interaction feedback

Transition
Page/component transitions

Emphasis
Important state change
```

Motion should be:

- Short
- Predictable
- Purposeful
- Easy to disable

Respect reduced-motion preferences.

---

# 39. Recording Motion

The recording experience should avoid unnecessary animation.

Motion may communicate:

```text
Ready
   ↓
Countdown
   ↓
Recording
   ↓
Stopped
```

But the user's attention should remain on speaking.

---

# 40. Responsive Design Tokens

The system should define responsive breakpoints centrally.

Components should adapt to viewport size rather than maintaining separate hardcoded layouts.

Potential categories:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Exact breakpoint values should be established during implementation.

---

# 41. Container System

The application should use consistent content containers.

Conceptually:

```text
Viewport
   ↓
Page Container
   ↓
Content Width
```

Text-heavy content should have a readable maximum width.

The camera experience may intentionally use more available viewport space.

---

# 42. Z-Index

Layering should use a defined scale rather than arbitrary values.

Potential levels:

```text
base
dropdown
sticky
overlay
modal
toast
```

Avoid values such as:

```text
z-index: 999999;
```

unless there is a documented reason.

---

# 43. Component States

Reusable components should consistently support relevant states.

```text
Default
Hover
Active
Focus
Disabled
Loading
Error
Success
Selected
```

Not every component needs every state.

Only define states that make sense for that component.

---

# 44. Accessibility

Accessibility requirements are part of the design system.

Components should support:

- Keyboard interaction
- Visible focus
- Semantic HTML
- Screen readers
- Sufficient contrast
- Reduced motion
- Accessible labels
- Error communication

Accessibility should not depend on a particular page.

It should be built into reusable components.

---

# 45. Design Tokens Should Be Semantic

Prefer:

```text
color.text.primary
color.surface.default
color.action.primary
color.state.success
```

over:

```text
color.purple.500
color.gray.100
color.blue.600
```

Raw color scales can exist underneath the system, but components should consume semantic meanings.

This allows the visual identity to change without rewriting the entire interface.

---

# 46. Component Naming

Components should use clear, product-oriented names.

Examples:

```text
ChallengeCard
RecordingControls
RecordingTimer
CameraPreview
FeedbackCard
PracticeHeader
ProgressSummary
```

Avoid overly generic names when they represent a specific product concept.

---

# 47. Component Ownership

Each component should have one clear responsibility.

For example:

```text
CameraPreview
```

should primarily handle displaying the camera preview.

It should not also manage:

- AI feedback
- Challenge selection
- User authentication
- Database persistence

Keep concerns separated.

---

# 48. Composition Over Complexity

Prefer composing small reusable components:

```text
PracticeScreen
 ├── PracticeHeader
 ├── ChallengePrompt
 ├── CameraPreview
 ├── RecordingTimer
 └── RecordingControls
```

rather than creating one enormous component:

```text
MegaPracticeComponent
```

This makes the system easier to maintain and test.

---

# 49. Design System for V0.2.0

The first prototype does not need the entire design system implemented.

Prioritize:

```text
Typography
Color tokens
Spacing
Buttons
Cards
Camera UI
Recording controls
Timer
Basic feedback states
Responsive layout
Focus states
```

Do not spend significant implementation time building unused components.

---

# 50. What We Should Avoid

Avoid:

- Arbitrary colors
- Arbitrary spacing
- Excessive shadows
- Excessive gradients
- Too many button variants
- Too many typography styles
- Inconsistent icon sizes
- One-off component styles
- Deeply nested cards
- Unnecessary animations
- Excessive UI states
- Component-specific design tokens

---

# 51. Design System Evolution

The design system should grow with the product.

Do not attempt to define every possible component upfront.

The process should be:

```text
Need
 ↓
Design
 ↓
Implement
 ↓
Identify Reuse
 ↓
Extract Token / Component
 ↓
Document
```

A component should become part of the design system when it has a meaningful reuse case.

---

# 52. Source of Truth Hierarchy

When design decisions conflict, use this hierarchy:

```text
Product Principles
       ↓
Design Principles
       ↓
Design System
       ↓
Feature Specification
       ↓
Component Implementation
```

Lower-level implementation should not silently contradict higher-level principles.

If a contradiction is necessary, document the decision.

---

# 53. Design Review Checklist

Before considering a UI implementation complete, check:

### Visual

- [ ] Typography follows the system.
- [ ] Colors use semantic tokens.
- [ ] Spacing follows the spacing scale.
- [ ] Radius is consistent.
- [ ] Shadows are intentional.
- [ ] Icons use the established style.

### Interaction

- [ ] Primary action is obvious.
- [ ] Interactive states are clear.
- [ ] Loading states exist where needed.
- [ ] Error states explain recovery.
- [ ] Recording state is obvious.

### Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus states are visible.
- [ ] Interactive elements have accessible names.
- [ ] Contrast is sufficient.
- [ ] Motion respects reduced-motion preferences.

### Product

- [ ] The interface supports the core practice loop.
- [ ] The design does not unnecessarily increase pressure.
- [ ] The user knows what to do next.
- [ ] The experience remains simple.

---

# 54. Current Design-System Principle

> **Create consistency without creating rigidity.**

The design system should make good decisions easy while leaving enough flexibility for the product to evolve.

---

# 55. Final Rule

The Camera Confidence design system exists to serve the experience.

It should never become more important than the user.

> **If the design system makes the product harder to use, the design system needs to change.**
