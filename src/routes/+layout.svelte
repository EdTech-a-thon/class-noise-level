<script lang="ts">
  import "./layout.css";

  let { children } = $props();

  // Cloudflare Web Analytics beacon. The token is set only in Vercel's
  // production environment, so dev servers and local builds don't count visits.
  const beacon = import.meta.env.CF_BEACON_TOKEN;
</script>

<svelte:head>
  <title>Shy Safari — classroom noise level</title>
  <meta
    name="description"
    content="A calm safari where shy animals come out the longer a classroom stays quiet."
  />
  {#if beacon}
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: beacon })}
    ></script>
  {/if}
</svelte:head>

{@render children()}
