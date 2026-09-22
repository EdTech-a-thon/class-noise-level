<script lang="ts">
  /**
   * One Creature swimming its path.
   *
   * Artwork is authored facing right, so a leftward swimmer plays the same
   * crossing animation in reverse and flips horizontally. Depth drives size,
   * layering and speed, which is what stops twenty Creatures reading as one
   * flat sheet of stickers.
   */

  import { CREATURE_ART } from "$lib/scenes/reef/artwork";
  import type { CreatureInstance } from "$lib/session/session.svelte";

  let {
    creature,
    isNewest,
  }: { creature: CreatureInstance; isNewest: boolean } = $props();

  /** Nearer Creatures are bigger; the roster width sets the species scale. */
  const width = $derived(
    (creature.def.width / 1920) * 100 * (0.7 + creature.depth * 0.7),
  );

  /**
   * The crossing runs -30vw → 130vw, so a Creature starting at zero spends its
   * first several seconds off-screen — and its arrival flourish with it. A
   * negative delay drops it in just inside the edge instead, already swimming,
   * so the arrival is visible the moment it happens. That visibility is the
   * whole payoff for several minutes of a class being quiet.
   */
  const entryOffsetSeconds = $derived(creature.crossingSeconds * 0.22);
</script>

<div
  class="swimmer pointer-events-none absolute"
  style="
    top:{creature.track * 100}%;
    width:{width}vw;
    z-index:{Math.round(creature.depth * 40)};
    opacity:{0.62 + creature.depth * 0.38};
    --swim-duration:{creature.crossingSeconds}s;
    animation-delay:{-entryOffsetSeconds}s;
    animation-direction:{creature.direction === 1 ? 'normal' : 'reverse'};
  "
>
  <div class="bobber" style="animation-duration:{5 + creature.depth * 4}s;">
    <!--
      The flip lives on its own element. `.arriving` animates `transform` with
      a forwards fill, and an animation's transform beats an inline one for as
      long as it is applied — which is until the *next* arrival, minutes later.
      Sharing an element would have left leftward swimmers going tail-first.
    -->
    <div style="transform: scaleX({creature.direction});">
      <div class="creature" class:arriving={isNewest}>
        {#if isNewest}
          <!-- The payoff moment has to carry across a classroom. -->
          <span
            class="arrival-ring absolute inset-0 rounded-full border-2 border-white/70"
          ></span>
        {/if}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html CREATURE_ART[creature.def.slug]}
      </div>
    </div>
  </div>
</div>
