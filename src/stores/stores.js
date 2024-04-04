// src/stores/stores.js
import { writable } from 'svelte/store';

export const postsStore = writable([]);
export const isLoading = writable(false);
export const paginationPage = writable(1); // Initialize the page store
