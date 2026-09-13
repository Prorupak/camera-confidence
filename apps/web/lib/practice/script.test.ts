import { describe, expect, it } from "vitest";
import { chunkScript, isScriptEmpty } from "@/lib/practice/script";

describe("isScriptEmpty", () => {
  it("treats an empty string as empty", () => {
    expect(isScriptEmpty("")).toBe(true);
  });

  it("treats whitespace-only input as empty", () => {
    expect(isScriptEmpty("   \n\t  ")).toBe(true);
  });

  it("treats real content as not empty", () => {
    expect(isScriptEmpty("Hi, my name is Alex.")).toBe(false);
  });
});

describe("chunkScript", () => {
  it("returns no chunks for an empty string", () => {
    expect(chunkScript("")).toEqual([]);
  });

  it("returns no chunks for whitespace-only input", () => {
    expect(chunkScript("   \n\n  ")).toEqual([]);
  });

  it("returns a single chunk for a single sentence", () => {
    const chunks = chunkScript("Hi, my name is Alex.");
    expect(chunks).toEqual(["Hi, my name is Alex."]);
  });

  it("groups multiple sentences within a paragraph into small chunks", () => {
    const script =
      "Hi, my name is Alex. Today I want to talk about my favorite hobby. It has taught me a lot. I hope you enjoy hearing about it.";
    const chunks = chunkScript(script);

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join(" ")).toContain("Hi, my name is Alex.");
    expect(chunks.every((chunk) => chunk.length > 0)).toBe(true);
  });

  it("reveals multiple paragraphs as separate chunks", () => {
    const script = [
      "Hello everyone.",
      "Today I want to talk about my experience.",
      "The biggest lesson I learned was to keep practicing.",
    ].join("\n\n");

    const chunks = chunkScript(script);

    expect(chunks).toEqual([
      "Hello everyone.",
      "Today I want to talk about my experience.",
      "The biggest lesson I learned was to keep practicing.",
    ]);
  });

  it("does not produce a single wall-of-text chunk for a long realistic script", () => {
    const script = `Hi, my name is Alex. Today I want to talk about something I've learned recently. One thing I've noticed is that practice really does make a difference. Every time I try this, it gets a little easier. The most important lesson is that showing up matters more than being perfect. Thanks so much for listening.

I also wanted to mention one more thing before I go. Consistency has helped me more than any single trick. So my advice is simple: keep practicing, one small step at a time.`;

    const chunks = chunkScript(script);

    expect(chunks.length).toBeGreaterThan(2);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThan(200);
    }
  });

  it("never crashes and always terminates for arbitrary input", () => {
    expect(() => chunkScript("...!!!???")).not.toThrow();
    expect(() => chunkScript("a".repeat(5000))).not.toThrow();
  });
});
