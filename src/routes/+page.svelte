<script>
	import { onMount } from 'svelte';
	import {
		SiteHeader,
		HeroPrimary,
		HeroSecondary,
		FeatureSection,
		FeatureLarge,
		FeatureMedium,
		FeatureSmall
	} from '../lib/components';
	import { fetchPosts, fetchMediaDetails } from '../services';
	
	let posts = [];
	let smallFeatures = [];
	let mediumFeatures = [];
	let largeFeatures = [];

	onMount(async () => {
		try {
			const fetchedPosts = await fetchPosts(1, 10, 'site_sections');

			console.log('Loaded site_sections in +page.svelte:', fetchedPosts);

			posts = await Promise.all(fetchedPosts.map(async (post) => {
				const title = post.title?.rendered || 'No Title';
				const excerpt = post.excerpt?.rendered || 'No Excerpt';
				const meta_header = post.meta_header || 'No meta header';
				let imageUrl = '', altText = '';

				if (post._links['wp:featuredmedia']) {
					const mediaURL = post._links['wp:featuredmedia'][0].href;
					const mediaDetails = await fetchMediaDetails(mediaURL);
					imageUrl = mediaDetails.imageUrl;
					altText = mediaDetails.altText;
				}

				// Base object for all posts
				let basePost = { 
					title, 
					excerpt,
					meta_header,
					layout: post.layout,
					position: post.position
				};

				// Add additional properties for hero sections
				if (post.layout === 'hero_primary' || post.layout === 'hero_secondary') {
					Object.assign(basePost, {
						imageUrl,
            altText,
						cta_text: post.cta_text || '',
						cta_link: post.cta_link || '',
						cta_text_sec: post.cta_text_sec || '',
						cta_link_sec: post.cta_link_sec || '',
						layout: post.layout
					});
				}
				return basePost;
			}));

			// Separate layouts
			smallFeatures = posts
			  .filter(post => post.layout === 'features_small')
			  .map(({ meta_header, layout, position, ...rest }) => rest);

			mediumFeatures = posts
			  .filter(post => post.layout === 'features_medium')
			  .map(({ layout, ...rest }) => rest);

			largeFeatures = posts
			  .filter(post => post.layout === 'features_large')
			  .map(({ layout, ...rest }) => rest);

			// Now, remove smallFeatures etc. from posts
			posts = posts.filter(post => 
			  post.layout !== 'features_small' && post.layout !== 'features_medium' && post.layout !== 'features_large'
			).map(({ position, ...rest }) => rest);
			// Filtered arrays
			// console.log(smallFeatures, mediumFeatures, posts);
		} catch (error) {
			console.error('Failed to load posts:', error);
		}
	});


	// Function to determine the component based on the layout
	function resolveComponent(layout) {
		switch (layout) {
			case 'hero_primary': return HeroPrimary;
			case 'hero_secondary': return HeroSecondary;
			case 'features_small': return FeatureSmall;
			case 'features_medium': return FeatureMedium;
			case 'features_large': return FeatureLarge;
			default: return null;
		}
	}

</script>



<section class="relative overflow-hidden">
	<SiteHeader />

	{#if posts.length === 0 && smallFeatures.length === 0}
		<p>Loading...</p>
	{:else}
		{#each posts as post}
			{#if ['hero_primary', 'hero_secondary'].includes(post.layout)}
				<svelte:component this={resolveComponent(post.layout)} {...post} />
			{/if}
		{/each}
		{#if largeFeatures.length}
			{#each largeFeatures as feature}
				<svelte:component this={FeatureLarge} {...feature} />
			{/each}
		{/if}
		{#if mediumFeatures.length}
			{#each mediumFeatures as feature}
				<svelte:component this={FeatureMedium} {...feature} />
			{/each}
		{/if}
		{#if smallFeatures.length}
			<FeatureSection>
				{#each smallFeatures as feature}
					<svelte:component this={FeatureSmall} {...feature} />
				{/each}
			</FeatureSection>
		{/if}
	{/if}
</section>

