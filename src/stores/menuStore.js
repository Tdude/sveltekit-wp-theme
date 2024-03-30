// src/stores/menuStore.js
import { writable, get } from 'svelte/store';
import { fetchMenu } from '../services/WordPressService';
export const menuItems = writable([]);



export const loadMenuItems = async () => {
    const menuData = await fetchMenu('menu-1'); // Fetch the menu data
    menuItems.set(menuData); // Assume menuData is an array of menu items
};

export default menuItems;

