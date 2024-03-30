<script>
    export let post;
</script>

<!-- Display the post data -->
{#if post}KUKEN
    <article>
        <h1>{@html post.title}</h1>
        <div>{@html post.excerpt}</div>
        <div>{@html post.content}</div>
    </article>
{:else}
    <p>Post not found.</p>
{/if}
