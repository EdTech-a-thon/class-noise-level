<script lang="ts">
  /**
   * The reef itself: the only thing the class ever looks at.
   *
   * Nothing here reports a number, shows a meter or displays a "too loud"
   * badge. The single class-facing signal is the water clouding over, which is
   * legible from the back of a room and is not a button a child can press.
   * See docs/adr/0001-nothing-is-taken-away.md.
   */

  import { AMBIENT_ART } from "$lib/scenes/reef/artwork";
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

<div class="scene-water absolute inset-0 overflow-hidden" data-murky={murky}>
  <!--
    Water, sand and rock in one piece of artwork. It sits inside the container
    the murk filters, so a Too Loud room clouds the water itself rather than
    tinting the animals swimming in it.
  -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="backdrop absolute inset-0">{@html AMBIENT_ART.backdrop}</div>

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
