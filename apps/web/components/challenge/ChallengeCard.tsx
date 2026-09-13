import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Challenge } from "@/data/challenges";
import { formatDifficulty, formatSuggestedDuration } from "@/lib/challenge/format";

/** A single challenge's presentation — see design-system.md §25. Should feel inviting, not evaluative. */
export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div className="w-full rounded-lg border border-border bg-surface p-7 text-left shadow-sm">
      <p className="mb-3 text-heading-2 leading-tight font-semibold text-text-primary">
        {challenge.title}
      </p>
      <p className="mb-4 text-body text-text-secondary">{challenge.prompt}</p>
      <div className="mb-5 flex gap-2">
        <Badge>{formatDifficulty(challenge.difficulty)}</Badge>
        <Badge>{formatSuggestedDuration(challenge.suggestedDuration)}</Badge>
      </div>
      <Link
        href={`/practice/${challenge.id}`}
        className="flex h-13 w-full items-center justify-center rounded-md bg-primary text-body-lg font-semibold text-primary-on transition-colors duration-base hover:bg-primary-hover active:bg-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
      >
        Start Practice
      </Link>
    </div>
  );
}
