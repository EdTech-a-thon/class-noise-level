<script lang="ts">
  /**
   * One Note on the Scene: the Scene's own artwork (a cloud, a sign) with the
   * teacher's words typed or written on it.
   *
   * Typed words shrink to fit, so a one-word Note is as big as it can be for
   * the back of the room and a long one still fits. Drawing takes a mouse, a
   * pen or a finger alike, which is what a Smartboard or a touch screen by
   * the projector sends. The Note is moved by dragging its artwork, and
   * resized from its corner.
   */

  import { t } from "$lib/i18n/index.svelte";
  import type { Note, NoteBox, NoteMode } from "$lib/notes/notes.svelte";
  import type { NoteLook } from "$lib/scenes";
  import { onMount } from "svelte";

  let {
    note,
    look,
    selected,
    chrome,
    mode,
    onselect,
    onchange,
  }: {
    note: Note;
    look: NoteLook;
    selected: boolean;
    /** The editing outline and handles show; they fade with the controls. */
    chrome: boolean;
    mode: NoteMode;
    onselect: () => void;
    onchange: (change: Partial<Omit<Note, "id">>) => void;
  } = $props();

  let root: HTMLDivElement;
  let writingBox = $state<HTMLDivElement>();
  let textEl = $state<HTMLDivElement>();
  let width = $state(0);
  let height = $state(0);

  /** Where the Note is while being dragged; saved once it is let go. */
  let draft = $state<NoteBox | null>(null);
  const box = $derived(draft ?? note);

  const writing = $derived(
    width && height ? look.writing(width, height) : null,
  );
  const empty = $derived(note.text.trim() === "");
  const drawing = $derived(selected && mode === "draw");

  /** Put the caret in the Note, ready to type. */
  export function focus() {
    textEl?.focus();
  }

  // Words typed arrive here from the element itself; only words that change
  // some other way (another tab, a restore) are written back into it, or the
  // caret would jump to the start with every key. Svelte renders nothing
  // inside the element, so there is no DOM of its own for this to upset.
  $effect(() => {
    const text = note.text;
    if (
      textEl &&
      document.activeElement !== textEl &&
      textEl.innerText !== text
    )
      // eslint-disable-next-line svelte/no-dom-manipulating
      textEl.innerText = text;
  });

  /**
   * The largest font the words fit at. Words are never broken mid-word, so a
   * long one widens the text and shrinks it rather than spilling out.
   */
  function fit() {
    if (!textEl || !writingBox) return;
    const maxWidth = writingBox.clientWidth;
    const maxHeight = writingBox.clientHeight;
    let low = 8;
    let high = Math.max(low, maxHeight * 0.62);
    for (let i = 0; i < 12; i++) {
      const size = (low + high) / 2;
      textEl.style.fontSize = `${size}px`;
      if (textEl.scrollHeight <= maxHeight && textEl.scrollWidth <= maxWidth)
        low = size;
      else high = size;
    }
    textEl.style.fontSize = `${low}px`;
  }

  $effect(() => {
    // Refit whenever the words, the space for them or the placeholder change.
    void [note.text, writing, selected, chrome];
    fit();
  });

  onMount(() => {
    void document.fonts?.ready.then(fit);
  });

  /** The screen the Note is placed on, for turning pixels into fractions. */
  function stage() {
    const parent = root.parentElement!;
    return { width: parent.clientWidth, height: parent.clientHeight };
  }

  /**
   * Move or resize by dragging. A press on a Note not yet chosen chooses it,
   * and if it is let go without moving, starts typing in it.
   */
  function drag(event: PointerEvent, action: "move" | "resize") {
    if (event.button !== 0) return;
    event.preventDefault();
    const wasSelected = selected;
    onselect();
    const start = { x: event.clientX, y: event.clientY, box: { ...box } };
    const { width: stageWidth, height: stageHeight } = stage();
    const target = event.currentTarget as HTMLElement;
    target.setPointerCapture(event.pointerId);
    let moved = false;

    const onMove = (move: PointerEvent) => {
      const dx = (move.clientX - start.x) / stageWidth;
      const dy = (move.clientY - start.y) / stageHeight;
      if (
        !moved &&
        Math.hypot(move.clientX - start.x, move.clientY - start.y) < 4
      )
        return;
      moved = true;
      draft =
        action === "move"
          ? { ...start.box, x: start.box.x + dx, y: start.box.y + dy }
          : {
              ...start.box,
              width: start.box.width + dx,
              height: start.box.height + dy,
            };
    };
    const onUp = () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
      target.removeEventListener("pointercancel", onUp);
      if (draft) onchange(draft);
      draft = null;
      if (!moved && !wasSelected && mode === "type") focus();
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
    target.addEventListener("pointercancel", onUp);
  }

  // --- Drawing ------------------------------------------------------------

  /** The stroke being drawn, before it is saved. */
  let live = $state<number[] | null>(null);
  let livePointer: number | null = null;

  const penWidth = $derived(Math.max(3, Math.sqrt(width * height) * 0.014));

  function pointIn(event: PointerEvent, rect: DOMRect): [number, number] {
    return [
      Math.round(((event.clientX - rect.left) / rect.width) * 1000) / 1000,
      Math.round(((event.clientY - rect.top) / rect.height) * 1000) / 1000,
    ];
  }

  function penDown(event: PointerEvent) {
    // One pen at a time: a resting palm must not start a second line.
    if (livePointer !== null || event.button !== 0) return;
    event.preventDefault();
    const canvas = event.currentTarget as SVGSVGElement;
    canvas.setPointerCapture(event.pointerId);
    livePointer = event.pointerId;
    live = pointIn(event, canvas.getBoundingClientRect());
  }

  function penMove(event: PointerEvent) {
    if (event.pointerId !== livePointer || !live) return;
    const rect = (event.currentTarget as SVGSVGElement).getBoundingClientRect();
    // Every sample the pen gave since the last frame, so fast writing
    // keeps its curves instead of turning into straight lines.
    const samples = event.getCoalescedEvents?.() ?? [event];
    const points = samples.flatMap((sample) => pointIn(sample, rect));
    live = [...live, ...points];
  }

  function penUp(event: PointerEvent) {
    if (event.pointerId !== livePointer) return;
    livePointer = null;
    if (live)
      onchange({ strokes: [...note.strokes, { ink: note.ink, points: live }] });
    live = null;
  }

  /**
   * A smooth line through the points: curves from midpoint to midpoint,
   * bending at each sample. A single point draws a dot.
   */
  function pathFor(points: number[]) {
    const at = (i: number) => [points[i] * width, points[i + 1] * height];
    if (points.length <= 2) {
      const [x, y] = at(0);
      return `M ${x} ${y} L ${x} ${y}`;
    }
    const [x0, y0] = at(0);
    let path = `M ${x0} ${y0}`;
    for (let i = 2; i < points.length - 2; i += 2) {
      const [x1, y1] = at(i);
      const [x2, y2] = at(i + 2);
      path += ` Q ${x1} ${y1} ${(x1 + x2) / 2} ${(y1 + y2) / 2}`;
    }
    const [xn, yn] = at(points.length - 2);
    return `${path} L ${xn} ${yn}`;
  }
