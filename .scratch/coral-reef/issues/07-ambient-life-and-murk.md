# 07 — Ambient Life and the murk shift

**What to build:** Two things that together make loudness legible without
punishing anyone. First, the Scene is never empty: seaweed sways, plankton
drifts, a distant shoal moves in silhouette, from the first second of a
Session, clearly scenery rather than earned Creatures. Second, when the room
goes Too Loud the entire Scene slowly dims and grows murky, like a cloud
passing over — readable from the back of a classroom, attached to no icon and
no individual animal, and slow enough that it cannot be triggered as a party
trick.

Read ADR-0001. No badge, no startle, no departures.

**Blocked by:** 05.

**Status:** ready-for-agent

- [ ] Ambient Life is present from the start of every Session, never counted as
      a Creature and never affected by Reset.
- [ ] Ambient Life is visibly subordinate: smaller, dimmer, lower contrast, no
      eyes.
- [ ] Entering Too Loud dims and desaturates the whole Scene over about 1200 ms;
      leaving it restores over the same period.
- [ ] The shift is a single effect on the Scene container, not per-Creature.
- [ ] Judged on a projector from across a room, an unpopulated Scene reads as
      alive, and the murk shift is noticeable without anyone being told to look
      for it.
