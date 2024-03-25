// WordPressService.js
// Service for making API calls to a WordPress site.
let BASE_URL = "https://mindialog.se/wp-json/";

// Initialize a simple in-memory cache
const cache = {
    posts: {},
    images: {},
    mediaDetails: {},
    menus: {},
};

// Fetch posts but paginate. The "fetch" param is for Isomorphic server/client side API retrieval
export async function fetchPosts(page = 1, perPage = 20, postType = 'site_sections') {
    const cacheKey = `${postType}-${page}-${perPage}`;
    if (cache.posts[cacheKey]) {
        console.log(`Returning cached data for ${cacheKey}`);
        return cache.posts[cacheKey];
    }

    try {
        const response = await fetch(`${BASE_URL}wp/v2/${postType}?page=${page}&per_page=${perPage}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        cache.posts[cacheKey] = data;
        return data;
    } catch (error) {
        console.error(`Error fetching ${postType}:`, error);
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

// Continuing from the previous cache object
// Assume cache object is already declared and includes a 'menus' key

export async function fetchMenu(menuId = 'menu-1') {
    // Check if the data is already in the cache
    if (cache.menus[menuId]) {
        console.log(`Returning cached menu for ${menuId}`);
        return cache.menus[menuId];
    }

    //console.log(`Fetching menu for ${menuId}`);
    try {
        const response = await fetch(`${BASE_URL}ss/v1/menus/${menuId}`);
        if (!response.ok) {
            throw new Error(`Error fetching menu: ${response.statusText}`);
        }
        const data = await response.json();
        // Cache the fetched menu before returning it
        cache.menus[menuId] = data;
        return data;
    } catch (error) {
        console.error(`Error fetching menu:`, error);
        throw error;
    }
}
