"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ScriptInputProps {
  onStart: (script: string) => void;
}

/**
 * Optional preparation step before practice. Lets the user write a script or
 * a few talking points, but never requires it — Start Practice always works,
 * whether the field is empty, whitespace-only, or full of notes. See Issue
 * #20: this is local-only, session-scoped state, not saved anywhere.
 */
export function ScriptInput({ onStart }: ScriptInputProps) {
  const [script, setScript] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-heading-3 font-semibold text-text-primary">
          Prepare for your practice
        </h2>
        <p className="max-w-[40ch] text-body text-text-secondary">
          What would you like to say?
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="practice-script"
          className="text-body-sm font-medium text-text-primary"
        >
          Your script or talking points (optional)
        </label>
        <textarea
          id="practice-script"
          value={script}
          onChange={(event) => setScript(event.target.value)}
          rows={5}
          placeholder="Write a script or a few talking points…"
          className="w-full resize-none rounded-md border border-border bg-surface p-3 text-body text-text-primary placeholder:text-text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        />
        <p className="text-body-sm text-text-muted">
          You don&apos;t need to write anything. You can practice without a
          script.
        </p>
      </div>

      <Button size="lg" className="w-full" onClick={() => onStart(script)}>
        Start Practice
      </Button>
    </div>
  );
}
