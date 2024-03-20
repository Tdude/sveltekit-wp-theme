<!--FeatureSmall.svelte-->
<script>
export let title = '';
export let excerpt = '';
export let iconName = '';
import IconWrapper from './IconWrapper.svelte';

</script>

<div class="w-full md:w-1/2 lg:w-1/3 px-4">
  <div class="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
      <IconWrapper iconName={iconName} />
    <h3 class="mb-4 text-xl md:text-2xl leading-tight font-bold">{title}</h3>
    <p class="text-slate-500 font-medium">{excerpt}</p>
  </div>
</div>
