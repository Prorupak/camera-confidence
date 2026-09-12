import Link from "next/link";
import { CameraPlaceholder } from "@/components/practice/CameraPlaceholder";
import { Button } from "@/components/ui/Button";
import { todaysChallenge } from "@/data/challenges";

export default function Practice() {
  return (
    <div className="mx-auto flex w-full max-w-[560px] flex-1 flex-col gap-7 px-6 pt-2 pb-14">
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

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-caption font-semibold tracking-wide text-text-muted uppercase">
          Today&apos;s Challenge
        </p>
        <h1 className="text-heading-3 font-semibold text-text-primary">
          {todaysChallenge.title}
        </h1>
      </div>

      <CameraPlaceholder />

      <div className="flex flex-col items-center gap-1 text-center text-body text-text-secondary">
        <p>Take a breath.</p>
        <p>There&apos;s no perfect way to do this.</p>
      </div>

      <Button size="lg" className="w-full">
        Start
      </Button>
    </div>
  );
}
