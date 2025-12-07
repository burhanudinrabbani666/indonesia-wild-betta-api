import { type Bettas } from "../type/schema";

export const dataBettas: Bettas = [
  {
    id: 1,
    name: "Betta Channoides",
    slug: "betta-channoides",
    location: { river: null, city: null, province: "East Kalimantan" },
    phWater: "4,0-6,5",
    complex: null,
    category: "Mouth Brooder Small",
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 2,
    name: "Betta Albimarginata",
    slug: "betta-albimarginata",
    location: { river: null, city: null, province: "East Kalimantan" },
    phWater: "4,0-6,0",
    complex: null,
    category: "Mouth Brooder Large",
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 3,
    name: "Betta Hendra",
    slug: "betta-hendra",
    location: { river: null, city: null, province: "Central Kalimantan" },
    phWater: "4,0 - 6,5",
    complex: null,
    category: "Bubble Nester Small",
    createdAt: new Date(),
    updateAt: new Date(),
  },
];
