<script lang="ts">
  import { App } from "$lib/app.svelte";
  import Collection from "$lib/components/Collection.svelte";
  import ControlBar from "$lib/components/ControlBar.svelte";
  import MicBlocked from "$lib/components/MicBlocked.svelte";
  import Scene from "$lib/components/Scene.svelte";
  import SettingsPanel from "$lib/components/SettingsPanel.svelte";
  import BrandChip from "$lib/components/BrandChip.svelte";
  import LanguagePicker from "$lib/components/LanguagePicker.svelte";
  import { t, type UiKey } from "$lib/i18n/index.svelte";
  import { onMount } from "svelte";
  import { SCENES } from "$lib/scenes";
  import { settings } from "$lib/settings/settings.svelte";
  import logoUrl from "$lib/brand/logo.svg";

  const app = new App();

  let settingsOpen = $state(false);
  let collectionOpen = $state(false);
  let fullScreen = $state(false);
  let controlsVisible = $state(true);
  let idleTimer: ReturnType<typeof setTimeout>;

  /** How long the controls linger after the last movement. */
  const IDLE_MS = 3500;

  $effect(() => app.run());

  $effect(() => {
    void app.microphone.refreshDevices();
  });

  function wake() {
    controlsVisible = true;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => (controlsVisible = false), IDLE_MS);
  }

  $effect(() => {
    wake();
    return () => clearTimeout(idleTimer);
  });

  /**
   * Absent on iOS Safari, and it rejects inside a restricted frame. Checked
   * once running, so the prerendered page and the live one agree.
   */
  let canFullScreen = $state(false);
  onMount(() => {
    canFullScreen =
      typeof document.documentElement.requestFullscreen === "function";
  });

  /**
   * The corner buttons fade with the control bar, so the class sees only the
   * Scene; before the Session starts there is nothing to hide them for.
   */
  const topBarVisible = $derived(controlsVisible || !app.listening);

  async function toggleFullScreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      // Nothing useful to tell the teacher: the app is perfectly usable in a
      // normal window, and browser chrome is the only thing they lose.
    }
  }
</script>

<svelte:window
  onmousemove={wake}
  onkeydown={wake}
  ontouchstart={wake}
  onfullscreenchange={() => (fullScreen = Boolean(document.fullscreenElement))}
/>

<svelte:head>
  <title>{t("app.pageTitle")}</title>
  <meta name="description" content={t("app.description")} />
</svelte:head>

<main class="relative h-screen w-screen overflow-hidden">
  {#if app.restored}
    <Scene
      scene={app.scene}
      creatures={app.session.creatures}
      newestId={app.session.newestId}
      murky={app.monitor.state === "too-loud"}
      frozen={app.monitor.state === "too-loud"}
      scares={settings.loudResponse === "flee"}
      fleeing={app.session.fleeing}
      ondepart={(id) => app.session.depart(id)}
    />
  {/if}

  {#if !app.listening && !app.blocked}
    <!-- Browsers only hand over a microphone after a real gesture, so the
         Session has to begin with a click either way. -->
    <div
      class="absolute inset-0 z-40 grid place-items-center bg-slate-900/55 p-6"
    >
      <div class="max-w-lg rounded-xl bg-white p-6 text-center shadow-xl">
        <img src={logoUrl} alt="" class="mx-auto mb-3 size-24" />
        <h1 class="text-2xl font-semibold text-slate-900">Shy Safari</h1>
        <p
          class="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-balance text-slate-800"
        >
          <span class="block font-medium">{t("start.shy")}</span>
          <!-- Checked after mount: the page is prerendered with the default. -->
          {#if app.restored && settings.loudResponse === "pause"}
            {t("start.explain")}
          {:else}
            {t("start.explainFlee")}
          {/if}
        </p>
        <div
          class="mt-5 inline-flex rounded-full border border-slate-300 p-1 text-sm"
          role="group"
          aria-label={t("scene.label")}
        >
          {#each Object.values(SCENES) as scene (scene.id)}
            <!-- Neither is picked until the saved Scene is known, so a reload
                 doesn't flash the default as chosen. -->
            {@const chosen = app.restored && app.scene.id === scene.id}
            <button
              class="rounded-full px-4 py-1.5 {chosen
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'}"
              aria-pressed={chosen}
              onclick={() => app.useScene(scene.id)}
              >{t(`scene.${scene.id}.name` as UiKey)}</button
            >
          {/each}
        </div>
        <br />
        <button
          class="mt-4 rounded-full bg-slate-900 px-6 py-2.5 font-medium text-white"
          onclick={async () => {
            if (await app.connect()) app.startSession();
          }}
        >
          {t("start.button")}
        </button>
        <p class="mt-3 text-xs text-slate-500">{t("start.micNote")}</p>
      </div>
    </div>
  {/if}

  <!-- Top left: who made this. Top right: the tools that change how the page
       looks — its language, and whether it fills the screen. Later than the
       start card so it sits above it; Settings, Animals and the blocked-
       microphone screen cover it. -->
  <div
    class="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between p-4 transition-opacity duration-300"
    class:opacity-0={!topBarVisible}
    aria-hidden={!topBarVisible}
    inert={!topBarVisible}
  >
    <div class="pointer-events-auto">
      <BrandChip />
    </div>
    <div class="pointer-events-auto flex gap-2">
      <LanguagePicker />
      {#if canFullScreen}
        <button
          class="grid size-11 place-items-center rounded-full bg-white/95 text-slate-700 shadow-lg hover:bg-white"
          aria-label={fullScreen ? t("fullScreen.exit") : t("fullScreen.enter")}
          title={fullScreen ? t("fullScreen.exit") : t("fullScreen.enter")}
          onclick={toggleFullScreen}
        >
          <svg
            viewBox="0 0 24 24"
            class="size-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            {#if fullScreen}
              <path
                d="M9 4v3a2 2 0 0 1-2 2H4M15 4v3a2 2 0 0 0 2 2h3M9 20v-3a2 2 0 0 0-2-2H4M15 20v-3a2 2 0 0 1 2-2h3"
              />
            {:else}
              <path
                d="M4 9V6a2 2 0 0 1 2-2h3M20 9V6a2 2 0 0 0-2-2h-3M4 15v3a2 2 0 0 0 2 2h3M20 15v3a2 2 0 0 1-2 2h-3"
              />
            {/if}
          </svg>
        </button>
      {/if}
    </div>
  </div>

  {#if app.blocked}
    <MicBlocked {app} />
  {/if}

  {#if app.listening}
    <ControlBar
      {app}
      visible={controlsVisible || settingsOpen || collectionOpen}
      onopensettings={() => (settingsOpen = true)}
      onopencollection={() => (collectionOpen = true)}
    />
  {/if}

  {#if settingsOpen}
    <SettingsPanel {app} onclose={() => (settingsOpen = false)} />
  {/if}

  {#if collectionOpen}
    <Collection {app} onclose={() => (collectionOpen = false)} />
  {/if}
</main>
