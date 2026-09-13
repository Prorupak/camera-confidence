export type ChallengeDifficulty = "beginner" | "easy" | "medium";

/**
 * A single local practice challenge. Pure data — no React/JSX — so it stays
 * reusable across the challenge list, the practice screen, and future
 * progress features. See docs/product/roadmap.md for the v0.3.0 "Practice
 * Loop" challenge system this replaces the single hardcoded challenge with.
 */
export interface Challenge {
  id: string;
  title: string;
  prompt: string;
  difficulty: ChallengeDifficulty;
  /** Suggested recording length, in seconds. */
  suggestedDuration: number;
}

/**
 * Local challenge library, ordered from smallest ask to more demanding
 * speaking tasks. Keep entries approachable and low-pressure — see
 * docs/product/product-principles.md.
 */
const challenges: Challenge[] = [
  {
    id: "say-your-name",
    title: "Say Your Name",
    prompt: "Look at the camera and say your name.",
    difficulty: "beginner",
    suggestedDuration: 10,
  },
  {
    id: "how-are-you-feeling",
    title: "Say How You're Feeling",
    prompt: "Tell the camera how you're feeling today.",
    difficulty: "beginner",
    suggestedDuration: 15,
  },
  {
    id: "talk-about-your-day",
    title: "Talk About Your Day",
    prompt: "Tell the camera about one thing you did today.",
    difficulty: "easy",
    suggestedDuration: 20,
  },
  {
    id: "something-you-like",
    title: "Talk About Something You Like",
    prompt: "Tell the camera about something you enjoy and why.",
    difficulty: "easy",
    suggestedDuration: 30,
  },
  {
    id: "explain-something-you-know",
    title: "Explain Something You Know",
    prompt: "Explain something you know well as if you're teaching a friend.",
    difficulty: "medium",
    suggestedDuration: 45,
  },
  {
    id: "short-story",
    title: "Tell a Short Story",
    prompt: "Tell a short story about something interesting that happened to you.",
    difficulty: "medium",
    suggestedDuration: 60,
  },
  {
    id: "give-a-recommendation",
    title: "Give a Recommendation",
    prompt: "Recommend a book, show, or place to a friend and explain why they'd like it.",
    difficulty: "medium",
    suggestedDuration: 45,
  },
];

/** Returns all available challenges, in their intended progression order. */
export function getChallenges(): Challenge[] {
  return challenges;
}

/** Looks up a challenge by its stable ID. Returns `undefined` if not found. */
export function getChallengeById(id: string): Challenge | undefined {
  return challenges.find((challenge) => challenge.id === id);
}