</script>

<div
  bind:this={root}
  bind:clientWidth={width}
  bind:clientHeight={height}
  class="note pointer-events-auto absolute touch-none select-none"
  class:selected
  class:chrome
  data-note={note.id}
  style="left:{box.x * 100}%; top:{box.y * 100}%; width:{box.width *
    100}%; height:{box.height * 100}%; --ink:{look.inks[note.ink]};"
  role="group"
  aria-label={t("notes.label")}
  onpointerdown={(event) => drag(event, "move")}
>
  {#if width && height}
    <div class="note-art absolute inset-0">
      <look.Art {width} {height} />
    </div>
  {/if}

  {#if writing}
    <div
      bind:this={writingBox}
      class="absolute flex items-center justify-center"
      style="left:{writing.left}px; top:{writing.top}px; width:{writing.right -
        writing.left}px; height:{writing.bottom - writing.top}px;"
    >
      <!-- Pressing the words types in them rather than dragging the Note,
           once it is chosen. -->
      <div
        bind:this={textEl}
        class="note-text w-full text-center"
        class:cursor-text={selected}
        class:select-text={selected}
        contenteditable="plaintext-only"
        role="textbox"
        tabindex="0"
        aria-multiline="true"
        aria-label={t("notes.text")}
        data-empty={empty}
        data-placeholder={selected && chrome ? t("notes.placeholder") : ""}
        onpointerdown={(event) => {
          if (selected) event.stopPropagation();
        }}
        onfocus={onselect}
        oninput={() => {
          onchange({ text: textEl!.innerText });
          fit();
        }}
        onkeydown={(event) => {
          if (event.key === "Escape") textEl!.blur();
        }}
      ></div>
    </div>
  {/if}

  <svg
    class="note-ink absolute inset-0 size-full"
    class:drawing
    viewBox="0 0 {width || 1} {height || 1}"
    role={drawing ? "img" : undefined}
    aria-label={drawing ? t("notes.drawing") : undefined}
    aria-hidden={!drawing}
    onpointerdown={(event) => {
      if (!drawing) return;
      event.stopPropagation();
      penDown(event);
    }}
    onpointermove={penMove}
    onpointerup={penUp}
    onpointercancel={penUp}
  >
    {#each note.strokes as stroke, i (i)}
      <path
        d={pathFor(stroke.points)}
        stroke={look.inks[stroke.ink]}
        stroke-width={penWidth}
      />
    {/each}
    {#if live}
      <path
        d={pathFor(live)}
        stroke={look.inks[note.ink]}
        stroke-width={penWidth}
      />
    {/if}
  </svg>

  {#if selected && chrome}
    <!-- The artwork drags the Note too, but in Draw it is taken by the pen,
         and a handle is plainer on a touch screen either way. -->
    <button
      class="note-handle absolute -top-3 -left-3 grid size-9 cursor-move touch-none place-items-center rounded-full bg-white text-slate-700 shadow-lg"
      aria-label={t("notes.move")}
      title={t("notes.move")}
      onpointerdown={(event) => {
        event.stopPropagation();
        drag(event, "move");
      }}
    >
      <svg
        viewBox="0 0 24 24"
        class="size-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path
          d="M12 3v18M3 12h18M12 3 9 6M12 3l3 3M12 21l-3-3M12 21l3-3M3 12l3-3M3 12l3 3M21 12l-3-3M21 12l-3 3"
        />
      </svg>
    </button>
    <button
      class="note-handle absolute -right-3 -bottom-3 grid size-9 cursor-nwse-resize touch-none place-items-center rounded-full bg-white text-slate-700 shadow-lg"
      aria-label={t("notes.resize")}
      title={t("notes.resize")}
      onpointerdown={(event) => {
        event.stopPropagation();
        drag(event, "resize");
      }}
    >
      <svg
        viewBox="0 0 24 24"
        class="size-5"
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M20 11v9h-9M4 13V4h9M20 20 4 4" />
      </svg>
    </button>
  {/if}
</div>
