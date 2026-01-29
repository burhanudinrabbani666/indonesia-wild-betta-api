import { z } from "@hono/zod-openapi";
export const GetBettaScheama = z.object({
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
  name: z.string().openapi({
    example: "betta hendra",
    minimum: 3,
    maximum: 100,
  }),
  slug: z.string().openapi({
    example: "betta-hendra",
  }),
  river: z.string().nullable().optional().openapi({
    example: "sabangau",
    minimum: 3,
    maximum: 100,
  }),
  city: z.string().nullable().optional().openapi({
    example: "katingan",
    minimum: 3,
    maximum: 100,
  }),
  province: z.string().nullable().optional().openapi({
    example: "central-kalimantan",
    minimum: 3,
    maximum: 100,
  }),
  phWater: z.string().nullable().optional().openapi({
    example: "4.0 - 6.5",
    minimum: 3,
    maximum: 100,
  }),
  complexSlug: z.string().openapi({
    example: "coccina",
    minimum: 3,
    maximum: 100,
  }),
  categorySlug: z.string().openapi({
    example: "bubble-nester-small",
    minimum: 3,
    maximum: 100,
  }),
});

export const GetBettaBySlugSchema = z.object({
  slug: z.string().min(3).openapi({
    example: "betta-hendra",
  }),
});

export const GetBettaByIdSchema = z.object({
  id: z.string(),
});

export const GetBettaByComplexSchema = z.object({
  complexSlug: z.string(),
});

export const GetBettaByCategorySchema = z.object({
  categorySlug: z.string(),
});

export const GetComplexSchema = z.object({
  id: z.int().openapi({
    example: 1,
  }),
  name: z.string().openapi({
    example: "unimaculata",
  }),
  slug: z.string().openapi({
    example: "unimaculta",
  }),
  createdAt: z.date().openapi({
    example: "2026-01-28T15:16:41.151Z",
  }),
  updatedAt: z.date().openapi({
    example: "2026-01-28T15:16:41.151Z",
  }),
});

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];
