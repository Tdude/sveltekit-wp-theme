<script>
	///routes/[slug]/+page.svelte
	const BASE_URL = import.meta.env.VITE_BASE_URL;
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fetchPageOrPostBySlug, fetchMediaDetails } from '../../services';
	import { SiteHeader, SiteFooter, SocialLinks } from '../../lib/components';

	let post = null;
	let featuredImage = null;
	let error = '';
	let slug = '';

	$: slug = $page.params.slug;
	$: if (slug) loadContent(slug);

	async function loadContent(slug) {
		// Reset post and featuredImage state at the start
		post = null;
		featuredImage = null;

		try {
			const fetchedPost = await fetchPageOrPostBySlug(slug);
			// Ensure post has been successfully fetched before proceeding
			if (fetchedPost) {
				post = fetchedPost;
				if (post.featured_media) {
					const mediaDetails = await fetchMediaDetails(
						`${BASE_URL}/wp-json/wp/v2/media/${post.featured_media}`
					);
					featuredImage = mediaDetails;
				}
			}
		} catch (e) {
			error = e.message;
			console.error('Error loading content dude: ', error);
		}
	}

	onDestroy(() => {
		// Cleanup actions here
	});
</script>

{#if post}
	<div class="relative overflow-hidden">
		<SiteHeader />

		{#if featuredImage}
			<section class="py-16 md:py-24 w-full relative overflow-hidden" style="height: 500px;">
				<!-- Adjust the height here -->
				<img
					src={featuredImage.imageUrl}
					alt={featuredImage.altText}
					class="block w-full h-full object-cover absolute top-0 left-0"
				/>
			</section>
		{/if}
		<section class="py-16 md:py-24 bg-white">
			<div class="container px-4 mx-auto">
				<div class="md:max-w-2xl mx-auto mb-12 text-center">
					<div class="flex items-center justify-center">
						<p class="inline-block text-green-500 font-medium">
							{post.author} // only author ID accessible here, there should be the author name
						</p>
						<span class="mx-1 text-green-500">•</span>
						<p class="inline-block text-green-500 font-medium">
							{#if post}
								{post.date.split('T')[0]}
							{/if}
						</p>
					</div>
					<h1 class="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold">
						{post.title.rendered}
					</h1>
					<p class="mb-6 text-lg md:text-xl font-medium text-coolGray-500">
						{@html post.excerpt.rendered}
					</p>
					<div class="post-content">
						{@html post.content.rendered}
					</div>
					{#if post.type === post}
						<div
							class="inline-block py-1 px-3 text-xs leading-5 text-green-500 font-medium uppercase bg-green-100 rounded-full shadow-sm"
						>
							{post.type} // Typ is just page or post, there should be "Category" value if posts
						</div>
					{/if}
				</div>
				<div class="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
					<img src="./images/gubbeikylen.jpeg" alt="" />
				</div>
				<div class="md:max-w-3xl mx-auto">
					<SocialLinks />
				</div>
			</div>
		</section>
		<SiteFooter />
	</div>
{:else if error}
	<p>Error: {error}</p>
{:else}
	<p class="spinner">Loading...</p>
{/if}
