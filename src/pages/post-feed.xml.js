import rss from "@astrojs/rss";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import { getCollection } from "astro:content";

const blogPosts = await getCollection("writing");

export function GET(context) {
	return rss({
		// `<title>` field in output xml
		title: SITE_TITLE,
		// `<description>` field in output xml
		description: SITE_DESCRIPTION,
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: [
			blogPosts.map((post) => ({
				title: post.data.title,
				pubDate: post.data.pubDate,
				description: post.data.description,
				// Compute RSS link from post `id`
				// This example assumes all posts are rendered as `/blog/[id]` routes
				link: `/writing/${post.id}/`,
			})),
		],
		// (optional) inject custom xml
		customData: `<language>en-us</language>`,
	});
}
