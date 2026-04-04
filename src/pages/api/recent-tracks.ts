import type { APIRoute } from 'astro';
import { getRecentTracks } from '../../lib/lastfm';

export const prerender = false;
const JSON_HEADERS = { 'Content-Type': 'application/json' };
const CACHE_HEADERS = {
  ...JSON_HEADERS,
  'Cache-Control': 'public, max-age=30, s-maxage=30, stale-while-revalidate=120'
};

export const GET: APIRoute = async () => {
  try {
    const lastFmApiKey = import.meta.env.LAST_FM_API_KEY;
    if (!lastFmApiKey) {
      return new Response(JSON.stringify({ error: 'Missing Last.fm API key' }), {
        status: 500,
        headers: JSON_HEADERS
      });
    }

    const data = await getRecentTracks(lastFmApiKey);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: CACHE_HEADERS
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch recent tracks' }), {
      status: 500,
      headers: JSON_HEADERS
    });
  }
};
