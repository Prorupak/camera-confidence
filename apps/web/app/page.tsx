import { ChallengeCard } from "@/components/challenge/ChallengeCard";
import { todaysChallenge } from "@/data/challenges";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center gap-10 bg-background px-6 py-16 text-center sm:py-24">
      <div className="flex flex-col items-center gap-5">
        <p className="text-body-sm font-semibold tracking-wide text-text-muted">
          Camera Confidence
        </p>
        <h1 className="text-[clamp(2rem,6vw,3.25rem)] leading-[1.15] font-bold text-text-primary">
          Take it one try at a time.
        </h1>
        <p className="max-w-[34ch] text-body text-text-secondary">
          A private space to practice speaking on camera.
        </p>
      </div>

      <ChallengeCard challenge={todaysChallenge} href="/practice" />

      <p className="text-body-sm text-text-muted">No pressure. Just practice.</p>
    </main>
  );
}
