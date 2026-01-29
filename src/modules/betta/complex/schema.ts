import { z } from "@hono/zod-openapi";

export const GetComplexSchema = z.object({
  id: z.int().openapi({
    example: 1,
  }),
  name: z.string().min(3).max(100).trim().openapi({
    example: "coccina",
  }),
  slug: z.string().min(3).max(100).trim().openapi({
    example: "coccina",
  }),
  createdAt: z.date().openapi({
    example: "2026-01-28T15:16:41.151Z",
  }),
  updatedAt: z.date().openapi({
    example: "2026-01-28T15:16:41.151Z",
  }),
});

export const GetBettaByComplex = GetComplexSchema.pick({
  slug: true,
});
export const PostComplexSchema = GetComplexSchema.pick({
  name: true,
});
