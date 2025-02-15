// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from "@tailwindcss/vite";


// https://astro.build/config
export default defineConfig({
	site: 'https://dominickjay.com',
	integrations: [mdx(), sitemap(), alpinejs()],
	vite: {
		plugins: [tailwindcss()],
		assetsInclude: ["**/*.glb"],
	},
});
