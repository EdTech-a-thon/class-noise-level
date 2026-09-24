# 06 — Roster and weighted rarity

**What to build:** Arrivals stop being anonymous. Each one picks a species from
the reef Roster by weighted random roll across three tiers, so common fish turn
up regularly and repeatedly while a whale shark is a genuine event that many
sessions will not see at all. Common species may arrive more than once in a
session; the three Rare ones appear at most once each.

**Blocked by:** 05.

**Status:** ready-for-agent

- [ ] A `roster.ts` manifest declaring all 18 species from
      `docs/svg-art-brief.md` with slug, teacher-facing name, tier and intended
      width, with `parts` left empty for the art task to fill in.
- [ ] Weighted selection across tiers at roughly 70 / 25 / 5, split evenly
      within each tier.
- [ ] Common and Uncommon species can repeat within a Session; Rare species
      cannot.
- [ ] Placeholder shapes are sized and tinted per species, so relative scale is
      already visibly correct before any real artwork exists.
- [ ] The roll is a pure function taking the roster, what is already present
      and a seedable random source, with unit tests asserting the tier
      distribution over many rolls and that Rare never duplicates.
