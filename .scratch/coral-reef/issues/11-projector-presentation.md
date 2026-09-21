# 11 — Projector presentation

**What to build:** The app behaves itself on a wall for a whole period. Controls
hide themselves after a few seconds and come back on mouse movement, like a
video player, so the class sees a clean Scene rather than a toolbar — and so
there is no Reset button sitting on the wall all lesson next to the thing it
would destroy. Reset asks for confirmation, because it is the only irreversible
action on screen. Adjusting the Volume Goal mid-period takes one mouse wiggle
and does not pause the Session, because the whole point is watching the meter
react to the room as it is right now.

**Blocked by:** 05.

**Status:** ready-for-agent

- [ ] The control bar auto-hides after a few idle seconds and returns on mouse
      movement or key press.
- [ ] Reset requires confirmation; Start does not.
- [ ] Opening Settings mid-Session does not pause it.
- [ ] Nothing in the class-facing Scene displays a numeric level, a meter or a
      too-loud badge — the only class-facing signal is the ambient shift.
- [ ] Usable at 1024x768 through 4K, and legible from the back of a classroom.
