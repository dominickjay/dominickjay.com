import type { APIRoute } from 'astro';
import { getArtistInfo } from '../../lib/lastfm';
import { getArtistArt } from '../../lib/fanart';
import { getMbidByArtistName } from '../../lib/musicbrainz';

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
      console.debug("[artist-banner] missing env:", {
        hasLastFm: !!lastFmApiKey,
        hasFanart: !!fanartApiKey,
      });
      return new Response(JSON.stringify({ url: '' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const artistInfo = await getArtistInfo(artist, lastFmApiKey);
    let mbid = artistInfo?.mbid?.trim();
    if (!mbid) {
      mbid = (await getMbidByArtistName(artist)) ?? undefined;
      console.debug("[artist-banner] mbid from MusicBrainz fallback:", {
        artist,
        mbid: mbid ?? null,
      });
    } else {
      console.debug("[artist-banner] artist -> mbid:", {
        artist,
        mbid,
      });
    }
    const bannerUrl = await getArtistArt(mbid ?? undefined, fanartApiKey);
    console.debug("[artist-banner] result:", {
      artist,
      mbid,
      hasUrl: !!bannerUrl,
    });
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
