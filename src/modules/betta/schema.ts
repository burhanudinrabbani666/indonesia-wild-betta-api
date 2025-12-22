import { z } from "zod";

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
  updatedAt: z.date(),
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
