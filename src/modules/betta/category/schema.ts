import { z } from "@hono/zod-openapi";

export const GetCategorySchema = z.object({
  id: z.int().openapi({
    example: 1,
  }),
  name: z.string().min(3).max(100).trim().openapi({
    example: "mouth-brooder-small",
  }),
  slug: z.string().min(3).max(100).trim().openapi({
    example: "mouth-brooder-small",
  }),
  createdAt: z.date().openapi({
    example: "2026-01-28T15:16:41.151Z",
  }),
  updatedAt: z.date().openapi({
    example: "2026-01-28T15:16:41.151Z",
  }),
});

export const GetBettaByCategorySchema = z.object({
  slug: z.string().min(3).openapi({
    example: "mouth-brooder-small",
  }),
});

export const PostCategory = GetCategorySchema.pick({
  name: true,
});
