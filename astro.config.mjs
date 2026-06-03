// @ts-check
import { defineConfig } from "astro/config";
import { createRequire } from "node:module";
import mdx from "@astrojs/mdx";
import { remarkModifiedTime } from "./remark-modified-time.mjs";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import sanity from "@sanity/astro";
import react from "@astrojs/react";
import opengraphImages, { presets } from "astro-opengraph-images";
import * as fs from "node:fs";
import { blogRenderer } from "./src/opengraph/blogRenderer";
import { env } from "node:process";

const require = createRequire(import.meta.url);
const domTheme = require("./src/styles/dom-shiki-theme.json");

console.log("BASE_URL", env.BASE_URL);

// https://astro.build/config
export default defineConfig({
  site: env.BASE_URL ?? "https://dominickjay.com",
  markdown: {
    remarkPlugins: [remarkModifiedTime],
  },
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
    react(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: "Gentle",
            weight: 400,
            style: "normal",
            data: fs.readFileSync("public/fonts/gentle.woff"),
          },
          {
            name: "Tiempos",
            weight: 400,
            style: "normal",
            data: fs.readFileSync(
              "public/fonts/testtiempostext-regular-bf66457a50cd521-webfont.woff",
            ),
          },
        ],
      },
      render: blogRenderer,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    assetsInclude: ["**/*.glb"],
  },
  adapter: netlify(),
});
