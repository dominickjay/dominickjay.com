// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from "@tailwindcss/vite";
import netlify from '@astrojs/netlify';
import db from '@astrojs/db';
import sanity from '@sanity/astro';
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	site: 'https://dominickjay.com',
	integrations: [
		sanity({
      projectId: 'm7q8vxzo',
      dataset: 'production',
      // Set useCdn to false if you're building statically.
      useCdn: false,
			// Access the Studio on your.url/admin
      studioBasePath: '/admin',
    }),
		mdx({
			extendMarkdownConfig: true,
			smartypants: true,
		}),
		sitemap(),
		alpinejs(),
		db({
			studio: false
		}),
    react(),
	],
	vite: {
		plugins: [tailwindcss()],
		assetsInclude: ["**/*.glb"],
	},
	adapter: netlify(),
});
