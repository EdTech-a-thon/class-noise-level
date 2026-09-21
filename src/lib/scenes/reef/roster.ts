/**
 * The reef Roster: every Creature that can appear in this Scene.
 *
 * This file is co-owned with the art task (docs/svg-art-brief.md). Slugs match
 * the SVG filenames; `width` is the intended on-screen width against a
 * 1920px-wide Scene, and is what keeps a clownfish small next to a whale
 * shark. `parts` must be filled in from what was actually drawn — the
 * animation layer reads it to decide what to sway.
 */

export type RarityTier = "common" | "uncommon" | "rare";

/** The part group classes the animation layer knows how to move. */
export const ANIMATABLE_PARTS = [
  "part-tail",
  "part-fin",
  "part-body",
  "part-tentacles",
  "part-arms",
] as const;

export type AnimatablePart = (typeof ANIMATABLE_PARTS)[number];

export interface CreatureDef {
  /** Matches the SVG filename, kebab-case. */
  slug: string;
  /** Teacher-facing, sentence case. */
  name: string;
  tier: RarityTier;
  /** Intended px width against a 1920px-wide Scene. */
  width: number;
  /** The part-* classes actually present in the artwork. */
  parts: AnimatablePart[];
}

export const REEF_ROSTER: CreatureDef[] = [
  // Common
  {
    slug: "clownfish",
    name: "Clownfish",
    tier: "common",
    width: 70,
    parts: [],
  },
  {
    slug: "blue-tang",
    name: "Blue tang",
    tier: "common",
    width: 80,
    parts: [],
  },
  {
    slug: "angelfish",
    name: "Angelfish",
    tier: "common",
    width: 75,
    parts: [],
  },
  { slug: "seahorse", name: "Seahorse", tier: "common", width: 45, parts: [] },
  { slug: "starfish", name: "Starfish", tier: "common", width: 55, parts: [] },
  { slug: "crab", name: "Crab", tier: "common", width: 60, parts: [] },
  { slug: "shrimp", name: "Shrimp", tier: "common", width: 40, parts: [] },
  {
    slug: "parrotfish",
    name: "Parrotfish",
    tier: "common",
    width: 90,
    parts: [],
  },
  {
    slug: "pufferfish",
    name: "Pufferfish",
    tier: "common",
    width: 65,
    parts: [],
  },

  // Uncommon
  { slug: "octopus", name: "Octopus", tier: "uncommon", width: 110, parts: [] },
  {
    slug: "sea-turtle",
    name: "Sea turtle",
    tier: "uncommon",
    width: 130,
    parts: [],
  },
  {
    slug: "moray-eel",
    name: "Moray eel",
    tier: "uncommon",
    width: 140,
    parts: [],
  },
  {
    slug: "stingray",
    name: "Stingray",
    tier: "uncommon",
    width: 120,
    parts: [],
  },
  {
    slug: "jellyfish-bloom",
    name: "Jellyfish bloom",
    tier: "uncommon",
    width: 100,
    parts: [],
  },
  {
    slug: "cuttlefish",
    name: "Cuttlefish",
    tier: "uncommon",
    width: 85,
    parts: [],
  },

  // Rare — the jackpot. One each per Session, at most.
  {
    slug: "hammerhead-shark",
    name: "Hammerhead shark",
    tier: "rare",
    width: 220,
    parts: [],
  },
  { slug: "manta-ray", name: "Manta ray", tier: "rare", width: 280, parts: [] },
  {
    slug: "whale-shark",
    name: "Whale shark",
    tier: "rare",
    width: 340,
    parts: [],
  },
];
