# Camera Confidence — User Experience

## 1. Purpose

This document defines the intended user experience for Camera Confidence.

The initial experience is designed around one goal:

> **Make the first recording feel simple, safe, and low-pressure.**

The user should never feel like they need to understand the product before they can start practicing.

---

# 2. Core Experience

The primary experience is:

```text
Home
  ↓
View Challenge
  ↓
Start Practice
  ↓
Camera Permission
  ↓
Camera Preview
  ↓
Prepare
  ↓
Record
  ↓
Finish
  ↓
Playback
  ↓
Reflect
  ↓
Try Again
```

The experience should feel like one continuous journey rather than a collection of unrelated screens.

---

# 3. First-Time User Experience

The first interaction is particularly important.

A new user should quickly understand:

1. What Camera Confidence does.
2. What they are supposed to do.
3. That they can practice without being judged.
4. How to start their first recording.

The user should not need to configure a complicated profile or understand an extensive dashboard before practicing.

---

# 4. Home

## Purpose

The home screen should immediately answer:

> **"What should I do now?"**

The primary action should be today's practice challenge.

### Example

```text
Good morning 👋

Ready for a quick practice?

TODAY'S CHALLENGE

Introduce yourself in 30 seconds.

No need to be perfect.
Just give it a try.

[ Start Practice ]
```

The home screen should have one obvious primary action.

---

# 5. Challenge

Before opening the camera, the user should understand what they are being asked to do.

A challenge should communicate:

- What to say
- Approximate duration
- Difficulty
- Any useful preparation guidance

### Example

```text
Today's Challenge

Introduce yourself.

Tell the camera:
• Your name
• What you do
• One thing you're interested in

30 seconds

[ Start Practice ]
```

The challenge should feel achievable.

Avoid overly complicated instructions.

---

# 6. Start Practice

When the user chooses to practice, transition directly into the recording experience.

The product should avoid unnecessary intermediate steps.

The intended flow is:

```text
Challenge
    ↓
Start Practice
    ↓
Camera Permission
    ↓
Camera Preview
```

---

# 7. Camera Permission

The browser may request access to:

- Camera
- Microphone

The experience should clearly explain why these permissions are required.

Example:

> Camera Confidence needs access to your camera and microphone so you can record your practice.

The product should not request permissions before they are necessary.

Permission should be requested when the user intentionally enters the recording experience.

---

# 8. Camera Preview

Once permissions are granted, the user should see themselves on camera.

The preview should communicate:

> **You're ready.**

The interface should remain visually calm.

### Required elements

- Camera preview
- Challenge prompt
- Recording controls
- Countdown or preparation state
- Recording duration
- Exit/cancel action

Avoid filling the screen with unnecessary controls.

---

# 9. Preparation State

Before recording starts, provide a short moment for the user to prepare.

Example:

```text
Get ready...

3
2
1
```

The preparation period should reduce the feeling of suddenly being put on the spot.

The user should know exactly when recording begins.

---

# 10. Recording State

Once recording starts:

```text
● Recording

00:18

"Tell us about yourself..."

[ Stop ]
```

The recording interface should make the current state obvious.

The user should always know:

- Whether recording is active
- How long they have been recording
- What they are supposed to talk about
- How to stop

---

# 11. Recording Principles

Recording should feel forgiving.

The product should not communicate:

> **"Perform perfectly."**

It should communicate:

> **"Give it a try."**

The user should be able to stop the recording without being penalized.

Completing an imperfect recording should still count as a successful practice attempt.

---

# 12. Finish Recording

After stopping, transition to playback.

Avoid immediately showing a score or criticism.

The first question should be:

> **"Do you want to see how you did?"**

---

# 13. Playback

The user should be able to watch their recording.

### Required actions

- Play
- Pause
- Replay
- Retry
- Continue

The playback screen should make reviewing the attempt easy.

The user should not be forced to watch the entire recording before continuing.

---

# 14. Reflection

After the recording, provide a simple reflection experience.

The first version should avoid overwhelming the user with metrics.

Instead, focus on:

### What went well

Example:

> You completed the full introduction and clearly explained what you do.

### Try next

Example:

> Try slowing down slightly between ideas.

### Encouragement

Example:

> Your second half sounded more natural. Keep going.

The feedback should give the user a clear next action.

---

# 15. Feedback Principles

Feedback should be:

### Supportive

The user should feel encouraged to continue.

### Specific

Avoid generic statements such as:

> "Good job!"

Instead:

> "Your introduction had a clear beginning and ending."

### Actionable

Give the user something they can try.

> "Pause for a moment before starting your next sentence."

### Limited

Do not give the user ten things to fix at once.

Early feedback should prioritize **one or two meaningful improvements**.

