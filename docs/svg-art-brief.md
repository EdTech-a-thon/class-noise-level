# SVG art brief — coral reef Scene

> **Reef Scene.** This brief describes the coral reef artwork, one of the two
> Scenes in Shy Safari. The savanna (`src/lib/scenes/savanna/`) follows the
> same style rules and SVG constraints with its own palette and Roster. The
> palette, backdrop and Roster specifics below are reef-only.

A standalone task brief. Everything needed to produce the reef artwork is in
this file; the app code does not need to exist yet. Read `CONTEXT.md` for
vocabulary (Scene, Creature, Roster, Rarity Tier, Ambient Life).

The single hardest requirement: **eighteen independently drawn Creatures must
look like one reef.** Consistency of style beats quality of any individual
piece. A charming, uniform set of simple fish is a success; a set containing
three beautiful fish and fifteen mismatched ones is a failure.

---

## 1. Style specification

Non-negotiable, applies to every file.

- **Flat vector.** Solid fills. No gradients except, sparingly, a single
  two-stop linear gradient for water depth in the backdrop. No textures, no
  raster images, no drop shadows, no blur.
- **No outline strokes.** Form comes from shape, not from a line around it.
  Where separation is needed (a fin against a body), use a second shape in a
  darker tone of the same hue rather than a stroke.
- **Rounded, friendly geometry.** Soft bellies, blunt noses, no sharp spikes
  except where the species demands it. Even the sharks are round.
- **Eyes are the signature.** Every Creature with a visible eye uses the same
  eye: a dark circle in `#2b2b3a`, with one white `#ffffff` highlight dot at
  roughly the upper-left, sized about a quarter of the eye. Never angry, never
  fierce — neutral or gently happy. This one rule does more for set coherence
  than anything else here.
- **Three to six fills per Creature.** A body colour, one or two accent
  colours, a darker shade for separation, plus the eye. Resist detail.
- **No text anywhere.**

### Palette

Draw from this palette only. Species may use any of these; introducing new hues
is what breaks a set apart.

| Role                  | Hex       |
| --------------------- | --------- |
| Deep water            | `#0b3d5c` |
| Mid water             | `#124f73` |
| Shallow water         | `#1a6f96` |
| Water highlight       | `#3fa9c9` |
| Sand                  | `#e6d3a3` |
| Coral pink            | `#ff7a8a` |
| Coral orange          | `#ff9f5a` |
| Coral purple          | `#a06cd5` |
| Seaweed green (dark)  | `#2e8b57` |
| Seaweed green (light) | `#3fae6d` |
| Accent yellow         | `#ffd166` |
| Accent red            | `#ef476f` |
| Accent teal           | `#4ecdc4` |
| Cream                 | `#f4f1de` |
| Shadow / eye          | `#2b2b3a` |
| Highlight             | `#ffffff` |

For a "darker shade for separation," darken the fill toward `#2b2b3a` rather
than picking an unrelated colour.

---

## 2. Technical conventions

These exist because the animation layer depends on them. Violating any one of
them produces artwork that renders but animates wrongly.

1. **One file per Creature**, at
   `src/lib/scenes/reef/creatures/<slug>.svg`, slug in kebab-case matching the
   Roster table below (`clownfish.svg`, `whale-shark.svg`).
2. **Every Creature faces right** (swimming toward +x). The app flips them with
   `transform: scaleX(-1)` for leftward movement. A Creature drawn facing left
   will swim backwards and it will not be obvious in review.
   - Exceptions that do not face anywhere: `starfish`, `jellyfish-bloom`. Draw
     these front-on.
3. **Tight crop.** The `viewBox` bounds the artwork with no padding, so the app
   can position by the element box. Any `viewBox` origin and size is fine —
   `viewBox="0 0 240 96"` for a manta, `viewBox="0 0 60 120"` for a seahorse.
4. **No `width` or `height` attributes on the root `<svg>`.** Size is set in
   CSS. Keep the default `preserveAspectRatio`.
5. **No `id` attributes, and no `<style>` blocks.** These files get inlined into
   one document; ids collide and `<style>` rules leak across the whole page.
   Put presentation in `fill`/`opacity` attributes directly on the shapes.
   If an id is genuinely unavoidable, prefix it with the slug:
   `id="whale-shark-grad"`.
6. **Name the moving parts.** Where a species has an obvious part that should
   sway, put it in a `<g>` with a class from this fixed list — `part-tail`,
   `part-fin`, `part-body`, `part-tentacles`, `part-arms`. The app animates
   these by class; unlisted class names are ignored, so a Creature with no
   named parts simply drifts as a whole. Use only what is natural: a starfish
   has no tail.
7. **Origin of motion.** For a `part-tail` or `part-fin`, place the group so
   that its rotation origin — the joint where it meets the body — is at the
   group's own left edge for a tail, or top edge for a pectoral fin. The app
   sets `transform-origin` accordingly.
