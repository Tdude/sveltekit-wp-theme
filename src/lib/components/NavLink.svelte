<script>
  export let title = '';
  export let slug = '';
  // Options:
  // Reactive statement to update slug based on url
  //$: slug = url.replace(/^https?:\/\/[^\/]+/, ''); // Removes the protocol and domain
  // If you need to remove a leading slash to get the slug as well, uncomment the following line
  // $: slug = slug.startsWith('/') ? slug.substring(1) : slug;
</script>

<li class="mr-12">
  <a class="text-slate-100 hover:text-slate-50 font-medium" href={`/pages/${slug}`}>{title}</a>
</li>


