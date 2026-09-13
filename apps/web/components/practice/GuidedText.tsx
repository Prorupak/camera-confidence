"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { chunkScript, isScriptEmpty } from "@/lib/practice/script";

interface GuidedTextProps {
  script: string;
}

/**
 * Displays the user's optional script/notes during practice, revealed
 * progressively rather than all at once — Reading → Remembering → Speaking
 * (Issue #20). Reveal state is local to this component and never touches
 * camera or recording state, so it's safe to use while recording.
 */
export function GuidedText({ script }: GuidedTextProps) {
  const [revealedCount, setRevealedCount] = useState(1);

  if (isScriptEmpty(script)) {
    return null;
  }

  const chunks = chunkScript(script);
  const visibleChunks = chunks.slice(0, revealedCount);
  const hasMore = revealedCount < chunks.length;

  return (
    <div className="flex flex-col gap-3 rounded-md border border-border bg-surface p-4">
      <div
        aria-live="polite"
        className="whitespace-pre-line text-body text-text-primary"
      >
        {visibleChunks.join(" ")}
      </div>

      {hasMore ? (
        <Button
          variant="secondary"
          size="sm"
          className="self-center"
          onClick={() => setRevealedCount((count) => count + 1)}
        >
          Show More
        </Button>
      ) : (
        <p className="text-center text-body-sm text-text-muted">
          That&apos;s the whole thing.
        </p>
      )}
    </div>
  );
}