8. **Budget:** under 6 KB per Creature file, under 40 path/shape elements.
   Exceeding this is a sign of unwanted detail, not of ambition.

---

## 3. The Roster

Eighteen species. `width` is the intended on-screen width relative to a
1920px-wide Scene, and is what makes the reef read at a consistent scale — a
clownfish must not be the size of a manta ray. Record these in the manifest
(§5), not in the SVG files.

### Common (9)

| Slug         | Direction                                                                            | Width |
| ------------ | ------------------------------------------------------------------------------------ | ----- |
| `clownfish`  | Classic orange `#ff9f5a` with `#f4f1de` bands, `#2b2b3a` edging. Plump, cheerful.    | 70    |
| `blue-tang`  | Round flat disc body in `#1a6f96`/`#3fa9c9`, `#ffd166` tail.                         | 80    |
| `angelfish`  | Tall thin body, `#ffd166` and `#f4f1de` vertical bands, trailing fins.               | 75    |
| `seahorse`   | Upright, curled tail, `#ffd166` body, ridged crest. Faces right in profile.          | 45    |
| `starfish`   | Front-on five-arm, `#ff7a8a`, small cream dots. No eye.                              | 55    |
| `crab`       | `#ef476f` shell, two raised claws, eyes on short stalks. Front-on-ish, angled right. | 60    |
| `shrimp`     | Small, translucent-reading `#f4f1de` with `#ff9f5a` tint, curled tail.               | 40    |
| `parrotfish` | Chunky beak, `#4ecdc4` body with `#a06cd5` fins.                                     | 90    |
| `pufferfish` | Sphere, `#ffd166`, blunt soft spines, tiny fins.                                     | 65    |

### Uncommon (6)

| Slug              | Direction                                                                                                     | Width |
| ----------------- | ------------------------------------------------------------------------------------------------------------- | ----- |
| `octopus`         | `#a06cd5`, domed head, eight `part-tentacles` curling below. Big friendly eyes.                               | 110   |
| `sea-turtle`      | `#2e8b57` shell with `#3fae6d` plate pattern, `part-fin` front flippers.                                      | 130   |
| `moray-eel`       | Long sinuous `#2e8b57` body, `part-body` for the wave. Mouth closed and gentle.                               | 140   |
| `stingray`        | Wide `#124f73` diamond with `#3fa9c9` topside, long thin `part-tail`.                                         | 120   |
| `jellyfish-bloom` | Front-on. Three translucent `#4ecdc4` bells at different sizes, `part-tentacles` trailing. Drawn as one file. | 100   |
| `cuttlefish`      | Broad mantle in `#ff7a8a`, fin frill along the body edge, W-shaped pupils.                                    | 85    |

### Rare (3)

These carry the jackpot moment. Give them presence through **scale and
silhouette**, not menace — same eyes, same roundness as everything else.

| Slug               | Direction                                                                    | Width |
| ------------------ | ---------------------------------------------------------------------------- | ----- |
| `hammerhead-shark` | `#124f73` above, `#f4f1de` belly, unmistakable head. Calm, not toothy.       | 220   |
| `manta-ray`        | Enormous `#0b3d5c` wingspan with `#f4f1de` underside, cephalic fins forward. | 280   |
| `whale-shark`      | Largest of all. `#124f73` with `#f4f1de` spot grid, wide blunt mouth.        | 340   |

---

## 4. Ambient Life and backdrop

Per ADR-0001, Ambient Life is always present and never earned, so an empty reef
still reads as alive. These are scenery: dimmer, lower contrast, and smaller
than any Creature. Nothing here has the signature eye.

At `src/lib/scenes/reef/ambient/`:

- `backdrop.svg` — full Scene, `viewBox="0 0 1920 1080"`. Vertical water
  gradient running _light at the top to dark at the bottom_ — `#1a6f96` at the
  surface through `#124f73` to `#0b3d5c` at depth — because the light shafts
  come down from above and a reef lit from below reads as wrong. A sand floor
  in `#e6d3a3` across the bottom fifth, and solid rock silhouettes in
  `#2b2b3a` tones mixed into the water, nearer rocks darker and drawn last.
  Nothing that moves.
- `seaweed-tall.svg`, `seaweed-short.svg` — single strands rooted at the bottom
  edge of their viewBox, so the app can rotate them about the root to sway.
  Greens only.
- `coral-branch.svg`, `coral-fan.svg`, `coral-brain.svg` — static floor
  features in the coral pink/orange/purple range, lower saturation than
  Creatures.
- `light-shaft.svg` — one soft white wedge at low opacity, for slow drift
  across the Scene.
- `plankton.svg` — a scatter of tiny pale dots on a transparent field.
- `distant-shoal.svg` — a flock of featureless small fish shapes in a single
  flat near-background tone (`#0e4668`). No eyes, no detail. This is the piece
  that sells "alive but nothing has arrived yet," so keep it clearly
  non-Creature: silhouette only.

