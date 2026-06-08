import "dotenv/config";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import matter from "gray-matter";
import {
  StandardSitePublisher,
  transformContent,
  type PublishDocumentInput,
} from "@bryanguffey/astro-standard-site";

const SITE_URL = "https://dominickjay.com";
const CONTENT_DIR = "src/content/writing";

const identifier = process.env.ATPROTO_IDENTIFIER?.trim();
const password = process.env.ATPROTO_APP_PASSWORD?.trim();

if (!identifier || !password) {
  console.error("Missing ATPROTO_IDENTIFIER or ATPROTO_APP_PASSWORD in .env");
  process.exit(1);
}

function toDocument(
  path: string,
  data: Record<string, unknown>,
  body: string,
): PublishDocumentInput {
  const { markdown, textContent } = transformContent(body, {
    siteUrl: SITE_URL,
    postPath: path,
  });

  return {
    site: SITE_URL,
    path,
    title: data.title as string,
    description: (data.description as string) ?? "",
    publishedAt: new Date(data.pubDate as string | Date).toISOString(),
    updatedAt: data.updatedDate
      ? new Date(data.updatedDate as string | Date).toISOString()
      : undefined,
    tags: (data.tags as string[]) ?? [],
    textContent,
    content: {
      $type: "site.standard.content.markdown",
      text: markdown,
      version: "1.0",
    },
  };
}

const publisher = new StandardSitePublisher({ identifier, password });

await publisher.login();

const existingByPath = new Map(
  (await publisher.listDocuments()).map((d) => [d.value.path, d]),
);

const files = (await readdir(CONTENT_DIR)).filter((f) => /\.(md|mdx)$/.test(f));

const posts = await Promise.all(
  files.map(async (file) => {
    const { data, content: body } = matter(
      await readFile(join(CONTENT_DIR, file), "utf-8"),
    );
    return { file, data, body };
  }),
);

for (const { file, data, body } of posts) {
  if (!data.title || !data.pubDate || data.draft) continue;

  const path = `/writing/${file.replace(/\.(md|mdx)$/, "")}`;
  const doc = toDocument(path, data, body);
  const existing = existingByPath.get(path);

  if (existing) {
    const rkey = existing.uri.split("/").pop()!;
    const result = await publisher.updateDocument(rkey, doc);
    console.log(`Updated: ${data.title}\n  → ${result.uri}`);
  } else {
    const result = await publisher.publishDocument(doc);
    console.log(`Published: ${data.title}\n  → ${result.uri}`);
  }
}
