<!-- src/components/NavMobile.svelte -->
<script>
  import NavLink from './NavLink.svelte';
  export let menuItems = [];
</script>

<div class="mobile-nav bg-slate-800 p-4">
  <ul>
    {#each menuItems as {title, url}}
      <NavLink href={url} text={title} />
    {/each}
  </ul>
</div>
