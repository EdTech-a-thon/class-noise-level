<script lang="ts">
  /**
   * The Scene itself: the only thing the class ever looks at.
   *
   * Nothing here reports a number, shows a meter or displays a "too loud"
   * badge. The single class-facing signal is the Scene clouding over — murky
   * water on the reef, a dusty haze on the savanna — which is legible from the
   * back of a room and is not a button a child can press.
   * See docs/adr/0001-nothing-is-taken-away.md.
   */

  import type { SceneDef } from "$lib/scenes";
  import type { CreatureInstance } from "$lib/session/session.svelte";
  import Creature from "./Creature.svelte";

  let {
    scene,
    creatures,
    newestId,
    murky,
  }: {
    scene: SceneDef;
    creatures: CreatureInstance[];
    newestId: number | null;
    murky: boolean;
  } = $props();
</script>

<div
  class="scene-stage absolute inset-0 overflow-hidden"
  data-scene={scene.id}
  data-murky={murky}
>
  <!--
    The whole landscape in one piece of artwork. It sits inside the container
    Too Loud filters, so a loud room clouds the Scene itself rather than
    tinting the animals in it.
  -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="backdrop absolute inset-0">{@html scene.ambientArt.backdrop}</div>

  <scene.Ambient />

  {#each creatures as creature (creature.id)}
    <Creature
      {creature}
      art={scene.creatureArt[creature.def.slug]}
      depthFade={scene.depthFade}
      isNewest={creature.id === newestId}
    />
  {/each}

  <!-- One veil over the whole Scene, never a per-Creature effect. -->
  <div class="too-loud-veil pointer-events-none absolute inset-0"></div>
</div>
