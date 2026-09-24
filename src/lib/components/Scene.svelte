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
    frozen,
    fleeing,
    ondepart,
  }: {
    scene: SceneDef;
    creatures: CreatureInstance[];
    newestId: number | null;
    murky: boolean;
    /** Too Loud, with the teacher's choice to pause rather than scare. */
    frozen: boolean;
    /** Ids of the Creatures running away. */
    fleeing: number[];
    /** A fleeing Creature has run out of sight. */
    ondepart: (id: number) => void;
  } = $props();
</script>

<div
  class="scene-stage absolute inset-0 overflow-hidden"
  data-scene={scene.id}
  data-murky={murky}
  data-frozen={frozen}
>
  <!--
    The whole landscape in one piece of artwork. It sits inside the container
    Too Loud filters, so a loud room clouds the Scene itself rather than
    tinting the animals in it.
  -->
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  <div class="backdrop absolute inset-0">{@html scene.ambientArt.backdrop}</div>

  <scene.Ambient />

  <!--
    Keyed by Scene as well: each Scene numbers its animals from 1, so an id
    alone would hand the reef's fish #3 component to the savanna's giraffe #3,
    and the giraffe would carry on with the fish's swimming motion.
  -->
  {#each creatures as creature (`${scene.id}:${creature.id}`)}
    <Creature
      {creature}
      art={scene.creatureArt[creature.def.slug]}
      depthFade={scene.depthFade}
      isNewest={creature.id === newestId}
      {frozen}
      fleeing={fleeing.includes(creature.id)}
      ongone={() => ondepart(creature.id)}
    />
  {/each}

  <!-- One veil over the whole Scene, never a per-Creature effect. -->
  <div class="too-loud-veil pointer-events-none absolute inset-0"></div>
</div>
