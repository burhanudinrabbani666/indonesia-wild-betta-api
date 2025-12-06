type Betta = {
  id: number;
  name: string;
  slug: string;
  location: string;
  phWater: string;
  category: string;
  createdAt: Date;
  updateAt: Date;
};

type Bettas = Betta[];

export const dataBettas: Bettas = [
  {
    id: 1,
    name: "Betta Channoides",
    slug: "betta-channoides",
    location: "East Kalimantan",
    phWater: "4,0-6,5",
    category: "Small Mouthbrooder",
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 2,
    name: "Betta Albimarginata",
    slug: "betta-albimarginata",
    location: "East Kalimantan",
    phWater: "4,0-6,0",
    category: "Small Mouthbrooder",
    createdAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: 3,
    name: "Betta Hendra",
    slug: "betta-hendra",
    location: "Central Kalimantan",
    phWater: "4,0 - 6,5",
    category: "Bubble Nester Small",
    createdAt: new Date(),
    updateAt: new Date(),
  },
];
