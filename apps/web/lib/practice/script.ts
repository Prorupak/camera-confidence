/**
 * Pure helpers for the optional practice script/notes a user can write during
 * preparation and see progressively revealed during practice. See
 * docs/product/ (Issue #20) — this is a lightweight practice aid, not a
 * teleprompter: no speech recognition, no AI, no auto-sync.
 */

const SENTENCE_SPLIT_PATTERN = /(?<=[.!?])\s+/;
const MAX_SENTENCES_PER_CHUNK = 2;

/** Whitespace-only input behaves as if nothing was written. */
export function isScriptEmpty(script: string): boolean {
  return script.trim().length === 0;
}

/**
 * Splits a script into small, deterministic reveal chunks so the user sees a
 * little at a time instead of the whole script at once. Paragraphs (blank
 * line separated) are the primary unit; a single very long paragraph is
 * further split into small sentence groups so the first reveal is never a
 * wall of text.
 */
export function chunkScript(script: string): string[] {
  const trimmed = script.trim();
  if (trimmed.length === 0) {
    return [];
  }

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  const chunks: string[] = [];
  for (const paragraph of paragraphs) {
    const sentences = paragraph
      .split(SENTENCE_SPLIT_PATTERN)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);

    if (sentences.length <= MAX_SENTENCES_PER_CHUNK) {
      chunks.push(paragraph);
      continue;
    }

    for (let i = 0; i < sentences.length; i += MAX_SENTENCES_PER_CHUNK) {
      chunks.push(sentences.slice(i, i + MAX_SENTENCES_PER_CHUNK).join(" "));
    }
  }

  return chunks;
}
