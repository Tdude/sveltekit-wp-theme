<!--IconSvg.svelte-->
<script>
  export let icon = '';
  export let style = '';

  $: iconPath = `/icons/${icon}.svg`;

  $: bgStyle = style === 'gray' || style === 'light' ? 'text-slate-900' : 'text-slate-800';

</script>

<span class="icon w-10 h-10" style="background-image: url({iconPath});"></span>

<style>
.icon {
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
  filter: invert(100%); /* Example filter to change color */
}
</style>