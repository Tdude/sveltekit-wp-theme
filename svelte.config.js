import adapter from '@sveltejs/adapter-static'; // Import the adapter
import preprocess from 'svelte-preprocess'; // Import preprocess for Svelte


const config = {
  // Enable preprocess support, useful for SCSS, TypeScript, etc.
  preprocess: preprocess(),

  kit: {
    // Use the static adapter
    adapter: adapter({
      // default options are shown. You can omit this if defaults work for you
      pages: 'build', // Where to output the built files
      assets: 'build', // Where to output static assets
      fallback: 'index.html', // Useful for single-page applications
      precompress: false, // Enable precompression (optional)
    }),
    paths: {
      base: process.env.BASE_URL || '',
    },
  },
};

export default config;
