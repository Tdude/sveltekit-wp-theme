<!-- src/components/Navbar.svelte -->
<script>
  import Logo from './Logo.svelte';
  import NavLink from './NavLink.svelte';
  import NavMobileToggle from './NavMobileToggle.svelte';
  import NavMobile from './NavMobile.svelte'; // Correctly import NavMobile
  import { onMount } from 'svelte';
  import menuItems, { loadMenuItems } from '../../stores/menuStore.js';
  let bgColorClass = 'bg-slate-900';

  let showMobileMenu = false;

  onMount(loadMenuItems);

  function toggleMobileMenu() {
    showMobileMenu = !showMobileMenu;
  }
</script>

<nav class={`flex justify-between p-6 px-4 w-full ${bgColorClass}`}>
  <div class="flex justify-between items-center w-full">
    <div class="w-1/2 xl:w-1/3">
      <Logo src="/images/tryggve-logo-inv-green.svg" alt="Tryggve logo" />
    </div>
      <div class="w-1/2 xl:w-1/3">
      <ul class="hidden xl:flex xl:justify-center">
        {#each $menuItems as {title, url} (url)}
          <NavLink href={url} text={title} />
        {/each}
      </ul>
    </div>
    <div class="w-1/2 xl:w-1/3">
    <!-- Dynamic or static login and register buttons -->
    <div class="hidden xl:flex items-center justify-end md:pr-8">
      <a class="inline-block py-2 px-4 mr-2 leading-5 text-slate-400 hover:text-slate-50 bg-transparent font-medium rounded-md" 
        href="/login" 
        data-config-id="auto-txt-5-1">
        Logga In
      </a>
      <a class="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md" 
        href="/account" 
        data-config-id="auto-txt-6-1">
        Skapa konto
      </a>
    </div>
  </div>
  <NavMobileToggle on:click={toggleMobileMenu} />
  {#if showMobileMenu}
    <NavMobile {menuItems} />
  {/if}
</nav>
