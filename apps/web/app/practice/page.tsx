import Link from "next/link";

export default function Practice() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-background px-6 py-16 text-center">
      <h1 className="text-heading-1 font-semibold tracking-tight text-text-primary">
        Practice
      </h1>
      <p className="max-w-md text-body-lg text-text-secondary">
        Your practice space is coming together here.
      </p>
      <Link
        href="/"
        className="text-body font-medium text-text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Back to Home
      </Link>
    </main>
  );
}
