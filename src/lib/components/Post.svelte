<!-- src/components/Post.svelte -->
<script>
    import { onMount, getContext } from 'svelte';
    import { fetchPostById } from '../services/WordPressService.js';

    // Correctly obtain the 'page' context for routing parameters
    const { params } = getContext('svelte-routing');
    let post = null;

    onMount(async () => {
        const postId = params.id; // Correctly referencing the 'id' parameter from the page's URL
        try {
            post = await fetchPostById(postId);
        } catch (error) {
            console.error(`Failed to fetch post with id ${postId}:`, error);
            // Handle the error appropriately
        }
    });
</script>

{#if post}
    <article>
        <h1>{post.title.rendered}</h1>
        <div>{@html post.content.rendered}</div>
    </article>
{:else}
    <p>Post not found.</p>
{/if}

