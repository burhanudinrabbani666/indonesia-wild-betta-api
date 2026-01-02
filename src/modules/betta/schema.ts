import { randomUUIDv7 } from "bun";
import { z } from "@hono/zod-openapi";
import { tr } from "zod/v4/locales";

/*

import { z } from '@hono/zod-openapi'

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1212121',
    }),
})

Sabangau
katingan
Central Kalimantan
4,0 - 6,5
coccina
Bubble Nester Small
*/

const BettaSchemaLocation = z.object({
  river: z.string().nullable().openapi({
    example: "Sungai Mahakam",
  }),
  city: z.string().nullable().openapi({
    example: "katingan",
  }),
  province: z.string().nullable().openapi({
    example: "Central Kalimantan",
  }),
});

export const BettaSchema = z.object({
  id: z.string().openapi({
    example: "019b29c7-722a-797a-b047-f99a18b3dd79",
  }),
  slug: z.string().openapi({
    example: "betta-hendra",
  }),

  name: z.string().openapi({
    example: "Betta Hendra",
  }),
  location: BettaSchemaLocation,
  phWater: z.string().nullable().openapi({
    example: "4,0 - 6,5",
  }),
  complex: z.string().nullable().openapi({
    example: "coccina",
  }),
  category: z
    .enum([
      "Mouth Brooder Large",
      "Mouth Brooder Small",
      "Bubble Nester Large",
      "Bubble Nester Small",
    ])
    .openapi({
      example: "Bubble Nester Small",
    }),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const GetBettaBySlug = BettaSchema.pick({
  slug: true,
});

export const GetBettaById = BettaSchema.pick({
  id: true,
});

export const GetBettaByComplex = BettaSchema.pick({
  complex: true,
});

export const createBettaSchema = BettaSchema.pick({
  name: true,
  location: true,
  phWater: true,
  complex: true,
  category: true,
});

export const UpdateBettaSchema = BettaSchema.pick({
  name: true,
  location: true,
  phWater: true,
  complex: true,
  category: true,
});

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];

export type createBetta = z.infer<typeof createBettaSchema>;
export type updateBetta = z.infer<typeof UpdateBettaSchema>;

export class BettaClass {
  id: string;
  name: string;
  slug: string;
  location: {
    river: string | null;
    city: string | null;
    province: string | null;
  };
  phWater: string | null;
  complex: string | null;
  category: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(payload: {
    name: string;
    location: {
      river: string | null;
      city: string | null;
      province: string | null;
    };
    phWater: string | null;
    complex: string | null;
    category: string;
  }) {
    this.id = randomUUIDv7();
    this.name = payload.name;
    this.slug = this.name.toLocaleLowerCase().trim().split(" ").join("-");
    this.location = payload.location;
    this.phWater = payload.phWater;
    this.complex = payload.complex;
    this.category = payload.category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
