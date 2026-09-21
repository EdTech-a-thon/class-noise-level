<script lang="ts">
  import "./layout.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Quiet Reef — classroom noise level</title>
  <meta
    name="description"
    content="A calm coral reef that fills with sea life the longer a classroom stays quiet."
  />
</svelte:head>

{@render children()}
