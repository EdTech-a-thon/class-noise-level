# Quiet Reef

A calm coral reef on the classroom projector that fills with sea life the
longer the room stays quiet.

It is the opposite of a noise meter. There is no bouncing, no score, no red
warning light — nothing that makes being loud more interesting than being
quiet. The class starts with an empty reef, and every few minutes of quiet
working brings another animal out. Some of them are rare.

## What a teacher does

1. Open the page and press **Start listening**. The browser asks for the
   microphone; audio is measured on the computer and never recorded or sent
   anywhere.
2. Press **Start**. The reef empties and the class begins earning animals.
3. Move the mouse to bring up the controls. **Settings** has everything:
   which microphone, how loud is too loud, and how often animals arrive.

That is the whole app. No account, no sign-in, nothing to install.

## How it decides the room is too loud

The teacher sets a **Volume Goal** — Silent, Independent or Partner work, or
anywhere in between by dragging the line on the meter. While the room stays
under it, animals arrive.

Going over the line does not instantly stop anything. It takes **ten seconds**
of sustained noise before arrivals pause, so a knock at the door or a dropped
book costs the class nothing. Recovery takes only **three seconds**, because a
class that settles down should be rewarded immediately rather than serve a
sentence.

When the room is too loud, the water slowly clouds over. That is the only
signal the class sees. Nothing swims away, nothing gets startled, and progress
toward the next animal pauses rather than resetting — a loud spell costs
exactly the time it lasted. This is deliberate; see
[docs/adr/0001](docs/adr/0001-nothing-is-taken-away.md).

**Calibration** is optional. The app works on a sensible default, and
calibrating — five seconds of silence, five seconds of normal talking — makes
the meter match your room and your microphone.

## Running it locally

This project lives in a shared workspace where several agents run dev servers
at once, so ports are leased rather than hardcoded. From the **workspace
root**:

```sh
./scripts/agent-dev.mjs class-noise-level --no-pocketbase
```

Other useful commands, from this directory:

```sh
bun run check    # typecheck
bun test         # unit tests
bun run lint     # prettier + eslint
bun run build    # static production build into build/
```

## How it is put together

Svelte 5 and SvelteKit, prerendered to static files with Tailwind for styling.
There is no backend: settings live in `localStorage` and nothing leaves the
device.

The reef is SVG in the DOM rather than video or canvas
([docs/adr/0002](docs/adr/0002-svg-dom-scene.md)), so each animal is an
ordinary element that CSS animates.

The three decisions that matter most are pure functions with unit tests, so
they can be checked without a microphone or a ten-second wait:

- `src/lib/noise/loudState.ts` — the slow-in, fast-out hysteresis.
- `src/lib/session/arrivalClock.ts` — banking quiet time, and pausing rather
  than resetting.
- `src/lib/session/roll.ts` — the weighted rarity roll.

`CONTEXT.md` defines the vocabulary the code uses. `docs/` holds the two
architecture decisions, the implementation plan, and the brief for drawing the
reef artwork.
