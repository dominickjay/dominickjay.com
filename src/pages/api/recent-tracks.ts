import type { APIRoute } from 'astro';
import { getRecentTracks } from '../../lib/lastfm';

export const GET: APIRoute = async () => {
  try {
    const lastFmApiKey = import.meta.env.LAST_FM_API_KEY;
    if (!lastFmApiKey) {
      return new Response(JSON.stringify({ error: 'Missing Last.fm API key' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const data = await getRecentTracks(lastFmApiKey);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch recent tracks' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
