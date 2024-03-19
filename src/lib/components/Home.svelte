<!-- src/components/Home.svelte -->
<script>
    import HeroContainer from './HeroContainer.svelte';
    // Import Posts component if you plan to show latest posts on the homepage
    import Posts from './Posts.svelte';
</script>

<HeroContainer />


<h1>Svelte WordPress Theme</h1>
<p>This is the home page of our Svelte-powered WordPress theme.</p>

<Posts />