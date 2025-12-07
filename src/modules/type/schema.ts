import { z } from "zod";

const BettaSchema = z.object({
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
  category: z
    .enum([
      "Mouth Brooder Large",
      "Mouth Brooder Small",
      "Bubble Nester Large",
      "Bubble Nester Small",
    ])
    .nullable(),
  createdAt: z.date(),
  updateAt: z.date(),
});

export type Betta = z.infer<typeof BettaSchema>;
export type Bettas = Betta[];
