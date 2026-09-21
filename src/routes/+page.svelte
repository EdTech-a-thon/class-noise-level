<script lang="ts">
  import { App } from "$lib/app.svelte";
  import ControlBar from "$lib/components/ControlBar.svelte";
  import MicBlocked from "$lib/components/MicBlocked.svelte";
  import Scene from "$lib/components/Scene.svelte";
  import SettingsPanel from "$lib/components/SettingsPanel.svelte";

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
  <Scene
    creatures={app.session.creatures}
    newestId={app.session.newestId}
    murky={app.monitor.state === "too-loud"}
  />

  {#if !app.listening && !app.blocked}
    <!-- Browsers only hand over a microphone after a real gesture, so the
         Session has to begin with a click either way. -->
    <div
      class="absolute inset-0 z-40 grid place-items-center bg-slate-900/55 p-6"
    >
      <div class="max-w-lg rounded-xl bg-white p-6 text-center shadow-xl">
        <h1 class="text-2xl font-semibold text-slate-900">Quiet Reef</h1>
        <p class="mt-3 text-slate-700">
          The reef starts empty. The longer the class stays quiet, the more sea
          life comes out — and some of it is very rare.
        </p>
        <button
          class="mt-5 rounded-full bg-slate-900 px-6 py-2.5 font-medium text-white"
          onclick={async () => {
            if (await app.connect()) app.startSession();
          }}
        >
          Start listening
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
