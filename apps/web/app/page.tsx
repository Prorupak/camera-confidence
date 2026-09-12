import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <h1 className="text-heading-1 font-semibold tracking-tight text-text-primary">
        Camera Confidence
      </h1>
      <p className="max-w-md text-body-lg text-text-secondary">
        A calm space to practice speaking on camera, one small attempt at a
        time.
      </p>
      <Link
        href="/practice"
        className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-body font-medium text-white transition-colors hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Start Practice
      </Link>
    </main>
  );
}
