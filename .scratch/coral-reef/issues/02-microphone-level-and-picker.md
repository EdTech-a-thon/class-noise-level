# 02 — Live microphone level and device picker

**What to build:** A teacher can open a Settings panel over the Scene, see
which microphone is in use, switch to a different one, and watch a live level
bar respond to the room as they talk. If the microphone is unavailable —
permission denied, no device, unsupported browser — the app says so plainly,
offers a retry, and still lets them pick a different device, because the wrong
input device is the most common real cause. It never silently pretends to
listen.

**Blocked by:** 01.

**Status:** ready-for-agent

- [ ] A Settings panel opens over the Scene and closes again.
- [ ] The panel lists available audio inputs and switching device takes effect
      without a page reload.
- [ ] A live bar shows the current level, smoothed with a ~1400 ms time
      constant and published at about 10 Hz.
- [ ] Denied permission, missing device and unsupported browser each produce a
      distinct blocking message with a retry button and the device picker.
- [ ] The chosen device id survives a page reload via `localStorage`.
- [ ] The app never falls back to a mode where the Scene advances without a
      working microphone.
