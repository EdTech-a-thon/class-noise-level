<script lang="ts">
  /**
   * Every animal a Scene can bring, by rarity, with how many times each has
   * arrived on this computer. Animals not seen yet show as silhouettes, so
   * the class knows what there is to earn without it being spoiled.
   */

  import type { App } from "$lib/app.svelte";
  import { SCENES } from "$lib/scenes";
  import type { RarityTier, SceneId } from "$lib/scenes/types";
  import { TIER_WEIGHTS } from "$lib/session/roll";
  import { sightings } from "$lib/session/sightings.svelte";

  let { app, onclose }: { app: App; onclose: () => void } = $props();

  // Opens on the Scene on screen; browsing another does not switch to it.
  // svelte-ignore state_referenced_locally
  let sceneId = $state<SceneId>(app.scene.id);
  const scene = $derived(SCENES[sceneId]);

  const TIERS: { tier: RarityTier; label: string }[] = [
    { tier: "common", label: "Common" },
    { tier: "uncommon", label: "Uncommon" },
    { tier: "rare", label: "Rare" },
  ];

  const totalWeight = Object.values(TIER_WEIGHTS).reduce((a, b) => a + b, 0);

  function chance(tier: RarityTier) {
    return Math.round((TIER_WEIGHTS[tier] / totalWeight) * 100);
  }

  const seen = $derived(
    scene.roster.filter((def) => sightings.count(sceneId, def.slug) > 0).length,
  );
</script>

<svelte:window
  onkeydown={(event) => {
    if (event.key === "Escape") onclose();
  }}
/>

<div
  class="absolute inset-0 z-50 grid place-items-center bg-slate-900/40 p-4"
  role="presentation"
  onclick={(event) => event.target === event.currentTarget && onclose()}
>
  <div
    class="flex max-h-full w-full max-w-3xl flex-col rounded-xl bg-white shadow-xl"
    role="dialog"
    aria-modal="true"
    aria-label="Animals"
  >
    <div class="flex items-start justify-between gap-4 p-6 pb-4">
      <div>
        <h1 class="text-xl font-semibold text-slate-900">Animals</h1>
        <p class="mt-1 text-sm text-slate-500">
          {seen} of {scene.roster.length} spotted on this computer
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div
          class="inline-flex rounded-full border border-slate-300 p-1 text-sm"
          role="group"
          aria-label="Scene"
        >
          {#each Object.values(SCENES) as option (option.id)}
            <button
              class="rounded-full px-3 py-1 {sceneId === option.id
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-100'}"
              aria-pressed={sceneId === option.id}
              onclick={() => (sceneId = option.id)}>{option.name}</button
            >
          {/each}
        </div>
        <button
          class="rounded-md border border-slate-300 px-3 py-1 text-sm hover:bg-slate-50"
          onclick={onclose}>Close</button
        >
      </div>
    </div>

    <div class="overflow-y-auto px-6 pb-6">
      {#each TIERS as { tier, label } (tier)}
        {@const defs = scene.roster.filter((def) => def.tier === tier)}
        {#if defs.length > 0}
          <section class="mt-4 first:mt-0">
            <h2
              class="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-slate-500 uppercase"
            >
              {label}
              <span class="group relative normal-case">
                <button
                  class="grid size-4 place-items-center rounded-full text-slate-400 hover:text-slate-600 focus:text-slate-600 focus:outline-none"
                  aria-label="Chance of {label.toLowerCase()} animals"
                >
                  <svg
                    viewBox="0 0 16 16"
                    class="size-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1 3.5h2V12H7V7.5Z"
                    />
                  </svg>
                </button>
                <span
                  class="pointer-events-none absolute top-1/2 left-full z-10 ml-2 w-max max-w-60 -translate-y-1/2 rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-normal tracking-normal text-white opacity-0 shadow transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
                  role="tooltip"
                >
                  {chance(tier)}% of arrivals are {label.toLowerCase()}
                </span>
              </span>
            </h2>
            <ul
              class="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6"
            >
              {#each defs as def (def.slug)}
                {@const count = sightings.count(sceneId, def.slug)}
                <li
                  class="flex flex-col items-center rounded-lg border p-2 text-center {tier ===
                  'rare'
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-slate-200'}"
                >
                  <div
                    class="art grid h-16 w-full place-items-center"
                    class:unseen={count === 0}
                  >
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                    {@html scene.creatureArt[def.slug]}
                  </div>
                  <span class="mt-1 text-sm font-medium text-slate-800"
                    >{def.name}</span
                  >
                  <span class="text-xs text-slate-500">
                    {count === 0 ? "Not seen yet" : `Seen ${count}×`}
                  </span>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  .art :global(svg) {
    max-width: 100%;
    max-height: 100%;
  }

  .unseen {
    filter: brightness(0);
    opacity: 0.2;
  }
</style>
