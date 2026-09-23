import { describe, expect, it } from "bun:test";
import {
  ENTER_TOO_LOUD_MS,
  LEAVE_TOO_LOUD_MS,
  nextNoiseState,
  pruneSamples,
  type LevelSample,
} from "./loudState";

const GOAL = 30;

/** A run of samples at 10 Hz ending at `endTime`, one level per 100 ms. */
function series(
  endTime: number,
  durationMs: number,
  level: number,
): LevelSample[] {
  const samples: LevelSample[] = [];
  for (let t = endTime - durationMs; t <= endTime; t += 100) {
    samples.push({ time: t, level });
  }
  return samples;
}

function concat(...runs: LevelSample[][]): LevelSample[] {
  return runs.flat().sort((a, b) => a.time - b.time);
}

describe("nextNoiseState", () => {
  it("stays quiet while the room is under the goal", () => {
    const now = 60_000;
    expect(nextNoiseState("quiet", series(now, 20_000, 10), GOAL, now)).toBe(
      "quiet",
    );
  });

  it("ignores a two-second spike — a knock at the door is not Too Loud", () => {
    const now = 60_000;
    const samples = concat(
      series(now - 2_000, 20_000, 8),
      series(now, 2_000, 95),
    );
    expect(nextNoiseState("quiet", samples, GOAL, now)).toBe("quiet");
  });

  it("enters Too Loud once the room has been loud for the full window", () => {
    const now = 60_000;
    const samples = concat(
      series(now - 15_000, 20_000, 8),
      series(now, 15_000, 70),
    );
    expect(nextNoiseState("quiet", samples, GOAL, now)).toBe("too-loud");
  });

  it("does not enter Too Loud before the window is covered", () => {
    // Loud from the very first sample, but the app has only been listening
    // for eight seconds: not yet enough evidence.
    const now = 8_000;
    const samples = series(now, 8_000, 70);
    expect(nextNoiseState("quiet", samples, GOAL, now)).toBe("quiet");
  });

  it("recovers after three quiet seconds, not ten", () => {
    const now = 60_000;
    const samples = concat(
      series(now - 3_200, 20_000, 70),
      series(now, 3_200, 6),
    );
    expect(nextNoiseState("too-loud", samples, GOAL, now)).toBe("quiet");
  });

  it("stays Too Loud when the room has only just dropped below the goal", () => {
    const now = 60_000;
    const samples = concat(
      series(now - 1_000, 20_000, 70),
      series(now, 1_000, 6),
    );
    expect(nextNoiseState("too-loud", samples, GOAL, now)).toBe("too-loud");
  });

  it("recovers faster than it commits — slow in, fast out", () => {
    expect(LEAVE_TOO_LOUD_MS).toBeLessThan(ENTER_TOO_LOUD_MS);
  });

  it("does not flip straight back to Too Loud after recovering", () => {
    // Loud for a long stretch, then three quiet seconds: the exit fires. The
    // ten-second window is still mostly loud, but that noise predates the
    // recovery and must not count.
    const recoveredAt = 60_000;
    const samples = concat(
      series(recoveredAt - 3_200, 20_000, 70),
      series(recoveredAt + 100, 3_300, 6),
    );
    expect(
      nextNoiseState("quiet", samples, GOAL, recoveredAt + 100, recoveredAt),
    ).toBe("quiet");
  });

  it("does not flip straight back to quiet after entering Too Loud", () => {
    // Very loud, then a quiet tail short of ten seconds: the ten-second mean
    // is over the goal but the last three seconds are not.
    const enteredAt = 60_000;
    const samples = concat(
      series(enteredAt - 3_200, 20_000, 95),
      series(enteredAt + 100, 3_300, 5),
    );
    expect(
      nextNoiseState("too-loud", samples, GOAL, enteredAt + 100, enteredAt),
    ).toBe("too-loud");
  });

  it("judges by the mean, so a brief dip does not end Too Loud", () => {
    const now = 60_000;
    const samples = concat(series(now - 600, 20_000, 80), series(now, 600, 5));
    expect(nextNoiseState("too-loud", samples, GOAL, now)).toBe("too-loud");
  });
});

describe("pruneSamples", () => {
  it("keeps only what the longest window can still need", () => {
    const now = 60_000;
    const kept = pruneSamples(series(now, 30_000, 20), now);
    expect(kept[0].time).toBeGreaterThanOrEqual(
      now - ENTER_TOO_LOUD_MS - 1_000,
    );
    expect(kept.at(-1)?.time).toBe(now);
  });
});
