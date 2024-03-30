<script>
    export let post;
</script>

<!-- Display the post data -->
{#if post}
    <article>
        <h1><b>{@html post.title}</b></h1>
        <p>{@html post.excerpt}</p>
        <div>{@html post.content}</div>
    </article>
{:else}
    <p>Post not found.</p>
{/if}
