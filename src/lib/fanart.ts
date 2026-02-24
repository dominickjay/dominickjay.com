/**
 * fanart.tv API v3 – music artist artwork by MusicBrainz ID (mbid).
 * Docs: https://fanarttv.docs.apiary.io/
 */

export interface FanartMusicArtist {
  artistbackground?: Array<{ id: string; url: string; likes: string }>;
  artistthumb?: Array<{ id: string; url: string; likes: string }>;
}

/**
 * Fetch artist artwork from fanart.tv. Prefers artistbackground, falls back to artistthumb.
 * Returns the first image URL or "" if none/missing mbid.
 */
export async function getArtistArt(
  mbid: string | null | undefined,
  apiKey: string | undefined,
): Promise<string> {
  if (!mbid?.trim() || !apiKey?.trim()) return "";
  try {
    const url = `https://webservice.fanart.tv/v3/music/${encodeURIComponent(mbid.trim())}?api_key=${encodeURIComponent(apiKey.trim())}`;
    const res = await fetch(url);
    if (!res.ok) return "";
    const data = (await res.json()) as FanartMusicArtist;
    const bg = data?.artistbackground?.[0]?.url?.trim();
    if (bg) return bg;
    const thumb = data?.artistthumb?.[0]?.url?.trim();
    return thumb ?? "";
  } catch {
    return "";
  }
}
