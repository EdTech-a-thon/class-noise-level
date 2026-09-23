/**
 * Wiring: microphone → room monitor → session.
 *
 * One clock drives everything, so the level the meter shows, the state the
 * pill shows and the progress the arrival clock banks can never disagree.
 */

import { Microphone } from "$lib/audio/microphone.svelte";
import { RoomMonitor } from "$lib/noise/roomMonitor.svelte";
import { REEF_ROSTER } from "$lib/scenes/reef/roster";
import { Session } from "$lib/session/session.svelte";
import { settings } from "$lib/settings/settings.svelte";
import { untrack } from "svelte";

export class App {
  microphone = new Microphone();
  monitor = new RoomMonitor();
  session = new Session(REEF_ROSTER, settings.arrivalIntervalMs);

  #frame = 0;
  #lastTick = 0;

  /** True once the microphone has failed in a way the teacher must resolve. */
  get blocked() {
    return ["denied", "missing", "unsupported"].includes(
      this.microphone.status,
    );
  }

  get listening() {
    return this.microphone.status === "on";
  }

  async connect() {
    // Note what is *not* saved here: the resolved hardware id. `deviceId` is
    // the teacher's choice, and "" means "whatever this computer calls the
    // default". Writing the concrete id back would change the setting on
    // every reload — which silently discards the calibration attached to it —
    // and would pin the app to an exact device that may not exist next week.
    const started = await this.microphone.start(settings.deviceId);
    if (started) this.monitor.reset();
    return started;
  }

  async selectDevice(deviceId: string) {
    this.microphone.stop();
    // Setting this clears any calibration: it belonged to the old microphone.
    settings.deviceId = deviceId;
    this.monitor.reset();
    await this.microphone.start(deviceId);
  }

  startSession() {
    this.monitor.reset();
    this.session.start(settings.arrivalIntervalMs);
  }

  resetSession() {
    this.session.reset(settings.arrivalIntervalMs);
  }

  /** Drive the loop. Returns a teardown for $effect. */
  run() {
    // Untracked so the page's $effect never re-runs (and tears down the
    // microphone) because of anything restoring touched.
    untrack(() => this.session.restore());
    this.#lastTick = performance.now();
    const step = () => {
      const now = performance.now();
      const delta = now - this.#lastTick;
      this.#lastTick = now;

      if (this.microphone.status === "on") {
        this.monitor.observe(
          this.microphone.levelWith(settings.calibration),
          settings.volumeGoal,
          now,
        );
        this.session.tick(
          delta,
          this.monitor.state === "quiet",
          settings.arrivalIntervalMs,
        );
      }
      this.#frame = requestAnimationFrame(step);
    };
    this.#frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(this.#frame);
      this.microphone.stop();
    };
  }
}
