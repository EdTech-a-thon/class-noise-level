# 01 — Scaffold and projected Scene shell

**What to build:** Opening the app on a classroom projector shows a full-bleed
underwater Scene filling the screen — deep-to-mid blue water, a sand floor, no
browser chrome, no scrollbars — and a fullscreen toggle that makes it edge to
edge. Nothing is alive yet and nothing responds to sound; this is the surface
everything else is drawn onto, and it must already look like a place rather
than a web page.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [ ] Bun + SvelteKit + TypeScript + Tailwind project, ESLint configured, and a
      Prettier config file that changes no defaults (per workspace `AGENTS.md`).
- [ ] The dev server starts only via `./scripts/agent-dev.mjs class-noise-level
      --no-pocketbase` from the workspace root; no hardcoded port anywhere.
- [ ] The Scene fills the viewport at any aspect ratio from 4:3 to 21:9 with no
      scrollbars and no letterboxing of the water.
- [ ] A fullscreen toggle works and the Scene still fills the screen in it.
- [ ] The backdrop is a placeholder drawn to the palette in
      `docs/svg-art-brief.md`; no artwork files are needed yet.
