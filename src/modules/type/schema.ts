import { randomUUIDv7 } from "bun";
import { z } from "zod";
import { id } from "zod/v4/locales";

export const GetBettaBySlug = z.object({
  slug: z.string(),
});

export const GetBettaById = z.object({
  id: z.string(),
});

const BettaSchemaLocation = z.object({
  river: z.string().nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
});

export const BettaSchema = z.object({
  id: z.string(),
  slug: z.string(),

  name: z.string(),
  location: BettaSchemaLocation,
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

export const createBettaSchema = BettaSchema.pick({
  name: true,
  location: true,
  phWater: true,
  complex: true,
  category: true,
});

export const UpdateBettaSchema = z.object({
  name: z.string(),
  phWater: z.string().nullable().optional(),
  complex: z.string().nullable().optional(),
  category: z
    .enum([
      "Mouth Brooder Large",
      "Mouth Brooder Small",
      "Bubble Nester Large",
      "Bubble Nester Small",
    ])
    .optional(),

  location: BettaSchemaLocation.partial().optional(),
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
