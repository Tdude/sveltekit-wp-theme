<!-- src/components/Logo.svelte -->
<script>
    export let src = '';
    export let alt = '';
</script>

<a href="/home">
  <img class="h-32" {src} {alt}>
</a>
