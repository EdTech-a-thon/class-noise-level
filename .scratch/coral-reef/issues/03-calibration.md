# 03 — Calibration

**What to build:** From the Settings panel a teacher can teach the app what
their room and microphone actually sound like: it samples five seconds of a
silent room, then five seconds of normal talking, and from then on the level
bar reads on a calibrated 0-100 scale instead of raw microphone output.
Calibration is optional — a teacher who skips it gets a sensible default — and
it is remembered between sessions until they change microphone.

**Blocked by:** 02.

**Status:** ready-for-agent

- [ ] Two-stage guided sampling with a visible countdown at each stage.
- [ ] Each stage averages its samples with the outliers trimmed, so one cough
      during the quiet sample does not ruin the calibration.
- [ ] If the two samples are too close together to be meaningful, the app says
      so and offers to redo it rather than storing a nonsense scale.
- [ ] After calibrating, the level bar reads on the calibrated scale.
- [ ] Calibration persists in `localStorage` and is discarded when the
      microphone device changes.
- [ ] With no calibration the app still works on a documented default scale.
