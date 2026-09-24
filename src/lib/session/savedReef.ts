/**
 * The Creatures present, remembered on this computer until Reset.
 *
 * A refresh — an accidental one, or the laptop going to sleep — should not
 * empty a reef the class spent the lesson earning. Only Reset does that. The
 * arrival clock is deliberately not kept: a refresh costs at most the progress
 * towards the next Creature, never a Creature.
 *
 * Stored by slug rather than as the whole definition, so a change to the
 * Roster (a new width, a new motion style) applies to Creatures already saved.
 *
 * Each Scene keeps its own, so switching to the savanna and back never costs
 * the class the reef they earned. The reef's key predates the savanna and is
 * kept as it was so reefs saved before then still come back.
 */

import { browser } from "$app/environment";
import type { CreatureDef } from "$lib/scenes/types";
import type { CreatureInstance } from "./session.svelte";

function storageKey(sceneId: string) {
  return `class-noise-level:${sceneId}`;
}

interface SavedCreature {
  id: number;
  slug: string;
  depth: number;
  spawnX: number;
  spawnY: number;
}

export function loadReef(
  sceneId: string,
  roster: CreatureDef[],
): CreatureInstance[] {
  if (!browser) return [];
  try {
    const raw = localStorage.getItem(storageKey(sceneId));
    if (!raw) return [];
    const saved = JSON.parse(raw) as SavedCreature[];
    if (!Array.isArray(saved)) return [];
    return saved.flatMap(({ id, slug, depth, spawnX, spawnY }) => {
      // A Creature since dropped from the Roster just does not come back.
      const def = roster.find((candidate) => candidate.slug === slug);
      return def ? [{ id, def, depth, spawnX, spawnY }] : [];
    });
  } catch {
    return [];
  }
}

export function saveReef(sceneId: string, creatures: CreatureInstance[]) {
  if (!browser) return;
  try {
    if (creatures.length === 0) {
      localStorage.removeItem(storageKey(sceneId));
      return;
    }
    const saved: SavedCreature[] = creatures.map(
      ({ id, def, depth, spawnX, spawnY }) => ({
        id,
        slug: def.slug,
        depth,
        spawnX,
        spawnY,
      }),
    );
    localStorage.setItem(storageKey(sceneId), JSON.stringify(saved));
  } catch {
    // Browsing privately: the reef still fills, it just forgets on refresh.
  }
}
