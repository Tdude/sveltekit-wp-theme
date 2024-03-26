<!-- src/components/NavMobileToggle.svelte -->
<script>
  export let toggle = '';
  let icon = 'menu-outline';
  import IconSvg from './IconSvg.svelte';
</script>

<button class="navbar-burger self-center xl:hidden" on:click={toggle}>
  <div class="inline-flex p-2 h-16 w-16 items-center justify-center text-white bg-slate-700 rounded-md">
    <IconSvg icon={icon} />
  </div>
</button>
