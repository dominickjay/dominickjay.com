// @ts-check
import { defineConfig } from "astro/config";
import { createRequire } from "node:module";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import db from "@astrojs/db";
import sanity from "@sanity/astro";
import react from "@astrojs/react";

const require = createRequire(import.meta.url);
const domTheme = require("./src/styles/dom-shiki-theme.json");

// https://astro.build/config
export default defineConfig({
  site: "https://dominickjay.com",
  integrations: [
    sanity({
      projectId: "m7q8vxzo",
      dataset: "production",
      // Set useCdn to false if you're building statically.
      useCdn: false,
      // Access the Studio on your.url/admin
      studioBasePath: "/admin",
    }),
    mdx({
      extendMarkdownConfig: true,
      smartypants: true,
			shikiConfig: {
				theme: domTheme,
			},
    }),
    sitemap(),
    alpinejs(),
    db({
      studio: false,
    }),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ["**/*.glb"],
  },
  adapter: netlify(),
});
