<script>
    export let title = '';
    export let excerpt = '';
    export let content = '';
    export let meta_header = '';
    export let cta_text = '';
    export let cta_link = '';
    export let icon = '';
    export let style = '';
    import IconSvg from './IconSvg.svelte';

    $: bgStyle = style === 'gray' || style === 'light' ? 'bg-slate-50' : 'bg-white';

    let transformedContent = { h2Text: '', h3Text: '', h4Text: '', ulItems: [] };

    // Reactive statement updated to incorporate window check
    $: {
        if (typeof window !== 'undefined' && content) {
            transformedContent = transformContent(content);
        } else {
            // Optionally reset transformedContent or handle server-side logic
            transformedContent = { h2Text: '', h3Text: '', h4Text: '', ulItems: [] };
        }
    }

    // Function to transform the HTML string into a structured object
    function transformContent(content) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        const h2Text = doc.querySelector('h2')?.textContent || '';
        const h3Text = doc.querySelector('h3')?.textContent || '';
        const h4Text = doc.querySelector('h4')?.textContent || '';
        const ulItems = Array.from(doc.querySelectorAll('ul li')).map(li => li.textContent);

        return { h2Text, h3Text, h4Text, ulItems };
    }
    
</script>

<div class="w-full md:w-1/2 lg:w-1/3 p-4">
    <div class={`flex flex-col items-center pt-10 px-8 pb-8 rounded-md shadow-md hover:scale-105 transition duration-500 ${bgStyle}`}>
        <span class="inline-block py-px px-2 mb-6 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-9xl">
            {meta_header}
        </span>
        <h3 class="mb-4 text-lg md:text-2xl text-green-500 font-medium">
            {title}
        </h3>
        <!-- Displaying transformed content -->
        <div class="mb-4">
            <span class="text-2xl text-slate-900 font-medium relative -top-6 right-1">{transformedContent.h2Text}</span>
            <span class="text-5xl text-slate-900 font-medium">{transformedContent.h3Text}</span>
            <span class="text-3xl text-slate-900 font-medium">{transformedContent.h4Text}</span>
        </div>
        <div class="mb-6 text-lg md:text-xl text-slate-500 mb-7 font-medium">
            {excerpt}
        </div>
        <ul class="self-start mb-8 leading-tight">
            {#each transformedContent.ulItems as item}
            <li class="flex items-center text-slate-900 font-medium">
                <IconSvg icon={icon}/>
                <span>{item}</span>
            </li>
            {/each}
        </ul>
        <a href={cta_link} class="inline-block py-3 px-7 w-full text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm">
            {cta_text}
        </a>

    </div>
</div>
