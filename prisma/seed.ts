import { prisma } from "../src/lib/prisma";
import { bettas } from "../src/modules/betta/data";

async function main() {
  for (const betta of bettas) {
    const upsertedBetta = await prisma.complex.upsert({
      where: {
        slug: betta.complexSlug,
      },
      update: {
        name: betta.complexSlug,
        slug: betta.complexSlug,
      },
      create: {
        name: betta.complexSlug,
        slug: betta.complexSlug,
      },
    });
  }

  for (const betta of bettas) {
    const upsertedBetta = await prisma.category.upsert({
      where: {
        slug: betta.categorySlug,
      },
      update: {
        name: betta.categorySlug,
        slug: betta.categorySlug,
      },
      create: {
        name: betta.categorySlug,
        slug: betta.categorySlug,
      },
    });
  }

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
        category: {
          connect: {
            slug: betta.categorySlug,
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
        category: {
          connect: {
            slug: betta.categorySlug,
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
