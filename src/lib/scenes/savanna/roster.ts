/**
 * The savanna Roster: every Creature that can appear in this Scene.
 *
 * Slugs match the SVG filenames in `./creatures/`; `width` is the intended
 * on-screen width against a 1920px-wide Scene, and is what keeps a meerkat
 * small next to an elephant. `parts` lists the part-* classes actually
 * present in each file — the animation layer reads it to decide what to move.
 *
 * Ground animals stand with their feet on the bottom edge of their viewBox,
 * because the ground motions put the bottom of the box on the ground line.
 */

import type { CreatureDef } from "$lib/scenes/types";

export const SAVANNA_ROSTER: CreatureDef[] = [
  // Common
  {
    slug: "meerkat",
    name: "Meerkat",
    tier: "common",
    width: 36,
    motion: "trot",
    parts: [],
  },
  {
    slug: "warthog",
    name: "Warthog",
    tier: "common",
    width: 88,
    motion: "graze",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "zebra",
    name: "Zebra",
    tier: "common",
    width: 120,
    motion: "graze",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "gazelle",
    name: "Thomson's gazelle",
    tier: "common",
    width: 76,
    motion: "graze",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "ostrich",
    name: "Ostrich",
    tier: "common",
    width: 100,
    motion: "trot",
    parts: ["part-tail", "part-wings"],
  },
  {
    slug: "guinea-fowl",
    name: "Guinea fowl",
    tier: "common",
    width: 52,
    motion: "trot",
    parts: ["part-head"],
  },
  {
    slug: "tortoise",
    name: "Tortoise",
    tier: "common",
    width: 56,
    motion: "creep",
    parts: ["part-tail", "part-head"],
  },
  {
    slug: "hornbill",
    name: "Hornbill",
    tier: "common",
    width: 60,
    motion: "soar",
    parts: ["part-tail", "part-wings"],
  },

  // Uncommon
  {
    slug: "giraffe",
    name: "Giraffe",
    tier: "uncommon",
    width: 120,
    motion: "graze",
    parts: ["part-tail", "part-ears", "part-head"],
  },
  {
    slug: "hippo",
    name: "Hippo",
    tier: "uncommon",
    width: 160,
    motion: "graze",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "rhino",
    name: "Rhino",
    tier: "uncommon",
    width: 168,
    motion: "graze",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "cheetah",
    name: "Cheetah",
    tier: "uncommon",
    width: 136,
    motion: "trot",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "flamingo",
    name: "Flamingo",
    tier: "uncommon",
    width: 60,
    motion: "graze",
    parts: ["part-head"],
  },
  {
    slug: "vulture",
    name: "Vulture",
    tier: "uncommon",
    width: 120,
    motion: "soar",
    parts: ["part-wings"],
  },

  // Rare — the jackpot. One each per Session, at most.
  {
    slug: "lion",
    name: "Lion",
    tier: "rare",
    width: 176,
    motion: "trot",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "leopard",
    name: "Leopard",
    tier: "rare",
    width: 160,
    motion: "trot",
    parts: ["part-tail", "part-ears"],
  },
  {
    slug: "elephant",
    name: "Elephant",
    tier: "rare",
    width: 240,
    motion: "graze",
    parts: ["part-tail", "part-fin"],
  },
];
