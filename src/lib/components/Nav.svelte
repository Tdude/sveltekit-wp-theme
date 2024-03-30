<!-- src/components/Nav.svelte -->
<script>
  import { onMount } from 'svelte';
  import { fetchMenu } from '../../services/WordPressService';
  import Logo from './Logo.svelte';
  import NavLink from './NavLink.svelte';
  export let bgColorClass = '';

  let menuItems = [];

  onMount(async () => {
    try {
      const menuData = await fetchMenu('menu-1');
      // Mapping the items to only include necessary properties
      menuItems = menuData.map(item => ({
        title: item.title,
        url: item.url
      }));
    } catch (error) {
      console.error("Failed to load menu:", error);
    }
  });


</script>

<nav class={`flex justify-between p-6 px-4 w-full ${bgColorClass}`}>
  <div class="flex justify-between items-center w-full">
    <div class="w-1/2 xl:w-1/3">
        <a class="block max-w-max md:pl-8 md:-mt-8" href="/home">
            <img class="h-32" src="/images/tryggve-logo-inv-green.svg" alt="" data-config-id="auto-img-1-1">
        </a>
    </div>
    <div class="w-1/2 xl:w-1/3">
      <ul class="hidden xl:flex xl:justify-center">
      <!-- Use the url property of each item to track its identity for Svelte performance. -->
        {#each menuItems as {title, url} (url)}
          <NavLink href={url} text={title} />
        {/each}
      </ul>
    </div>
    <!-- Dynamic or static login and register buttons -->
    <div class="w-1/2 xl:w-1/3">
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
  </div>
  <!-- NavbarToggle button -->
</nav>

