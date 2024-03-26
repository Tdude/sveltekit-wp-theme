<!-- src/components/NavLink.svelte -->
<script>
  export let href = '';
  export let text = '';
</script>

<li class="mr-12">
  <a class="text-slate-100 hover:text-slate-50 font-medium" href={href}>{text}</a>
</li>