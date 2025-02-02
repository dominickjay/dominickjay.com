// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import tailwindcss from "@tailwindcss/vite";
// import moment from "moment";


// https://astro.build/config
export default defineConfig({
	site: 'https://dominickjay.com',
	integrations: [mdx(), sitemap(), alpinejs()],
});
