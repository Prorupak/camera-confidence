import Link from "next/link";
import { PracticeSession } from "@/components/practice/PracticeSession";
import { getChallengeById } from "@/data/challenges";
import { formatSuggestedDuration } from "@/lib/challenge/format";

const BackLink = () => (
  <Link
    href="/"
    aria-label="Back to home"
    className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors duration-base hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  </Link>
);

export default async function Practice({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const challenge = getChallengeById(challengeId);

  if (!challenge) {
    return (
      <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col gap-7 px-6 pt-2 pb-14">
        <BackLink />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-heading-3 font-semibold text-text-primary">
            Challenge not found
          </h1>
          <p className="max-w-[34ch] text-body text-text-secondary">
            Choose another practice challenge to continue.
          </p>
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-md bg-primary px-5 text-body font-semibold text-primary-on transition-colors duration-base hover:bg-primary-hover active:bg-primary-active focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          >
            View Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col gap-7 px-6 pt-2 pb-14">
      <BackLink />

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-caption font-semibold tracking-wide text-text-muted uppercase">
          Today&apos;s Practice
        </p>
        <h1 className="text-heading-3 font-semibold text-text-primary">
          {challenge.title}
        </h1>
        <p className="max-w-[40ch] text-body text-text-secondary">
          {challenge.prompt}
        </p>
        <p className="text-body-sm text-text-muted">
          {formatSuggestedDuration(challenge.suggestedDuration)}
        </p>
      </div>

      <PracticeSession />
    </div>
  );
}
