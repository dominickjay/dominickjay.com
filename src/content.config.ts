import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const writing = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		supported: z.string().optional(),
		tags: z.array(z.string()),
		draft: z.boolean().optional(),
		layout: z.string().optional(),
		musicDateFrom: z.string().optional(),
		musicDateTo: z.string().optional(),
		linksFrom: z.string().optional(),
		linksTo: z.string().optional(),
		growth: z.enum(["evergreen", "growing", "seedling"]).optional(),
	}),
});

const tools = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/tools", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		hardware: z.array(
			z.object({
				name: z.string(),
				description: z.string().optional(),
				link: z.string().optional(),
			}),
		),
		software: z.array(
			z.object({
				name: z.string(),
				description: z.string().optional(),
				link: z.string().optional(),
			}),
		),
		other: z
			.array(
				z.object({
					name: z.string(),
					description: z.string().optional(),
					link: z.string().optional(),
				}),
			)
			.optional(),
	}),
});

const now = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/now", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
	}),
});

export const collections = {
	writing,
	tools,
	now,
};
