import "dotenv/config";
import {
  StandardSitePublisher,
  type PublishDocumentInput,
} from "@bryanguffey/astro-standard-site";

const DOCUMENT_RKEY = "3mopuir7o5kyv";
const TARGET_SITE =
  "at://did:plc:wbe7yhdrp57bolsjx4xf7mr6/site.standard.publication/3mouay3zzcsgr";

const identifier = process.env.ATPROTO_IDENTIFIER?.trim();
const password = process.env.ATPROTO_APP_PASSWORD?.trim();

if (!identifier || !password) {
  console.error("Missing ATPROTO_IDENTIFIER or ATPROTO_APP_PASSWORD in .env");
  process.exit(1);
}

const publisher = new StandardSitePublisher({ identifier, password });

await publisher.login();

const documents = await publisher.listDocuments();
const existing = documents.find((document) =>
  document.uri.endsWith(`/${DOCUMENT_RKEY}`),
);

if (!existing) {
  console.error(`Document not found for rkey: ${DOCUMENT_RKEY}`);
  process.exit(1);
}

const { $type, ...fields } = existing.value as Record<string, unknown>;
void $type;

const result = await publisher.updateDocument(DOCUMENT_RKEY, {
  ...fields,
  site: TARGET_SITE,
} as PublishDocumentInput);

console.log(`Updated: ${result.uri}`);
