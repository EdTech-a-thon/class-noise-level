# 08 — Creature motion and arrivals

**What to build:** The reef moves. Each Creature swims a slow drifting path
across the Scene, turning to face its direction of travel, with tails and fins
swaying where the artwork provides them. An arriving Creature enters in a way
that is unmistakable from across the room — this is the payoff moment for
several minutes of a class being quiet, and it must not be missable. Creatures
do not collide, do not stack in one corner, and stay believable at twenty or
more on screen.

**Blocked by:** 06.

**Status:** ready-for-agent

- [ ] Creatures drift on slow paths, flipping horizontally to face travel
      direction (artwork is authored facing right).
- [ ] Groups with the classes `part-tail`, `part-fin`, `part-body`,
      `part-tentacles` and `part-arms` are animated where present, and a
      Creature with no such groups still drifts as a whole.
- [ ] Arrivals have a distinct, clearly visible entrance.
- [ ] Creatures distribute across the Scene by rough depth band rather than
      clumping.
- [ ] `prefers-reduced-motion` reduces drift and part motion without removing
      arrivals, which carry meaning.
- [ ] Twenty-plus Creatures animate smoothly on ordinary classroom hardware.
