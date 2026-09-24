# 09 — Reef artwork

**What to build:** The actual reef: 18 Creature SVGs across three rarity tiers
plus the Ambient Life and backdrop set, all looking like one place. This ticket
is executed by following `docs/svg-art-brief.md` end to end — it contains the
style spec, the fixed palette, the eight technical conventions the animation
layer depends on, per-species direction, and the self-check.

Run this as its own task in a fresh context. Note the brief's instruction to
draw two exemplars and stop for approval before the other sixteen: the
expensive failure here is a style drift discovered across eighteen finished
files.

**Blocked by:** 06 — the roster slugs must be fixed first.

**Status:** ready-for-agent

- [ ] Every checkbox in the self-check section of `docs/svg-art-brief.md`
      passes, including the greppable ones (no `<style>`, no unprefixed `id`,
      no root `width`/`height`, no off-palette fill).
- [ ] All 18 Creatures and the full Ambient Life set exist at the paths the
      brief specifies.
- [ ] The `parts` field in the roster manifest matches the classes actually
      present in each file.
- [ ] On a contact sheet the set reads as one reef; nothing stands out as
      belonging to a different style.
