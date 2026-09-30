/**
 * The teacher's Classes, remembered on this computer.
 *
 * Each Class keeps its own animals in every Scene and its own Collection, so
 * second period never inherits what third period earned, and Reset only
 * empties the Class on screen. Settings — the microphone, calibration, goal
 * and Arrival Rate — belong to the room, not the class, and stay shared.
 *
 * Everything a Class keeps is stored under its own prefix, so deleting it is
 * a matter of removing every key that starts with it.
 */

import { browser } from "$app/environment";
import { SCENE_IDS } from "$lib/scenes/types";
import {
  addClass,
  firstClassList,
  parseClassList,
  removeClass,
  renameClass,
  selectClass,
  type ClassList,
} from "./classList";

const STORAGE_KEY = "class-noise-level:classes";

function prefix(classId: string) {
  return `class-noise-level:class:${classId}:`;
}

function newId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Before there were Classes, the animals and the Collection were kept under
 * un-prefixed keys. They become the first Class's, so nothing is lost.
 */
function adoptUnprefixed(classId: string) {
  for (const part of [...SCENE_IDS, "sightings"]) {
    const old = `class-noise-level:${part}`;
    const saved = localStorage.getItem(old);
    if (saved === null) continue;
    localStorage.setItem(prefix(classId) + part, saved);
    localStorage.removeItem(old);
  }
}

function load(): ClassList {
  if (!browser) return firstClassList(newId());
  try {
    const saved = parseClassList(
      JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"),
    );
    if (saved) return saved;
    const list = firstClassList(newId());
    adoptUnprefixed(list.currentId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
  } catch {
    // Browsing privately: one Class for this visit, forgotten on refresh.
    return firstClassList(newId());
  }
}

class Classes {
  #list = $state<ClassList>(load());

  get all() {
    return this.#list.classes;
  }

  get currentId() {
    return this.#list.currentId;
  }

  get current() {
    return this.all.find((info) => info.id === this.currentId)!;
  }

  /** Where the Class on screen keeps `part` (a Scene's animals, say). */
  storageKey(part: string) {
    return prefix(this.currentId) + part;
  }

  select(id: string) {
    this.#set(selectClass(this.#list, id));
  }

  add(name: string) {
    this.#set(addClass(this.#list, newId(), name));
  }

  rename(id: string, name: string) {
    this.#set(renameClass(this.#list, id, name));
  }

  /** Deletes the Class and everything it kept. There is no undo. */
  remove(id: string) {
    this.#set(removeClass(this.#list, id, newId()));
    if (!browser) return;
    try {
      const doomed = prefix(id);
      const keys = Array.from({ length: localStorage.length }, (_, index) =>
        localStorage.key(index),
      );
      for (const key of keys) {
        if (key?.startsWith(doomed)) localStorage.removeItem(key);
      }
    } catch {
      // Nothing was saved to remove.
    }
  }

  #set(list: ClassList) {
    this.#list = list;
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // Browsing privately: the Classes still work, just not across a refresh.
    }
  }
}

export const classes = new Classes();
