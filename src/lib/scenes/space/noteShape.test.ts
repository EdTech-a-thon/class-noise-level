import { describe, expect, test } from "bun:test";
import { PEN_COLOURS, type Rect } from "../noteArt";
import { GLASS, panelShape, SPACE_INKS } from "./noteShape";

/** Wide, square and tall Notes, at sizes from a phone to a projector. */
const SIZES = [
  [600, 250],
  [300, 300],
  [180, 520],
  [1400, 160],
  [90, 70],
  [1740, 900],
];

function hasRoom(rect: Rect) {
  return rect.right > rect.left && rect.bottom > rect.top;
}

/** Every number in a path, as x, y pairs. */
function points(path: string): [number, number][] {
  const numbers = path.match(/-?\d+(\.\d+)?/g)!.map(Number);
  return Array.from({ length: numbers.length / 2 }, (_, i) => [
    numbers[i * 2],
    numbers[i * 2 + 1],
  ]);
}

type Rgb = [number, number, number];

function rgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** `top` laid over `under` at `opacity`, as the browser paints it. */
function over(top: Rgb, under: Rgb, opacity: number): Rgb {
  return top.map((c, i) => c * opacity + under[i] * (1 - opacity)) as Rgb;
}

/** WCAG relative luminance and contrast. */
function luminance([r, g, b]: Rgb) {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: Rgb, b: Rgb) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

// The glass's lit end is its lightest, so the hardest for a light pen.
const OVER_SKY = over(rgb(GLASS.lit), rgb("#0d1633"), GLASS.opacity);
// A sunlit moon or a bright galaxy passing right behind the words.
const OVER_WHITE = over(rgb(GLASS.lit), rgb("#ffffff"), GLASS.opacity);

describe("panelShape", () => {
  test.each(SIZES)("stays inside a %ix%i Note", (width, height) => {
    const { glass, brackets, bars, light } = panelShape(width, height);
    expect(glass.x).toBeGreaterThan(0);
    expect(glass.y).toBeGreaterThan(0);
    expect(glass.x + glass.width).toBeLessThan(width);
    expect(glass.y + glass.height).toBeLessThan(height);
    for (const [x, y] of brackets.flatMap(points)) {
      expect(x).toBeGreaterThanOrEqual(0);
      expect(x).toBeLessThanOrEqual(width);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(y).toBeLessThanOrEqual(height);
    }
    // The header's light and meter stay on the glass, clear of its corners.
    expect(light.cx - light.r).toBeGreaterThan(glass.x);
    expect(bars[0].x).toBeGreaterThan(light.cx + light.r);
    const last = bars[bars.length - 1];
    expect(last.x + last.width).toBeLessThan(glass.x + glass.width);
  });

  // The whole point of the plain glass: nothing drawn crosses the words.
  test.each(SIZES)(
    "writes only on plain glass in a %ix%i Note",
    (width, height) => {
      const { glass, header, bars, scale, writing } = panelShape(width, height);
      expect(hasRoom(writing)).toBe(true);
      expect(writing.left).toBeGreaterThan(glass.x);
      expect(writing.right).toBeLessThan(glass.x + glass.width);
      expect(writing.bottom).toBeLessThan(glass.y + glass.height);
      expect(writing.top).toBeGreaterThan(header.divider.y);
      for (const bar of bars)
        expect(bar.y + bar.height).toBeLessThan(header.divider.y);
      for (const [, y] of points(scale)) expect(y).toBeLessThan(writing.top);
    },
  );

  test("stretching a panel keeps the same edge, brackets and header", () => {
    const small = panelShape(300, 400);
    const tall = panelShape(300, 900);
    const wide = panelShape(1200, 300);
    for (const other of [tall, wide]) {
      expect(other.glass.x).toBeCloseTo(small.glass.x);
      expect(other.edgeWidth).toBeCloseTo(small.edgeWidth);
      expect(other.bracketWidth).toBeCloseTo(small.bracketWidth);
      expect(other.header.height).toBeCloseTo(small.header.height);
    }
  });

  test("a huge panel keeps fine lines, not a thick rim", () => {
    const huge = panelShape(1900, 1000);
    expect(huge.edgeWidth).toBeLessThanOrEqual(3);
    expect(huge.bracketWidth).toBeLessThanOrEqual(4);
    // The header is a strip, never a big slab of the panel.
    expect(huge.header.height / huge.glass.height).toBeLessThan(0.1);
  });
});

describe("SPACE_INKS", () => {
  test.each(Object.entries(SPACE_INKS))("%s reads on the glass", (_, ink) => {
    expect(contrast(rgb(ink), OVER_SKY)).toBeGreaterThanOrEqual(4.5);
    // Still big-text legible with something bright right behind.
    expect(contrast(rgb(ink), OVER_WHITE)).toBeGreaterThanOrEqual(3);
  });

  // Why deep space has pens of its own.
  test("the shared pens, mixed for cream and wood, would not", () => {
    for (const ink of Object.values(PEN_COLOURS))
      expect(contrast(rgb(ink), OVER_SKY)).toBeLessThan(4.5);
  });
});
