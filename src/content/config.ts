import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    order: z.number(),
    url: z.string().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { projects };