---

## 5. Manifest

Write `src/lib/scenes/reef/roster.ts` alongside the art:

```ts
export type RarityTier = "common" | "uncommon" | "rare";

export interface CreatureDef {
  slug: string; // matches the SVG filename
  name: string; // "Whale shark" — teacher-facing, sentence case
  tier: RarityTier;
  width: number; // intended px width against a 1920px-wide Scene
  parts: string[]; // the part-* classes actually present in the file
}

export const REEF_ROSTER: CreatureDef[] = [/* all 18 */];
```

`parts` must be filled in from what was actually drawn, not from what this
brief suggested. The animation layer reads it to decide what to animate.

---

## 6. How to run this task

1. **Draw two exemplars first — `clownfish` and `octopus` — and stop.** One
   simple, one with a named part group. Get them approved before drawing the
   other sixteen. Correcting a style drift across eighteen finished files costs
   far more than one round-trip here.
2. Then work in tier order: Common, Uncommon, Rare. Keep the two approved
   exemplars open as the reference for eye, palette and weight.
3. Draw Ambient Life last. It has to sit _behind_ the Creatures visually, and
   that judgement is easier once the Creatures exist.
4. Write the manifest from the finished files.

## 7. Self-check before declaring done

Build a contact sheet — a throwaway HTML file rendering every Creature against
`#124f73`, each at its manifest width, and each also shown flipped with
`scaleX(-1)` — then verify:

- [ ] All 18 Creature files and all Ambient Life files exist at the paths above.
- [ ] Every Creature faces right (the flipped copy should look like it is
      swimming the other way, not like it is upside down or inside out).
- [ ] Every eye is the same dark circle plus upper-left white dot.
- [ ] No file contains `<style>`, `<image>`, `<text>`, `filter=`, or an `id`
      without a slug prefix. Grep for these; do not eyeball it.
- [ ] No root `<svg>` has a `width` or `height` attribute.
- [ ] No colour appears outside the palette table. Grep every `fill=` and
      compare against the list.
- [ ] Every file is under 6 KB.
- [ ] Relative sizes look right: the clownfish is small against the whale
      shark, and the whale shark does not fill the screen.
- [ ] `parts` in the manifest matches the classes actually in each file.
- [ ] Standing back from the contact sheet, it reads as one set. If any single
      Creature draws the eye as "different," redraw it rather than shipping it.

---

## 8. Notes from the art task

Recorded after drawing the set, for whoever integrates it (ticket 10) or adds
to it later. Everything below is a decision the brief did not settle.

- **Darker tones are an overlay, not a new colour.** "Darken the fill toward
  `#2b2b3a`" (§1) and "no colour outside the palette table" (§7) pull against
  each other, so separation is always the _same shape drawn twice_: once in its
  palette fill, once in `#2b2b3a` at `opacity` 0.13–0.3. Every `fill=` in the
  set greps clean, and the technique is uniform across all eighteen.
- **Scenery is solid.** Seaweed, coral and the backdrop rocks are opaque, so one
  piece never shows through another where they overlap. Their soft, low
  contrast look is baked into the fill instead: each coral shape is its palette
  colour already mixed with the sand (at the opacity it used to be drawn at,
  times the 0.88 fade the CSS once applied), and each rock is `#2b2b3a` mixed
  with the water behind it. These are the one exception to "every fill greps
  clean". Shading overlays in `#2b2b3a` still use `opacity`, because they sit
  on an opaque shape of the same piece.
- **Part groups carry their own `transform-origin`.** Convention §7 asks for the
  joint at the group's left edge, which a rear-mounted tail cannot satisfy — its
  leftmost point is the tail tip. Each part group therefore sets
  `style="transform-origin: <x>px <y>px"` at the true joint, overriding the
  `left center` / `top center` defaults in `routes/layout.css` (the same
  technique `CreaturePlaceholder.svelte` already used). Because those values are
  measured from the viewBox origin, they must be re-based if a viewBox is ever
  re-cropped.
- **The dark species are countershaded.** `stingray` (`#124f73`), the two sharks
  (`#124f73`) and `manta-ray` (`#0b3d5c`) were specified in the exact tones of
  the water they swim in, which made them invisible against the backdrop — worst
  of all for the Rare tier, whose whole job is to be seen from across a room.
  Each keeps its specified colour but gains a lighter palette tone over the
  dorsal surface (`#3fa9c9`, or `#1a6f96` on the manta) and the specified
  `#f4f1de` belly. They read at every depth and the palette is unchanged.
- **`#0e4668` in `distant-shoal.svg`** is the one fill outside the palette
  table; §4 names it explicitly.
- **The cuttlefish has the signature eye**, not the W-shaped pupil of §3. The
  eye rule in §1 is called non-negotiable and does more for set coherence than
  any single species' accuracy.
