<script context="module">
// src/routes/pages/[slug].svelte

  import { fetchPageOrPostBySlug } from '../../services/WordPressService';
  
  export async function load({ params }) {
    try {
      const pageOrPost = await fetchPageOrPostBySlug(params.slug, 'pages'); // or 'posts'
      return { props: { pageOrPost } };
    } catch (error) {
      console.error("Failed to load content:", error);
      return {
        status: 404,
        error: 'Page not found'
      };
    }
  }
</script>

<script>
  export let pageOrPost;
</script>

{#if pageOrPost}
<article>
  <h1>{@html pageOrPost.title.rendered}</h1>
  {@html pageOrPost.content.rendered}
</article>
{:else}
<p>Content not found.</p>
{/if}
