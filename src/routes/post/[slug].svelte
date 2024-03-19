<!-- [slug].svelte -->
<script context="module">
  import { fetchPosts } from '../../services/WordPressService';
  
  export async function load({ params }) {
    const post = await fetchPosts(params.slug);
    return { props: { post } };
  }
</script>

<script>
  export let post;
</script>

<article>
  <h1>{post.title.rendered}</h1>
  {@html post.content.rendered}
</article>
