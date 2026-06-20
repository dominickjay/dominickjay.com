import type { APIRoute } from "astro";
import { generatePublicationWellKnown } from "@bryanguffey/astro-standard-site";
import { ATPROTO_DID, PUBLICATION_RKEY } from "../../lib/atproto-config";

export const GET: APIRoute = () =>
  new Response(
    generatePublicationWellKnown({
      did: ATPROTO_DID,
      publicationRkey: PUBLICATION_RKEY,
    }),
    { headers: { "Content-Type": "text/plain" } },
  );
de;
