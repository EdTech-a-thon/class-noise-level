<script lang="ts">
  /**
   * Stand-in artwork until the reef is drawn (docs/svg-art-brief.md).
   *
   * It is deliberately a real fish silhouette with a `part-tail` group and the
   * signature eye, tinted per species and sized from the roster: that way the
   * motion, scale and layering are all genuinely exercised before any artwork
   * exists, and swapping in the real files is a substitution rather than a
   * discovery. Faces right, like the real artwork must.
   */

  import type { CreatureDef } from "$lib/scenes/reef/roster";

  let { def }: { def: CreatureDef } = $props();

  const TINTS = [
    "var(--color-coral-orange)",
    "var(--color-accent-yellow)",
    "var(--color-accent-teal)",
    "var(--color-coral-pink)",
    "var(--color-coral-purple)",
    "var(--color-weed-light)",
    "var(--color-water-shallow)",
    "var(--color-cream)",
  ];

  /** Stable per species, so a clownfish is always the same colour. */
  const tint = $derived(
    TINTS[
      [...def.slug].reduce(
        (hash, character) => hash + character.charCodeAt(0),
        0,
      ) % TINTS.length
    ],
  );
</script>

<svg
  viewBox="0 0 120 64"
  class="h-auto w-full overflow-visible"
  aria-hidden="true"
>
  <g class="part-tail" style="transform-origin: 26px 32px;">
    <path d="M30 32 L 6 14 Q 14 32 6 50 Z" fill={tint} opacity="0.85" />
  </g>
  <ellipse cx="62" cy="32" rx="40" ry="21" fill={tint} />
  <path d="M56 12 Q 66 2 78 12 Z" fill={tint} opacity="0.7" />
  <path d="M56 52 Q 66 62 78 52 Z" fill={tint} opacity="0.7" />
  <circle cx="90" cy="26" r="5" fill="var(--color-shadow)" />
  <circle cx="88.5" cy="24.5" r="1.6" fill="#ffffff" />
</svg>
