/**
 * MusicBrainz API – resolve artist name to MusicBrainz ID (mbid).
 * Used when Last.fm does not return an mbid. Fanart.tv requires mbid.
 * https://musicbrainz.org/doc/MusicBrainz_API
 * User-Agent is required: https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting
 */

const USER_AGENT = "dominickjay.com/1.0 (https://dominickjay.com)";

export async function getMbidByArtistName(
  artistName: string
): Promise<string | null> {
  const q = artistName?.trim();
  if (!q) return null;
  try {
    const url = `https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(q)}&fmt=json&limit=5`;
    const res = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
    });
    if (!res.ok) {
      console.debug("[musicbrainz] non-ok:", { status: res.status, artist: q });
      return null;
    }
    const data = (await res.json()) as {
      artists?: Array<{ id: string; name: string; score?: number }>;
    };
    const artists = data?.artists;
    const first = Array.isArray(artists) && artists.length > 0 ? artists[0] : null;
    const mbid = first?.id?.trim() ?? null;
    console.debug("[musicbrainz] search:", {
      artist: q,
      found: !!mbid,
      mbid,
      name: first?.name ?? null,
    });
    return mbid;
  } catch (err) {
    console.debug("[musicbrainz] error:", { artist: q, error: err });
    return null;
  }
}
