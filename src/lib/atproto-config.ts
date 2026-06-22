import { getPublicationAtUri } from "@bryanguffey/astro-standard-site";

export const ATPROTO_DID = "did:plc:wbe7yhdrp57bolsjx4xf7mr6";
export const PUBLICATION_RKEY = "3mouay3zzcsgr";

export const PUBLICATION_URI = getPublicationAtUri(
  ATPROTO_DID,
  PUBLICATION_RKEY,
);
