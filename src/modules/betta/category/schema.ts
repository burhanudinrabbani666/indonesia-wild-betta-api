import { z } from "@hono/zod-openapi";

export const GetCategorySchema = z.object({
  id: z.int().openapi({
    example: 1,
  }),
  name: z.string().openapi({
    example: "mouth-brooder-small",
  }),
  slug: z.string().openapi({
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

/*
{
  "id": 1,
  "name": "betta compuncta",
  "slug": "betta-compuncta",
  "river": null,
  "city": null,
  "province": "east-kalimantan",
  "phWater": "3.7 - 5.3",
  "complexId": 1,
  "categoryId": 2,
  "createdAt": "2026-01-17T07:19:26.762Z",
  "updatedAt": "2026-01-29T01:45:57.615Z",
  "complex": {
    "id": 1,
    "slug": "unimaculata",
    "name": "unimaculata",
    "createdAt": "2026-01-28T15:16:41.151Z",
    "updatedAt": "2026-01-29T01:45:55.208Z"
  },
  "category": {
    "id": 2,
    "slug": "mouth-brooder-large",
    "name": "mouth-brooder-large",
    "createdAt": "2026-01-28T15:16:42.841Z",
    "updatedAt": "2026-01-29T01:45:56.897Z"
  }
}
  */
