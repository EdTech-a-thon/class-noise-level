# SVG art brief — coral reef Scene

> **Reef Scene.** This brief describes the coral reef artwork, one of the three
> Scenes in Shy Safari. The savanna (`src/lib/scenes/savanna/`) follows the
> same style rules and SVG constraints with its own palette and Roster. The
> palette, backdrop and Roster specifics below are reef-only. The jungle
> (`src/lib/scenes/jungle/`) follows them too; §11 has its additions. Deep space
> (`src/lib/scenes/space/`) and the prehistoric Scene
> (`src/lib/scenes/prehistoric/`) deliberately do not follow the §1 style;
> see §9 and §10 for what they do instead, and which §2 rules they change.

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

---

## 9. Deep space Scene

Deep space was asked for to appeal to older students, so it is drawn to look
much less like a cartoon than the reef and savanna: NASA/JPL poster art and
astrophotography rather than flat stickers. §1 does not apply to it. The
Scene's own rules are below; §2 applies with the changes noted.

### Style

- **Accurate shapes, layered light.** `linearGradient`, `radialGradient`,
  `clipPath` and `pattern` are allowed, as is `<use>` pointing at a shape in
  the same file (the astronaut draws each limb once and shades it through
  clipped copies). A glow is a radial gradient fading to `stop-opacity="0"`,
  never a filter. Spacecraft are shaded like rendered objects, not flat
  shapes: a cylinder carries a gradient across its axis with a specular band,
  parts cast contact shadows where they meet, and sunlit edges catch a thin
  rim light.
- **No faces, no eyes, no outline strokes.** Thin strokes are allowed only for
  structure that really is thin: booms, struts, antennas, truss and panel
  lines.
- **The sun is off to the upper left** for every object, so shadow sides and
  night sides are lower right. Shade by laying near-black `#05070f` over the
  base at `opacity` 0.15–0.5; highlight with `#dce8ff` (cool) or `#fff6d0`
  (warm) at 0.1–0.4 — the reef's overlay trick, with the Scene's own ink.
- **A deep, limited palette:** near-black navy for space, cool blues and
  violets, metals and gold foil for spacecraft, and warm accents (amber,
  orange, a deep red) kept for fire, gas giants and the hottest light.
- **Presence for the Rare tier comes from luminosity and fine detail**, the way
  scale and silhouette give it on the reef. The app adds its gold glow and
  sparkles on top, so the art draws neither.

### Changes to §2

- **§2.5, ids.** Gradients, clip paths and patterns need ids, so the space art uses
  them freely, but every id is prefixed with the Scene and the file:
  `space-<slug>-<name>`, e.g. `space-comet-coma`, and `space-backdrop-sky` for
  Ambient Life. The Scene prefix keeps a space `moon-…` from ever meeting
  another Scene's `moon-…`. Two copies of one Creature on screen (Commons can
  arrive more than once) repeat _identical_ definitions under the same id,
  which renders correctly whichever copy the browser resolves to. What must
  never happen is two different definitions sharing an id, and the prefix
  rules that out. `src/lib/scenes/artwork.test.ts` checks it.
- **§2.5, `style`.** The only `style` attribute is still the one on a part
  group, now also allowed to set `animation-duration` (below).
- **§2.2, direction.** Spacecraft, meteors and comets face right, as before.
  Planets, the moon and the Rare objects face nowhere, and are never shown
  mirrored, because a mirrored planet would be lit from the wrong side. Their
  motion, `loom`, is `oneSided` (`scenes/motion.ts`).
