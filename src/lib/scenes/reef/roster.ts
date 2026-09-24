/**
 * The reef Roster: every Creature that can appear in this Scene.
 *
 * This file is co-owned with the art task (docs/svg-art-brief.md). Slugs match
 * the SVG filenames; `width` is the intended on-screen width against a
 * 1920px-wide Scene, and is what keeps a clownfish small next to a whale
 * shark. `parts` must be filled in from what was actually drawn — the
 * animation layer reads it to decide what to sway.
 */

import type { CreatureDef } from "$lib/scenes/types";

export const REEF_ROSTER: CreatureDef[] = [
  // Common
  {
    slug: "clownfish",
    name: "Clownfish",
    tier: "common",
    width: 70,
    motion: "cruise",
    parts: ["part-tail", "part-fin"],
  },
  {
    slug: "blue-tang",
    name: "Blue tang",
    tier: "common",
    width: 80,
    motion: "cruise",
    parts: ["part-tail", "part-fin"],
  },
  {
    slug: "angelfish",
    name: "Angelfish",
    tier: "common",
    width: 75,
    motion: "cruise",
    parts: ["part-tail", "part-fin"],
  },
  {
    slug: "seahorse",
    name: "Seahorse",
    tier: "common",
    width: 45,
    motion: "hover",
    parts: ["part-fin"],
  },
  {
    slug: "starfish",
    name: "Starfish",
    tier: "common",
    width: 55,
    motion: "creep",
    parts: [],
  },
  {
    slug: "crab",
    name: "Crab",
    tier: "common",
    width: 60,
    motion: "scuttle",
    parts: ["part-arms"],
  },
  {
    slug: "shrimp",
    name: "Shrimp",
    tier: "common",
    width: 40,
    motion: "dart",
    parts: ["part-tail"],
  },
  {
    slug: "parrotfish",
    name: "Parrotfish",
    tier: "common",
    width: 90,
    motion: "cruise",
    parts: ["part-tail", "part-fin"],
  },
  {
    slug: "pufferfish",
    name: "Pufferfish",
    tier: "common",
    width: 65,
    motion: "hover",
    parts: ["part-tail", "part-fin"],
  },

  // Uncommon
  {
    slug: "octopus",
    name: "Octopus",
    tier: "uncommon",
    width: 110,
    motion: "jet",
    parts: ["part-tentacles"],
  },
  {
    slug: "sea-turtle",
    name: "Sea turtle",
    tier: "uncommon",
    width: 130,
    motion: "glide",
    parts: ["part-fin"],
  },
  {
    slug: "moray-eel",
    name: "Moray eel",
    tier: "uncommon",
    width: 140,
    motion: "prowl",
    parts: ["part-body"],
  },
  {
    slug: "stingray",
    name: "Stingray",
    tier: "uncommon",
    width: 120,
    motion: "prowl",
    parts: ["part-tail"],
  },
  {
    slug: "jellyfish-bloom",
    name: "Jellyfish bloom",
    tier: "uncommon",
    width: 100,
    motion: "drift",
    parts: ["part-tentacles"],
  },
  {
    slug: "cuttlefish",
    name: "Cuttlefish",
    tier: "uncommon",
    width: 85,
    motion: "jet",
    parts: ["part-fin"],
  },

  // Rare — the jackpot. One each per Session, at most.
  {
    slug: "hammerhead-shark",
    name: "Hammerhead shark",
    tier: "rare",
    width: 220,
    motion: "glide",
    parts: ["part-tail", "part-fin"],
  },
  {
    slug: "manta-ray",
    name: "Manta ray",
    tier: "rare",
    width: 280,
    motion: "glide",
    parts: ["part-tail"],
  },
  {
    slug: "whale-shark",
    name: "Whale shark",
    tier: "rare",
    width: 340,
    motion: "glide",
    parts: ["part-tail", "part-fin"],
  },
];
