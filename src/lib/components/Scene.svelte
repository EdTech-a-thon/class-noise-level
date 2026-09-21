<script lang="ts">
  /**
   * The reef itself: the only thing the class ever looks at.
   *
   * Nothing here reports a number, shows a meter or displays a "too loud"
   * badge. The single class-facing signal is the water clouding over, which is
   * legible from the back of a room and is not a button a child can press.
   * See docs/adr/0001-nothing-is-taken-away.md.
   */

  import type { CreatureInstance } from "$lib/session/session.svelte";
  import AmbientLife from "./AmbientLife.svelte";
  import Creature from "./Creature.svelte";

  let {
    creatures,
    newestId,
    murky,
  }: {
    creatures: CreatureInstance[];
    newestId: number | null;
    murky: boolean;
  } = $props();
</script>

<div
  class="scene-water absolute inset-0 overflow-hidden"
  data-murky={murky}
  style="background: linear-gradient(to bottom, var(--color-water-shallow) 0%, var(--color-water-mid) 42%, var(--color-water-deep) 100%);"
>
  <!-- Sand floor and the rock silhouettes sitting on it. -->
  <div
    class="absolute inset-x-0 bottom-0 h-[8%]"
    style="background: var(--color-sand); opacity: 0.9;"
  ></div>
  <svg
    class="absolute inset-x-0 bottom-[6%] h-[14%] w-full"
    viewBox="0 0 1920 200"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0 200 L 0 150 Q 140 80 300 140 Q 430 190 560 130 Q 700 60 860 140
         Q 1000 200 1150 130 Q 1290 70 1450 140 Q 1600 195 1750 120
         Q 1850 75 1920 130 L 1920 200 Z"
      fill="var(--color-shadow)"
      opacity="0.4"
    />
  </svg>

  <AmbientLife />

  {#each creatures as creature (creature.id)}
    <Creature {creature} isNewest={creature.id === newestId} />
  {/each}

  <!-- The murk. One veil over the whole Scene, never a per-Creature effect. -->
  <div
    class="murk-veil pointer-events-none absolute inset-0"
    style="background: var(--color-water-deep);"
  ></div>
</div>
