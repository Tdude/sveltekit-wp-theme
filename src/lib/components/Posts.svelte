<!-- src/components/Posts.svelte -->
<script>
    import { Link } from 'svelte-routing';
    import { onMount } from 'svelte';
    import { fetchPosts, searchPosts } from '../../services/WordPressService.js';
    import { postsStore, isLoading } from '../stores.js';
    let query = ''; // Holds the search query
    let page = 1; // Current page
    const perPage = 10; // Or as needed

    onMount(() => {
        fetchAndSetPosts();
    });

    async function fetchAndSetPosts(pageOverride) {
        isLoading.set(true);
        try {
            const posts = pageOverride ? await fetchPosts(pageOverride, perPage) : await fetchPosts(page, perPage);
            postsStore.set(posts);
        } catch (error) {
            console.error("Failed to fetch posts:", error);
            // Handle error
        } finally {
            isLoading.set(false);
        }
    }

    async function performSearch() {
        fetchAndSetPosts(); // Reuse the function with a modified signature if needed for search
    }

    function nextPage() {
        page++;
        fetchAndSetPosts();
    }

    function prevPage() {
        if (page > 1) {
            page--;
            fetchAndSetPosts();
        }
    }
</script>

<!-- Combined UI with loading, search, and pagination controls -->
{#if $isLoading}
    <p>Loading...</p>
{:else}
    <input type="text" bind:value={query} placeholder="Search posts...">
    <button on:click={performSearch}>Sök</button>

    {#if $postsStore.length > 0}
        <ul>
            {#each $postsStore as post}
                <li>
                    <Link to={`/post/${post.id}`}>
                        {@html post.title.rendered}
                    </Link>
                </li>
            {/each}
        </ul>
        <button on:click={prevPage} disabled={page <= 1}>Previous</button>
        <button on:click={nextPage}>Next</button>
    {:else}
        <p>No posts found.</p>
    {/if}

{/if}
