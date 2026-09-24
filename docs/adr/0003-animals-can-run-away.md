# Animals run away when it is too loud, unless the teacher pauses instead

ADR 0001 rejected Creatures leaving when the room gets loud, because a
student who can clear the Scene by shouting has been handed a more responsive
toy than the quiet game. A teacher trying the app asked for exactly that
option anyway: their read of their own class is that pupils will hold each
other to being quiet _so as not to scare the animals away_, and that this peer
pressure is worth some early experimenting.

So it is now the default, with a setting, "When it's too loud", to choose
between:

- **Animals run away** (the default): the Scene clouds over, and while it
  stays Too Loud, Creatures already out bolt for the nearer edge of the Scene,
  one at a time, and are gone. Arrivals pause too.
- **Pause the scene** (ADR 0001 unchanged): the Scene clouds over and freezes,
  and no new Creatures arrive.

## Keeping it from becoming the game

The option is shaped to blunt the failure mode ADR 0001 describes, not to
ignore it:

- Nothing reacts to a single loud moment. Reaching Too Loud already takes
  seconds of sustained noise (`noise/loudState.ts`), and the first Creature
  only runs a further two seconds after that.
- Departures are paced, one every eight seconds, so a class that notices and
  settles loses one animal rather than the Scene. A shout never produces a
  stampede.
- There is no startle animation, sound or effect beyond the animal running
  off.
- A Creature that has run away is gone for the Session, including across a
  refresh; the Collection still remembers having seen it.

## Consequences

A teacher who never opens the setting now gets animals that run away, and
must choose "Pause the scene" to get the design ADR 0001 argues for. Whether
running away works in practice is still open. If classes do start making noise to watch animals
run, it should be revisited: a slower pace, a cap on how many can leave, or
removing it.
