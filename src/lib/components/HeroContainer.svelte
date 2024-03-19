<!-- src/components/HeroContainer.svelte -->
<script>
    import SiteHeader from './SiteHeader.svelte'; // Assuming this includes Nav, Logo, and NavbarToggle
    import HeroSection from './HeroSection.svelte';
    import WaveSvg from './WaveSvg.svelte';
    let layout = 'hero'; // Based on WP admin choices
    // Determine the class based on the layout
    $: bgColorClass = layout === 'hero' || layout === 'secondary_hero' ? 'bg-slate-900' : 'bg-white';
    $: showWaveSvg = layout === 'hero';
    console.log(bgColorClass);
</script>

KUKEN BALLEN DENNA FILEN ANVÄNDS INTE

    <SiteHeader bgColorClass={bgColorClass} />
    <HeroSection bgColorClass={bgColorClass} />
    {#if showWaveSvg}
        <WaveSvg />
    {/if}

