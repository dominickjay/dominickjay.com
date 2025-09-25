// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import focus from '@alpinejs/focus';
import tailwindcss from "@tailwindcss/vite";
import netlify from '@astrojs/netlify';
import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
	site: 'https://dominickjay.com',
	integrations: [
		mdx({
			extendMarkdownConfig: true,
			smartypants: true,
		}),
		sitemap(),
		alpinejs(),
		db()
	],
	vite: {
		plugins: [tailwindcss()],
		assetsInclude: ["**/*.glb"],
	},
    output: 'server',
    adapter: netlify(),
});
