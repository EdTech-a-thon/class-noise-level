<script lang="ts">
  /**
   * Scenery that is alive but is not a Creature: seaweed, coral, plankton,
   * light shafts and a distant shoal in silhouette. Present from the first
   * second of every Session, never earned, never counted.
   *
   * It exists because an unpopulated reef otherwise reads as "this app is
   * broken" rather than "we have not earned anything yet" — at one arrival
   * every five minutes, that first stretch is long. Everything here is
   * deliberately subordinate: smaller, dimmer, lower contrast, and without the
   * signature eye that every Creature has.
   *
   * The artwork is `src/lib/scenes/reef/ambient/`; the scatter below is what
   * places it. Positions are fixed rather than random, so the reef looks the
   * same each time a teacher opens it.
   */

  import { AMBIENT_ART } from "$lib/scenes/reef/artwork";

  /** The sand in `backdrop.svg` starts around 18% up, so roots sit in it. */
  const weeds = [
    { x: 3, height: 27, base: 13, sway: 5.5, art: "seaweed-tall" },
    { x: 9, height: 15, base: 10, sway: 7.1, art: "seaweed-short" },
    { x: 17, height: 22, base: 12, sway: 6.2, art: "seaweed-tall" },
    { x: 24, height: 13, base: 9, sway: 8.0, art: "seaweed-short" },
    { x: 34, height: 24, base: 14, sway: 6.8, art: "seaweed-tall" },
    { x: 46, height: 16, base: 11, sway: 7.6, art: "seaweed-short" },
    { x: 58, height: 21, base: 13, sway: 5.9, art: "seaweed-tall" },
    { x: 68, height: 14, base: 10, sway: 7.3, art: "seaweed-short" },
    { x: 79, height: 28, base: 14, sway: 6.4, art: "seaweed-tall" },
    { x: 88, height: 17, base: 11, sway: 6.9, art: "seaweed-short" },
    { x: 95, height: 23, base: 13, sway: 5.7, art: "seaweed-tall" },
  ];

  const corals = [
    { x: 13, width: 5.5, base: 11, art: "coral-branch" },
    { x: 28, width: 6.5, base: 10, art: "coral-fan" },
    { x: 40, width: 5, base: 12, art: "coral-brain" },
    { x: 52, width: 6, base: 10, art: "coral-branch" },
    { x: 63, width: 7, base: 12, art: "coral-fan" },
    { x: 74, width: 4.5, base: 10, art: "coral-brain" },
    { x: 91, width: 6, base: 12, art: "coral-branch" },
  ];

  /** Full-height sheets, each fading in and out so no seam is ever visible. */
  const planktonSheets = [
    { duration: 54, delay: 0, opacity: 0.55 },
    { duration: 68, delay: -24, opacity: 0.4 },
    { duration: 46, delay: -40, opacity: 0.45 },
  ];

  const shafts = [
    { x: 8, width: 14, duration: 26, delay: 0 },
    { x: 34, width: 18, duration: 34, delay: -8 },
    { x: 62, width: 12, duration: 30, delay: -16 },
    { x: 82, width: 16, duration: 38, delay: -4 },
  ];

  const shoals = [
    { y: 24, width: 16, duration: 150, delay: 0 },
    { y: 40, width: 11, duration: 205, delay: -90 },
  ];
</script>

<!-- Light shafts, behind everything. -->
{#each shafts as shaft (shaft.x)}
  <div
    class="shaft pointer-events-none absolute top-0 bottom-0"
    style="left:{shaft.x}%; width:{shaft.width}%; animation-duration:{shaft.duration}s; animation-delay:{shaft.delay}s;"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html AMBIENT_ART["light-shaft"]}
  </div>
{/each}

<!-- Distant shoal: silhouette only, no eyes, no detail. Clearly not a Creature. -->
{#each shoals as shoal (shoal.y)}
  <div
    class="shoal pointer-events-none absolute"
    style="top:{shoal.y}%; width:{shoal.width}%; animation-duration:{shoal.duration}s; animation-delay:{shoal.delay}s;"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html AMBIENT_ART["distant-shoal"]}
  </div>
{/each}

<!-- Plankton drifting up through the water. -->
{#each planktonSheets as sheet (sheet.duration)}
  <div
    class="plankton-field pointer-events-none absolute inset-x-0 top-0 bottom-0"
    style="animation-duration:{sheet.duration}s; animation-delay:{sheet.delay}s; --plankton-peak:{sheet.opacity};"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html AMBIENT_ART.plankton}
  </div>
{/each}

<!-- Coral on the floor. -->
{#each corals as coral (coral.x)}
  <div
    class="coral pointer-events-none absolute"
    style="left:{coral.x}%; bottom:{coral.base}%; width:{coral.width}vw;"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html AMBIENT_ART[coral.art]}
  </div>
{/each}

<!-- Seaweed, rooted in the sand. -->
{#each weeds as weed (weed.x)}
  <div
    class="weed pointer-events-none absolute"
    style="left:{weed.x}%; bottom:{weed.base}%; height:{weed.height}%; animation-duration:{weed.sway}s;"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html AMBIENT_ART[weed.art]}
  </div>
{/each}
