import rss from "@astrojs/rss";
import { getPublishedPosts, sortByPubDateDesc } from "../utils/posts";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  const posts = sortByPubDateDesc(await getPublishedPosts());
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/writing/${post.id}/`,
    })),
  });
}
