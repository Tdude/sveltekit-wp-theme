<!--FeatureSmall.svelte-->
<script>
export let title = '';
export let excerpt = '';
</script>


<div class="w-full md:w-1/2 lg:w-1/3 px-4">
  <div class="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
    <div class="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
      <slot name="icon"></slot>
    </div>
    <h3 class="mb-4 text-xl md:text-2xl leading-tight font-bold">{title}</h3>
    <p class="text-slate-500 font-medium">{excerpt}</p>
  </div>
</div>
