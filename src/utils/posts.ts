import { getCollection } from "astro:content";

const isProduction = () => import.meta.env.ENVIRONMENT === "production";

// Drafts are always excluded, regardless of environment. Use for anything
// that is published outside the site's own pages, like the RSS feeds.
export const getPublishedPosts = () =>
  getCollection("writing", ({ data }) => !data.draft);

// Drafts are excluded only in production, so previews can still show them.
// Use for the site's own pages and listings.
export const getVisiblePosts = () =>
  isProduction()
    ? getPublishedPosts()
    : getCollection("writing");

// Same environment gate as getVisiblePosts, for the "now" collection.
export const getVisibleNowEntries = () =>
  isProduction()
    ? getCollection("now", ({ data }) => !data.draft)
    : getCollection("now");

// Returns a new array, newest first. Does not mutate the input.
export const sortByPubDateDesc = <T extends { data: { pubDate: Date } }>(
  entries: T[],
): T[] =>
  [...entries].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