### Non-judgmental

Avoid language that makes the user feel like they failed.

---

# 16. Retry

Retry should be a first-class action.

After feedback:

```text
What would you like to do?

[ Try Again ]

[ Continue ]
```

The product should make another attempt feel natural.

The user should not need to navigate back through multiple screens to record again.

---

# 17. The Retry Loop

The most important loop in the product is:

```text
Challenge
   ↓
Record
   ↓
Review
   ↓
Improve
   ↓
Record Again
```

This loop should be easier than leaving the product.

---

# 18. Completion

Completing a challenge should feel meaningful without becoming excessive gamification.

Example:

```text
Challenge Complete 🎉

You showed up and practiced.

Practice #3

[ Try Again ]

[ Done ]
```

The product should celebrate **effort and consistency**, not only performance.

---

# 19. Progress

Progress should eventually help users see evidence that practice is working.

Potential progress indicators include:

- Challenges completed
- Practice sessions
- Practice streak
- Attempts over time
- Speaking metrics
- Personal improvements

However, progress should not turn into a competitive scoring system.

The goal is:

> **"I'm getting more comfortable."**

not:

> **"I need a higher score."**

---

# 20. Difficulty Progression

Challenges should gradually increase in difficulty.

A possible progression:

```text
Level 1
Say your name
        ↓
Level 2
Introduce yourself
        ↓
Level 3
Talk about your day
        ↓
Level 4
Explain something
        ↓
Level 5
Tell a story
        ↓
Level 6
Give an opinion
        ↓
Level 7
Practice an interview
```

The exact progression is a hypothesis and should be refined through user testing.

---

# 21. Emotional Design

The emotional experience is as important as the functional experience.

The product should reduce:

- Fear of making mistakes
- Fear of being judged
- Pressure to perform
- Overthinking
- Frustration after a bad attempt

The product should encourage:

- Curiosity
- Experimentation
- Repetition
- Small improvements
- Acceptance of imperfect attempts

---

# 22. Language

The product should use language that feels human and encouraging.

### Prefer

> Give it a try.

> No need to be perfect.

> Nice work.

> Try slowing down a little.

> Ready for another attempt?

### Avoid

> Failed.

> Poor performance.

> Your confidence score is low.

> Incorrect.

> You need significant improvement.

The product is a coach, not a grading system.

---

# 23. Handling Imperfect Attempts

An imperfect recording should not be treated as a failure.

For example, if the user:

- Stops early
- Stumbles over words
- Forgets part of the prompt
- Speaks too quickly
- Uses filler words
- Looks away

the product should still recognize that:

> **They practiced.**

The purpose of the product is to make practice possible.

---

# 24. First-Time Experience — Complete Flow

The intended first-time journey is:

```text
┌─────────────┐
│    Home     │
└──────┬──────┘
       ↓
┌─────────────┐
│  Challenge  │
└──────┬──────┘
       ↓
┌─────────────┐
│Start Practice│
└──────┬──────┘
       ↓
┌─────────────┐
│ Permissions │
└──────┬──────┘
       ↓
┌─────────────┐
│Camera Preview│
└──────┬──────┘
       ↓
┌─────────────┐
│  Countdown  │
└──────┬──────┘
       ↓
┌─────────────┐
│  Recording  │
└──────┬──────┘
       ↓
┌─────────────┐
│  Playback   │
└──────┬──────┘
       ↓
┌─────────────┐
│  Reflection │
└──────┬──────┘
       ↓
┌─────────────┐
│  Try Again  │
└─────────────┘
```

---

# 25. V0.2.0 Experience

For the current Camera Prototype, we intentionally reduce the experience to:

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
Try Again
```

### Included

- Camera access
- Microphone access
- Camera preview
- Recording
- Recording timer
- Stop recording
- Playback
- Retry

### Not included yet

- Authentication
- Backend
- AI feedback
- Speech analysis
- Persistent recordings
- Progress tracking
- Advanced challenges
- User profiles
- Payments

The purpose of `v0.2.0` is to validate the **camera experience**, not the entire product.

---

# 26. Experience Success Criteria

The first experience is successful if a new user can:

1. Understand what the challenge asks them to do.
2. Start practice without confusion.
3. Grant camera and microphone permissions.
4. See themselves on camera.
5. Understand when recording begins.
6. Complete a short recording.
7. Watch the recording.
8. Easily try again.
9. Feel that the experience was low-pressure.

The most important qualitative question is:

> **"Did this make you feel more comfortable pressing record?"**

---

# 27. UX North Star

Every interaction should move the user toward:

> **"I can do this."**

rather than:

> **"I need to be good at this."**

Camera Confidence should make practice feel small enough to start and rewarding enough to repeat.
