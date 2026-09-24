# Context

The shared language of this project. Glossary only — no implementation details,
no decisions, no specification. Decisions live in `docs/adr/`.

## Scene

The calm world on screen. The teacher chooses between two Scenes, the
savanna and the coral reef. A Scene is a backdrop, its Ambient Life and the
Roster of Creatures that can live in it. Each Scene keeps the Creatures it
has earned separately, so switching never takes any away.

## Creature

One animal that can appear in the Scene. Creatures are shy: they come out
while the room is Quiet and stay hidden while it is Too Loud. A Creature is
either **absent** or **present**. Once present, it stays present for the rest
of the Session, unless it Runs Away.

## Roster

The full list of Creatures a Scene can produce. The Roster is fixed; the
number of Creatures _present_ is not, because common Creatures can arrive more
than once.

## Rarity Tier

How likely a Creature is to be the next one to arrive: Common, Uncommon or
Rare. A Rare Creature may not appear at all in a given Session. Tier is a
property of the Creature; it never changes during a Session and is never
unlocked or gated.

## Ambient Life

Scenery that is alive but is not a Creature: swaying grass and drifting
clouds on the savanna, seaweed and plankton on the reef. Ambient Life is present from the first moment of
every Session, is never earned, and is never counted. It exists so an
unpopulated Scene still reads as a living place.

## Arrival Rate

How much Quiet time buys one Creature. The teacher chooses it from named
presets or types a number of minutes. It is the only dial that changes how fast the Scene fills.

## Session

One stretch of classroom work, from the teacher pressing start to the teacher
resetting. A Session begins with an empty Scene and fills as the room stays
quiet. Refreshing the page does not end a Session; nothing about a Session
outlives Reset.

## Quiet

The state of the room being at or below the Volume Goal. While the room is
Quiet, Creatures arrive, at the Arrival Rate.

## Too Loud

The state of the room being above the Volume Goal. While the room is Too Loud,
no new Creatures arrive — the shy animals wait to come out — and, by default,
the ones already out start to Run Away. A teacher can choose instead to pause
the Scene, where nothing is taken away; arrival simply pauses and the Scene
holds still. A momentary sound — a knock at the door, a dropped book — is not
Too Loud.

## Run Away

What Too Loud does by default. While the room stays Too Loud, Creatures already present run off the edge of the Scene
one at a time, and are gone for the rest of the Session.

## Volume Goal

The sound level the class is aiming to stay under. The teacher sets it, either
by choosing a named preset or by adjusting it directly.

## Calibration

Teaching the app what this particular room and microphone sound like, by
sampling the room while it is silent and again while it is talking normally.
Calibration is optional; without it the app uses a sensible default.
