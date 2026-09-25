<script lang="ts">
  /**
   * The teacher's controls, hidden until wanted.
   *
   * It auto-hides so the class sees the Scene rather than a toolbar, and so
   * there is no Reset button sitting on the wall all lesson next to the thing
   * it would destroy. Reset confirms in a pop-up above the bar, so the bar
   * itself never changes shape; it is the only irreversible action on screen.
   */

  import { t } from "$lib/i18n/index.svelte";
  import type { App } from "$lib/app.svelte";

  let {
    app,
    visible,
    onopensettings,
    onopencollection,
  }: {
    app: App;
    visible: boolean;
    onopensettings: () => void;
    onopencollection: () => void;
  } = $props();

  let confirmingReset = $state(false);

  function reset() {
    app.resetSession();
    confirmingReset = false;
  }

  // Don't leave a confirmation waiting behind the bar once it fades away.
  $effect(() => {
    if (!visible) confirmingReset = false;
  });
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === "Escape") confirmingReset = false;
  }}
/>

<div
  class="safe-edges absolute inset-x-0 bottom-0 z-40 flex justify-center p-4 transition-opacity duration-300"
  class:opacity-0={!visible}
  class:pointer-events-none={!visible}
  aria-hidden={!visible}
>
  <div class="relative">
    {#if confirmingReset && app.session.running}
      <div
        class="absolute bottom-full left-1/2 mb-3 flex w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-2 rounded-2xl bg-white/95 px-4 py-3 text-center shadow-lg"
        role="alertdialog"
        aria-label={t("controls.confirmReset")}
      >
        <span class="px-1 text-sm text-slate-700"
          >{t("controls.resetQuestion")}</span
        >
        <button
          class="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white"
          onclick={reset}
        >
          {t("controls.resetYes")}
        </button>
        <button
          class="rounded-full border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50"
          onclick={() => (confirmingReset = false)}
        >
          {t("controls.keepGoing")}
        </button>
      </div>
    {/if}

    <div
      class="flex items-center gap-1.5 rounded-full bg-white/95 px-2 py-2 shadow-lg sm:gap-2 sm:px-3"
    >
      {#if !app.session.running}
        <button
          class="rounded-full bg-slate-900 px-5 py-2 font-medium text-white"
          onclick={() => app.startSession()}
        >
          {t("start.button")}
        </button>
      {:else}
        <button
          class="rounded-full border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 sm:px-4"
          class:bg-slate-100={confirmingReset}
          aria-expanded={confirmingReset}
          onclick={() => (confirmingReset = !confirmingReset)}
        >
          {t("controls.reset")}
        </button>
      {/if}

      <button
        class="rounded-full border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 sm:px-4"
        onclick={onopensettings}
      >
        {t("controls.settings")}
      </button>
      <button
        class="rounded-full border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50 sm:px-4"
        onclick={onopencollection}
      >
        {t("controls.animals")}
      </button>
    </div>
  </div>
</div>
