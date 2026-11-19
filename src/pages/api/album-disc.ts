import type { APIRoute } from "astro";
import { getAlbumDisc } from "../../lib/fanart";
import { getReleaseGroupId } from "../../lib/musicbrainz";

export const prerender = false;

const json = (body: unknown, maxAge = 0) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${maxAge}`,
    },
  });

export const GET: APIRoute = async ({ url }) => {
  const fanartApiKey = import.meta.env.FANART_API_KEY;
  const releaseMbid = url.searchParams.get("mbid") ?? undefined;
  const artist = url.searchParams.get("artist") ?? undefined;
  const album = url.searchParams.get("album") ?? undefined;
  if (!fanartApiKey || (!releaseMbid && !(artist && album))) {
    return json({ url: "" });
  }
  const releaseGroupId = await getReleaseGroupId({ releaseMbid, artist, album });
  const discUrl = await getAlbumDisc(releaseGroupId, fanartApiKey);
  // Disc art for an album doesn't change, so let browsers hold onto it
  return json({ url: discUrl }, 86400);
};
