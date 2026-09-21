/**
 * One Session: an empty reef that fills as the class stays Quiet.
 *
 * Nothing here ever removes a Creature. Too Loud pauses the arrival clock and
 * that is the entire consequence of a noisy room — see
 * docs/adr/0001-nothing-is-taken-away.md. The only thing that empties the reef
 * is the teacher pressing Reset.
 */

import type { CreatureDef } from "$lib/scenes/reef/roster";
import {
  advanceArrivalClock,
  createArrivalClock,
  type ArrivalClock,
} from "./arrivalClock";
import { rollCreature } from "./roll";

/** One Creature actually in the water, with the placement it swims on. */
export interface CreatureInstance {
  id: number;
  def: CreatureDef;
  /** 0 = far background, 1 = right at the glass. Drives size and layering. */
  depth: number;
  /** Fraction of the Scene height its path sits at. */
  track: number;
  /** Seconds for one crossing. */
  crossingSeconds: number;
  /** -1 swims left, 1 swims right. */
  direction: -1 | 1;
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

  start(intervalMs: number) {
    this.creatures = [];
    this.newestId = null;
    this.#clock = createArrivalClock(intervalMs, this.#random);
    this.running = true;
  }

  reset(intervalMs: number) {
    this.running = false;
    this.creatures = [];
    this.newestId = null;
    this.#clock = createArrivalClock(intervalMs, this.#random);
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
      // Keep them off the very top and the sand, and spread by depth so the
      // reef does not stack everything in one band.
      track: 0.12 + this.#random() * 0.72,
      // Nearer Creatures cross faster: cheap parallax, and it reads as depth.
      crossingSeconds: 90 - depth * 45 + this.#random() * 30,
      direction: this.#random() < 0.5 ? -1 : 1,
    };
    this.creatures = [...this.creatures, instance];
    this.newestId = instance.id;
  }
}
