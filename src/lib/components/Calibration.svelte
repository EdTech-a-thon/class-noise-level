<script lang="ts">
  /**
   * Two five-second samples — a silent room, then the class talking normally —
   * turned into the 0-100 scale everything else reasons about.
   *
   * Optional by design: a teacher opening this ninety seconds before a lesson
   * should never have to do it. It is the "make it accurate for my room"
   * upgrade, not a setup step.
   */

  import {
    makeCalibration,
    trimmedMean,
    type Calibration,
  } from "$lib/audio/calibration";
  import type { Microphone } from "$lib/audio/microphone.svelte";

  let {
    microphone,
    calibration,
    onCalibrated,
  }: {
    microphone: Microphone;
    calibration: Calibration | null;
    onCalibrated: (calibration: Calibration) => void;
  } = $props();

  const SAMPLE_SECONDS = 5;

  type Stage = "idle" | "quiet" | "ready" | "talking" | "done" | "retry";

  let stage = $state<Stage>("idle");
  let secondsLeft = $state(SAMPLE_SECONDS);
  let quietSample = $state(0);
  let samples: number[] = [];

  const sampling = $derived(stage === "quiet" || stage === "talking");
  /**
   * Without a running microphone every sample is zero, the two stages come
   * out identical, and the teacher gets told the room was not quiet enough —
   * a confident diagnosis of the wrong thing.
   */
  const ready = $derived(microphone.status === "on");

  // Collect while a sampling stage is running. Reading rawLevel is what makes
  // this effect re-run: it ticks at the microphone's publish rate.
  $effect(() => {
    if (!sampling) return;
    samples.push(microphone.rawLevel);
  });

  $effect(() => {
    if (!sampling) return;
    const stageAtStart = stage;
    samples = [];
    secondsLeft = SAMPLE_SECONDS;

    const countdown = setInterval(() => {
      secondsLeft = Math.max(0, secondsLeft - 1);
    }, 1000);

    const finish = setTimeout(() => {
      const average = trimmedMean(samples);
      if (stageAtStart === "quiet") {
        quietSample = average;
        stage = "ready";
        return;
      }
      const result = makeCalibration(quietSample, average);
      if (result) {
        onCalibrated(result);
        stage = "done";
      } else {
        stage = "retry";
      }
    }, SAMPLE_SECONDS * 1000);

    return () => {
      clearInterval(countdown);
      clearTimeout(finish);
    };
  });
</script>

<div class="rounded-lg bg-slate-100 p-4" aria-live="polite">
  {#if stage === "idle"}
    <p class="text-sm text-slate-700">
      <b>Calibrate this room.</b> Optional — the app works without it. Calibrating
      makes the meter match what quiet and talking actually sound like on this computer.
    </p>
    <button
      class="mt-3 rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
      disabled={!ready}
      onclick={() => (stage = "quiet")}
    >
      {calibration ? "Calibrate again" : "Start calibration"}
    </button>
    {#if !ready}
      <p class="mt-2 text-sm text-slate-600">
        Connect a microphone first — calibration needs to hear the room.
      </p>
    {/if}
  {:else if stage === "quiet"}
    <p class="text-sm text-slate-700">
      <b>Step 1 of 2:</b> keep the room silent for {secondsLeft} seconds…
    </p>
  {:else if stage === "ready"}
    <p class="text-sm text-slate-700">
      <b>Step 2 of 2:</b> ask the class to talk at a normal working volume.
    </p>
    <button
      class="mt-3 rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white"
      onclick={() => (stage = "talking")}
    >
      Measure normal voices
    </button>
  {:else if stage === "talking"}
    <p class="text-sm text-slate-700">
      <b>Listening:</b> keep talking normally for {secondsLeft} seconds…
    </p>
  {:else if stage === "done"}
    <p class="text-sm text-slate-700">
      Calibrated. The meter above now reads on this room's scale — check that
      the goal line still sits where you want it.
    </p>
    <button
      class="mt-3 rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium hover:bg-white"
      onclick={() => (stage = "idle")}
    >
      Done
    </button>
  {:else}
    <p class="text-sm text-slate-700">
      <b>Let's try that again.</b> Those two samples were too close together to tell
      apart — the room may not have been quiet, or the microphone may not be picking
      up the class.
    </p>
    <button
      class="mt-3 rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium hover:bg-white"
      onclick={() => (stage = "quiet")}
    >
      Restart calibration
    </button>
  {/if}
</div>
