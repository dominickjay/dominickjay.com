import { defineCollection, z } from 'astro:content';

const writing = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    tags: z.array(z.string()),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    draft: z.boolean().optional(),
    layout: z.string().optional(),
    musicDateFrom: z.string().optional(),
    musicDateTo: z.string().optional(),
    linksFrom: z.string().optional(),
    linksTo: z.string().optional()
  })
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    hardware: z.array(z.string()),
    software: z.array(z.string()),
    other: z.array(z.string()).optional()
  })
});

export const collections = {
  writing,
  tools
};
