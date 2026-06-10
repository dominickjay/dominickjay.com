import type { APIRoute } from "astro";
import { ATPROTO_DID } from "../../lib/atproto-config";

export const GET: APIRoute = () =>
  new Response(ATPROTO_DID, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
