<script lang="ts">
  import { t } from "$lib/i18n/index.svelte";

  /**
   * The teacher's meter. Never shown to the class.
   *
   * It shows two different truths on purpose: the bar is instantaneous, the
   * pill is the debounced state that actually gates arrivals. A teacher who
   * coughs sees the bar jump over the goal line while the pill does not move,
   * and learns in about four seconds that the tool ignores blips. That is the
   * single most reassuring thing this panel does.
   */

  let {
    level,
    goal,
    tooLoud,
    onGoalChange,
  }: {
    level: number;
    goal: number;
    tooLoud: boolean;
    onGoalChange: (goal: number) => void;
  } = $props();

  /**
   * Amber whenever the bar disagrees with the pill: over the line but not
   * yet Too Loud, or back under it but not yet for long enough to resume.
   * It shows the debounce working, and that the state is about to change
   * if the room keeps this up.
   */
  const changing = $derived(tooLoud ? level <= goal : level > goal);
</script>

<div class="space-y-2">
  <div class="flex items-center justify-between gap-3">
    <span class="text-sm font-medium text-slate-600">{t("meter.current")}</span>
    <span
      class="rounded-full px-3 py-1 text-sm font-semibold {tooLoud
        ? 'bg-rose-100 text-rose-800'
        : 'bg-emerald-100 text-emerald-800'}"
      aria-live="polite"
    >
      {tooLoud ? t("meter.paused") : t("meter.arriving")}
    </span>
  </div>

  <div class="relative h-8 overflow-hidden rounded-lg bg-slate-200">
    <div
      class="h-full transition-[width] duration-100 ease-linear {changing
        ? 'bg-amber-400'
        : tooLoud
          ? 'bg-rose-400'
          : 'bg-emerald-400'}"
      style="width:{Math.max(0, Math.min(100, level))}%"
    ></div>
    <div
      class="pointer-events-none absolute inset-y-0 w-0.5 bg-slate-900"
      style="left:{goal}%"
    ></div>
  </div>

  <label class="block">
    <span class="text-sm text-slate-600">
      {t("meter.goal", { goal })}
    </span>
    <input
      type="range"
      min="1"
      max="99"
      value={goal}
      class="mt-1 w-full"
      oninput={(event) => onGoalChange(Number(event.currentTarget.value))}
    />
  </label>
</div>
