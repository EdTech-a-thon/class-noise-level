<script lang="ts">
  /**
   * The microphone is the tool. When it is unavailable the app says so and
   * stops — it never quietly runs on a timer instead, because a reef filling
   * up beautifully while the room is in chaos would cost the teacher all
   * confidence in it.
   */

  import type { App } from "$lib/app.svelte";
  import { settings } from "$lib/settings/settings.svelte";

  let { app }: { app: App } = $props();

  const message = $derived(
    {
      denied:
        "This browser blocked access to the microphone. Click the padlock or camera icon in the address bar, allow the microphone, then try again.",
      missing:
        "That microphone is no longer available. Choose a different one below and try again.",
      unsupported:
        "This browser cannot use a microphone. Chrome, Edge and Safari all work.",
    }[app.microphone.status as "denied" | "missing" | "unsupported"] ?? "",
  );
</script>

<div class="absolute inset-0 z-50 grid place-items-center bg-slate-900/70 p-6">
  <div class="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
    <h1 class="text-xl font-semibold text-slate-900">
      The reef needs to hear the room
    </h1>
    <p class="mt-3 text-slate-700">{message}</p>

    {#if app.microphone.status !== "unsupported"}
      <label class="mt-5 block text-sm font-medium text-slate-700">
        Microphone
        <select
          class="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 font-normal"
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
      </label>

      <button
        class="mt-5 rounded-md bg-slate-900 px-4 py-2 font-medium text-white"
        onclick={() => app.connect()}
      >
        Try again
      </button>
    {/if}
  </div>
</div>
