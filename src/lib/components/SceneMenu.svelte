<script lang="ts">
  /**
   * The list of Scenes to choose between, each with its picture, name and
   * the animals it brings. Shared by the menu in the bottom right and the
   * one on the start card, so the two look the same.
   */

  import { t, type UiKey } from "$lib/i18n/index.svelte";
  import { SCENES, type SceneId } from "$lib/scenes";

  let {
    id,
    chosen,
    onchoose,
    class: width = "w-64",
    maxHeight,
  }: {
    id: string;
    /** The Scene to tick, if one is known yet. */
    chosen: SceneId | null;
    onchoose: (id: SceneId) => void;
    /** How wide the list is; it never runs off a phone's screen. */
    class?: string;
    /** The tallest the list may be, in pixels, before it scrolls. */
    maxHeight?: number;
  } = $props();
</script>

<div
  {id}
  class="{width} max-w-[calc(100vw-2rem)] rounded-2xl bg-white p-1.5 text-left shadow-lg"
>
  <ul
    class="max-h-[50dvh] overflow-y-auto"
    style:max-height={maxHeight ? `${maxHeight}px` : undefined}
  >
    {#each Object.values(SCENES) as scene (scene.id)}
      {@const current = scene.id === chosen}
      <li>
        <button
          type="button"
          class="flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left text-sm hover:bg-slate-100 {current
            ? 'text-slate-900'
            : 'text-slate-700'}"
          aria-current={current}
          onclick={() => onchoose(scene.id)}
        >
          <img src={scene.icon} alt="" class="size-9 shrink-0" />
          <span class="min-w-0 flex-1">
            <span class="block" class:font-semibold={current}
              >{t(`scene.${scene.id}.name` as UiKey)}</span
            >
            <span class="block text-xs text-slate-500"
              >{t(`scene.${scene.id}.hint` as UiKey)}</span
            >
          </span>
          {#if current}
            <svg
              viewBox="0 0 24 24"
              class="size-4 shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m5 12 5 5 9-10" />
            </svg>
          {/if}
        </button>
      </li>
    {/each}
  </ul>
</div>
