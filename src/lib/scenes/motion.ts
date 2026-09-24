/**
 * How each Creature moves once it has arrived, in either Scene.
 *
 * Creatures never leave (CONTEXT.md), so none of them crosses the screen and
 * wraps. Each one wanders between waypoints inside a region of the Scene, and
 * the region, speed and rhythm are what make a crab read as a crab and an
 * octopus as an octopus. Everything is in Scene fractions (0–1 across and
 * down) so a window resize moves nobody.
 *
 * The step function is pure apart from the injected random, which is what
 * keeps it testable without a browser.
 */

export type MotionStyle =
  /** Reef fish: long horizontal wanders with gentle rises and dips. */
  | "cruise"
  /** Slow, small drifts around one spot, with rests. */
  | "hover"
  /** Walks back and forth along the sand, stopping to rest. */
  | "scuttle"
  /** Barely moves: a slow creep along the sand. */
  | "creep"
  /** Low, quick darts with pauses between. */
  | "dart"
  /** Roams anywhere, diagonally, in jet-propelled pulses. */
  | "jet"
  /** Rises on a pulse, sinks slowly, drifts sideways a little. */
  | "drift"
  /** Big, slow, wide loops across the whole Scene. */
  | "glide"
  /** Slow sinuous prowl low over the reef. */
  | "prowl"
  /** Savanna: ambles across the plain, head down for long rests. */
  | "graze"
  /** Savanna: brisk strides across the plain, short pauses. */
  | "trot"
  /** Savanna: wheels slowly through the sky above the plain. */
  | "soar";

