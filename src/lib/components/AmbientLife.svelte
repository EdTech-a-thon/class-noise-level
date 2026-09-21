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
   * Placeholder geometry until the artwork lands (docs/svg-art-brief.md).
   */

  /** A fixed scatter, so the reef looks the same each time it is opened. */
  const weeds = [
    {
      x: 4,
      height: 26,
      width: 1.75,
      sway: 5.5,
      tone: "var(--color-weed-dark)",
    },
    {
      x: 9,
      height: 17,
      width: 2.1,
      sway: 7.1,
      tone: "var(--color-weed-light)",
    },
    {
      x: 17,
      height: 21,
      width: 1.75,
      sway: 6.2,
      tone: "var(--color-weed-dark)",
    },
    {
      x: 31,
      height: 14,
      width: 2.8,
      sway: 8.0,
      tone: "var(--color-weed-light)",
    },
    {
      x: 46,
      height: 23,
      width: 2.45,
      sway: 6.8,
      tone: "var(--color-weed-dark)",
    },
    {
      x: 58,
      height: 16,
      width: 1.75,
      sway: 7.6,
      tone: "var(--color-weed-light)",
    },
    {
      x: 71,
      height: 28,
      width: 2.45,
      sway: 5.9,
      tone: "var(--color-weed-dark)",
    },
    {
      x: 83,
      height: 19,
      width: 2.8,
      sway: 7.3,
      tone: "var(--color-weed-light)",
    },
    {
      x: 94,
      height: 24,
      width: 2.8,
      sway: 6.4,
      tone: "var(--color-weed-dark)",
    },
  ];

  const corals = [
    { x: 13, size: 7, tone: "var(--color-coral-pink)" },
    { x: 26, size: 5, tone: "var(--color-coral-purple)" },
    { x: 39, size: 8, tone: "var(--color-coral-orange)" },
    { x: 64, size: 6, tone: "var(--color-coral-pink)" },
    { x: 77, size: 9, tone: "var(--color-coral-purple)" },
    { x: 89, size: 5, tone: "var(--color-coral-orange)" },
  ];

  const plankton = Array.from({ length: 34 }, (_, index) => ({
    x: (index * 37) % 100,
    size: 0.15 + ((index * 13) % 7) * 0.05,
    duration: 26 + ((index * 17) % 22),
    delay: -((index * 7) % 30),
  }));

  const shafts = [
    { x: 12, width: 9, duration: 26, delay: 0 },
    { x: 38, width: 13, duration: 34, delay: -8 },
    { x: 67, width: 8, duration: 30, delay: -16 },
    { x: 86, width: 11, duration: 38, delay: -4 },
  ];

  const shoals = [
    { y: 26, scale: 0.55, duration: 150, delay: 0 },
    { y: 41, scale: 0.4, duration: 205, delay: -90 },
  ];
</script>

<!-- Light shafts, behind everything. -->
{#each shafts as shaft (shaft.x)}
  <div
    class="shaft pointer-events-none absolute top-0 bottom-0"
    style="left:{shaft.x}%; width:{shaft.width}%; animation-duration:{shaft.duration}s; animation-delay:{shaft.delay}s;
           background: linear-gradient(to right, transparent, rgb(255 255 255 / 0.5), transparent);
           filter: blur(22px);"
  ></div>
{/each}

<!-- Distant shoal: silhouette only, no eyes, no detail. Clearly not a Creature. -->
{#each shoals as shoal (shoal.y)}
  <div
    class="shoal pointer-events-none absolute"
    style="top:{shoal.y}%; animation-duration:{shoal.duration}s; animation-delay:{shoal.delay}s;"
  >
    <svg
      width={220 * shoal.scale}
      height={70 * shoal.scale}
      viewBox="0 0 220 70"
      aria-hidden="true"
    >
      {#each [[10, 20], [42, 8], [60, 34], [88, 18], [112, 46], [134, 26], [160, 10], [178, 38], [200, 22]] as [x, y] (x)}
        <ellipse cx={x} cy={y} rx="9" ry="4" fill="#0e4668" />
        <path d="M {x - 9} {y} l -7 -4 v 8 z" fill="#0e4668" />
      {/each}
    </svg>
  </div>
{/each}

<!-- Plankton. -->
{#each plankton as speck (speck.x + "-" + speck.delay)}
  <div
    class="plankton pointer-events-none absolute bottom-0 rounded-full bg-white/60"
    style="left:{speck.x}%; width:{speck.size}rem; height:{speck.size}rem; animation-duration:{speck.duration}s; animation-delay:{speck.delay}s;"
  ></div>
{/each}

<!-- Coral on the floor. -->
{#each corals as coral (coral.x)}
  <svg
    class="pointer-events-none absolute bottom-[7%]"
    style="left:{coral.x}%; width:{coral.size}rem;"
    viewBox="0 0 60 60"
    aria-hidden="true"
  >
    <g fill={coral.tone} opacity="0.55">
      <path
        d="M30 58 C 18 46 14 34 20 22 C 24 30 26 34 30 36 C 34 28 34 18 30 8
               C 40 16 46 28 44 40 C 42 48 36 54 30 58 Z"
      />
      <circle cx="18" cy="48" r="7" />
      <circle cx="43" cy="50" r="6" />
    </g>
  </svg>
{/each}

<!-- Seaweed, rooted on the sand. -->
{#each weeds as weed (weed.x)}
  <div
    class="weed pointer-events-none absolute bottom-[4%]"
    style="left:{weed.x}%; height:{weed.height}%; animation-duration:{weed.sway}s;"
  >
    <svg
      height="100%"
      viewBox="0 0 24 120"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M9 120 C 1 96 17 80 9 58 C 1 38 15 22 9 0 L 19 0 C 25 24 11 40 19 60
           C 27 82 11 98 19 120 Z"
        fill={weed.tone}
        opacity="0.85"
      />
    </svg>
  </div>
{/each}
