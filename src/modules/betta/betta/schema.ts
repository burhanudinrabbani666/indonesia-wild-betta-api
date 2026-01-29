import { z } from "@hono/zod-openapi";
export const GetBettaSchema = z.object({
  id: z.int().openapi({ example: 1 }),
  name: z.string().openapi({ example: "betta compuncta" }),
  slug: z.string().openapi({ example: "betta-compuncta" }),
  river: z.string().openapi({ example: null }),
  city: z.string().openapi({ example: null }),
  province: z.string().openapi({ example: "east-kalimantan" }),
  phWater: z.string().openapi({ example: "3.7 - 5.3" }),
  complexId: z.int().openapi({ example: 1 }),
  categoryId: z.int().openapi({ example: 2 }),
  createdAt: z.string().openapi({ example: "2026-01-17T07:19:26.762Z" }),
  updatedAt: z.string().openapi({ example: "2026-01-29T01:45:57.615Z" }),
  complex: z.object({
    id: z.int().openapi({ example: 1 }),
    slug: z.string().openapi({ example: "unimaculata" }),
    name: z.string().openapi({ example: "unimaculata" }),
    createdAt: z.string().openapi({ example: "2026-01-28T15:16:41.151Z" }),
    updatedAt: z.string().openapi({ example: "2026-01-29T01:45:55.208Z" }),
  }),
  category: z.object({
    id: z.int().openapi({ example: 2 }),
    slug: z.string().openapi({ example: "mouth-brooder-large" }),
    name: z.string().openapi({ example: "mouth-brooder-large" }),
    createdAt: z.string().openapi({ example: "2026-01-28T15:16:42.841Z" }),
    updatedAt: z.string().openapi({ example: "2026-01-29T01:45:56.897Z" }),
  }),
});

export const BettaSchema = z.object({
  name: z.string().min(3).max(100).trim().openapi({
    example: "betta hendra",
    minimum: 3,
    maximum: 100,
  }),
  slug: z.string().min(3).max(100).trim().openapi({
    example: "betta-hendra",
  }),
  river: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "sabangau",
    minimum: 3,
    maximum: 100,
  }),
  city: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "katingan",
    minimum: 3,
    maximum: 100,
  }),
  province: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "central-kalimantan",
    minimum: 3,
    maximum: 100,
  }),
  phWater: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "4.0 - 6.5",
    minimum: 3,
    maximum: 100,
  }),
  complexSlug: z.string().min(3).max(100).trim().optional().openapi({
    example: "coccina",
    minimum: 3,
    maximum: 100,
  }),
  categorySlug: z.string().min(3).max(100).trim().optional().openapi({
    example: "bubble-nester-small",
    minimum: 3,
    maximum: 100,
  }),
});

export const GetBettaBySlugSchema = z.object({
  slug: z.string().min(3).max(100).trim().openapi({
    example: "betta-hendra",
  }),
});

export const GetBettaByIdSchema = z.object({
  id: z.string().min(1).openapi({
    example: 1,
  }),
});

export const GetBettaByComplexSchema = z.object({
  complexSlug: z.string(),
});

export const GetBettaByCategorySchema = z.object({
  categorySlug: z.string(),
});

export const PostBettaSchema = BettaSchema.pick({
  name: true,
  river: true,
  city: true,
  province: true,
  phWater: true,
  complexSlug: true,
  categorySlug: true,
});

export const PatchBettaSchema = z.object({
  name: z.string().min(3).max(100).trim().optional().openapi({
    example: "betta hendra",
    minimum: 3,
    maximum: 100,
  }),
  slug: z.string().min(3).max(100).trim().optional().openapi({
    example: "betta-hendra",
  }),
  river: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "sabangau",
    minimum: 3,
    maximum: 100,
  }),
  city: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "katingan",
    minimum: 3,
    maximum: 100,
  }),
  province: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "central-kalimantan",
    minimum: 3,
    maximum: 100,
  }),
  phWater: z.string().min(3).max(100).trim().nullable().optional().openapi({
    example: "4.0 - 6.5",
    minimum: 3,
    maximum: 100,
  }),
  complexSlug: z.string().min(3).max(100).trim().optional().openapi({
    example: "coccina",
    minimum: 3,
    maximum: 100,
  }),
  categorySlug: z.string().min(3).max(100).trim().optional().openapi({
    example: "bubble-nester-small",
    minimum: 3,
    maximum: 100,
  }),
});

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];