interface Region {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface MotionProfile {
  /**
   * Where the Creature's centre may go. Ground styles ignore the y range and
   * sit on the sand instead.
   */
  region: Region;
  /** Cruising speed in Scene widths per second. */
  speed: number;
  /** How quickly velocity turns towards the target, per second. */
  agility: number;
  /** Furthest the next waypoint may be, as a fraction of the region. */
  reachX: number;
  reachY: number;
  /** Chance of resting at each waypoint, and how long, in seconds. */
  restChance: number;
  rest: [number, number];
  /** Seconds per propulsion pulse; 0 for a steady swim. */
  pulse: number;
  /** Faces its direction of travel. False for front-on art. */
  flips: boolean;
  /** Banks nose-up / nose-down with vertical motion. */
  tilts: boolean;
  /** Stands on the ground rather than swimming or flying. */
  ground: boolean;
  /**
   * Where a ground Creature's feet may rest, as fractions of Scene height,
   * far to near. Defaults to the reef's sand.
   */
  band?: { top: number; bottom: number };
}

/** The sand in backdrop.svg, as fractions of Scene height. */
export const SAND_TOP = 0.84;
export const SAND_BOTTOM = 0.98;

/** The open plain in the savanna backdrop, as fractions of Scene height. */
const PLAIN = { top: 0.72, bottom: 0.97 };

const WATER: Region = { xMin: 0.06, xMax: 0.94, yMin: 0.1, yMax: 0.78 };

export const MOTION_PROFILES: Record<MotionStyle, MotionProfile> = {
  cruise: {
    region: WATER,
    speed: 0.035,
    agility: 1.2,
    reachX: 0.9,
    reachY: 0.25,
    restChance: 0.1,
    rest: [1, 3],
    pulse: 0,
    flips: true,
    tilts: true,
    ground: false,
  },
  hover: {
    region: { xMin: 0.06, xMax: 0.94, yMin: 0.2, yMax: 0.78 },
    speed: 0.01,
    agility: 0.8,
    reachX: 0.15,
    reachY: 0.15,
    restChance: 0.6,
    rest: [2, 6],
    pulse: 0,
    flips: true,
    tilts: false,
    ground: false,
  },
  scuttle: {
    region: { xMin: 0.04, xMax: 0.96, yMin: 0, yMax: 1 },
    speed: 0.03,
    agility: 6,
    reachX: 0.5,
    reachY: 0,
    restChance: 0.7,
    rest: [1.5, 5],
    pulse: 0,
    flips: false,
    tilts: false,
    ground: true,
  },
  creep: {
    region: { xMin: 0.04, xMax: 0.96, yMin: 0, yMax: 1 },
    speed: 0.002,
    agility: 1,
    reachX: 0.06,
    reachY: 0,
    restChance: 0.8,
    rest: [8, 20],
    pulse: 0,
    flips: false,
    tilts: false,
    ground: true,
  },
  dart: {
    region: { xMin: 0.05, xMax: 0.95, yMin: 0.62, yMax: 0.84 },
    speed: 0.07,
    agility: 5,
    reachX: 0.25,
    reachY: 0.3,
    restChance: 0.85,
    rest: [1, 4],
    pulse: 0,
    flips: true,
    tilts: false,
    ground: false,
  },
  jet: {
    region: { xMin: 0.06, xMax: 0.94, yMin: 0.1, yMax: 0.8 },
    speed: 0.04,
    agility: 1.4,
    reachX: 0.6,
    reachY: 0.8,
    restChance: 0.2,
    rest: [2, 4],
    pulse: 2.4,
    flips: true,
    tilts: false,
    ground: false,
  },
  drift: {
    region: { xMin: 0.08, xMax: 0.92, yMin: 0.12, yMax: 0.7 },
    speed: 0.012,
    agility: 0.6,
    reachX: 0.2,
    reachY: 0.7,
    restChance: 0.2,
    rest: [2, 5],
    pulse: 3.2,
    flips: false,
    tilts: false,
    ground: false,
  },
  glide: {
    region: { xMin: 0.1, xMax: 0.9, yMin: 0.14, yMax: 0.66 },
    speed: 0.025,
    agility: 0.35,
    reachX: 1,
    reachY: 0.6,
    restChance: 0,
    rest: [0, 0],
    pulse: 0,
    flips: true,
    tilts: true,
    ground: false,
  },
  prowl: {
    region: { xMin: 0.08, xMax: 0.92, yMin: 0.6, yMax: 0.82 },
    speed: 0.015,
    agility: 0.7,
    reachX: 0.6,
    reachY: 0.3,
    restChance: 0.3,
    rest: [3, 7],
    pulse: 0,
    flips: true,
    tilts: true,
    ground: false,
  },
  graze: {
    region: { xMin: 0.04, xMax: 0.96, yMin: 0, yMax: 1 },
    speed: 0.012,
    agility: 2,
    reachX: 0.4,
    reachY: 0,
    restChance: 0.75,
    rest: [4, 12],
    pulse: 0,
    flips: true,
    tilts: false,
    ground: true,
    band: PLAIN,
  },
  trot: {
    region: { xMin: 0.04, xMax: 0.96, yMin: 0, yMax: 1 },
    speed: 0.035,
    agility: 4,
    reachX: 0.6,
    reachY: 0,
    restChance: 0.5,
    rest: [1.5, 5],
    pulse: 0,
    flips: true,
    tilts: false,
    ground: true,
    band: PLAIN,
  },
  soar: {
    region: { xMin: 0.08, xMax: 0.92, yMin: 0.08, yMax: 0.45 },
    speed: 0.028,
    agility: 0.5,
    reachX: 1,
    reachY: 0.5,
    restChance: 0,
    rest: [0, 0],
    pulse: 0,
    flips: true,
    tilts: true,
    ground: false,
  },
};

export interface MotionState {
  /** Centre of the Creature, in Scene fractions. */
  x: number;
  y: number;
  /** Velocity in Scene widths per second (y is scaled to the same units). */
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  /** Seconds left of the current rest. */
  resting: number;
  /** Seconds since the Creature arrived, for pulse timing. */
  age: number;
  /** 1 faces right, -1 faces left. Changes with hysteresis, not per frame. */
  facing: -1 | 1;
}

/** The Creature's footprint, as fractions of the Scene. */
export interface Footprint {
  width: number;
  height: number;
  /** Scene height ÷ width, so vertical travel is paced like horizontal. */
  aspect: number;
}

/**
 * Where a ground Creature's feet rest. Nearer Creatures stand lower on the
 * sand, so depth, size and ground line all agree.
 */
export function groundLine(
  depth: number,
  band = { top: SAND_TOP, bottom: SAND_BOTTOM },
): number {
  return band.top + depth * (band.bottom - band.top);
}

/** The box a Creature's centre is allowed in, so no part of it is cut off. */
function bounds(
  profile: MotionProfile,
  footprint: Footprint,
  depth: number,
): Region {
  const halfW = footprint.width / 2;
  const halfH = footprint.height / 2;
  const xMin = Math.max(profile.region.xMin, halfW);
  const xMax = Math.min(profile.region.xMax, 1 - halfW);
  const x = xMin <= xMax ? { xMin, xMax } : { xMin: 0.5, xMax: 0.5 };

  if (profile.ground) {
    const y = groundLine(depth, profile.band) - halfH;
    return { ...x, yMin: y, yMax: y };
  }
  const yMin = Math.max(profile.region.yMin, halfH);
  const yMax = Math.min(profile.region.yMax, 1 - halfH);
  return {
    ...x,
    ...(yMin <= yMax ? { yMin, yMax } : { yMin: 0.5, yMax: 0.5 }),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function pickTarget(
  state: MotionState,
  profile: MotionProfile,
  box: Region,
  random: () => number,
) {
  const spanX = (box.xMax - box.xMin) * profile.reachX;
  const spanY = (box.yMax - box.yMin) * profile.reachY;
  // A minimum stride, so a Creature never dithers on the spot.
  const stride = (random() * 0.6 + 0.4) * spanX * (random() < 0.5 ? -1 : 1);
  let targetX = state.x + stride;
  // Bounce off the side rather than pinning to it.
  if (targetX < box.xMin || targetX > box.xMax) targetX = state.x - stride;
  state.targetX = clamp(targetX, box.xMin, box.xMax);
  state.targetY = clamp(
    state.y + (random() * 2 - 1) * spanY,
    box.yMin,
    box.yMax,
  );
}

export function createMotion(
  style: MotionStyle,
  spawnX: number,
  spawnY: number,
  depth: number,
  footprint: Footprint,
  random: () => number,
): MotionState {
  const profile = MOTION_PROFILES[style];
  const box = bounds(profile, footprint, depth);
  const state: MotionState = {
    x: clamp(box.xMin + spawnX * (box.xMax - box.xMin), box.xMin, box.xMax),
    y: clamp(box.yMin + spawnY * (box.yMax - box.yMin), box.yMin, box.yMax),
    vx: 0,
    vy: 0,
    targetX: 0,
    targetY: 0,
    // A beat to let the arrival flourish land before it sets off.
    resting: 1.2,
    age: random() * 10,
    facing: random() < 0.5 ? -1 : 1,
  };
  pickTarget(state, profile, box, random);
  return state;
}

/**
 * Speed multiplier for pulsed swimmers: a quick shove, then a long coast.
 * Averages to about 1 so `speed` still means roughly what it says.
 */
function pulseFactor(profile: MotionProfile, age: number) {
  if (!profile.pulse) return 1;
  const phase = (age % profile.pulse) / profile.pulse;
  return phase < 0.25 ? 2.4 : 0.55;
}

/** Advance one Creature by `dt` seconds. Mutates and returns `state`. */
export function stepMotion(
  state: MotionState,
  style: MotionStyle,
  depth: number,
  footprint: Footprint,
  dt: number,
  random: () => number,
): MotionState {
  const profile = MOTION_PROFILES[style];
  const box = bounds(profile, footprint, depth);
  state.age += dt;

  let desiredX = 0;
  let desiredY = 0;
  if (state.resting > 0) {
    state.resting -= dt;
  } else {
    // y distances are converted to width units so diagonals are true.
    const dx = state.targetX - state.x;
    const dy = (state.targetY - state.y) * footprint.aspect;
    const distance = Math.hypot(dx, dy);
    if (distance < 0.01) {
      if (random() < profile.restChance) {
        const [min, max] = profile.rest;
        state.resting = min + random() * (max - min);
      }
      pickTarget(state, profile, box, random);
    } else {
      // Ease in to the waypoint instead of braking hard at it.
      const arrive = Math.min(1, distance / 0.05);
      // Nearer Creatures move a little faster: cheap parallax.
      const speed =
        profile.speed *
        (0.75 + depth * 0.5) *
        arrive *
        pulseFactor(profile, state.age);
      desiredX = (dx / distance) * speed;
      desiredY = (dy / distance) * speed;
    }
  }

  const turn = Math.min(1, dt * profile.agility);
  state.vx += (desiredX - state.vx) * turn;
  state.vy += (desiredY - state.vy) * turn;
  state.x = clamp(state.x + state.vx * dt, box.xMin, box.xMax);
  state.y = clamp(
    state.y + (state.vy * dt) / footprint.aspect,
    box.yMin,
    box.yMax,
  );

  if (profile.flips && Math.abs(state.vx) > profile.speed * 0.25) {
    state.facing = state.vx > 0 ? 1 : -1;
  }
  return state;
}

/** Degrees to bank the body, nose following the direction of travel. */
export function bankAngle(state: MotionState, style: MotionStyle): number {
  if (!MOTION_PROFILES[style].tilts) return 0;
  const along = Math.abs(state.vx) + 1e-6;
  const angle = (Math.atan2(state.vy, along) * 180) / Math.PI;
  return clamp(angle, -14, 14) * state.facing;
}
