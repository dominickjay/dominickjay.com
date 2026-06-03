import type { APIRoute } from "astro";
import { getRecentTracks, getTrackInfo } from "../../lib/lastfm";

export const prerender = false;

const durationCache = new Map<string, string>();

function isNowPlayingTrack(track: any): boolean {
  const attr = track?.["@attr"];
  return attr?.nowplaying === true || String(attr?.nowplaying) === "true";
}

async function addDurationToNowPlayingTrack(data: any, apiKey: string) {
  const tracks = data?.recenttracks?.track;
  const track = Array.isArray(tracks) ? tracks[0] : null;
  const artist = track?.artist?.["#text"];
  const name = track?.name;

  if (
    !track ||
    !isNowPlayingTrack(track) ||
    !artist ||
    !name ||
    track.duration
  ) {
    return data;
  }

  const cacheKey = `${artist}::${name}`;
  const cachedDuration = durationCache.get(cacheKey);
  if (cachedDuration) {
    track.duration = cachedDuration;
    return data;
  }

  const trackInfo = await getTrackInfo(artist, name, apiKey);
  const duration = trackInfo?.info?.duration;
  if (duration) {
    track.duration = String(duration);
    durationCache.set(cacheKey, track.duration);
  }

  return data;
}

export const GET: APIRoute = async () => {
  try {
    const lastFmApiKey = import.meta.env.LAST_FM_API_KEY;
    if (!lastFmApiKey) {
      return new Response(
        JSON.stringify({ error: "Missing Last.fm API key" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const data = await getRecentTracks(lastFmApiKey);
    const enrichedData = await addDurationToNowPlayingTrack(data, lastFmApiKey);

    return new Response(JSON.stringify(enrichedData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch recent tracks" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
