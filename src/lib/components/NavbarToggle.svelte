<!-- NavMobileToggle.svelte -->
<script>
  export let toggle = () => {};
  let icon = 'menu-outline';
  import IconSvg from './IconSvg.svelte';
  import NavMobile from './NavMobile.svelte';
</script>

<button class="navbar-burger self-center xl:hidden" on:click={toggle}>
  <div class="inline-flex p-2 h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-slate-700 rounded-lg">
    <IconSvg icon={icon} />
    <NavMobile />
  </div>
</button>

