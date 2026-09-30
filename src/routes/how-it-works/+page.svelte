<script lang="ts">
  import { resolve } from "$app/paths";
  import DocPage from "$lib/components/DocPage.svelte";
  import PageMeta from "$lib/components/PageMeta.svelte";
  import { current, t, type UiKey } from "$lib/i18n/index.svelte";
  import { absoluteUrl } from "$lib/site";

  /**
   * The page that says in words what the Scene only shows: the home page is
   * almost all artwork, so this is what search engines and AI assistants read
   * to learn what Shy Safari is and who it is for.
   */

  const card = "mb-6 rounded-2xl bg-white/90 p-6 shadow-lg shadow-amber-900/5";
  const heading = "mb-3 text-xl font-semibold";
  const body = "leading-relaxed text-slate-700";

  const steps: UiKey[] = ["guide.use.open", "guide.use.goal", "guide.use.rate"];

  const questions = [
    "free",
    "record",
    "accounts",
    "devices",
    "languages",
    "meter",
  ] as const;

  const faq = $derived(
    questions.map((id) => ({
      q: t(`guide.faq.${id}.q`),
      a: t(`guide.faq.${id}.a`),
    })),
  );

  const jsonLd = $derived({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl("/how-it-works"),
    inLanguage: current().locale,
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
</script>

<PageMeta
  path="/how-it-works"
  title={t("guide.pageTitle")}
  description={t("guide.meta")}
  {jsonLd}
/>

<DocPage title={t("guide.title")} lede={t("guide.lede")}>
  <section class={card}>
    <h2 class={heading}>{t("guide.whatTitle")}</h2>
    <p class={body}>{t("guide.what")}</p>
  </section>

  <section class={card}>
    <h2 class={heading}>{t("guide.useTitle")}</h2>
    <ol class="list-decimal space-y-2 pl-5 {body}">
      {#each steps as step (step)}
        <li>{t(step)}</li>
      {/each}
    </ol>
  </section>

  <section class={card}>
    <h2 class={heading}>{t("guide.loudTitle")}</h2>
    <p class="mb-3 {body}">{t("guide.loud")}</p>
    <p class={body}>{t("guide.calibrate")}</p>
  </section>

  <section class={card}>
    <h2 class={heading}>{t("guide.tooLoudTitle")}</h2>
    <p class="mb-3 {body}">{t("guide.tooLoud")}</p>
    <ul class="list-disc space-y-2 pl-5 {body}">
      <li>{t("guide.tooLoud.flee")}</li>
      <li>{t("guide.tooLoud.pause")}</li>
    </ul>
  </section>

  <section class={card}>
    <h2 class={heading}>{t("guide.animalsTitle")}</h2>
    <p class={body}>{t("guide.animals")}</p>
  </section>

  <section class={card}>
    <h2 class={heading}>{t("guide.forTitle")}</h2>
    <p class={body}>{t("guide.for")}</p>
  </section>

  <section class={card}>
    <h2 class="mb-4 text-xl font-semibold">{t("guide.faqTitle")}</h2>
    <dl class="space-y-4">
      {#each faq as { q, a } (q)}
        <div>
          <dt class="font-semibold text-slate-900">{q}</dt>
          <dd class="mt-1 {body}">{a}</dd>
        </div>
      {/each}
    </dl>
  </section>

  <div class="text-center">
    <a
      href={resolve("/")}
      class="inline-block rounded-full bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-700"
      >{t("guide.cta")}</a
    >
  </div>
</DocPage>
