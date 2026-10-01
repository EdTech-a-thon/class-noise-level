/**
 * The Scenes a teacher can choose between. Each one brings its own Roster,
 * artwork and Ambient Life; everything else — the Session, the arrival clock,
 * Too Loud — is shared and does not know which Scene is on screen.
 */

import type { Component } from "svelte";
import type { Ink, NoteBox } from "$lib/notes/notes.svelte";
import {
  cloudShape,
  PEN_COLOURS,
  rectOf,
  signShape,
  type Rect,
} from "./noteArt";
import ForestAmbient from "./forest/AmbientLife.svelte";
import * as forestArt from "./forest/artwork";
import { FOREST_NOTE } from "./forest/note";
import { FOREST_ROSTER } from "./forest/roster";
import type { DepartureStyle } from "./motion";
import PrehistoricAmbient from "./prehistoric/AmbientLife.svelte";
import * as prehistoricArt from "./prehistoric/artwork";
import { PREHISTORIC_NOTE } from "./prehistoric/note";
import { PREHISTORIC_ROSTER } from "./prehistoric/roster";
import ReefAmbient from "./reef/AmbientLife.svelte";
import * as reefArt from "./reef/artwork";
import ReefNoteArt from "./reef/NoteArt.svelte";
import { REEF_ROSTER } from "./reef/roster";
import SavannaAmbient from "./savanna/AmbientLife.svelte";
import * as savannaArt from "./savanna/artwork";
import SavannaNoteArt from "./savanna/NoteArt.svelte";
import { SAVANNA_ROSTER } from "./savanna/roster";
import SpaceAmbient from "./space/AmbientLife.svelte";
import * as spaceArt from "./space/artwork";
import { SPACE_NOTE } from "./space/note";
import { SPACE_ROSTER } from "./space/roster";
import type { CreatureDef, SceneId } from "./types";

export type { SceneId };

/** How a Scene draws a Note. See `scenes/noteArt.ts`. */
export interface NoteLook {
  /** Drawn behind the writing, at the Note's size in pixels. */
  Art: Component<{ width: number; height: number }>;
  /** Where the writing fits inside the artwork, in the same pixels. */
  writing: (width: number, height: number) => Rect;
  /**
   * The inside of the artwork, in the same pixels: what the pen draws on.
   * Round it is the artwork's border, a frame or a rim, which is what the
   * teacher grabs to move and resize the Note. It holds the writing.
   */
  surface: (width: number, height: number) => Rect;
  /** The pens, with `dark` chosen to suit the artwork. */
  inks: Record<Ink, string>;
  /** Where a new Note goes, as fractions of the screen. */
  home: NoteBox;
}

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
  /**
   * How Creatures leave when Too Loud makes them Run Away: animals bolt off
   * the edge, while what a telescope picks up fades out into static. Who
   * leaves, and when, is the Session's, and the same in every Scene.
   */
  departure: DepartureStyle;
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
      // A cloud has no frame: its puffs round the words are its border.
      surface: (width, height) => cloudShape(width, height).writing,
      inks: { dark: "#2b2b3a", ...PEN_COLOURS },
      home: { x: 0.3, y: 0.1, width: 0.4, height: 0.3 },
    },
    departure: "run",
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
      // The painted board; the wooden frame round it is the border.
      surface: (width, height) => rectOf(signShape(width, height).panel),
      inks: { dark: "#4a2c17", ...PEN_COLOURS },
      home: { x: 0.3, y: 0.14, width: 0.4, height: 0.3 },
    },
    departure: "run",
  },
  space: {
    id: "space",
    roster: SPACE_ROSTER,
    creatureArt: spaceArt.CREATURE_ART,
    ambientArt: spaceArt.AMBIENT_ART,
    Ambient: SpaceAmbient,
    // Nothing out here is seen through water, and a planet the stars showed
    // through would look like a hologram.
    depthFade: false,
    departure: "fade",
    note: SPACE_NOTE,
  },
  prehistoric: {
    id: "prehistoric",
    roster: PREHISTORIC_ROSTER,
    creatureArt: prehistoricArt.CREATURE_ART,
    ambientArt: prehistoricArt.AMBIENT_ART,
    Ambient: PrehistoricAmbient,
    depthFade: false,
    departure: "run",
    note: PREHISTORIC_NOTE,
  },
  forest: {
    id: "forest",
    roster: FOREST_ROSTER,
    creatureArt: forestArt.CREATURE_ART,
    ambientArt: forestArt.AMBIENT_ART,
    Ambient: ForestAmbient,
    depthFade: false,
    departure: "run",
    note: FOREST_NOTE,
  },
};
