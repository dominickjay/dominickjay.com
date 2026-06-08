// lib/create-publication.ts
import { StandardSitePublisher } from "@bryanguffey/astro-standard-site";

const publisher = new StandardSitePublisher({
  identifier: "dominickjay.bsky.social",
  password: process.env.ATPROTO_APP_PASSWORD!,
});

await publisher.login();

const result = await publisher.publishPublication({
  name: "Dom Jay - CSS, JS, and the occasional existential crisis",
  url: "https://dominickjay.com",
  description:
    "Dom Jay's digital garden. CSS, JavaScript, and the web platform - written honestly, published impatiently, and updated whenever guilt kicks in.",
  // Optional: customize your theme colors (RGB 0-255)
  basicTheme: {
    background: { r: 34, g: 34, b: 34 },
    foreground: { r: 251, g: 248, b: 239 },
    accent: { r: 240, g: 236, b: 224 },
    accentForeground: { r: 44, g: 83, b: 100 },
  },
});

console.log("Publication created!");
console.log("AT-URI:", result.uri);
console.log("Save this rkey for verification:", result.uri.split("/").pop());
