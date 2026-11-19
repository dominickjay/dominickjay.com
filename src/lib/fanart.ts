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
  const m = mbid?.trim();
  const hasKey = !!apiKey?.trim();
  if (!m || !hasKey) {
    console.debug("[getArtistArt] skip:", { hasMbid: !!m, hasKey, mbid: mbid ?? null });
    return "";
  }
  const key = apiKey!.trim();
  const reqUrl = `https://webservice.fanart.tv/v3/music/${encodeURIComponent(m)}?api_key=${encodeURIComponent(key)}`;
  console.debug("[getArtistArt] fetch:", { mbid: m });
  try {
    const res = await fetch(reqUrl);
    console.debug("[getArtistArt] response:", {
      status: res.status,
      ok: res.ok,
      mbid: m,
    });
    if (!res.ok) {
      const text = await res.text();
      console.debug("[getArtistArt] non-ok body:", text.slice(0, 200));
      return "";
    }
    const data = (await res.json()) as FanartMusicArtist;
    const bg = data?.artistbackground?.[0]?.url?.trim();
    const thumb = data?.artistthumb?.[0]?.url?.trim();
    const out = bg ?? thumb ?? "";
    console.debug("[getArtistArt] result:", {
      mbid: m,
      hasArtistbackground: !!data?.artistbackground?.length,
      hasArtistthumb: !!data?.artistthumb?.length,
      url: out ? `${out.slice(0, 50)}...` : "(empty)",
    });
    return out;
  } catch (err) {
    console.debug("[getArtistArt] error:", err);
    return "";
  }
}

interface FanartMusicAlbums {
  albums?: Record<string, { cdart?: Array<{ url: string }> }>;
}

/**
 * Transparent disc artwork for an album, by MusicBrainz release group id.
 * Returns "" when fanart.tv has none.
 */
export async function getAlbumDisc(
  releaseGroupId: string | null | undefined,
  apiKey: string | undefined,
): Promise<string> {
  const id = releaseGroupId?.trim();
  if (!id || !apiKey?.trim()) return "";
  try {
    const res = await fetch(
      `https://webservice.fanart.tv/v3/music/albums/${encodeURIComponent(id)}?api_key=${encodeURIComponent(apiKey.trim())}`,
    );
    if (!res.ok) return "";
    const data = (await res.json()) as FanartMusicAlbums;
    return data?.albums?.[id]?.cdart?.[0]?.url?.trim() ?? "";
  } catch (err) {
    console.debug("[getAlbumDisc] error:", err);
    return "";
  }
}
