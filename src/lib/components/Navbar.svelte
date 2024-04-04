<script>
	import Logo from './Logo.svelte';
	import NavLink from './NavLink.svelte';
	import NavMobileToggle from './NavMobileToggle.svelte';
	import NavMobile from './NavMobile.svelte';
	import { onMount } from 'svelte';
	import { menuItems, loadMenuItems } from '../../stores/menuStore.js';
	import { goto } from '$app/navigation'; // Import the goto function for programmatic navigation

	let bgColorClass = 'bg-slate-900';
	let showMobileMenu = false;

	onMount(loadMenuItems);

	function toggleMobileMenu() {
		showMobileMenu = !showMobileMenu;
	}

	// Function to handle navigation
	function navigateTo(path) {
		goto(path);
	}
</script>

<nav class={`flex justify-between p-6 px-4 w-full ${bgColorClass}`}>
	<div class="flex justify-between items-center w-full">
		<div class="w-1/2 xl:w-1/3">
			<Logo src="/images/tryggve-logo-inv-green.svg" alt="Tryggve logo" />
		</div>
		<div class="w-1/2 xl:w-1/3">
			<ul class="hidden xl:flex xl:justify-center">
				{#each $menuItems as item (item.ID)}
					<NavLink slug={item.slug} title={item.title} />
				{/each}
			</ul>
		</div>
		<div class="w-1/2 xl:w-1/3">
			<div class="hidden xl:flex items-center justify-end md:pr-8">
				<!-- Updated to use on:click for SPA navigation -->
				<button
					class="inline-block py-2 px-4 mr-2 leading-5 hover:bg-slate-600 text-slate-400 hover:text-slate-50 bg-transparent font-medium rounded-md"
					on:click={() => goto('/login?from=loginButton')}
				>
					Logga In
				</button>

				<button
					class="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
					on:click={() => goto('/login?from=createAccountnButton')}
				>
					Skapa konto
				</button>
			</div>
		</div>
	</div>
	<NavMobileToggle on:click={toggleMobileMenu} />
	{#if showMobileMenu}
		<NavMobile {menuItems} />
	{/if}
</nav>
