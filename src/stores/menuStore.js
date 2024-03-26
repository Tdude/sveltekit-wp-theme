// src/stores/menuStore.js
import { writable, get } from 'svelte/store';
import { fetchMenu } from '../services/WordPressService';

const menuItems = writable([]);

export const loadMenuItems = async () => {
  if (get(menuItems).length === 0) { // Prevent refetching if already loaded
    try {
      const menuData = await fetchMenu('menu-1');
      menuItems.set(menuData.map(item => ({ title: item.title, url: item.url })));
    } catch (error) {
      console.error("Failed to load menu:", error);
    }
  }
};

export default menuItems;
