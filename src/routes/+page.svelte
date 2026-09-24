<script lang="ts">
  import { App } from "$lib/app.svelte";
  import ControlBar from "$lib/components/ControlBar.svelte";
  import MicBlocked from "$lib/components/MicBlocked.svelte";
  import Scene from "$lib/components/Scene.svelte";
  import SettingsPanel from "$lib/components/SettingsPanel.svelte";
  import { SCENES } from "$lib/scenes";
  import logoUrl from "$lib/brand/logo.svg";

  const app = new App();

  let settingsOpen = $state(false);
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

  /** Absent on iOS Safari, and it rejects inside a restricted frame. */
  const canFullScreen =
    typeof document !== "undefined" &&
    typeof document.documentElement?.requestFullscreen === "function";

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

<main class="relative h-screen w-screen overflow-hidden">
  {#if app.restored}
    <Scene
      scene={app.scene}
      creatures={app.session.creatures}
      newestId={app.session.newestId}
      murky={app.monitor.state === "too-loud"}
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
        <p class="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-slate-800">
          Shh… these animals are shy! If it gets too loud, they stay hidden.
          When the room is calm again, they'll start coming out.
        </p>
        <div
          class="mt-5 inline-flex rounded-full border border-slate-300 p-1 text-sm"
          role="group"
          aria-label="Scene"
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
              onclick={() => app.useScene(scene.id)}>{scene.name}</button
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
          Start
        </button>
        <p class="mt-3 text-xs text-slate-500">
          Your browser will ask to use the microphone. Audio is measured on this
          computer and never recorded or sent anywhere.
        </p>
      </div>
    </div>
  {/if}

  {#if app.blocked}
    <MicBlocked {app} />
  {/if}

  {#if app.listening}
    <ControlBar
      {app}
      visible={controlsVisible || settingsOpen}
      {fullScreen}
      {canFullScreen}
      onopensettings={() => (settingsOpen = true)}
      ontogglefullscreen={toggleFullScreen}
    />
  {/if}

  {#if settingsOpen}
    <SettingsPanel {app} onclose={() => (settingsOpen = false)} />
  {/if}
</main>
