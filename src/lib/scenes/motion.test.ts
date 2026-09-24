import { describe, expect, it } from "bun:test";
import {
  MOTION_PROFILES,
  createMotion,
  groundLine,
  stepMotion,
  type MotionStyle,
} from "./motion";

/** Deterministic, so a failure reproduces. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const footprint = { width: 0.1, height: 0.12, aspect: 9 / 16 };
const styles = Object.keys(MOTION_PROFILES) as MotionStyle[];

describe("stepMotion", () => {
  for (const style of styles) {
    it(`keeps a ${style} Creature wholly on screen for an hour`, () => {
      const random = seeded(7);
      const state = createMotion(style, 0.5, 0.5, 0.6, footprint, random);
      let minX = 1;
      let maxX = 0;
      for (let t = 0; t < 3600; t += 1 / 30) {
        stepMotion(state, style, 0.6, footprint, 1 / 30, random);
        expect(state.x - footprint.width / 2).toBeGreaterThanOrEqual(0);
        expect(state.x + footprint.width / 2).toBeLessThanOrEqual(1);
        expect(state.y - footprint.height / 2).toBeGreaterThanOrEqual(0);
        expect(state.y + footprint.height / 2).toBeLessThanOrEqual(1);
        minX = Math.min(minX, state.x);
        maxX = Math.max(maxX, state.x);
      }
      // It actually wanders rather than sitting still.
      expect(maxX - minX).toBeGreaterThan(0.02);
    });
  }

  it("keeps ground Creatures standing on the sand", () => {
    const random = seeded(3);
    const state = createMotion("scuttle", 0.2, 0.5, 0.4, footprint, random);
    for (let t = 0; t < 600; t += 1 / 30) {
      stepMotion(state, "scuttle", 0.4, footprint, 1 / 30, random);
      expect(state.y + footprint.height / 2).toBeCloseTo(groundLine(0.4));
    }
  });
});
