/**
 * One Session: an empty reef that fills as the class stays Quiet.
 *
 * Nothing here ever removes a Creature. Too Loud pauses the arrival clock and
 * that is the entire consequence of a noisy room — see
 * docs/adr/0001-nothing-is-taken-away.md. The only thing that empties the reef
 * is the teacher pressing Reset — not starting again, and not a refresh
 * (`savedReef.ts`).
 */

import type { CreatureDef } from "$lib/scenes/reef/roster";
import {
  advanceArrivalClock,
  createArrivalClock,
  type ArrivalClock,
} from "./arrivalClock";
import { rollCreature } from "./roll";
import { loadReef, saveReef } from "./savedReef";

/** One Creature actually in the water, and where it first appears. */
export interface CreatureInstance {
  id: number;
  def: CreatureDef;
  /** 0 = far background, 1 = right at the glass. Drives size and layering. */
  depth: number;
  /**
   * Where it arrives, as fractions across its own swimming region. It stays
   * on screen from then on; see `scenes/reef/motion.ts`.
   */
  spawnX: number;
  spawnY: number;
}

export class Session {
  running = $state(false);
  creatures = $state<CreatureInstance[]>([]);
  /** The most recent arrival, for the entrance animation. */
  newestId = $state<number | null>(null);

  #clock: ArrivalClock;
  #nextId = 1;
  #random: () => number;
  #roster: CreatureDef[];

  constructor(
    roster: CreatureDef[],
    intervalMs: number,
    random: () => number = Math.random,
  ) {
    this.#roster = roster;
    this.#random = random;
    this.#clock = createArrivalClock(intervalMs, random);
  }

  /**
   * Bring back the reef from before a refresh. Called once the page has
   * mounted rather than in the constructor, because the page is prerendered
   * with an empty reef and hydration expects to find exactly that.
   */
  restore() {
    this.creatures = loadReef(this.#roster);
    this.newestId = null;
    this.#nextId = Math.max(0, ...this.creatures.map(({ id }) => id)) + 1;
  }

  /** Starting keeps whoever is already here; only `reset` empties the reef. */
  start(intervalMs: number) {
    this.#clock = createArrivalClock(intervalMs, this.#random);
    this.running = true;
  }

  reset(intervalMs: number) {
    this.running = false;
    this.creatures = [];
    this.newestId = null;
    this.#clock = createArrivalClock(intervalMs, this.#random);
    saveReef(this.creatures);
  }

  /** Fraction of the way to the next arrival — teacher-facing only. */
  get progress(): number {
    return Math.min(1, this.#clock.bankedMs / this.#clock.targetMs);
  }

  tick(deltaMs: number, isQuiet: boolean, intervalMs: number) {
    if (!this.running) return;
    const step = advanceArrivalClock(
      this.#clock,
      deltaMs,
      isQuiet,
      intervalMs,
      this.#random,
    );
    this.#clock = step.clock;
    if (step.arrived) this.#arrive();
  }

  #arrive() {
    const present = this.creatures.map((creature) => creature.def.slug);
    const def = rollCreature(this.#roster, present, this.#random);
    if (!def) return;

    const depth = this.#random();
    const instance: CreatureInstance = {
      id: this.#nextId++,
      def,
      depth,
      spawnX: this.#random(),
      spawnY: this.#random(),
    };
    this.creatures = [...this.creatures, instance];
    this.newestId = instance.id;
    saveReef(this.creatures);
  }
}