- **§2.6, parts.** Two part classes are added, with keyframes in
  `scenes/space/creatures.css`: `part-spin`, a slow continuous turn (the
  asteroid tumbling, the galaxy turning, the pulsar's beams sweeping), and
  `part-pulse`, a slow breathing of a glow. Each group sets its pivot as
  `transform-origin` in viewBox units (so its viewBox starts at `0 0`) and may
  set its own `animation-duration`. Anything that spins must stay inside its
  viewBox at every angle.
- **§2.8, budget.** Up to about 12 KB and 80 elements for Common and Uncommon,
  20 KB for Rare. Gradient stops and clip paths count against the element
  number, so a heavily shaded piece (the astronaut) can pass 80 while staying
  well under the size. No `filter`, `mask` or `<image>` anywhere: the art runs on
  school laptops driving a projector, and a blur on each of twenty moving
  Creatures is exactly what they cannot afford. The one filter in the Scene is
  the grain tile in the Too Loud veil (`routes/layout.css`), drawn once and
  never animated.

### Ambient Life

At `src/lib/scenes/space/ambient/`, generated or drawn at 1920×1080 with
`preserveAspectRatio="xMidYMax slice"`, so stars stay round and the planet's
limb stays on the bottom edge at any screen shape:

- `backdrop.svg`: the night sky, the Milky Way crossing it from lower left to
  upper right with its dust lanes and brighter core, a few far galaxies too
  small to be mistaken for the Rare one, and the dark limb of a planet along
  the bottom with sunlight catching its atmosphere. Nothing that moves.
- `twinkle-1.svg` to `twinkle-3.svg`: the brighter stars, in three sheets that
  twinkle out of step. Each sheet fades as a whole, so twinkling is a cheap
  opacity change on a layer, never a repaint.
- `dust.svg`: a faint veil of interstellar dust that drifts across very
  slowly.
- `far-satellite.svg`: a point of light, too far away to have a shape, that
  crosses the sky every few minutes. It is deliberately not a Creature.

## 10. The prehistoric Scene

Asked for by teachers of older students, and so drawn as naturalist paleoart
(field-guide plates, museum murals) rather than in the flat, friendly style
above. It is a single place and moment: the Hell Creek floodplain of western
North America at the very end of the Cretaceous, with two giants of the same
age from a little further south (see `prehistoric/roster.ts`). Accuracy is
part of the brief: lips over theropod teeth, feathered dromaeosaurs with
folded wings and inward-facing palms, a Quetzalcoatlus whose wing membrane
runs to the ankle, no grass on the ground.

These rules replace §1 and parts of §2 for this Scene only:

- **Form light is one gradient per Creature.** Each Creature file has exactly
  one vertical `<linearGradient id="prehistoric-<slug>-form">` in `userSpaceOnUse`, with
  the same four stops in every file (light `#fff1d0` above, ink `#1d1812`
  below), laid over the body, tail and big limbs as its own path. That is
  what gives the set its soft, consistent top light. User-space units keep the
  tone identical across separately drawn parts, so the seam where a
  swinging tail meets the body never shows. **Why the id is safe:** a Common
  Creature can be on screen twice, so its id appears twice in the document.
  `url(#id)` resolves to the first match, and both copies define the same
  stops, so either one paints the same. The id follows the same
  `<scene>-<slug>-` scheme as deep space (§9), which
  `src/lib/scenes/artwork.test.ts` checks, so no two _different_ definitions
  ever share a name.
- **Backdrop gradients** (sky, sun, river, ground) are prefixed
  `prehistoric-`, since the backdrop is only ever on the page once.
- **No signature eye.** Eyes are small and anatomical: a coloured iris, a
  darker pupil, at most a tiny glint, under a brow shadow.
- **Palette:** earthy browns, greys, olives and buffs, with rust, brick and
  ochre kept for display features (a crest, a frill, a dome). Shading is still
  one shared ink (`#1d1812`) at low opacity, and highlights one shared light
  (`#fff1d0`). The full table is in the drawer brief that was used for the
  set; the files themselves are the reference now.
- **Strokes are for texture only**: a handful of thin marks (feather shafts,
  scale creases) per animal, never outlines.
- **Budget:** up to about 14 KB and 75 shapes per Creature. They are larger
  animals with more anatomy to get right, but still meant to animate
  smoothly on a school laptop.
- **Part groups** set `transform-box: view-box` and a `transform-origin` in
  viewBox units inline, as §8 describes. Tails and heads move far more slowly
  and less than on the savanna (`prehistoric/scene.css`): big bodies move
  slowly.

Ambient Life here is ferns (they sway), dawn redwoods, cycads, a fallen log,
drifting river mist, glints on the water, a far herd of
hadrosaurs on the other bank and two pterosaurs in the haze. The far animals
are flat silhouettes in a hazy tone so they never pass for Creatures.

## 11. The jungle Scene

The jungle (`src/lib/scenes/jungle/`) is drawn in the savanna's cartoon style:
§1 and §2 apply as they stand, with the signature eye, the blush and the
`#2b2b3a` overlay shading. It is the world's rainforests in one place, as the
savanna is Africa's grasslands (see `jungle/roster.ts`).

- **Palette.** The §1 table plus the savanna's fur tones (`#c98f5c`,
  `#c99440`, `#7a5a44`) and a few jungle additions: lime `#9bd25a`, dark brown
  `#5a3f2e`, rust `#d0703a`, jaguar gold `#e8a83c`, silver `#8e9bb0`, slate
  `#68748a` and charcoal `#3d4050`. Green animals carry a lime or cream belly,
  or a warm accent, so they still separate from the leaves behind them.
- **Two levels to live on.** The forest floor is the savanna's ground band
  (feet on the bottom edge of the viewBox, as there). Across the middle of the
  backdrop runs a great bough: the climbers walk along it (`clamber`, feet on
  the bottom edge), and the sloth hangs beneath it (`hang`), so its claws end
  exactly on the **top** edge of its viewBox. Neither draws a branch: the
  bough is the backdrop's (`BOUGH` and `BOUGH_UNDERSIDE` in
  `scenes/motion.ts` say where it is).
- **Part groups** set `transform-box: fill-box` and their joint inline, as the
  savanna's do, and use the shared keyframes at the savanna's pace.

Ambient Life is lianas hanging from the canopy (rooted at their top edge, so
they sway from there), ferns, monstera, heliconia and understory palms on the
floor (rooted at their bottom edge), mossy rocks, sunbeams with motes drifting
in them, mist under the bough, streaks running down the far waterfall and a
flock of parrots in silhouette. Every class in `jungle/scene.css` is prefixed
`jungle-`, and the backdrop's one gradient is `jungle-backdrop-sky`. Too Loud
is a tropical downpour: a still tile of rain streaks over a steamy haze.
