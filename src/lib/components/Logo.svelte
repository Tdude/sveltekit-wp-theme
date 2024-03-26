<!-- src/components/Logo.svelte -->
<script>
  export let src = '';
  export let alt = '';
</script>

<a class="block max-w-max md:pl-4 " href="/home">
  <img class="h-32" {src} {alt} />
</a>
