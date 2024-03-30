<script>
    import { onMount } from 'svelte';
    import { SiteHeader, HeroPrimary, HeroSecondary, FeatureSection, FeatureLarge, FeatureMedium, FeatureSmall, PostCard, SiteFooter, Posts } from '../lib/components';
    import { fetchContent, fetchMediaDetails } from '../services';

    let allPosts = []; // Will initially hold all fetched and processed posts
    let postGroups = []; // Individual posts or groups of posts for rendering

    onMount(async () => {
        try {
            //const fetchedPosts = await fetchPosts(1, 20, 'site_sections', true);
            const fetchedPosts = await fetchContent({ postTypes: ['posts', 'pages', 'site_sections'] })

            console.log('Loaded from WP in +page.svelte:', fetchedPosts);

			let processedPosts = await Promise.all(fetchedPosts.map(async (post) => {
			    let imageUrl = '', altText = '';
			    if (post._links['wp:featuredmedia']) {
			        const mediaURL = post._links['wp:featuredmedia'][0].href;
			        const mediaDetails = await fetchMediaDetails(mediaURL);
			        imageUrl = mediaDetails.imageUrl;
			        altText = mediaDetails.altText;
			    }

			    // Ensure categorySlugs is always an array
			    const categorySlugs = post.ss_cat_slugs || [];

			    const isGrouped = categorySlugs.some(slug => slug.startsWith('group-'));


			    return { 
					...post, 
					imageUrl,
					altText,
					title: post.title.rendered,
					excerpt: post.excerpt.rendered,
					content: post.content.rendered,
					icon: post.icon,
					position: post.position,
					layout: post.layout,
					categorySlugs, // No longer directly accessing post.ss_cat_slugs here
					isGrouped,
					postOrder: post.post_order
			    };
			}));


            allPosts = processedPosts.sort((a, b) => a.postOrder - b.postOrder);

            postGroups = [];

			let currentGroup = [];
			processedPosts.forEach((post, index) => {
			    if (post.isGrouped) {
			        // Add post to the current group
			        currentGroup.push(post);

			        // If it's the last post in the array or the next post is not part of the same group
			        if (index === processedPosts.length - 1 || processedPosts[index + 1].postOrder !== post.postOrder) {
			            // Push the current group to postGroups and reset currentGroup
			            postGroups.push(currentGroup);
			            currentGroup = [];
			        }
			    } else {
			        // For non-grouped posts, push them as individual arrays for consistency
			        postGroups.push([post]);
			    }
			});

			// Nested arrays here
    		//console.log('Post Groups:', postGroups);

        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    });



	function resolveComponent(layout, postType) {
	    if (postType === 'posts') {
	        return Posts;
	    }
	    switch (layout) {
	        case 'hero_primary': return HeroPrimary;
	        case 'hero_secondary': return HeroSecondary;
	        case 'features_small': return FeatureSmall;
	        case 'features_medium': return FeatureMedium;
	        case 'features_large': return FeatureLarge;
	        case 'postcard': return PostCard;
	        default: return Posts; // Make sure DefaultComponent is imported or defined
	    }
	}

	// Allowlist
	function resolveProps(layout, post) {
	    switch (layout) {
			case 'hero_primary':
			case 'hero_secondary':
				return {	imageUrl: post.imageUrl,
							altText: post.altText,
							title: post.title,
							excerpt: post.excerpt,
							meta_header: post.meta_header,
							cta_text: post.cta_text,
							cta_link: post.cta_link,
							cta_text_sec: post.cta_text_sec,
							cta_link_sec: post.cta_link_sec,
							layout: post.layout
						};
			
			case 'postcard':
			    return {	title: post.title,
							excerpt: post.excerpt,
							content: post.content,
							meta_header: post.meta_header,
							cta_text: post.cta_text,
							cta_link: post.cta_link,
							style: post.style,
							icon: post.icon
						};
			case 'features_small':
				return {	title: post.title,
							excerpt: post.excerpt,
							icon: post.icon
						};
			case 'features_medium':
			case 'features_large':
			    return {	title: post.title,
			    			excerpt: post.excerpt,
			    			meta_header: post.meta_header
			    		};
			default:
			    return {	post }; // Return whole obj for Posts component
	    }
	}


</script>

<div class="relative overflow-hidden">
    <SiteHeader />
    {#if postGroups.length === 0}
        <p>Loading...</p>
    {:else}
        {#each postGroups as group}
            {#if group.length > 1}
                <FeatureSection>
                    {#each group as post}
                        <svelte:component this={resolveComponent(post.layout, post.type)} {...resolveProps(post.layout, post)} />
                    {/each}
                </FeatureSection>
            {:else}
                {#each group as post}
                    <svelte:component this={resolveComponent(post.layout)} {...resolveProps(post.layout, post)} />
                {/each}
            {/if}
        {/each}
    {/if}
    <SiteFooter />
</div>






