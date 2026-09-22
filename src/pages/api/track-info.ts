import type { APIRoute } from 'astro';
import { getTrackInfo } from '../../lib/lastfm';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  try {
    const lastFmApiKey = import.meta.env.LAST_FM_API_KEY;
    const artist = url.searchParams.get('artist');
    const track = url.searchParams.get('track');

    if (!lastFmApiKey || !artist || !track) {
      return new Response(JSON.stringify({ error: 'Missing artist, track or API key' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    const data = await getTrackInfo(artist, track, lastFmApiKey);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=120'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch track info' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
