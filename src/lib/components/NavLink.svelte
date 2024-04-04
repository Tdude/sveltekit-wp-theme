<script>
	export let title = '';
	export let slug = '';
	$: slug = slug.startsWith('/') ? slug.substring(1) : slug;
</script>

<li class="mr-8">
	<a class="text-slate-100 hover:text-slate-50 font-medium p-2" href={`/${slug}`}>{title}</a>
</li>
