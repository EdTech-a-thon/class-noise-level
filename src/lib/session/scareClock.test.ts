import { describe, expect, it } from "bun:test";
import {
  FIRST_FLEE_MS,
  FLEE_EVERY_MS,
  advanceScareClock,
  createScareClock,
} from "./scareClock";

/** Run the clock for `ms` in 16 ms frames; count the departures. */
function run(clock: number, ms: number, tooLoud: boolean) {
  let scared = 0;
  for (let t = 0; t < ms; t += 16) {
    const step = advanceScareClock(clock, 16, tooLoud);
    clock = step.clock;
    if (step.scared) scared++;
  }
  return { clock, scared };
}

describe("advanceScareClock", () => {
  it("never scares anybody while the room is Quiet", () => {
    expect(run(createScareClock(), 60_000, false).scared).toBe(0);
  });

  it("scares the first Creature after a short beat of Too Loud", () => {
    const clock = createScareClock();
    expect(run(clock, FIRST_FLEE_MS - 100, true).scared).toBe(0);
    expect(run(clock, FIRST_FLEE_MS + 100, true).scared).toBe(1);
  });

  it("scares one more at a steady pace while it stays Too Loud", () => {
    const ms = FIRST_FLEE_MS + FLEE_EVERY_MS * 3 + 100;
    expect(run(createScareClock(), ms, true).scared).toBe(4);
  });

  it("starts over after any Quiet moment", () => {
    let { clock } = run(createScareClock(), FIRST_FLEE_MS - 100, true);
    clock = advanceScareClock(clock, 16, false).clock;
    expect(clock).toBe(FIRST_FLEE_MS);
  });

  it("owes at most one departure after a stalled tab", () => {
    const step = advanceScareClock(createScareClock(), 60_000, true);
    expect(step.scared).toBe(true);
    expect(advanceScareClock(step.clock, 16, true).scared).toBe(false);
  });
});
