<!-- src/components/HeroSection.svelte -->
<script>
    // Declare vars and fallbacks
    export let title = 'Hero Section Titel';
    export let excerpt = 'Ett utdrag som inte är så långt.';
    export let meta_header = 'Liten sup titel';
    export let cta_text = 'Hej knapp';
    export let cta_link = 'https://mindialog.se';
    export let cta_text_sec = 'Hej knapp 2';
    export let cta_link_sec = 'https://mindialog.se';
    export let imageUrl = 'images/gubbeikylen.jpeg';
    export let altText = 'En fin bild';
    export let bgColorClass = ''; // Accept bgColorClass from the parent component

</script>

<div class={`py-20 md:py-28 ${bgColorClass}`}>
    <div class="container px-4 mx-auto">
        <div class="flex flex-wrap xl:items-center -mx-4">
            <div class="w-full md:w-1/2 px-4 mb-16 md:mb-0">
                <span class="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-green-500 uppercase rounded-9xl">{meta_header}</span>
                <h1 class="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-slate-200 font-bold tracking-tight">{title}</h1>
                <p class="mb-8 text-lg md:text-xl text-slate-400 font-medium">{@html excerpt}</p>

                <!-- Buttons -->
                <div class="flex flex-wrap">
                    <a class="inline-block py-5 px-7 text-base md:text-lg leading-4 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm mr-4" href="{cta_link}">{cta_text}</a>
                    <a class="inline-block py-5 px-7 text-base md:text-lg leading-4 bg-slate-800 hover:bg-slate-600 font-medium text-center text-slate-100 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm" href="{cta_link_sec}">{cta_text_sec}</a>
                </div>
            </div>
            <div class="w-full md:w-1/2 px-4">
                <div class="relative mx-auto md:mr-0 max-w-max">
                    <div class="relative overflow-hidden rounded-7xl">
                        {#if imageUrl && altText}
                            <img src="{imageUrl}" alt="{altText}">
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
