import type { APIRoute } from 'astro';
import { getArtistInfo } from '../../lib/lastfm';
import { getArtistArt } from '../../lib/fanart';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const artist = url.searchParams.get('artist')?.trim();
  if (!artist) {
    return new Response(JSON.stringify({ url: '' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  try {
    const lastFmApiKey = import.meta.env.LAST_FM_API_KEY;
    const fanartApiKey = import.meta.env.FANART_API_KEY;
    if (!lastFmApiKey || !fanartApiKey) {
      return new Response(JSON.stringify({ url: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const artistInfo = await getArtistInfo(artist, lastFmApiKey);
    const bannerUrl = await getArtistArt(artistInfo?.mbid, fanartApiKey);
    return new Response(JSON.stringify({ url: bannerUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'private, max-age=300',
      },
    });
  } catch {
    return new Response(JSON.stringify({ url: '' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
