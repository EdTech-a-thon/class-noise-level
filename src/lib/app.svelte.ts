/**
 * Wiring: microphone → room monitor → session.
 *
 * One clock drives everything, so the level the meter shows, the state the
 * pill shows and the progress the arrival clock banks can never disagree.
 */

import { CHIME_MS, playChime } from "$lib/audio/chime";
import { Microphone, SMOOTHING_MS } from "$lib/audio/microphone.svelte";
import { RoomMonitor } from "$lib/noise/roomMonitor.svelte";
import { SCENES } from "$lib/scenes";
import { DEFAULT_SCENE, type SceneId } from "$lib/scenes/types";
import { Session } from "$lib/session/session.svelte";
import { settings } from "$lib/settings/settings.svelte";
import { ClassTimer } from "$lib/timer/timer.svelte";
import { untrack } from "svelte";

/**
 * How long the microphone's level takes to forget a sound. It is smoothed
 * (`SMOOTHING_MS`), so the chime lingers in it after the room has gone
 * quiet again; three time constants leave only a twentieth of it.
 */
const CHIME_ECHO_MS = 3 * SMOOTHING_MS;

export class App {
  microphone = new Microphone();
  monitor = new RoomMonitor();
  /**
   * Starts on the default, not the teacher's choice, because the page is
   * prerendered with the default and hydration expects to find exactly that.
   * `run` switches to the saved choice once the page has mounted.
   */
  #sceneId = $state<SceneId>(DEFAULT_SCENE);
  /**
   * False until `run` has switched to the saved Scene. The page holds the
   * Scene back until then, so a reload never flashes the default first.
   */
  restored = $state(false);
  /**
   * True while the calibration popup is open. The class is being asked to
   * talk on purpose, so the room is not judged: the Scene must not go murky
   * and the arrival clock must not bank or lose progress.
   */
  calibrating = $state(false);
  timer = new ClassTimer(() => this.#ring());
  session = new Session(
    DEFAULT_SCENE,
    SCENES[DEFAULT_SCENE].roster,
    settings.arrivalIntervalMs,
  );

  #frame = 0;
  #lastTick = 0;
  /**
   * Until this time (on the frame clock), the room is not listened to. The
   * microphone cannot tell the Timer's chime from the class, and the class
   * must never be blamed, or lose an animal, for the teacher's own bell.
   */
  #hushUntil = 0;

  get scene() {
    return SCENES[this.#sceneId];
  }

  /** Switch Scene. Each keeps its own animals, so nothing earned is lost. */
  useScene(id: SceneId) {
    settings.scene = id;
    this.#sceneId = id;
    this.session.useScene(id, SCENES[id].roster);
  }

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

  /**
   * Pause or resume judging the room. Resuming starts the monitor afresh,
   * because the calibration may have just changed what every level means.
   */
  setCalibrating(active: boolean) {
    this.calibrating = active;
    this.monitor.reset();
  }

  startSession() {
    this.monitor.reset();
    this.session.start(settings.arrivalIntervalMs);
  }

  resetSession() {
    this.session.reset(settings.arrivalIntervalMs);
  }

  #ring() {
    playChime();
    this.#hushUntil = performance.now() + CHIME_MS + CHIME_ECHO_MS;
  }

  /** Drive the loop. Returns a teardown for $effect. */
  run() {
    // Untracked so the page's $effect never re-runs (and tears down the
    // microphone) because of anything restoring touched. Switching to the
    // saved Scene also brings back the animals it had.
    untrack(() => this.useScene(settings.scene));
    const stopTimer = untrack(() => this.timer.run());
    this.restored = true;
    this.#lastTick = performance.now();
    const step = () => {
      const now = performance.now();
      const delta = now - this.#lastTick;
      this.#lastTick = now;

      // While the chime rings the Scene simply holds, as while calibrating:
      // the bell cannot tip the room into Too Loud, and a class that falls
      // silent at it is not still losing animals to the noise before it.
      if (
        this.microphone.status === "on" &&
        !this.calibrating &&
        now >= this.#hushUntil
      ) {
        this.monitor.observe(
          this.microphone.levelWith(settings.calibration),
          settings.volumeGoal,
          now,
        );
        this.session.tick(
          delta,
          this.monitor.state === "quiet",
          settings.arrivalIntervalMs,
          settings.loudResponse === "flee",
        );
      }
      this.#frame = requestAnimationFrame(step);
    };
    this.#frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(this.#frame);
      stopTimer();
      this.microphone.stop();
    };
  }
}
