import { readFile } from "node:fs/promises";
import { createClient } from "@sanity/client";

const LAST_FM_USER = "zerosandones217";
const projectId = process.env.SANITY_PROJECT_ID?.trim();
const dataset = process.env.SANITY_DATASET?.trim();
const token = process.env.SANITY_API_TOKEN?.trim();
const apiKey = process.env.LAST_FM_API_KEY?.trim();
const fanartApiKey = process.env.FANART_API_KEY?.trim();
const dryRun = process.argv.includes("--dry-run");

if (!projectId && !dryRun) {
  console.error("Missing SANITY_PROJECT_ID");
  process.exit(1);
}
if (!apiKey) {
  console.error("Missing LAST_FM_API_KEY");
  process.exit(1);
}
if (!fanartApiKey && !dryRun) {
  console.error("Missing FANART_API_KEY");
  process.exit(1);
}

const client = dryRun
  ? null
  : createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

// An album counts as listened to once half its tracks were played that week
const ALBUM_COMPLETION_THRESHOLD = 0.5;
// Skips singles and short EPs, where one play would already be a full listen
const ALBUM_MIN_TRACKS = 4;
const WEEK_SECONDS = 7 * 24 * 60 * 60;

const normalise = (value) =>
  (value ?? "")
    .toLowerCase()
    .replace(/\s*[([].*?[)\]]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const albumKey = (artist, album) => `${normalise(artist)}::${normalise(album)}`;

async function getWeekScrobbles() {
  const from = Math.floor(Date.now() / 1000) - WEEK_SECONDS;
  const scrobbles = [];
  let page = 1;
  let totalPages = 1;
  do {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${LAST_FM_USER}&from=${from}&limit=200&page=${page}&api_key=${apiKey}&format=json`;
    const data = await fetch(url).then((r) => r.json());
    if (data?.error) throw new Error(`Last.fm recent tracks: ${data.message}`);
    const tracks = data?.recenttracks?.track ?? [];
    scrobbles.push(...(Array.isArray(tracks) ? tracks : [tracks]));
    totalPages = Number(data?.recenttracks?.["@attr"]?.totalPages ?? 1);
    page++;
  } while (page <= totalPages);
  // The now playing track has no date and isn't a finished scrobble yet
  return scrobbles.filter((t) => !t?.["@attr"]?.nowplaying);
}

async function getLibraryTrackCounts() {
  try {
    const file = new URL("../src/data/albums.json", import.meta.url);
    const albums = JSON.parse(await readFile(file, "utf8"));
    return new Map(albums.map((a) => [albumKey(a.artist, a.album), a.trackCount]));
  } catch (_) {
    return new Map();
  }
}

async function getLastFmTrackCount(artist, album) {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&autocorrect=1&api_key=${apiKey}&format=json`;
    const data = await fetch(url).then((r) => r.json());
    const tracks = data?.album?.tracks?.track;
    if (!tracks) return 0;
    return Array.isArray(tracks) ? tracks.length : 1;
  } catch (_) {
    return 0;
  }
}

function rankByPlays(names, limit) {
  const counts = new Map();
  for (const name of names) counts.set(name, (counts.get(name) ?? 0) + 1);
  return [...counts]
    .map(([name, plays]) => ({ name, plays }))
    .sort((a, b) => b.plays - a.plays)
    .slice(0, limit);
}

// What a single artist's week looked like, for the lineup drawer
function getArtistWeek(scrobbles, artistName, limit = 5) {
  const own = scrobbles.filter(
    (t) => normalise(t.artist?.["#text"]) === normalise(artistName),
  );
  return {
    tracks: rankByPlays(own.map((t) => t.name).filter(Boolean), limit),
    albums: rankByPlays(
      own.map((t) => t.album?.["#text"]?.trim()).filter(Boolean),
      limit,
    ),
  };
}

async function getTopAlbums(scrobbles, limit = 10) {
  const grouped = new Map();
  for (const t of scrobbles) {
    const artist = t.artist?.["#text"]?.trim();
    const album = t.album?.["#text"]?.trim();
    if (!artist || !album) continue;
    const key = albumKey(artist, album);
    const entry = grouped.get(key) ?? {
      artist,
      album,
      plays: 0,
      tracks: new Set(),
      image: toImageArray(t.image).at(-1)?.["#text"] ?? "",
    };
    entry.plays++;
    entry.tracks.add(normalise(t.name));
    grouped.set(key, entry);
  }

  const libraryCounts = await getLibraryTrackCounts();
  const albums = [];
  for (const [key, entry] of grouped) {
    // Can't reach half of a 4+ track album with a single distinct track
    if (entry.tracks.size < ALBUM_MIN_TRACKS * ALBUM_COMPLETION_THRESHOLD) continue;
    const trackCount =
      libraryCounts.get(key) || (await getLastFmTrackCount(entry.artist, entry.album));
    if (trackCount < ALBUM_MIN_TRACKS) continue;
    const tracksPlayed = Math.min(entry.tracks.size, trackCount);
    if (tracksPlayed / trackCount < ALBUM_COMPLETION_THRESHOLD) continue;
    albums.push({
      name: entry.album,
      artist: entry.artist,
      image: entry.image,
      plays: entry.plays,
      tracksPlayed,
      trackCount,
      listens: Math.round((entry.plays / trackCount) * 10) / 10,
    });
  }

  return albums.sort((a, b) => b.listens - a.listens).slice(0, limit);
}

const [topTracksRes, topArtistsRes] = await Promise.all([
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getTopTracks&user=${LAST_FM_USER}&period=7day&api_key=${apiKey}&limit=20&format=json`,
  ),
  fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user=${LAST_FM_USER}&period=7day&api_key=${apiKey}&limit=20&format=json`,
  ),
]);

