import { z } from "@hono/zod-openapi";

export const betta = z.object({
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
    example: "central kalimantan",
    minimum: 3,
    maximum: 100,
  }),
  ph_water: z.string().nullable().optional().openapi({
    example: "4.0 - 6.5",
    minimum: 3,
    maximum: 100,
  }),
  complex_slug: z.string().nullable().optional().openapi({
    example: "coccina",
    minimum: 3,
    maximum: 100,
  }),
  category: z.string().openapi({
    example: "bubble nester small",
    minimum: 3,
    maximum: 100,
  }),
});

export const getBettaBySlug = betta.pick({
  slug: true,
});

export const getBettaByID = z.object({
  id: z.string(),
});

export const getBettaByComplex = z.object({
  complex_slug: z.string(),
});

export type Betta = z.infer<typeof betta>;
export type Bettas = Betta[];
