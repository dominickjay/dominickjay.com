// src/pages/open-graph/[...route].js
import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

export const prerender = true;

const blogs = await getCollection("writing");
const pages = Object.fromEntries(
  blogs.map(({ id, slug, data }) => [id, { data, slug }]),
);

const clipAtSentence = (text) => {
  const match = text.match(/[^.!?]+[.!?]/);
  return match ? match[0] : text;
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (path, { data }) => ({
    title: data.title,
    description: data.description ? clipAtSentence(data.description) : "",
    // You can use custom fonts if you want
    fonts: [
      "./public/fonts/InknutAntiqua-Medium.woff",
      "./public/fonts/InknutAntiqua-Regular.woff",
    ],
    font: {
      title: {
        size: 64,
        lineHeight: 1,
        families: ["InknutAntiqua"],
        weight: "Bold",
        color: [251, 248, 239],
      },
      description: {
        size: 25,
        lineHeight: 1.6,
        color: [251, 248, 239, 0.75],
        families: ["InknutAntiqua"],
        weight: "Normal",
      },
    },
    logo: {
      path: "./public/logo.png",
      size: [65, 65],
    },
    bgImage: {
      path: "./public/social-bg.png",
      fit: "contain",
    },
    padding: 50,
    quality: 100,
  }),
});
