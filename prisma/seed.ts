import { prisma } from "../src/lib/prisma";
import { bettas } from "../src/modules/betta/data";

async function main() {
  // TODO: for loop to seed Complexes

  // TODO: for loop to seed Categories

  for (const betta of bettas) {
    const upsertedBetta = await prisma.betta.upsert({
      where: {
        slug: betta.slug,
      },
      update: {
        name: betta.name,
        river: betta.river,
        city: betta.city,
        province: betta.province,
        phWater: betta.phWater,
        complex: {
          connect: {
            slug: betta.complexSlug,
          },
        },
      },
      create: {
        name: betta.name,
        slug: betta.slug,
        river: betta.river,
        city: betta.city,
        province: betta.province,
        phWater: betta.phWater,
        complex: {
          connect: {
            slug: betta.complexSlug,
          },
        },
      },
    });

    console.log(`🐟 ${upsertedBetta.name} succesfully upsert`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
