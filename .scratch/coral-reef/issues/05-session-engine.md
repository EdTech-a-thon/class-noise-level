# 05 — Session engine: Start, quiet time, arrivals

**What to build:** The core loop. A teacher presses Start, the Scene empties,
and as the class stays Quiet, Creatures arrive roughly every few minutes —
placeholder shapes for now. When the room goes Too Loud, arrivals simply stop;
nothing leaves and nothing is startled. When the room settles, the wait
resumes from exactly where it paused, so a loud spell costs the class the time
it lasted and not a second more. A teacher can set the Arrival Rate from three
named presets, and Reset empties the Scene again.

Read ADR-0001 before starting. The absence of any punishment mechanic is the
product thesis, not an oversight.

**Blocked by:** 04.

**Status:** ready-for-agent

- [ ] Start empties the Scene and begins accumulating Quiet time; Reset empties
      it again.
- [ ] Creatures arrive after the configured interval of accumulated Quiet time,
      with a small jitter so arrivals do not feel metronomic.
- [ ] Three Arrival Rate presets (about 8 / 5 / 2 minutes), default the middle
      one, persisted in `localStorage`.
- [ ] Too Loud pauses progress toward the next arrival and never resets it.
- [ ] Nothing ever removes a Creature from the Scene except Reset.
- [ ] Arrival scheduling is a pure function with unit tests covering: a
      30-second loud spell four minutes into a five-minute wait leaves four
      minutes banked; total arrivals over a simulated quiet hour match the
      configured rate within the jitter band.
