import { describe, expect, it } from "bun:test";
import {
  ARRIVAL_JITTER,
  advanceArrivalClock,
  createArrivalClock,
  nextTargetMs,
} from "./arrivalClock";

const FIVE_MINUTES = 5 * 60_000;
/** A random source pinned to the middle of the jitter band: no jitter at all. */
const noJitter = () => 0.5;

/** Run the clock forward in 100 ms ticks, counting arrivals. */
function simulate(
  durationMs: number,
  intervalMs: number,
  isQuietAt: (elapsedMs: number) => boolean,
  random: () => number = noJitter,
) {
  let clock = createArrivalClock(intervalMs, random);
  let arrivals = 0;
  for (let elapsed = 0; elapsed < durationMs; elapsed += 100) {
    const step = advanceArrivalClock(
      clock,
      100,
      isQuietAt(elapsed),
      intervalMs,
      random,
    );
    clock = step.clock;
    if (step.arrived) arrivals += 1;
  }
  return { clock, arrivals };
}

describe("advanceArrivalClock", () => {
  it("banks quiet time and produces an arrival at the interval", () => {
    const { arrivals } = simulate(FIVE_MINUTES + 100, FIVE_MINUTES, () => true);
    expect(arrivals).toBe(1);
  });

  it("produces no arrivals while the room is Too Loud", () => {
    const { arrivals } = simulate(30 * 60_000, FIVE_MINUTES, () => false);
    expect(arrivals).toBe(0);
  });

  it("pauses rather than resets — four banked minutes survive a loud spell", () => {
    // Quiet for four minutes, loud for thirty seconds, then quiet again.
    // If loudness reset progress, the next arrival would land at 9m30s.
    const loudFrom = 4 * 60_000;
    const loudUntil = loudFrom + 30_000;
    const isQuietAt = (elapsed: number) =>
      elapsed < loudFrom || elapsed >= loudUntil;

    const beforeResume = simulate(loudUntil, FIVE_MINUTES, isQuietAt);
    expect(beforeResume.arrivals).toBe(0);
    expect(beforeResume.clock.bankedMs).toBe(4 * 60_000);

    // One more banked minute after the room settles is all it should take.
    const throughArrival = simulate(
      loudUntil + 60_100,
      FIVE_MINUTES,
      isQuietAt,
    );
    expect(throughArrival.arrivals).toBe(1);
  });

  it("carries the overshoot forward so arrivals do not drift", () => {
    const { arrivals } = simulate(
      3 * FIVE_MINUTES + 100,
      FIVE_MINUTES,
      () => true,
    );
    expect(arrivals).toBe(3);
  });

  it("delivers roughly the configured rate over a quiet hour", () => {
    const random = () => Math.random();
    const { arrivals } = simulate(
      60 * 60_000,
      FIVE_MINUTES,
      () => true,
      random,
    );
    // Twelve at the nominal rate; jitter can move it by a little.
    expect(arrivals).toBeGreaterThanOrEqual(10);
    expect(arrivals).toBeLessThanOrEqual(14);
  });
});

describe("nextTargetMs", () => {
  it("stays inside the jitter band", () => {
    for (let i = 0; i < 200; i += 1) {
      const target = nextTargetMs(FIVE_MINUTES, Math.random);
      expect(target).toBeGreaterThanOrEqual(
        FIVE_MINUTES * (1 - ARRIVAL_JITTER),
      );
      expect(target).toBeLessThanOrEqual(FIVE_MINUTES * (1 + ARRIVAL_JITTER));
    }
  });

  it("is the plain interval when the random source sits mid-band", () => {
    expect(nextTargetMs(FIVE_MINUTES, noJitter)).toBe(FIVE_MINUTES);
  });
});
