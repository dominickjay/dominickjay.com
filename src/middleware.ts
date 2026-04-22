import type { MiddlewareHandler } from "astro";

const MARKDOWN_ACCEPT = "text/markdown";

function wantsMarkdown(acceptHeader: string | null): boolean {
  if (!acceptHeader) {
    return false;
  }

  return acceptHeader
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .some((part) => part.startsWith(MARKDOWN_ACCEPT) || part === "*/*");
}

function estimateMarkdownTokens(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 0.75));
}

function htmlToMarkdown(html: string): string {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch?.[1]?.replace(/\s+/g, " ").trim();
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let source = bodyMatch?.[1] ?? html;

  source = source
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "");

  source = source
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n\n")
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n\n")
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n\n")
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n\n")
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n\n")
    .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n\n")
    .replace(
      /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
      "[$2]($1)",
    )
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n")
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n")
    .replace(/<br\s*\/?\s*>/gi, "\n");

  source = source
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (title && !source.startsWith("# ")) {
    return `# ${title}\n\n${source}`.trim();
  }

  return source;
}

function appendVaryAccept(existing: string | null): string {
  if (!existing) {
    return "Accept";
  }

  const parts = existing
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (parts.some((value) => value.toLowerCase() === "accept")) {
    return parts.join(", ");
  }

  return `${parts.join(", ")}, Accept`;
}

export const onRequest: MiddlewareHandler = async ({ request }, next) => {
  const response = await next();

  if (!["GET", "HEAD"].includes(request.method)) {
    return response;
  }

  if (!wantsMarkdown(request.headers.get("accept"))) {
    return response;
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("vary", appendVaryAccept(headers.get("vary")));
  headers.set("content-type", "text/markdown; charset=utf-8");

  if (request.method === "HEAD") {
    return new Response(null, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  const html = await response.text();
  const markdown = htmlToMarkdown(html);

  headers.set("x-markdown-tokens", `${estimateMarkdownTokens(markdown)}`);

  return new Response(markdown, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};
