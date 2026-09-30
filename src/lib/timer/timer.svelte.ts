/**
 * The Timer: a countdown the teacher can put up over the Scene, which chimes
 * when it runs out.
 *
 * Remembered on this computer, like the reef: a refresh halfway through a
 * five-minute task keeps counting from where it was, and the Timer stays
 * where the teacher dragged it. Its arithmetic lives in ./countdown.
 */

import { browser } from "$app/environment";
import {
  advance,
  elapsedFraction,
  formatRemaining,
  idle,
  pause,
  remainingMs,
  resume,
  start,
  type Countdown,
} from "./countdown";

const STORAGE_KEY = "class-noise-level:timer";
/** Often enough that the seconds never visibly stick. */
const TICK_MS = 200;
const DEFAULT_DURATION_MS = 5 * 60_000;

/**
 * Where the Timer sits, as fractions of the room it has to move in: 0 is
 * against the left or top edge, 1 against the right or bottom. Fractions
 * rather than pixels, so it stays on screen when the window changes size.
 */
export interface TimerPosition {
  x: number;
  y: number;
}

/**
 * How the time is shown. Numbers for a class that reads a clock; a circle
 * that fills, or an hourglass that empties, for one that doesn't yet.
 */
export type TimerStyle = "digits" | "circle" | "hourglass";
export const TIMER_STYLES: TimerStyle[] = ["digits", "circle", "hourglass"];

interface StoredTimer {
  open: boolean;
  countdown: Countdown;
  position: TimerPosition;
  style: TimerStyle;
}

const DEFAULTS: StoredTimer = {
  open: false,
  countdown: idle(DEFAULT_DURATION_MS),
  // Top right, below the language and full-screen buttons.
  position: { x: 1, y: 0.15 },
  style: "digits",
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function read(): StoredTimer {
  if (!browser) return structuredClone(DEFAULTS);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULTS);
    const stored = {
      ...DEFAULTS,
      ...(JSON.parse(raw) as Partial<StoredTimer>),
    };
    if (typeof stored.countdown?.durationMs !== "number") {
      stored.countdown = DEFAULTS.countdown;
    }
    if (!TIMER_STYLES.includes(stored.style)) stored.style = DEFAULTS.style;
    return stored;
  } catch {
    return structuredClone(DEFAULTS);
  }
}

export class ClassTimer {
  #stored = $state<StoredTimer>(structuredClone(DEFAULTS));
  /** Wall-clock time, refreshed while counting, so `remaining` stays live. */
  #now = $state(Date.now());
  #onring: () => void;

  /** `onring` is called once, the moment the countdown runs out. */
  constructor(onring: () => void) {
    this.#onring = onring;
  }

  get open() {
    return this.#stored.open;
  }

  get status() {
    return this.#stored.countdown.status;
  }

  get durationMs() {
    return this.#stored.countdown.durationMs;
  }

  get remainingMs() {
    return remainingMs(this.#stored.countdown, this.#now);
  }

  /** What the class reads, e.g. "4:05". */
  get display() {
    return formatRemaining(this.remainingMs);
  }

  /** How much of the time has gone, 0 to 1: how full the circle is. */
  get elapsed() {
    return elapsedFraction(this.#stored.countdown, this.#now);
  }

  /** The same, at a time of the caller's choosing, for smooth animation. */
  elapsedAt(now: number) {
    return elapsedFraction(this.#stored.countdown, now);
  }

  get position() {
    return this.#stored.position;
  }

  get style() {
    return this.#stored.style;
  }

  set style(value: TimerStyle) {
    this.#set({ style: value });
  }

  #save() {
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#stored));
    } catch {
      // Private browsing may refuse storage; the Timer still works this visit.
    }
  }

  #set(changes: Partial<StoredTimer>) {
    this.#stored = { ...this.#stored, ...changes };
    this.#save();
  }

  #countdown(countdown: Countdown) {
    this.#now = Date.now();
    this.#set({ countdown });
  }

  show() {
    this.#set({ open: true });
  }

  /** Putting the Timer away also stops it; it never rings unseen. */
  hide() {
    this.#set({ open: false, countdown: idle(this.durationMs) });
  }

  start(durationMs: number) {
    if (durationMs <= 0) return;
    this.#countdown(start(durationMs, Date.now()));
  }

  pause() {
    this.#countdown(pause(this.#stored.countdown, Date.now()));
  }

  resume() {
    this.#countdown(resume(this.#stored.countdown, Date.now()));
  }

  /** Back to waiting, with the same length ready to go again. */
  reset() {
    this.#countdown(idle(this.durationMs));
  }

  moveTo(position: TimerPosition) {
    this.#set({ position: { x: clamp01(position.x), y: clamp01(position.y) } });
  }

  /** Drive the countdown. Returns a teardown for $effect. */
  run() {
    // Read here rather than in the constructor, because the page is
    // prerendered with the defaults and hydration expects to find those.
    // A countdown that ran out while the page was closed shows as done, but
    // does not chime: nobody asked for a bell on opening the laptop.
    const restored = read();
    this.#now = Date.now();
    this.#stored = {
      ...restored,
      countdown: advance(restored.countdown, this.#now),
    };

    const interval = setInterval(() => {
      if (this.#stored.countdown.status !== "running") return;
      this.#now = Date.now();
      const next = advance(this.#stored.countdown, this.#now);
      if (next.status === "done") {
        this.#set({ countdown: next });
        this.#onring();
      }
    }, TICK_MS);
    return () => clearInterval(interval);
  }
}
