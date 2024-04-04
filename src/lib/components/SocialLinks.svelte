<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import IconCopyLink from './IconCopyLink.svelte'; // Adjust path as necessary
  import IconFacebook from './IconFacebook.svelte';
  import IconTwitter from './IconTwitter.svelte';
  import IconInstagram from './IconInstagram.svelte';

  let currentPageUrl = '';

  onMount(() => {
    currentPageUrl = `${window.location.origin}${$page.url.pathname}`;
  });

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(currentPageUrl);
      alert('Link copied to clipboard!'); // Or use a more subtle notification
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPageUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentPageUrl)}`;
</script>

<div class="flex items-center justify-center">
  <button on:click={copyToClipboard} class="inline-flex mr-4 items-center justify-center py-2 px-4 text-coolGray-300 hover:text-coolGray-400 bg-white hover:bg-coolGray-100 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-md transition duration-200" title="Copy link to this page">
    <IconCopyLink />
    <span class="ml-2 text-sm text-coolGray-500 hover:text-coolGray-600 font-medium" data-config-id="auto-txt-25-1">Kopiera länk</span>
  </button>
  <a href={facebookShareUrl}  class="inline-flex mr-2 h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200" title="Share on Facebook">
    <IconFacebook />
  </a>
  <a href={twitterShareUrl} class="inline-flex mr-2 h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200" title="Share on Twitter">
    <IconTwitter />
  </a>

  <a href="/path/to/your/image.jpg" download="TitleImage.jpg" title="Save this image and share on Instagram">

  <a class="inline-flex h-9 w-9 items-center justify-center text-coolGray-500 hover:text-coolGray-600 bg-white hover:bg-coolGray-100 border border-coolGray-200 rounded-md shadow-md transition duration-200" href="/" title="not connected anywhere">
    <IconInstagram />
  </a>
</div>