/**
 * Wiring: microphone → room monitor → session.
 *
 * One clock drives everything, so the level the meter shows, the state the
 * pill shows and the progress the arrival clock banks can never disagree.
 */

import { Microphone } from "$lib/audio/microphone.svelte";
import { classes } from "$lib/classes/classes.svelte";
import { RoomMonitor } from "$lib/noise/roomMonitor.svelte";
import { SCENES } from "$lib/scenes";
import { DEFAULT_SCENE, type SceneId } from "$lib/scenes/types";
import { Session } from "$lib/session/session.svelte";
import { sightings } from "$lib/session/sightings.svelte";
import { settings } from "$lib/settings/settings.svelte";
import { untrack } from "svelte";

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
  /**
   * True while the teacher has paused the Session, say to make an
   * announcement. The room is not judged, just as while calibrating, so the
   * teacher talking never scares an animal away or costs arrival progress,
   * and nothing new arrives while the class is listening.
   */
  paused = $state(false);
  session = new Session(
    DEFAULT_SCENE,
    SCENES[DEFAULT_SCENE].roster,
    settings.arrivalIntervalMs,
  );

  #frame = 0;
  #lastTick = 0;

  get scene() {
    return SCENES[this.#sceneId];
  }

  /** Switch Scene. Each keeps its own animals, so nothing earned is lost. */
  useScene(id: SceneId) {
    settings.scene = id;
    this.#sceneId = id;
    this.session.useScene(id, SCENES[id].roster);
  }

  /**
   * Switch Class, say when third period arrives. Its animals and Collection
   * come back; the Session waits for Start, so the new class begins together.
   */
  useClass(id: string) {
    if (id === classes.currentId) return;
    classes.select(id);
    this.#enterClass();
  }

  /** Add a Class and switch to it: it is being made to be used. */
  addClass(name: string) {
    const before = classes.currentId;
    classes.add(name);
    if (classes.currentId !== before) this.#enterClass();
  }

  /** Delete a Class for good. If it is the one on screen, another takes over. */
  deleteClass(id: string) {
    const wasCurrent = id === classes.currentId;
    classes.remove(id);
    if (wasCurrent) this.#enterClass();
  }

  #enterClass() {
    sightings.reload();
    this.monitor.reset();
    this.session.useClass(settings.arrivalIntervalMs);
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

  /**
   * Pause or resume the Session. Pausing lifts any haze at once; resuming
   * starts the monitor afresh, so noise from before the pause is forgotten.
   */
  setPaused(paused: boolean) {
    this.paused = paused;
    this.monitor.reset();
  }

  startSession() {
    this.paused = false;
    this.monitor.reset();
    this.session.start(settings.arrivalIntervalMs);
  }

  resetSession() {
    this.paused = false;
    this.session.reset(settings.arrivalIntervalMs);
  }

  /** Drive the loop. Returns a teardown for $effect. */
  run() {
    // Untracked so the page's $effect never re-runs (and tears down the
    // microphone) because of anything restoring touched. Switching to the
    // saved Scene also brings back the animals it had.
    untrack(() => this.useScene(settings.scene));
    this.restored = true;
    this.#lastTick = performance.now();
    const step = () => {
      const now = performance.now();
      const delta = now - this.#lastTick;
      this.#lastTick = now;

      if (
        this.microphone.status === "on" &&
        !this.calibrating &&
        !this.paused
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
      this.microphone.stop();
    };
  }
}
