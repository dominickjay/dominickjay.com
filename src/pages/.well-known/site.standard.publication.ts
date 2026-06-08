// src/pages/.well-known/site.standard.publication.ts
import type { APIRoute } from "astro";
import { generatePublicationWellKnown } from "@bryanguffey/astro-standard-site";

export const GET: APIRoute = () => {
  return new Response(
    generatePublicationWellKnown({
      did: "did:plc:wbe7yhdrp57bolsjx4xf7mr6",
      publicationRkey: "3mnnehdgj3kxu",
    }),
    { headers: { "Content-Type": "text/plain" } },
  );
};
