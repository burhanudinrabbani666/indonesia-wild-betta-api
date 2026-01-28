import { z } from "@hono/zod-openapi";

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
  slug: z.string().openapi({
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

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];
