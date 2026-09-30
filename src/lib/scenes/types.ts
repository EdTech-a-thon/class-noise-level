/**
 * What every Scene's Roster is made of. Shared so the Session, the roll and
 * the animation layer never care which Scene is on screen.
 */

import type { MotionStyle } from "./motion";

/** Which Scene is on screen. See `scenes/index.ts`. */
export type SceneId = "reef" | "savanna" | "space" | "prehistoric";

export const SCENE_IDS: SceneId[] = ["savanna", "reef", "space", "prehistoric"];

/** What a first visit, and the prerendered page, shows. */
export const DEFAULT_SCENE: SceneId = "savanna";

export type RarityTier = "common" | "uncommon" | "rare";

/** The part group classes the animation layer knows how to move. */
export const ANIMATABLE_PARTS = [
  "part-tail",
  "part-fin",
  "part-body",
  "part-tentacles",
  "part-arms",
  // Savanna additions; their keyframes live in scenes/savanna/creatures.css.
  "part-ears",
  "part-wings",
  "part-head",
  // Deep space additions; their keyframes live in scenes/space/creatures.css.
  "part-spin",
  "part-pulse",
] as const;

export type AnimatablePart = (typeof ANIMATABLE_PARTS)[number];

export interface CreatureDef {
  /** Matches the SVG filename, kebab-case. */
  slug: string;
  tier: RarityTier;
  /** Intended px width against a 1920px-wide Scene. */
  width: number;
  /** How it moves around the Scene once it has arrived. */
  motion: MotionStyle;
  /** Overrides whether it faces its direction of travel (`motion`'s `flips`). */
  flips?: boolean;
  /** The part-* classes actually present in the artwork. */
  parts: AnimatablePart[];
}
