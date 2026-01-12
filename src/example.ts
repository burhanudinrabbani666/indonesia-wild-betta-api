import { prisma } from "./lib/prisma";
import { dataBettas } from "./modules/betta/databettas";

async function main() {
  for (const betta of dataBettas) {
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
        complexSlug: betta.complexSlug,
        category: betta.category,
      },
      create: {
        name: betta.name,
        slug: betta.slug,
        river: betta.river,
        city: betta.city,
        province: betta.province,
        phWater: betta.phWater,
        complexSlug: betta.complexSlug,
        category: betta.category,
      },
    });
  }

  // // const newBetta = await prisma.betta.create({
  // //   data: {
  // //     name: "betta channoides",
  // //     slug: "betta-channoides",
  // //     river: "mahakam",
  // //     city: "pampang",
  // //     province: "east kalimantan",
  // //     phWater: "4.0 - 6.5",
  // //     category: "mouth brodder small",
  // //   },
  // // });

  // // console.log(newBetta);

  // const allBetta = await prisma.betta.findMany({
  //   where: {
  //     complexSlug: "coccina",
  //   },
  // });

  // console.log(allBetta);

  // // // Fetch all users with their posts
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //   },
  // })
  // console.log('All users:', JSON.stringify(allUsers, null, 2))
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
