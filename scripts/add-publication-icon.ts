import "dotenv/config";
import { readFileSync } from "node:fs";
import { extname } from "node:path";
import { AtpAgent } from "@atproto/api";
import { ATPROTO_DID, PUBLICATION_RKEY } from "../src/lib/atproto-config.js";

const identifier = process.env.ATPROTO_IDENTIFIER?.trim();
const password = process.env.ATPROTO_APP_PASSWORD?.trim();

if (!identifier || !password) {
  console.error("Missing ATPROTO_IDENTIFIER or ATPROTO_APP_PASSWORD in .env");
  process.exit(1);
}

const imagePath = process.argv[2];

if (!imagePath) {
  console.error(
    "Usage: npx tsx scripts/add-publication-icon.ts <path-to-image>",
  );
  process.exit(1);
}

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const mimeType = MIME_TYPES[extname(imagePath).toLowerCase()];

if (!mimeType) {
  console.error(
    "Unsupported image type. Use .png, .jpg, .jpeg, .svg, or .webp",
  );
  process.exit(1);
}

const agent = new AtpAgent({ service: "https://bsky.social" });

await agent.login({ identifier, password });

const imageBytes = readFileSync(imagePath);
const blobResponse = await agent.uploadBlob(imageBytes, {
  encoding: mimeType,
});

const existingRecord = await agent.com.atproto.repo.getRecord({
  repo: ATPROTO_DID,
  collection: "site.standard.publication",
  rkey: PUBLICATION_RKEY,
});

const basicTheme = {
  background: { r: 34, g: 34, b: 34 },
  foreground: { r: 251, g: 248, b: 239 },
  accent: { r: 240, g: 236, b: 224 },
  accentForeground: { r: 44, g: 83, b: 100 },
};

const result = await agent.com.atproto.repo.putRecord({
  repo: ATPROTO_DID,
  collection: "site.standard.publication",
  rkey: PUBLICATION_RKEY,
  record: {
    ...existingRecord.data.value,
    icon: blobResponse.data.blob,
    basicTheme,
  },
  swapRecord: existingRecord.data.cid,
});

console.log("Publication icon updated!");
console.log("AT-URI:", result.data.uri);
