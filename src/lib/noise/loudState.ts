/**
 * Deciding when the room is Too Loud.
 *
 * Deliberately asymmetric: it takes ten seconds of sustained noise to stop the
 * animals arriving, but only three quiet seconds to start them again. A knock
 * at the door cannot survive a ten-second mean, and a class that settles gets
 * an almost immediate reward rather than a ten-second penalty box. See
 * docs/adr/0001-nothing-is-taken-away.md.
 *
 * Pure on purpose: no timers, no microphone, no stores. Everything here is a
 * function of the samples and the clock, which is what makes the hysteresis
 * testable without waiting ten real seconds.
 */

export interface LevelSample {
  /** Milliseconds on the same clock as `now`. */
  time: number;
  /** 0-100 on the calibrated scale. */
  level: number;
}

export type NoiseState = "quiet" | "too-loud";

export const ENTER_TOO_LOUD_MS = 10_000;
export const LEAVE_TOO_LOUD_MS = 3_000;

/** Samples older than the longest window can never change a decision again. */
export function pruneSamples(
  samples: LevelSample[],
  now: number,
): LevelSample[] {
  const oldestUseful = now - ENTER_TOO_LOUD_MS - 1_000;
  return samples.filter((sample) => sample.time >= oldestUseful);
}

interface Window {
  mean: number;
  /** False when we have not been listening long enough to fill the window. */
  covered: boolean;
}

function windowOf(samples: LevelSample[], now: number, spanMs: number): Window {
  const inWindow = samples.filter((sample) => sample.time >= now - spanMs);
  if (inWindow.length === 0) return { mean: 0, covered: false };
  const total = inWindow.reduce((sum, sample) => sum + sample.level, 0);
  const oldest = samples[0]?.time ?? now;
  return { mean: total / inWindow.length, covered: oldest <= now - spanMs };
}

export function nextNoiseState(
  current: NoiseState,
  samples: LevelSample[],
  goal: number,
  now: number,
): NoiseState {
  if (current === "quiet") {
    const window = windowOf(samples, now, ENTER_TOO_LOUD_MS);
    return window.covered && window.mean > goal ? "too-loud" : "quiet";
  }

  const window = windowOf(samples, now, LEAVE_TOO_LOUD_MS);
  return window.covered && window.mean <= goal ? "quiet" : "too-loud";
}
