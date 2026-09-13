import { describe, expect, it } from "vitest";
import { getChallengeById, getChallenges } from "./challenges";

const VALID_DIFFICULTIES = new Set(["beginner", "easy", "medium"]);

describe("challenges data", () => {
  const challenges = getChallenges();

  it("has between 5 and 10 challenges", () => {
    expect(challenges.length).toBeGreaterThanOrEqual(5);
    expect(challenges.length).toBeLessThanOrEqual(10);
  });

  it("has a unique id for every challenge", () => {
    const ids = challenges.map((challenge) => challenge.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has all required fields populated", () => {
    for (const challenge of challenges) {
      expect(challenge.id.length).toBeGreaterThan(0);
      expect(challenge.title.length).toBeGreaterThan(0);
      expect(challenge.prompt.length).toBeGreaterThan(0);
      expect(VALID_DIFFICULTIES.has(challenge.difficulty)).toBe(true);
      expect(challenge.suggestedDuration).toBeGreaterThan(0);
    }
  });
});

describe("getChallengeById", () => {
  it("returns the matching challenge for a valid id", () => {
    const challenges = getChallenges();
    const target = challenges[0];

    expect(getChallengeById(target.id)).toEqual(target);
  });

  it("returns undefined for an unknown id", () => {
    expect(getChallengeById("not-a-real-challenge")).toBeUndefined();
  });
});
