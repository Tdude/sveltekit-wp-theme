<!-- [slug].svelte -->
<script context="module">
  import { fetchPosts } from '../../services/WordPressService';
  
  export async function load({ params }) {
    const page = await fetchPosts(params.slug);
    return { props: { page } };
  }
</script>

<script>
  export let page;
</script>

<article>
  <h1>{page.title.rendered}</h1>
  {@html page.content.rendered}
</article>
