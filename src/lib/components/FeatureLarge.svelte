<!--FeatureLarge.svelte-->
<script>
  export let title = 'Default Large Title';
  export let excerpt = 'Default excerpt.';
  export let meta_header = 'Default meta header';
  export let position = '';
  $: flexPosition = position === 'right' 
                  ? 'text-right'
                  : position === 'center'
                  ? 'text-center'
                  : 'text-left';
</script>


<div class="container px-4 mx-auto">
  <div class={`md:max-w-4xl mb-12 mx-auto ${flexPosition}`}>
    <span class="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm" data-config-id="auto-txt-1-1">{meta_header}</span>
    <h1 class="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter" data-config-id="auto-txt-2-1">
        {title}
    </h1>
    <p class="text-lg md:text-xl text-slate-500 font-medium" data-config-id="auto-txt-3-1">
        {excerpt}
    </p>
  </div>
</div>
