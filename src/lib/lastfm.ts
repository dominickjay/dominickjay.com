import { LASTFM_USER } from "../consts";
import { ttlCached } from "./ttl-cache";

export interface LastFmAlbum {
  name: string;
  url: string;
  image: Array<{ '#text': string; size: string }>;
  artist: {
    '#text': string;
  };
}

export interface LastFmTrack {
  name: string;
  artist: {
    '#text': string;
  };
  image: Array<{ '#text': string; size: string }>;
  '@attr'?: {
    nowplaying?: boolean;
  };
}

export interface LastFmArtist {
  name: string;
  mbid?: string;
  image: Array<{ '#text': string; size: string }>;
  url: string;
  playcount?: string; // present in weekly charts for the selected period
  bio: {
    summary: string;
  };
  stats: {
    listeners: string;
    playcount: string;
    userplaycount?: string;
  };
  info?: {
    image?: Array<{ '#text': string; size: string }>;
    stats?: {
      userplaycount?: string;
    };
  };
}

export interface LastFmTopTrack {
  name: string;
  url: string;
}

export interface LastFmResponse {
  weeklyalbumchart?: {
    album: LastFmAlbum[];
  };
  recenttracks?: {
    track: LastFmTrack[];
  };
  toptracks?: {
    track: Array<{
      name: string;
      url?: string;
      artist: { name?: string; "#text"?: string };
    }>;
  };
  error?: number;
  message?: string;
}

const LASTFM_API = "https://ws.audioscrobbler.com/2.0/";

export function lastfmUrl(
  method: string,
  params: Record<string, string | number>,
  apiKey: string,
): string {
  const url = new URL(LASTFM_API);
  url.searchParams.set("method", method);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("format", "json");
  return url.toString();
}

export async function getWeeklyAlbumChart(from: string, to: string, apiKey: string, limit?: number): Promise<LastFmResponse> {
  const response = await fetch(
    lastfmUrl(
      "user.getWeeklyAlbumChart",
      { user: LASTFM_USER, from, to, limit: limit || 20 },
      apiKey,
    ),
  );
  return response.json();
}

export async function getTopTracks(
  apiKey: string,
  limit?: number,
  period: "7day" | "1month" | "3month" | "6month" | "12month" = "7day"
): Promise<LastFmResponse> {
  const response = await fetch(
    lastfmUrl(
      "user.getTopTracks",
      { user: LASTFM_USER, period, limit: limit ?? 20 },
      apiKey,
    ),
  );
  return response.json();
}

export async function getArtistInfo(artist: string, apiKey: string): Promise<LastFmArtist> {
  if (!artist?.trim() || !apiKey?.trim()) {
    throw new Error('artist and apiKey are required');
  }
  const url = lastfmUrl("artist.getInfo", { artist, autocorrect: 1 }, apiKey);
  const response = await fetch(url);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.message);
  }

  // If we got a default placeholder image, try to get a better one from artist images
  // (artist.getImages may require higher Last.fm permissions and return error 4)
  const defaultImageHash = '2a96cbd8b46e442fc41c2b86b821562f';
  const firstImageUrl = data.artist?.image?.[0]?.['#text'] ?? '';
  if (firstImageUrl.includes(defaultImageHash)) {
    try {
      const imagesResponse = await fetch(
        lastfmUrl("artist.getImages", { artist, limit: 10 }, apiKey),
      );
      const imagesData = await imagesResponse.json();
      if (!imagesData?.error) {
        const imgs = imagesData?.images?.image;
        const arr = !imgs ? [] : Array.isArray(imgs) ? imgs : [imgs];
        const better = arr.find(
          (i: { '#text'?: string }) =>
            i?.['#text'] && !i['#text'].includes(defaultImageHash),
        );
        if (better?.['#text']) {
          data.artist.image = [{ '#text': better['#text'], size: 'large' }];
        }
      }
    } catch (error) {
    }
  }
  return data.artist;
}

export async function getAlbumInfo(artist: string, album: string, apiKey: string): Promise<LastFmAlbum> {
  try {
    const response = await fetch(
      lastfmUrl("album.getInfo", { artist, album }, apiKey),
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      throw new Error('Last.fm API returned non-JSON response. Check your API key and rate limits.');
    }

    const data = await response.json();

    // Check for Last.fm API errors
    if (data.error) {
      throw new Error(`Last.fm API error: ${data.message}`);
    }

    return data.album;
  } catch (error) {
    throw error;
  }
}

export async function getRecentTracks(apiKey: string): Promise<LastFmResponse> {
  if (!apiKey?.trim()) {
    throw new Error('apiKey is required');
  }
  const response = await fetch(
    lastfmUrl("user.getrecenttracks", { user: LASTFM_USER, limit: 10 }, apiKey),
  );
  return response.json();
}

export async function enrichAlbumsWithImages(albums: LastFmAlbum[], apiKey: string): Promise<LastFmAlbum[]> {
  const enrichedAlbums = await Promise.all(
    albums.map(async (album) => {
      try {
        const albumInfo = await getAlbumInfo(album.artist['#text'], album.name, apiKey);
        // Check if we have valid image data with at least one size
        if (albumInfo?.image?.length > 0) {
          // Verify at least one image URL is not empty
          const hasValidImage = albumInfo.image.some(img => img['#text'] && img['#text'].length > 0);
          if (hasValidImage) {
            return {
              ...album,
              image: albumInfo.image
            };
          }
        }
        // If no valid image data, return original album
        console.warn(`No valid image data for album: ${album.name}`);
        return album;
      } catch (error) {
        console.error(`Failed to fetch album info for ${album.name}:`, error);
        return album;
      }
    })
  );
  return enrichedAlbums;
}

export interface LatestTrack {
  name: string;
  artist: string;
  isPlaying: boolean;
}

/** Most recent scrobble. One request, shared across callers for 30s. */
export function getLatestTrack(apiKey?: string): Promise<LatestTrack | null> {
  if (!apiKey?.trim()) return Promise.resolve(null);
  return ttlCached("lastfm:latest-track", 30_000, async () => {
    try {
      const response = await fetch(
        lastfmUrl("user.getrecenttracks", { user: LASTFM_USER, limit: 1 }, apiKey),
      );
      const data = (await response.json()) as LastFmResponse;
      const track = data?.recenttracks?.track?.[0];
      if (!track) return null;
      const nowPlaying: unknown = track["@attr"]?.nowplaying;
      return {
        name: track.name,
        artist: track.artist?.["#text"] ?? "",
        isPlaying: nowPlaying === true || String(nowPlaying) === "true",
      };
    } catch (error) {
      console.error("Error fetching latest track:", error);
      return null;
    }
  });
}
