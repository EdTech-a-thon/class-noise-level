/**
 * The Scenes a teacher can choose between. Each one brings its own Roster,
 * artwork and Ambient Life; everything else — the Session, the arrival clock,
 * Too Loud — is shared and does not know which Scene is on screen.
 */

import type { Component } from "svelte";
import ReefAmbient from "./reef/AmbientLife.svelte";
import * as reefArt from "./reef/artwork";
import { REEF_ROSTER } from "./reef/roster";
import SavannaAmbient from "./savanna/AmbientLife.svelte";
import * as savannaArt from "./savanna/artwork";
import { SAVANNA_ROSTER } from "./savanna/roster";
import type { CreatureDef, SceneId } from "./types";

export type { SceneId };

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
}

export const SCENES: Record<SceneId, SceneDef> = {
  savanna: {
    id: "savanna",
    roster: SAVANNA_ROSTER,
    creatureArt: savannaArt.CREATURE_ART,
    ambientArt: savannaArt.AMBIENT_ART,
    Ambient: SavannaAmbient,
    depthFade: false,
  },
  reef: {
    id: "reef",
    roster: REEF_ROSTER,
    creatureArt: reefArt.CREATURE_ART,
    ambientArt: reefArt.AMBIENT_ART,
    Ambient: ReefAmbient,
    depthFade: true,
  },
};
