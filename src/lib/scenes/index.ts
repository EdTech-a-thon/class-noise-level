/**
 * The Scenes a teacher can choose between. Each one brings its own Roster,
 * artwork and Ambient Life; everything else — the Session, the arrival clock,
 * Too Loud — is shared and does not know which Scene is on screen.
 */

import type { Component } from "svelte";
import type { Ink, NoteBox } from "$lib/notes/notes.svelte";
import { cloudShape, signShape, type Rect } from "./noteArt";
import ReefAmbient from "./reef/AmbientLife.svelte";
import * as reefArt from "./reef/artwork";
import ReefNoteArt from "./reef/NoteArt.svelte";
import { REEF_ROSTER } from "./reef/roster";
import SavannaAmbient from "./savanna/AmbientLife.svelte";
import * as savannaArt from "./savanna/artwork";
import SavannaNoteArt from "./savanna/NoteArt.svelte";
import { SAVANNA_ROSTER } from "./savanna/roster";
import type { CreatureDef, SceneId } from "./types";

export type { SceneId };

/** How a Scene draws a Note. See `scenes/noteArt.ts`. */
export interface NoteLook {
  /** Drawn behind the writing, at the Note's size in pixels. */
  Art: Component<{ width: number; height: number }>;
  /** Where the writing fits inside the artwork, in the same pixels. */
  writing: (width: number, height: number) => Rect;
  /** The pens, with `dark` chosen to suit the artwork. */
  inks: Record<Ink, string>;
  /** Where a new Note goes, as fractions of the screen. */
  home: NoteBox;
}

/** Bright enough to pick out, dark enough to read on cream or on wood. */
const PEN_COLOURS = { red: "#d62f4b", blue: "#1f63b5", green: "#23804a" };

export interface SceneDef {
  id: SceneId;
  roster: CreatureDef[];
  creatureArt: Record<string, string>;
  ambientArt: Record<string, string>;
  Ambient: Component;
  /**
   * Far Creatures fade into the water. Right underwater; on open land it
   * just makes a giraffe show through the elephant in front of it.
   */
  depthFade: boolean;
  note: NoteLook;
}

export const SCENES: Record<SceneId, SceneDef> = {
  savanna: {
    id: "savanna",
    roster: SAVANNA_ROSTER,
    creatureArt: savannaArt.CREATURE_ART,
    ambientArt: savannaArt.AMBIENT_ART,
    Ambient: SavannaAmbient,
    depthFade: false,
    // A cloud up in the sky, clear of the sun and of where the animals walk.
    note: {
      Art: SavannaNoteArt,
      writing: (width, height) => cloudShape(width, height).writing,
      inks: { dark: "#2b2b3a", ...PEN_COLOURS },
      home: { x: 0.3, y: 0.1, width: 0.4, height: 0.3 },
    },
  },
  reef: {
    id: "reef",
    roster: REEF_ROSTER,
    creatureArt: reefArt.CREATURE_ART,
    ambientArt: reefArt.AMBIENT_ART,
    Ambient: ReefAmbient,
    depthFade: true,
    // A sign hanging in open water, above the coral.
    note: {
      Art: ReefNoteArt,
      writing: (width, height) => signShape(width, height).writing,
      inks: { dark: "#4a2c17", ...PEN_COLOURS },
      home: { x: 0.3, y: 0.14, width: 0.4, height: 0.3 },
    },
  },
};
