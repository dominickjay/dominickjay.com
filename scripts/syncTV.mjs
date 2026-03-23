import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID?.trim();
const dataset = process.env.SANITY_DATASET?.trim();
const token = process.env.SANITY_API_TOKEN?.trim();
const traktClientId = process.env.TRAKT_CLIENT_ID?.trim();
const TRAKT_USERNAME = process.env.TRAKT_USERNAME?.trim();

if (!projectId || !dataset || !token) {
  console.error(
    "Missing SANITY_PROJECT_ID, SANITY_DATASET, or SANITY_API_TOKEN",
  );
  process.exit(1);
}
if (!traktClientId || !TRAKT_USERNAME) {
  console.error("Missing TRAKT_CLIENT_ID or TRAKT_USERNAME");
  process.exit(1);
}

console.log(`Syncing TV for ${TRAKT_USERNAME}...`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const res = await fetch(
  `https://api.trakt.tv/users/${encodeURIComponent(TRAKT_USERNAME)}/history?limit=1`,
  {
    headers: {
      "trakt-api-version": "2",
      "trakt-api-key": traktClientId,
      "User-Agent": "Mozilla/5.0 (compatible; dominickjay.com/1.0)",
    },
  },
);

const body = await res.text();

if (!res.ok) {
  console.error(
    "Trakt API error:",
    res.status,
    res.statusText,
    body.slice(0, 200),
  );
  process.exit(1);
}

const [item] = JSON.parse(body);

if (!item) {
  console.error("No history returned from Trakt");
  process.exit(1);
}

let title = null;
let season;
let episode;

if (item.type === "movie") {
  title = item.movie?.title ?? null;
} else if (item.type === "episode") {
  title = item.show?.title ?? item.episode?.show?.title ?? null;
  season = item.episode?.season;
  episode = item.episode?.number;
}

console.log(
  `Last watched: ${title}${season != null ? ` S${String(season).padStart(2, "0")}E${String(episode).padStart(2, "0")}` : ""}`,
);

const tvJson = JSON.stringify({
  title,
  season,
  episode,
  watchedAt: item.watched_at,
});

try {
  await client.createOrReplace({
    _id: "global-tv-cache",
    _type: "tvCache",
    lastUpdated: new Date().toISOString(),
    tvJson,
  });
  console.log("TV cache sync complete.");
} catch (e) {
  console.error("Sanity write failed:", e.message || e);
  process.exit(1);
}
