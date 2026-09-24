<script lang="ts">
  /**
   * The teacher's controls, hidden until wanted.
   *
   * It auto-hides so the class sees the Scene rather than a toolbar, and so
   * there is no Reset button sitting on the wall all lesson next to the thing
   * it would destroy. Reset confirms; it is the only irreversible action on
   * screen.
   */

  import type { App } from "$lib/app.svelte";

  let {
    app,
    visible,
    fullScreen,
    canFullScreen,
    onopensettings,
    ontogglefullscreen,
  }: {
    app: App;
    visible: boolean;
    fullScreen: boolean;
    canFullScreen: boolean;
    onopensettings: () => void;
    ontogglefullscreen: () => void;
  } = $props();

  let confirmingReset = $state(false);

  function reset() {
    app.resetSession();
    confirmingReset = false;
  }
</script>

<div
  class="absolute inset-x-0 bottom-0 z-40 flex justify-center p-4 transition-opacity duration-300"
  class:opacity-0={!visible}
  class:pointer-events-none={!visible}
  aria-hidden={!visible}
>
  <div
    class="flex flex-wrap items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow-lg"
  >
    {#if !app.session.running}
      <button
        class="rounded-full bg-slate-900 px-5 py-2 font-medium text-white"
        onclick={() => app.startSession()}
      >
        Start
      </button>
    {:else if confirmingReset}
      <span class="px-2 text-sm text-slate-700"
        >Empty this scene and start over?</span
      >
      <button
        class="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white"
        onclick={reset}
      >
        Yes, reset
      </button>
      <button
        class="rounded-full border border-slate-300 px-4 py-2 text-sm"
        onclick={() => (confirmingReset = false)}
      >
        Keep going
      </button>
    {:else}
      <span class="px-2 text-sm text-slate-600">
        {app.session.creatures.length}
        {app.session.creatures.length === 1 ? "animal" : "animals"} so far
      </span>
      <button
        class="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        onclick={() => (confirmingReset = true)}
      >
        Reset
      </button>
    {/if}

    <button
      class="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
      onclick={onopensettings}
    >
      Settings
    </button>
    {#if canFullScreen}
      <button
        class="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
        onclick={ontogglefullscreen}
      >
        {fullScreen ? "Exit full screen" : "Full screen"}
      </button>
    {/if}
  </div>
</div>
