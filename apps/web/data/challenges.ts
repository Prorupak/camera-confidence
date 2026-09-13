export interface Challenge {
  title: string;
  durationLabel: string;
}

/**
 * The single practice challenge for v0.2.0. There is no challenge picker or
 * history yet — see docs/product/ for why the prototype starts with one
 * fixed challenge before expanding.
 */
export const todaysChallenge: Challenge = {
  title: "Introduce yourself in 30 seconds.",
  durationLabel: "~ 30 seconds",
};
