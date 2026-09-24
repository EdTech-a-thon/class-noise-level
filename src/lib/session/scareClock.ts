/**
 * When the next Creature runs away, for teachers who have chosen "animals
 * run away" (docs/adr/0003-animals-can-run-away.md).
 *
 * Too Loud itself already takes seconds of sustained noise to reach, so a
 * single shout never scares anybody. Once there, the first Creature bolts
 * after a short beat and then one more at a steady pace, so a class that
 * notices and settles quickly loses one animal, not the Scene. Any Quiet
 * moment winds the clock back to the start.
 *
 * Pure, like the arrival clock, so it is testable without waiting.
 */

/** How long into Too Loud the first Creature runs away. */
export const FIRST_FLEE_MS = 2_000;
/** How often another one follows while the room stays Too Loud. */
export const FLEE_EVERY_MS = 8_000;

/** Milliseconds until the next Creature runs away. */
export type ScareClock = number;

export function createScareClock(): ScareClock {
  return FIRST_FLEE_MS;
}

export function advanceScareClock(
  clock: ScareClock,
  deltaMs: number,
  tooLoud: boolean,
): { clock: ScareClock; scared: boolean } {
  if (!tooLoud) return { clock: createScareClock(), scared: false };
  const remaining = clock - deltaMs;
  if (remaining > 0) return { clock: remaining, scared: false };
  // A full wait before the next, so a stalled tab owes one departure, never
  // a stampede.
  return { clock: FLEE_EVERY_MS, scared: true };
}
