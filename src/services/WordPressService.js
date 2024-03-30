// WordPressService.js
// First set env for dev/prod in .env.local/production
const BASE_URL = import.meta.env.VITE_BASE_URL;


// Initialize a simple in-memory cache
const cache = {
    posts: {},
    images: {},
    mediaDetails: {},
    menus: {},
};



export async function fetchContent({ page = 1, perPage = 20, postTypes = ['posts'] }) {
    const promises = postTypes.map(async (postType) => {
        const cacheKey = `${postType}-${page}-${perPage}`;
        // Check if the data is already cached
        if (cache[cacheKey]) {
            console.log(`Returning cached data for ${cacheKey}`);
            return cache[cacheKey];
        }

        try {
            // Adjust the URL path for standard posts and pages
            let urlPath = postType;
            if (postType === 'posts' || postType === 'pages') {
                urlPath = `wp/v2/${postType}`;
            } else {
                urlPath = `wp/v2/${postType}`; // Customize this line if your custom post types have different URL structures
            }

            const response = await fetch(`${BASE_URL}${urlPath}?page=${page}&per_page=${perPage}`);
            if (!response.ok) {
                throw new Error(`Network response was not ok for ${postType}`);
            }
            const data = await response.json();
            cache[cacheKey] = data; // Cache the fetched data
            return data;
        } catch (error) {
            console.error(`Error fetching ${postType}:`, error);
            throw error;
        }
    });

    // Resolve all promises and flatten the results into a single array
    const results = await Promise.all(promises);
    return results.flat(); // This ensures that the function returns a flat array of posts/pages
}

// Example usage:
// fetchContent({ postTypes: ['posts', 'pages', 'site_sections'] })
//     .then(data => console.log(data))
//     .catch(error => console.error(error));


export async function fetchPageOrPostBySlug(slug, postType = 'pages') {
    const cacheKey = `${postType}-${slug}`;
    if (cache[cacheKey]) {
        console.log(`Returning cached data for ${cacheKey}`);
        return cache[cacheKey];
    }

    try {
        const response = await fetch(`${BASE_URL}wp/v2/${postType}?slug=${slug}`);

        if (!response.ok) {
            throw new Error(`Network response was not ok for slug ${slug}`);
        }
        const data = await response.json();
        if (data.length > 0) {
            cache[cacheKey] = data[0]; // Cache the fetched data
            return data[0]; // Assuming the first match is the desired one
        } else {
            throw new Error('Content not found');
        }
    } catch (error) {
        console.error(`Error fetching content for slug ${slug}:`, error);
        throw error;
    }
}



export async function fetchMediaDetails(mediaURL) {
    if (cache.mediaDetails[mediaURL]) {
        console.log(`Returning cached media details for ${mediaURL}`);
        return cache.mediaDetails[mediaURL];
    }

    try {
        const response = await fetch(mediaURL);
        const media = await response.json();
        const mediaDetails = {
            imageUrl: media.source_url,
            altText: media.alt_text || 'Default alt text if none is provided', // Fallback to a default if not provided
        };
        cache.mediaDetails[mediaURL] = mediaDetails;
        return mediaDetails;
    } catch (error) {
        console.error("Failed to fetch media details:", error);
        return null;
    }
}


// In WordPressService.js or a similar service file
export async function fetchMenu(menuSlug = 'menu-1') {
    const cacheKey = `menu-${menuSlug}`;
    if (cache[cacheKey]) {
        console.log(`Returning cached data for ${cacheKey}`);
        return cache[cacheKey];
    }

    try {
        const response = await fetch(`${BASE_URL}ss/v1/menus/${menuSlug}`);
        if (!response.ok) {
            throw new Error(`Error fetching menu: ${response.statusText}`);
        }
        const data = await response.json();
        cache[cacheKey] = data; // Cache the fetched menu data
        return data;
    } catch (error) {
        console.error(`Error fetching menu:`, error);
        throw error;
    }
}


