<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores'; // Import the page store for accessing params
  import { fetchPageOrPostBySlug } from '../../services/WordPressService'; // Adjust the import path as necessary

  let postTitle = '';
  let postContent = '';
  let error = '';

  onMount(async () => {
    const slug = $page.params.slug; // Get the slug from the page URL
    console.log('slug in [slug].svelte: ' + slug);
    try {
      const post = await fetchPageOrPostBySlug(slug); // You can specify 'pages' as second argument if needed
      postTitle = post.title.rendered;
      postContent = post.content.rendered;
    } catch (e) {
      error = e.message;
      console.error(e.message);
    }
  });
</script>

{#if error}
  <p class="error">{error}</p>
{:else}
  <article>
    <h1>{postTitle}</h1>
    <div class="content">{@html postContent}</div> <!-- Note: Ensure the content is safe to render as HTML -->
  </article>
{/if}
