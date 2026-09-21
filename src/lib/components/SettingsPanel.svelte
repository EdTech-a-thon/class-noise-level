<script lang="ts">
  /**
   * Everything the teacher can change, in one panel used both before and
   * during a Session.
   *
   * Opening it does not pause the Session: the reason to adjust the goal
   * mid-lesson is that the room is live and you want to watch the meter react
   * to it.
   */

  import type { App } from "$lib/app.svelte";
  import {
    ARRIVAL_RATE_PRESETS,
    VOLUME_GOAL_PRESETS,
    settings,
    type ArrivalRatePreset,
    type VolumeGoalPreset,
  } from "$lib/settings/settings.svelte";
  import Calibration from "./Calibration.svelte";
  import LevelMeter from "./LevelMeter.svelte";

  let { app, onclose }: { app: App; onclose: () => void } = $props();

  const goalPresets = Object.entries(VOLUME_GOAL_PRESETS) as [
    Exclude<VolumeGoalPreset, "custom">,
    (typeof VOLUME_GOAL_PRESETS)["silent"],
  ][];
  const ratePresets = Object.entries(ARRIVAL_RATE_PRESETS) as [
    ArrivalRatePreset,
    (typeof ARRIVAL_RATE_PRESETS)["normal"],
  ][];
</script>

<div
  class="absolute inset-0 z-50 flex justify-end bg-slate-900/40"
  role="presentation"
  onclick={(event) => event.target === event.currentTarget && onclose()}
>
  <aside
    class="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-xl"
    aria-label="Settings"
  >
    <div class="flex items-start justify-between">
      <h1 class="text-xl font-semibold text-slate-900">Settings</h1>
      <button
        class="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
        onclick={onclose}>Close</button
      >
    </div>

    <section class="mt-6 space-y-3">
      <h2 class="text-sm font-semibold tracking-wide text-slate-500 uppercase">
        Microphone
      </h2>
      <select
        class="w-full rounded-md border border-slate-300 px-3 py-2"
        value={settings.deviceId}
        onchange={(event) => app.selectDevice(event.currentTarget.value)}
      >
        <option value="">Default microphone</option>
        {#each app.microphone.devices.filter((device) => device.deviceId) as device, index (device.deviceId)}
          <option value={device.deviceId}>
            {device.label || `Microphone ${index + 1}`}
          </option>
        {/each}
      </select>
      {#if app.microphone.status !== "on"}
        <button
          class="rounded-md border border-slate-400 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          onclick={() => app.connect()}
        >
          {app.microphone.status === "starting"
            ? "Connecting…"
            : "Connect microphone"}
        </button>
      {/if}
    </section>

    <section class="mt-6 space-y-3">
      <h2 class="text-sm font-semibold tracking-wide text-slate-500 uppercase">
        How loud is too loud
      </h2>
      <LevelMeter
        level={app.monitor.level}
        goal={settings.volumeGoal}
        tooLoud={app.monitor.state === "too-loud"}
        onGoalChange={(goal) => settings.setVolumeGoal(goal)}
      />
      <div class="grid grid-cols-3 gap-2">
        {#each goalPresets as [key, preset] (key)}
          <button
            class="rounded-md border px-2 py-2 text-left text-sm {settings.volumeGoalPreset ===
            key
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 hover:bg-slate-50'}"
            onclick={() => settings.useVolumeGoalPreset(key)}
          >
            <span class="block font-semibold">{preset.label}</span>
            <span class="block text-xs opacity-80">{preset.hint}</span>
          </button>
        {/each}
      </div>
      <Calibration
        microphone={app.microphone}
        calibration={settings.calibration}
        onCalibrated={(calibration) => (settings.calibration = calibration)}
      />
    </section>

    <section class="mt-6 space-y-3">
      <h2 class="text-sm font-semibold tracking-wide text-slate-500 uppercase">
        How often animals arrive
      </h2>
      <div class="grid grid-cols-3 gap-2">
        {#each ratePresets as [key, preset] (key)}
          <button
            class="rounded-md border px-2 py-2 text-left text-sm {settings.arrivalRatePreset ===
            key
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-300 hover:bg-slate-50'}"
            onclick={() => (settings.arrivalRatePreset = key)}
          >
            <span class="block font-semibold">{preset.label}</span>
            <span class="block text-xs opacity-80">{preset.hint}</span>
          </button>
        {/each}
      </div>
    </section>

    <p class="mt-6 text-xs text-slate-500">
      Settings are saved on this computer only. No account, no server, and the
      microphone audio never leaves the device.
    </p>
  </aside>
</div>
