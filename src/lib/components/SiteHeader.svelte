<!-- src/components/SiteHeader.svelte -->
<script>
    import Navbar from './Navbar.svelte';
    export let bgColorClass = '';

</script>

<div class={`bg-gray ${bgColorClass}`}>
    <Navbar />
</div>