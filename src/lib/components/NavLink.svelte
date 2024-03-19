<!-- src/components/NavLink.svelte -->
<script>
    export let href = 'mindialog.se';
    export let text = 'LINK';
</script>

<li class="mr-12">
  <a class="text-slate-100 hover:text-slate-50 font-medium" data-config-id="auto-txt-1-1" {href}>{text}</a>
</li>
