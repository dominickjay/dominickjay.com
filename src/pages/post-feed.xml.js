import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getPublishedPosts } from "../utils/posts";

export async function GET(context) {
  const blogPosts = await getPublishedPosts();

  const items = blogPosts.map((post) => {
    const title = post.data.title ?? "Untitled";
    const description = post.data.description ?? "";
    const rawDate = post.data.pubDate;
    const pubDate = rawDate instanceof Date ? rawDate : new Date(rawDate);
    const validDate = !Number.isNaN(pubDate.getTime()) ? pubDate : new Date();

    return {
      title,
      description,
      pubDate: validDate,
      link: `/writing/${post.id}/`,
    };
  });

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
