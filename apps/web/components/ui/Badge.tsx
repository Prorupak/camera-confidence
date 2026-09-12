import type { ReactNode } from "react";

/** Small metadata tag — duration/difficulty on ChallengeCard, never a score/grade. See design-system.md §25. */
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-caption font-medium text-text-secondary">
      {children}
    </span>
  );
}
