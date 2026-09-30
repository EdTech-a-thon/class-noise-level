/**
 * A Note in deep space: a readout panel from the observatory's own screens,
 * floating in front of the sky. Dark glass with a thin cool edge, viewfinder
 * brackets at its corners and a slim header strip carrying a status light
 * and a signal meter, as on a telescope's display.
 *
 * Built at the Note's own size in pixels, like the savanna cloud and the reef
 * sign (`scenes/noteArt.ts`): a panel stretched wide keeps a hairline edge and
 * the same brackets, rather than growing a thick rim.
 */

import type { Rect } from "$lib/scenes/noteArt";

/**
 * The glass, as the words see it: a dark navy, lighter where the sun (upper
 * left) catches it and darker away from it. The pens are chosen to read on
 * the lighter end, which is the harder one.
 */
export const GLASS = {
  lit: "#14264c",
  shade: "#050a17",
  opacity: 0.9,
};

/**
 * The pens. On dark glass the everyday pen, `dark`, has to be the light one:
 * a cool white, like the readouts round it. The shared red, blue and green
 * (`PEN_COLOURS`) are mixed dark to read on cream and wood, and on this glass
 * the blue all but vanishes, so these are the same three hues lifted until
 * each reads as clearly as a projector allows, and still tells apart from
 * the white.
 */
export const SPACE_INKS = {
  dark: "#eef4ff",
  red: "#ff6f7f",
  blue: "#6cb6ff",
  green: "#5edb8c",
};

/** The glass edge and the brackets: the Scene's cool highlight, a touch bluer. */
export const EDGE = "#9cc4ff";

export interface PanelBox {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
}

export interface Bar {
  x: number;
  y: number;
  width: number;
  height: number;
  /** A lit bar, or the dim one the signal does not quite reach. */
  lit: boolean;
}

export interface PanelShape {
  /** The glass itself. */
  glass: PanelBox;
  /** How thick the glass's edge is. */
  edgeWidth: number;
  /** The header strip along the top of the glass, and the line under it. */
  header: {
    height: number;
    /** Where the line under it runs, stopping at the inside of the edge. */
    divider: { y: number; left: number; right: number };
    lineWidth: number;
  };
  /** The status light at the header's left end. */
  light: { cx: number; cy: number; r: number };
  /** The signal meter at the header's right end, shortest bar first. */
  bars: Bar[];
  /**
   * A fine scale hanging from the header's line, as on a telescope's
   * readout, with a longer mark every fifth. One path.
   */
  scale: string;
  /** One L-shaped bracket round each corner, as a path. */
  brackets: string[];
  bracketWidth: number;
  writing: Rect;
}

/**
 * The panel, with room round it for the corner brackets. The writing area is
 * all glass below the header, with nothing drawn on it.
 */
export function panelShape(width: number, height: number): PanelShape {
  const unit = Math.min(width, height);

  // The brackets sit in the margin just outside the glass's corners.
  // Thin and close at any size: on a big panel they stay fine marks hugging
  // its corners rather than chunky frames standing off from it.
  const bracketWidth = Math.min(3.5, Math.max(1.75, unit * 0.008));
  const gap = Math.min(6, Math.max(4, unit * 0.012));
  const inset = bracketWidth / 2 + gap + bracketWidth;
  const glass: PanelBox = {
    x: inset,
    y: inset,
    width: width - inset * 2,
    height: height - inset * 2,
    rx: Math.max(3, unit * 0.025),
  };

  const edgeWidth = Math.min(3, Math.max(1.5, unit * 0.006));
  const lineWidth = Math.min(2, Math.max(1, unit * 0.004));

  // Grows more slowly than the Note, so a big panel is not mostly header.
  const headerHeight = Math.max(10, Math.min(unit * 0.11, 20 + unit * 0.05));
  const divider = glass.y + headerHeight;
  const middle = glass.y + headerHeight / 2;
  const sideRoom = Math.max(glass.rx, headerHeight * 0.45);

  const light = {
    cx: glass.x + sideRoom + headerHeight * 0.18,
    cy: middle,
    r: Math.max(1.5, headerHeight * 0.16),
  };

  // Four lit and one dim: a good signal, with the interference never quite
  // gone.
  const barWidth = Math.max(1.5, headerHeight * 0.09);
  const barGap = Math.max(1, headerHeight * 0.07);
  const barFloor = middle + headerHeight * 0.26;
  const meterRight = glass.x + glass.width - sideRoom;
  const bars: Bar[] = Array.from({ length: 5 }, (_, i) => {
    const barHeight = headerHeight * (0.16 + 0.09 * i);
    return {
      x: meterRight - (5 - i) * barWidth - (4 - i) * barGap,
      y: barFloor - barHeight,
      width: barWidth,
      height: barHeight,
      lit: i < 4,
    };
  });

  // Ticks at an even spacing whatever the width, between the rounded
  // corners, and short enough to stay well clear of the words.
  const tickRoom = glass.width - sideRoom * 2;
  const tickSpacing = Math.max(8, headerHeight * 0.5);
  const tickCount = Math.floor(tickRoom / tickSpacing);
  const tickStart = glass.x + (glass.width - tickCount * tickSpacing) / 2;
  const scale = Array.from({ length: tickCount + 1 }, (_, i) => {
    const x = tickStart + i * tickSpacing;
    const long = i % 5 === 0;
    const length = headerHeight * (long ? 0.28 : 0.14);
    return `M ${x} ${divider} L ${x} ${divider + length}`;
  }).join(" ");

  const arm = Math.max(8, Math.min(unit * 0.1, 12 + unit * 0.035));
  const edge = bracketWidth / 2;
  const corners: [number, number, number, number][] = [
    [edge, edge, 1, 1],
    [width - edge, edge, -1, 1],
    [edge, height - edge, 1, -1],
    [width - edge, height - edge, -1, -1],
  ];
  const brackets = corners.map(
    ([x, y, dx, dy]) =>
      `M ${x} ${y + dy * arm} L ${x} ${y} L ${x + dx * arm} ${y}`,
  );

  // Room between the glass's edge and the words, a little more at the
  // sides, so a short word pulled wide never runs right up to the edge.
  const side = Math.max(12, unit * 0.1);
  const margin = Math.max(8, unit * 0.064);

  return {
    glass,
    edgeWidth,
    header: {
      height: headerHeight,
      divider: {
        y: divider,
        left: glass.x + edgeWidth / 2,
        right: glass.x + glass.width - edgeWidth / 2,
      },
      lineWidth,
    },
    light,
    bars,
    scale,
    brackets,
    bracketWidth,
    writing: {
      left: glass.x + side,
      right: glass.x + glass.width - side,
      top: divider + margin,
      bottom: glass.y + glass.height - margin,
    },
  };
}
