/**
 * Everything the teacher chooses, remembered on this computer.
 *
 * Per the workspace AGENTS.md data hierarchy this is localStorage and nothing
 * more: no accounts, no backend, nothing leaves the device. Only settings are
 * kept — what a class saw in a Session dies with the Session.
 */

import { browser } from "$app/environment";
import type { Calibration } from "$lib/audio/calibration";

export type VolumeGoalPreset = "silent" | "independent" | "partner" | "custom";
export type ArrivalRatePreset = "relaxed" | "normal" | "lively";

export const VOLUME_GOAL_PRESETS: Record<
  Exclude<VolumeGoalPreset, "custom">,
  { label: string; hint: string; goal: number }
> = {
  silent: { label: "Silent", hint: "No talking at all", goal: 15 },
  independent: { label: "Independent", hint: "Quiet whispers only", goal: 30 },
  partner: { label: "Partner work", hint: "Conversation voices", goal: 50 },
};

export const ARRIVAL_RATE_PRESETS: Record<
  ArrivalRatePreset,
  { label: string; hint: string; intervalMs: number }
> = {
  relaxed: {
    label: "Relaxed",
    hint: "about one animal every 8 minutes",
    intervalMs: 8 * 60_000,
  },
  normal: {
    label: "Normal",
    hint: "about one animal every 5 minutes",
    intervalMs: 5 * 60_000,
  },
  lively: {
    label: "Lively",
    hint: "about one animal every 2 minutes",
    intervalMs: 2 * 60_000,
  },
};

const STORAGE_KEY = "class-noise-level:settings";

interface StoredSettings {
  deviceId: string;
  calibration: Calibration | null;
  volumeGoalPreset: VolumeGoalPreset;
  volumeGoal: number;
  arrivalRatePreset: ArrivalRatePreset;
}

const DEFAULTS: StoredSettings = {
  deviceId: "",
  calibration: null,
  volumeGoalPreset: "independent",
  volumeGoal: VOLUME_GOAL_PRESETS.independent.goal,
  arrivalRatePreset: "normal",
};

function read(): StoredSettings {
  if (!browser) return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<StoredSettings>) }
      : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

class Settings {
  #stored = $state<StoredSettings>(read());

  #save() {
    if (!browser) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.#stored));
    } catch {
      // A teacher browsing privately still gets a working app, just a
      // forgetful one. Losing settings is not worth breaking the Session for.
    }
  }

  get deviceId() {
    return this.#stored.deviceId;
  }

  set deviceId(value: string) {
    if (value === this.#stored.deviceId) return;
    // A calibration belongs to the microphone it was measured on, so
    // switching device throws it away rather than silently misreading.
    this.#stored = { ...this.#stored, deviceId: value, calibration: null };
    this.#save();
  }

  get calibration() {
    return this.#stored.calibration;
  }

  set calibration(value: Calibration | null) {
    this.#stored = { ...this.#stored, calibration: value };
    this.#save();
  }

  get volumeGoal() {
    return this.#stored.volumeGoal;
  }

  get volumeGoalPreset() {
    return this.#stored.volumeGoalPreset;
  }

  useVolumeGoalPreset(preset: Exclude<VolumeGoalPreset, "custom">) {
    this.#stored = {
      ...this.#stored,
      volumeGoalPreset: preset,
      volumeGoal: VOLUME_GOAL_PRESETS[preset].goal,
    };
    this.#save();
  }

  setVolumeGoal(goal: number) {
    const clamped = Math.max(1, Math.min(99, Math.round(goal)));
    const matching = (
      Object.keys(VOLUME_GOAL_PRESETS) as Exclude<VolumeGoalPreset, "custom">[]
    ).find((preset) => VOLUME_GOAL_PRESETS[preset].goal === clamped);
    this.#stored = {
      ...this.#stored,
      volumeGoal: clamped,
      volumeGoalPreset: matching ?? "custom",
    };
    this.#save();
  }

  get arrivalRatePreset() {
    return this.#stored.arrivalRatePreset;
  }

  set arrivalRatePreset(preset: ArrivalRatePreset) {
    this.#stored = { ...this.#stored, arrivalRatePreset: preset };
    this.#save();
  }

  get arrivalIntervalMs() {
    return ARRIVAL_RATE_PRESETS[this.#stored.arrivalRatePreset].intervalMs;
  }
}

export const settings = new Settings();
