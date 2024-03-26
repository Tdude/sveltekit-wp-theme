<!-- IconWrapper.svelte -->
<script>
  export let icon = 'mail-open';// just a fallback value
  import IconSvg from './IconSvg.svelte';

</script>

<div class="inline-flex p-2 h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
  <IconSvg icon={icon} />
</div>

