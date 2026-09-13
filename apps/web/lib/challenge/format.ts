import type { ChallengeDifficulty } from "@/data/challenges";

/** Formats a suggested duration (in seconds) as a short approximate label. */
export function formatSuggestedDuration(seconds: number): string {
  if (seconds < 60) {
    return `~${seconds} sec`;
  }
  const minutes = Math.round(seconds / 60);
  return `~${minutes} min`;
}

const DIFFICULTY_LABELS: Record<ChallengeDifficulty, string> = {
  beginner: "Beginner",
  easy: "Easy",
  medium: "Medium",
};

/** Formats a challenge difficulty as a user-facing label. */
export function formatDifficulty(difficulty: ChallengeDifficulty): string {
  return DIFFICULTY_LABELS[difficulty];
}
