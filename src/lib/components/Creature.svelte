<script lang="ts">
  /**
   * One Creature living in the Scene.
   *
   * Creatures never leave, so none of them crosses and wraps: each one
   * wanders inside the Scene in its species' own way (`scenes/motion.ts`) —
   * crabs walk the sand, zebras graze the plain, the big animals make slow
   * wide loops. The motion runs per frame in script because it steers towards
   * waypoints, which CSS keyframes cannot do. Depth still drives size,
   * layering and speed, which is what stops twenty Creatures reading as one
   * flat sheet of stickers.
   */

  import { onMount } from "svelte";
  import {
    MOTION_PROFILES,
    bankAngle,
    createMotion,
    creatureLayer,
    stepMotion,
    type Footprint,
  } from "$lib/scenes/motion";
  import type { CreatureInstance } from "$lib/session/session.svelte";

  let {
    creature,
    art,
    depthFade,
    isNewest,
  }: {
    creature: CreatureInstance;
    art: string;
    depthFade: boolean;
    isNewest: boolean;
  } = $props();

  /** Nearer Creatures are bigger; the roster width sets the species scale. */
  const width = $derived(
    (creature.def.width / 1920) * 100 * (0.7 + creature.depth * 0.7),
  );

  const profile = $derived(MOTION_PROFILES[creature.def.motion]);

  /**
   * Where a Rare Creature's sparkles twinkle, as % of its box. Spread round
   * the edges so they frame the animal rather than sit on its face, with
   * staggered delays so they never all flash at once.
   */
  const SPARKLES = [
    { x: 6, y: 10, size: 1, delay: 0 },
    { x: 86, y: 2, size: 0.75, delay: 0.9 },
    { x: 100, y: 60, size: 0.9, delay: 1.7 },
    { x: 60, y: 98, size: 0.65, delay: 0.45 },
    { x: 18, y: 86, size: 0.85, delay: 1.3 },
    { x: 44, y: -6, size: 0.6, delay: 2.1 },
    { x: 72, y: 40, size: 0.5, delay: 2.6 },
  ];

  let swimmer: HTMLDivElement;
  let banker: HTMLDivElement;
  let flipper: HTMLDivElement;

  onMount(() => {
    const scene = swimmer.parentElement!;
    const style = creature.def.motion;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let sceneW = scene.clientWidth;
    let sceneH = scene.clientHeight;
    let selfW = swimmer.offsetWidth;
    let selfH = swimmer.offsetHeight;
    const footprint = (): Footprint => ({
      width: selfW / sceneW,
      height: selfH / sceneH,
      aspect: sceneH / sceneW,
    });

    const resize = new ResizeObserver(() => {
      sceneW = scene.clientWidth;
      sceneH = scene.clientHeight;
      selfW = swimmer.offsetWidth;
      selfH = swimmer.offsetHeight;
    });
    resize.observe(scene);
    resize.observe(swimmer);

    const state = createMotion(
      style,
      creature.spawnX,
      creature.spawnY,
      creature.depth,
      footprint(),
      Math.random,
    );

    let facing = 0;
    let last = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      // Clamp, so a backgrounded tab does not teleport everyone on return.
      let dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      // Reduced motion keeps everyone moving, just very gently.
      if (reducedMotion.matches) dt *= 0.2;

      stepMotion(state, style, creature.depth, footprint(), dt, Math.random);

      const left = state.x * sceneW - selfW / 2;
      const top = state.y * sceneH - selfH / 2;
      swimmer.style.transform = `translate3d(${left}px, ${top}px, 0)`;

      let angle = bankAngle(state, style);
      if (profile.ground) {
        // A walking gait: a little rock from side to side while moving. Crabs
        // skitter; the savanna animals (the ones with a `band`) only sway
        // slightly, so a plain full of walkers never reads as a stampede.
        const pace = Math.min(1, Math.abs(state.vx) / profile.speed);
        angle = profile.band
          ? Math.sin(state.age * 6) * 1 * pace
          : Math.sin(state.age * 18) * 3 * pace;
      }
      banker.style.transform = `rotate(${angle}deg)`;

      if (state.facing !== facing) {
        facing = state.facing;
        flipper.style.transform = `scaleX(${facing})`;
      }

      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
    };
  });
</script>

<div
  bind:this={swimmer}
  class="swimmer pointer-events-none absolute top-0 left-0"
  style="
    width:{width}vw;
    z-index:{creatureLayer(profile, creature.depth)};
    opacity:{depthFade ? 0.62 + creature.depth * 0.38 : 1};
  "
>
  <div
    class={profile.ground ? "" : "bobber"}
    style="animation-duration:{5 + creature.depth * 4}s;"
  >
    <div bind:this={banker} class="relative">
      <!--
        The flip lives on its own element. `.arriving` animates `transform`
        with a forwards fill, and an animation's transform beats an inline one
        for as long as it is applied — which is until the *next* arrival,
        minutes later. Sharing an element would have left leftward swimmers
        going tail-first.
      -->
      <div bind:this={flipper} class="flipper">
        <div
          class="creature"
          class:arriving={isNewest}
          data-tier={creature.def.tier}
        >
          {#if isNewest}
            <!-- The payoff moment has to carry across a classroom. -->
            <span
              class="arrival-ring absolute inset-0 rounded-full border-2 border-white/70"
            ></span>
          {/if}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html art}
        </div>
      </div>
      {#if creature.def.tier === "rare"}
        {#each SPARKLES as sparkle, i (i)}
          <svg
            class="sparkle"
            viewBox="-10 -10 20 20"
            aria-hidden="true"
            style="
              left:{sparkle.x}%;
              top:{sparkle.y}%;
              width:{sparkle.size * 2.2}vw;
              animation-delay:{sparkle.delay}s;
            "
          >
            <path
              d="M0 -10 C 1 -2, 2 -1, 10 0 C 2 1, 1 2, 0 10 C -1 2, -2 1, -10 0 C -2 -1, -1 -2, 0 -10 Z"
            />
          </svg>
        {/each}
      {/if}
    </div>
  </div>
</div>
