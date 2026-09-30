<script lang="ts">
  import { App } from "$lib/app.svelte";
  import ClassesPanel from "$lib/components/ClassesPanel.svelte";
  import Collection from "$lib/components/Collection.svelte";
  import ControlBar from "$lib/components/ControlBar.svelte";
  import MicBlocked from "$lib/components/MicBlocked.svelte";
  import Scene from "$lib/components/Scene.svelte";
  import SettingsPanel from "$lib/components/SettingsPanel.svelte";
  import BrandChip from "$lib/components/BrandChip.svelte";
  import LanguagePicker from "$lib/components/LanguagePicker.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import InfoDrawer, { FAQ_IDS } from "$lib/components/InfoDrawer.svelte";
  import { classes } from "$lib/classes/classes.svelte";
  import { className, t, type UiKey } from "$lib/i18n/index.svelte";
  import { onMount } from "svelte";
  import { SCENES } from "$lib/scenes";
  import { settings } from "$lib/settings/settings.svelte";
  import logoUrl from "$lib/brand/logo.svg";
  import { PREVIEW_IMAGE, absoluteUrl } from "$lib/site";

  const app = new App();

  /**
   * Tells search engines and AI assistants what kind of thing this page is,
   * and gives them the questions the info drawer answers.
   */
  const webApplication = $derived({
    "@type": "WebApplication",
    name: "Shy Safari",
    url: absoluteUrl("/"),
    description: t("app.description"),
    image: PREVIEW_IMAGE,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any (web browser)",
    browserRequirements: "Requires a microphone and a modern web browser",
    inLanguage: ["en", "es", "fr"],
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    audience: { "@type": "EducationalAudience", educationalRole: "teacher" },
    publisher: {
      "@type": "Organization",
      name: "teacher.dev",
      url: "https://teacher.dev",
    },
  });

  const faqPage = $derived({
    "@type": "FAQPage",
    url: absoluteUrl("/"),
    mainEntity: FAQ_IDS.map((id) => ({
      "@type": "Question",
      name: t(`guide.faq.${id}.q`),
      acceptedAnswer: { "@type": "Answer", text: t(`guide.faq.${id}.a`) },
    })),
  });

  const jsonLd = $derived({
    "@context": "https://schema.org",
    "@graph": [webApplication, faqPage],
  });

  let settingsOpen = $state(false);
  let collectionOpen = $state(false);
  let infoOpen = $state(false);
  let classesOpen = $state(false);
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

<PageMeta
  path="/"
  title={t("app.pageTitle")}
  description={t("app.description")}
  {jsonLd}
/>

<!-- dvh, not vh: on a phone, vh is the height with the browser toolbars
     hidden, which would tuck the control bar underneath them. -->
<main class="relative h-dvh w-full overflow-hidden">
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
    <div class="absolute inset-0 z-40 overflow-y-auto bg-slate-900/55">
      <!-- Scrolls rather than clips, should the card still not fit. -->
      <div
        class="grid min-h-full place-items-center p-4 sm:p-6 short:px-30 short:py-3"
      >
        <div
          class="max-w-lg rounded-xl bg-white p-6 text-center shadow-xl short:px-6 short:py-4"
        >
          <img
            src={logoUrl}
            alt=""
            class="mx-auto mb-3 size-24 short:mb-1 short:size-14"
          />
          <h1 class="text-2xl font-semibold text-slate-900 short:text-xl">
            Shy Safari
          </h1>
          <p
            class="mt-3 rounded-lg bg-amber-50 px-4 py-3 text-balance text-slate-800 short:mt-2 short:py-2 short:text-sm"
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
            class="mt-5 inline-flex rounded-full border border-slate-300 p-1 text-sm short:mt-3"
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
          <!-- Hidden, not absent, until the saved Class is known, so the card
               neither flashes "My class" nor jumps in height. -->
          <div class="mt-3 short:mt-2" class:invisible={!app.restored}>
            <button
              class="inline-flex max-w-full items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              title={t("classes.change")}
              onclick={() => (classesOpen = true)}
            >
              <svg
                viewBox="0 0 24 24"
                class="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 5.2a3 3 0 0 1 0 5.6"
                />
              </svg>
              <span>{t("classes.label")}:</span>
              <span class="truncate font-medium text-slate-900"
                >{className(classes.current.name)}</span
              >
              <svg
                viewBox="0 0 24 24"
                class="size-4 shrink-0"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
          <button
            class="mt-4 rounded-full bg-slate-900 px-6 py-2.5 font-medium text-white short:mt-3"
            onclick={async () => {
              if (await app.connect()) app.startSession();
            }}
          >
            {t("start.button")}
          </button>
          <p class="mt-3 text-xs text-slate-500 short:mt-2">
            {t("start.micNote")}
          </p>
        </div>
      </div>
    </div>
  {/if}

  <!-- Top left: who made this. Top right: the tools that change how the page
       looks — its language, and whether it fills the screen. Later than the
       start card so it sits above it; Settings, Animals and the blocked-
       microphone screen cover it. -->
  <div
    class="safe-edges pointer-events-none absolute inset-x-0 top-0 z-40 flex items-start justify-between p-4 transition-opacity duration-300"
    class:opacity-0={!topBarVisible}
    aria-hidden={!topBarVisible}
    inert={!topBarVisible}
  >
    <div class="pointer-events-auto">
      <BrandChip />
    </div>
    <div class="pointer-events-auto flex gap-2">
      <button
        class="grid size-11 place-items-center rounded-full bg-white/95 text-slate-700 shadow-lg hover:bg-white"
        aria-label={t("guide.title")}
        title={t("guide.title")}
        aria-expanded={infoOpen}
        aria-controls="how-it-works"
        onclick={() => (infoOpen = true)}
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
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" />
          <path d="M12 17.5h.01" />
        </svg>
      </button>
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

  {#if app.listening && app.paused}
    <!-- Stays up when the control bar fades, so a teacher who paused for an
         announcement can see at a glance that the room isn't being judged,
         and resume from right here. On a phone it sits below the corner
         buttons, which leave no room between them. -->
    <div
      class="safe-edges pointer-events-none absolute inset-x-0 top-0 z-40 flex justify-center p-4 max-sm:top-12"
    >
      <button
        class="paused-pulse pointer-events-auto flex h-11 items-center gap-2 rounded-full bg-white/95 pr-4 pl-3 text-sm font-medium text-slate-800 shadow-lg hover:bg-white"
        aria-label={t("controls.resume")}
        onclick={() => app.setPaused(false)}
      >
        <svg
          viewBox="0 0 24 24"
          class="size-5 text-amber-500"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
        {t("paused.status")}
      </button>
    </div>
  {/if}

  {#if app.blocked}
    <MicBlocked {app} />
  {/if}

  {#if app.listening}
    <ControlBar
      {app}
      visible={controlsVisible || settingsOpen || collectionOpen || classesOpen}
      onopensettings={() => (settingsOpen = true)}
      onopencollection={() => (collectionOpen = true)}
      onopenclasses={() => (classesOpen = true)}
    />
  {/if}

  {#if settingsOpen}
    <SettingsPanel {app} onclose={() => (settingsOpen = false)} />
  {/if}

  {#if collectionOpen}
    <Collection {app} onclose={() => (collectionOpen = false)} />
  {/if}

  <InfoDrawer bind:open={infoOpen} />
  {#if classesOpen}
    <ClassesPanel {app} onclose={() => (classesOpen = false)} />
  {/if}
</main>
