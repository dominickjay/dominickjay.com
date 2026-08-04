import "dotenv/config";
import { AtpAgent } from "@atproto/api";
import { ATPROTO_DID, PUBLICATION_RKEY } from "../src/lib/atproto-config.js";

const SERVICE_URL = "https://chanterelle.us-west.host.bsky.network";
const COLLECTION = "site.standard.document";
const CANONICAL_PUBLICATION_URI =
  `at://${ATPROTO_DID}/site.standard.publication/${PUBLICATION_RKEY}`;
const APPLY = process.argv.includes("--apply");
const PAGE_LIMIT = 100;

const identifier = process.env.ATPROTO_IDENTIFIER?.trim();
const password = process.env.ATPROTO_APP_PASSWORD?.trim();

if (!identifier || !password) {
  console.error("Missing ATPROTO_IDENTIFIER or ATPROTO_APP_PASSWORD in .env");
  process.exit(1);
}

type RepoRecord = {
  uri: string;
  cid?: string;
  value: Record<string, unknown>;
};

function getRkey(uri: string): string {
  return uri.split("/").pop() ?? "";
}

function getSite(value: Record<string, unknown>): string {
  return typeof value.site === "string" ? value.site : "";
}

async function listAllDocuments(agent: AtpAgent): Promise<RepoRecord[]> {
  const records: RepoRecord[] = [];
  let cursor: string | undefined;

  while (true) {
    const response = await agent.com.atproto.repo.listRecords({
      repo: ATPROTO_DID,
      collection: COLLECTION,
      cursor,
      limit: PAGE_LIMIT,
    });

    records.push(...(response.data.records as RepoRecord[]));
    cursor = response.data.cursor;

    if (!cursor) break;
  }

  return records;
}

const agent = new AtpAgent({ service: SERVICE_URL });
await agent.login({ identifier, password });

const records = await listAllDocuments(agent);
const mismatches = records.filter((record) => {
  return getSite(record.value) !== CANONICAL_PUBLICATION_URI;
});

console.log(`Mode: ${APPLY ? "apply" : "dry-run"}`);
console.log(`Collection: ${COLLECTION}`);
console.log(`Records scanned: ${records.length}`);
console.log(`Mismatches found: ${mismatches.length}`);

if (mismatches.length === 0) {
  console.log("No updates needed.");
  process.exit(0);
}

for (const record of mismatches) {
  const currentSite = getSite(record.value) || "<missing>";
  console.log(`${record.uri} (${record.cid ?? "no-cid"})`);
  console.log(`  current site: ${currentSite}`);
}

if (!APPLY) {
  console.log("");
  console.log("Dry-run only. Re-run with --apply to write updates:");
  console.log("npx tsx scripts/fix-publication-links.ts --apply");
  process.exit(0);
}

let successCount = 0;
let failureCount = 0;

for (const record of mismatches) {
  const rkey = getRkey(record.uri);

  if (!rkey) {
    failureCount += 1;
    console.error(`Failed to parse rkey for uri: ${record.uri}`);
    continue;
  }

  try {
    await agent.com.atproto.repo.putRecord({
      repo: ATPROTO_DID,
      collection: COLLECTION,
      rkey,
      record: {
        ...record.value,
        site: CANONICAL_PUBLICATION_URI,
      },
      swapRecord: record.cid,
    });
    successCount += 1;
    console.log(`Updated: ${record.uri}`);
  } catch (error) {
    failureCount += 1;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed: ${record.uri}`);
    console.error(`  ${message}`);
  }
}

console.log("");
console.log("Apply finished.");
console.log(`Updated: ${successCount}`);
console.log(`Failed: ${failureCount}`);
