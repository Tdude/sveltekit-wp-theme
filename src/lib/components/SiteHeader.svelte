<!-- src/components/SiteHeader.svelte -->
<script>
    import Nav from './Nav.svelte';
    import NavMobile from './NavMobile.svelte';
    import NavbarToggle from './NavbarToggle.svelte';
    import { writable } from 'svelte/store';
    export let bgColorClass = ''; // Accept from the parent component

    const isMobileNavVisible = writable(false);

    function toggleMobileNav() {
        isMobileNavVisible.update(n => !n);
    }
</script>



<div class="bg-gray">
    <nav class="flex justify-between p-6 px-4 bg-slate-800" 
        data-config-id="toggle-mobile" 
        data-config-target=".navbar-menu" 
        data-config-class="hidden">
        <div class="flex items-center justify-between w-full">
            <Nav bgColorClass={bgColorClass} />
            <NavbarToggle on:click={toggleMobileNav} />
        </div>
    </nav>
    {#if $isMobileNavVisible}
        <NavMobile />
    {/if}
</div>
