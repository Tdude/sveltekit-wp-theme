<script>
  import { onMount } from 'svelte';
  import { fetchContent } from '../services/WordPressService';
  import Header from '../lib/components/SiteHeader.svelte';
  import HeroSection from '../lib/components/HeroSection.svelte';
  import WaveSvg from '../lib/components/WaveSvg.svelte';


  let posts = [];

  onMount(async () => {
    posts = await fetchContent();
  });
</script>


<Header />


<section class="relative overflow-hidden">
    <Header />
    <HeroSection />
    <WaveSvg /> Kuken ballen index.htmlen
</section>




{#each posts as post}
  <article>
    <h2>{post.title.rendered}</h2>
    <div>{@html post.excerpt.rendered}</div>
    <a href={`/post/${post.slug}`}>Read more</a>
  </article>
{/each}
