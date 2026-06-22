// lib/create-publication.ts
import { StandardSitePublisher } from "@bryanguffey/astro-standard-site";

const publisher = new StandardSitePublisher({
  identifier: "dominickjay.com",
  password: process.env.ATPROTO_APP_PASSWORD!,
});

await publisher.login();

const result = await publisher.publishPublication({
  name: "Dom Jay - CSS, JS, and the occasional existential crisis",
  url: "https://dominickjay.com",
  description:
    "Dom Jay's digital garden. CSS, JavaScript, and the web platform - written honestly, published impatiently, and updated whenever guilt kicks in.",
});

console.log("Publication created!");
console.log("AT-URI:", result.uri);
console.log("Save this rkey for verification:", result.uri.split("/").pop());
