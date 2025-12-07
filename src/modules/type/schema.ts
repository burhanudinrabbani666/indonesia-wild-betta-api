import { randomUUIDv7 } from "bun";
import { z } from "zod";

export const BettaSchemaInput = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  location: z.object({
    river: z.string().nullable(),
    city: z.string().nullable(),
    province: z.string().nullable(),
  }),
  phWater: z.string().nullable(),
  complex: z.string().nullable(),
  category: z.enum([
    "Mouth Brooder Large",
    "Mouth Brooder Small",
    "Bubble Nester Large",
    "Bubble Nester Small",
  ]),
  createdAt: z.date(),
  updateAt: z.date(),
});

export type Betta = z.infer<typeof BettaSchemaInput>;
export type Bettas = Betta[];

export class WildBetta {
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
  updateAt: Date;

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
    this.updateAt = new Date();
  }
}
