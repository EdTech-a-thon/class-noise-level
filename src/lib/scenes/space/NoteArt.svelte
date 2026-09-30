<script lang="ts">
  /**
   * A Note in deep space: a readout panel from the observatory's screens,
   * floating in front of the sky. Dark glass with a thin cool edge that
   * catches the light from the upper left, viewfinder brackets at the
   * corners, and a slim header strip with a status light and a signal meter.
   * Drawn at the Note's own size (`space/noteShape.ts`), so stretching it
   * never thickens the edge or the brackets.
   */

  import { EDGE, GLASS, panelShape } from "$lib/scenes/space/noteShape";

  let { width, height }: { width: number; height: number } = $props();

  const shape = $derived(panelShape(width, height));
  const glass = $derived(shape.glass);
  // Inlined into the page, possibly more than once: ids must not clash.
  const uid = $props.id();
  const glassId = `space-note-glass-${uid}`;
  const edgeId = `space-note-edge-${uid}`;
  const clipId = `space-note-clip-${uid}`;
  const glowId = `space-note-glow-${uid}`;

  /** The status light: steady, the colour of a good lock on the target. */
  const LIGHT = "#6fe3b5";
</script>

<svg viewBox="0 0 {width} {height}" aria-hidden="true">
  <defs>
    <!-- Lit from the upper left, like everything else out here. -->
    <linearGradient
      id={glassId}
      gradientUnits="userSpaceOnUse"
      x1={glass.x}
      y1={glass.y}
      x2={glass.x + glass.width}
      y2={glass.y + glass.height}
    >
      <stop offset="0" stop-color={GLASS.lit} />
      <stop offset="1" stop-color={GLASS.shade} />
    </linearGradient>
    <linearGradient
      id={edgeId}
      gradientUnits="userSpaceOnUse"
      x1={glass.x}
      y1={glass.y}
      x2={glass.x + glass.width}
      y2={glass.y + glass.height}
    >
      <stop offset="0" stop-color={EDGE} stop-opacity="0.95" />
      <stop offset="1" stop-color={EDGE} stop-opacity="0.35" />
    </linearGradient>
    <radialGradient id={glowId}>
      <stop offset="0" stop-color={LIGHT} stop-opacity="0.45" />
      <stop offset="1" stop-color={LIGHT} stop-opacity="0" />
    </radialGradient>
    <clipPath id={clipId}>
      <rect
        x={glass.x}
        y={glass.y}
        width={glass.width}
        height={glass.height}
        rx={glass.rx}
      />
    </clipPath>
  </defs>

  <!-- The glass: one plain surface for the words, with the sky only just
       showing through. -->
  <rect
    x={glass.x}
    y={glass.y}
    width={glass.width}
    height={glass.height}
    rx={glass.rx}
    fill="url(#{glassId})"
    opacity={GLASS.opacity}
  />

  <!-- The header strip, clipped so its ends follow the glass's corners. -->
  <rect
    x={glass.x}
    y={glass.y}
    width={glass.width}
    height={shape.header.height}
    fill={EDGE}
    opacity="0.1"
    clip-path="url(#{clipId})"
  />
  <line
    x1={shape.header.divider.left}
    y1={shape.header.divider.y}
    x2={shape.header.divider.right}
    y2={shape.header.divider.y}
    stroke={EDGE}
    stroke-opacity="0.35"
    stroke-width={shape.header.lineWidth}
  />
  <path
    d={shape.scale}
    fill="none"
    stroke={EDGE}
    stroke-opacity="0.3"
    stroke-width={shape.header.lineWidth}
  />

  <circle
    cx={shape.light.cx}
    cy={shape.light.cy}
    r={shape.light.r * 2.6}
    fill="url(#{glowId})"
  />
  <circle
    cx={shape.light.cx}
    cy={shape.light.cy}
    r={shape.light.r}
    fill={LIGHT}
  />

  {#each shape.bars as bar, i (i)}
    <rect
      x={bar.x}
      y={bar.y}
      width={bar.width}
      height={bar.height}
      fill={EDGE}
      opacity={bar.lit ? 0.75 : 0.22}
    />
  {/each}

  <!-- The edge, over the header so the strip never covers it. -->
  <rect
    x={glass.x}
    y={glass.y}
    width={glass.width}
    height={glass.height}
    rx={glass.rx}
    fill="none"
    stroke="url(#{edgeId})"
    stroke-width={shape.edgeWidth}
  />

  {#each shape.brackets as bracket, i (i)}
    <path
      d={bracket}
      fill="none"
      stroke={EDGE}
      stroke-opacity="0.8"
      stroke-width={shape.bracketWidth}
      stroke-linejoin="miter"
    />
  {/each}
</svg>
