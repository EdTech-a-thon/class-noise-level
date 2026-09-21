# 04 — Volume Goal and the Too Loud state

**What to build:** A teacher sets how loud is acceptable — Silent, Independent
or Partner, or by dragging the goal line directly on the live level bar — and
the Settings panel tells them at a glance what the app currently thinks:
"Animals are arriving" or "Paused — too loud". Crucially the pill follows the
debounced state, not the instantaneous bar, so a knock at the door visibly
pokes the bar over the line while the pill does not move. That contrast is the
thing that convinces a teacher the tool is fair.

**Blocked by:** 02.

**Status:** ready-for-agent

- [ ] Three named Volume Goal presets, each showing its value, plus direct
      adjustment by dragging a goal line on the level bar.
- [ ] Entering Too Loud requires a 10-second rolling mean above the goal.
- [ ] Leaving Too Loud requires only 3 seconds below it — slow in, fast out.
- [ ] A state pill in the panel reflects the debounced state live.
- [ ] The decision logic is a pure function of samples, goal and current time,
      with unit tests covering: a 2-second spike does not enter Too Loud; a
      sustained 15-second rise does; recovery takes ~3 seconds not ~10.
- [ ] Goal preset and value persist in `localStorage`.