const topTracksData = await topTracksRes.json();
if (topTracksData?.error) {
  console.error(
    "Last.fm top tracks error:",
    topTracksData.error,
    topTracksData.message,
  );
  process.exit(1);
}
const topTracksJson = JSON.stringify(topTracksData);

const topArtistsData = await topArtistsRes.json();
if (topArtistsData?.error) {
  console.error(
    "Last.fm top artists error:",
    topArtistsData.error,
    topArtistsData.message,
  );
  process.exit(1);
}
const artists = topArtistsData?.topartists?.artist ?? [];

function toImageArray(img) {
  if (!img) return [];
  return Array.isArray(img) ? img : [img];
}

async function getArtistArtFromFanart(mbid) {
  if (!mbid?.trim() || !fanartApiKey) return null;
  try {
    const url = `https://webservice.fanart.tv/v3/music/${encodeURIComponent(mbid.trim())}?api_key=${encodeURIComponent(fanartApiKey)}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const bg = data?.artistthumb?.[0]?.url?.trim();
    if (bg) return [{ "#text": bg, size: "large" }];
  } catch (_) {}
  return null;
}

const MUSICBRAINZ_UA =
  "dominickjay.com-syncMusic/1.0 (https://dominickjay.com)";

async function getMbidByArtistName(artistName) {
  const q = artistName?.trim();
  if (!q) return null;
  try {
    const url = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(q)}&fmt=json&limit=5`;
    const res = await fetch(url, { headers: { "User-Agent": MUSICBRAINZ_UA } });
    if (!res.ok) return null;
    const data = await res.json();
    const first = data?.artists?.[0];
    return first?.id?.trim() ?? null;
  } catch (_) {
    return null;
  }
}

async function enrichArtistImage(artistName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(artistName)}&username=${LAST_FM_USER}&api_key=${apiKey}&format=json`;
  const data = await fetch(url).then((r) => r.json());
  if (data.error || !data.artist) return null;
  let mbid = data.artist?.mbid?.trim();
  if (!mbid) {
    mbid = await getMbidByArtistName(artistName);
  }
  if (!mbid) return null;
  return getArtistArtFromFanart(mbid);
}

// Tags people use for their own bookkeeping rather than describing the music
const NON_GENRE_TAGS = new Set([
  "seen live",
  "favorites",
  "favourites",
  "favorite",
  "favourite",
  "albums i own",
  "spotify",
]);

async function getArtistGenre(artistName) {
  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTags&artist=${encodeURIComponent(artistName)}&autocorrect=1&api_key=${apiKey}&format=json`;
    const data = await fetch(url).then((r) => r.json());
    const tags = toImageArray(data?.toptags?.tag);
    const tag = tags.find((t) => t?.name && !NON_GENRE_TAGS.has(t.name.toLowerCase()));
    return tag?.name.toLowerCase() ?? null;
  } catch (_) {
    return null;
  }
}

let scrobbles = [];
try {
  scrobbles = await getWeekScrobbles();
} catch (e) {
  console.error("Week scrobbles failed:", e.message || e);
}

const enrichedArtists = await Promise.all(
  artists.map(async (a) => {
    const [image, genre] = await Promise.all([
      a.mbid?.trim() ? getArtistArtFromFanart(a.mbid) : null,
      getArtistGenre(a.name),
    ]);
    return {
      ...a,
      image: image ?? [],
      genre,
      week: getArtistWeek(scrobbles, a.name),
    };
  }),
);

const recentArtistsJson = JSON.stringify({
  topartists: { artist: enrichedArtists },
});

let topAlbums = [];
try {
  topAlbums = await getTopAlbums(scrobbles);
} catch (e) {
  console.error("Top albums failed:", e.message || e);
}

if (dryRun) {
  console.table(
    topAlbums.map(({ image, ...album }) => album),
  );
  for (const a of enrichedArtists.slice(0, 3)) {
    console.log(a.name, a.genre, JSON.stringify(a.week));
  }
  process.exit(0);
}

try {
  await client.createOrReplace({
    _id: "global-music-cache",
    _type: "musicCache",
    lastUpdated: new Date().toISOString(),
    topTracksJson,
    recentArtistsJson,
    topAlbumsJson: JSON.stringify(topAlbums),
  });
} catch (e) {
  console.error("Sanity write failed:", e.message || e);
  process.exit(1);
}
