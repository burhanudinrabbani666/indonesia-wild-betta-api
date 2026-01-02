import { randomUUIDv7 } from "bun";
import { z } from "@hono/zod-openapi";

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
*/

const BettaSchemaLocation = z.object({
  river: z.string().nullable().openapi({
    example: "Sungai Mahakam",
  }),
  city: z.string().nullable().openapi({
    example: "Pampang",
  }),
  province: z.string().nullable().openapi({
    example: "East Kalimanta",
  }),
});

export const BettaSchema = z.object({
  id: z.string().openapi({
    example: "019b29c6-99cd-7d51-b9b4-60ca0db8b231",
  }),
  slug: z.string().openapi({
    example: "betta-channoides",
  }),

  name: z.string().openapi({
    example: "Betta Channoides",
  }),
  location: BettaSchemaLocation,
  phWater: z.string().nullable().openapi({
    example: "4,0-6,5",
  }),
  complex: z.string().nullable().openapi({
    example: null,
  }),
  category: z
    .enum([
      "Mouth Brooder Large",
      "Mouth Brooder Small",
      "Bubble Nester Large",
      "Bubble Nester Small",
    ])
    .openapi({
      example: "Mouth Brooder Small",
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
