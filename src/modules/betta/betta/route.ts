import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import {
  BettaSchema,
  GetBettaBySlugSchema,
  ParamBettaByIdSchema,
  GetBettaSchema,
  PatchBettaSchema,
  PostBettaSchema,
} from "./schema";
import slugify from "slugify";

export const bettaRoute = new OpenAPIHono();
const tag = ["Bettas"];

// 1. Get all bettas
bettaRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all bettas",
    tags: tag,
    responses: {
      200: {
        description: "Successfully get all bettas",
        content: { "application/json": { schema: GetBettaSchema } },
      },
      500: {
        description: "Failed to get all Betta's",
      },
    },
  },
  async (c) => {
    try {
      const allBettas = await prisma.betta.findMany({
        include: {
          complex: true,
          category: true,
        },
      });
      return c.json(allBettas, 200);
    } catch (error) {
      return c.json({ message: "Failed to get all Betta's" }, 500);
    }
  }
);

// 2. Get one betta By Slug
bettaRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get One Betta by slug",
    tags: tag,
    request: {
      params: GetBettaBySlugSchema,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: GetBettaSchema } },
      },
      404: {
        description: "Betta not found!",
      },
      400: {
        description: "Bad Request!",
      },
      500: {
        description: "Internal server error!",
      },
    },
  },
  async (c) => {
    const { slug } = c.req.valid("param");

    if (!slug?.includes("betta"))
      return c.json(
        {
          message: "Slug must be includes betta",
          example: "betta-hendra",
          slug,
        },
        400
      );

    try {
      const betta = await prisma.betta.findUnique({
        where: { slug },
        include: {
          complex: true,
          category: true,
        },
      });

      if (!betta) return c.json({ message: "Betta not found!", slug }, 404);

      return c.json(betta, 200);
    } catch (error) {
      return c.json({ message: "Internal server error!" }, 500);
    }
  }
);

// 3. Get one Betta by ID
bettaRoute.openapi(
  {
    method: "get",
    path: "/id/{id}",
    description: "Get Betta by ID",
    tags: tag,
    request: {
      params: ParamBettaByIdSchema,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: GetBettaSchema } },
      },
      400: {
        description: "ID not valid!",
      },
      404: {
        description: "Betta not found",
      },
      500: {
        description: "Internal server error!",
      },
    },
  },
  async (c) => {
    const req = c.req.valid("param");
    const id = Number(req.id);

    if (!id) return c.json({ message: "ID not valid!" }, 400);

    try {
      const betta = await prisma.betta.findUnique({
        where: {
          id,
        },
        include: {
          complex: true,
          category: true,
        },
      });

      if (!betta) return c.json("Betta not found!", 404);

      return c.json(betta, 200);
    } catch (error) {
      return c.json({ message: "Internal server error!", error, id }, 500);
    }
  }
);

// 4. Delete Betta by id
bettaRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete Betta by id",
    tags: tag,
    request: {
      params: ParamBettaByIdSchema,
    },
    responses: {
      200: {
        description: "Betta has been deleted",
      },
      404: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const req = c.req.valid("param");
    const id = Number(req.id);

    try {
      const result = await prisma.betta.delete({ where: { id } });

      return c.json({ message: "Betta has been deleted", id, result }, 200);
    } catch (error) {
      return c.json({ message: "Betta not found!", id }, 404);
    }
  }
);

// 5. Add new Betta
bettaRoute.openapi(
  {
    method: "post",
    path: "/",
    description: "Create new Betta",
    tags: tag,
    request: {
      body: {
        content: {
          "application/json": { schema: PostBettaSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Successfully create Betta",
        content: { "application/json": { schema: GetBettaSchema } },
      },
      500: {
        description: "Failed to create Betta",
      },
    },
  },
  async (c) => {
    const body = c.req.valid("json");

    try {
      const betta = await prisma.$transaction(async (tx) => {
        const complex = body.complexSlug
          ? await tx.complex.upsert({
              where: { slug: body.complexSlug },
              update: {},
              create: {
                name: body.complexSlug,
                slug: slugify(body.complexSlug),
              },
            })
          : null;

        const category = body.categorySlug
          ? await tx.category.upsert({
              where: { slug: body.categorySlug },
              update: {},
              create: {
                name: body.categorySlug,
                slug: slugify(body.categorySlug),
              },
            })
          : null;

        return await tx.betta.create({
          data: {
            name: body.name,
            slug: slugify(body.name),
            river: body.river,
            city: body.city,
            province: body.province,
            phWater: body.phWater,
            complexId: complex?.id,
            categoryId: category?.id,
          },
          include: {
            complex: true,
            category: true,
          },
        });
      });

      return c.json({
        message: "Successfully create Betta",
        result: betta,
      });
    } catch (error) {
      return c.json({ message: error }, 500);
    }
  }
);

// 6. Patch Betta by id
bettaRoute.openapi(
  {
    method: "patch",
    path: "/{id}",
    description: "Patch betta by ID",
    tags: tag,
    request: {
      params: ParamBettaByIdSchema,
      body: {
        content: {
          "application/json": { schema: PatchBettaSchema.partial() },
        },
      },
    },
    responses: {
      200: {
        description: "Succesfully update Betta",
        content: { "application/json": { schema: GetBettaSchema } },
      },
      404: {
        description: "Betta not found!",
      },
      500: {
        description: "Failed to update Betta",
      },
    },
  },
  async (c) => {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    try {
      const betta = await prisma.$transaction(async (tx) => {
        let complexId;
        let categoryId;

        if (body.complexSlug) {
          const complex = await tx.complex.upsert({
            where: {
              slug: body.complexSlug,
            },
            update: { name: body.complexSlug },
            create: {
              name: body.complexSlug,
              slug: body.complexSlug,
            },
          });

          complexId = complex.id;
        }

        if (body.categorySlug) {
          const category = await tx.category.upsert({
            where: {
              slug: body.categorySlug,
            },
            update: { name: body.categorySlug },
            create: {
              name: body.categorySlug,
              slug: body.categorySlug,
            },
          });

          categoryId = category.id;
        }

        return tx.betta.update({
          where: { id },
          data: {
            name: body.name,
            slug: createBettaSlug(body.name),
            river: body.river,
            city: body.city,
            province: body.province,
            phWater: body.phWater,
            complex: {
              connect: {
                slug: body.complexSlug,
              },
            },
            category: {
              connect: {
                slug: body.categorySlug,
              },
            },
          },
          include: {
            complex: true,
            category: true,
          },
        });
      });

      return c.json({ result: betta }, 200);
    } catch (error: any) {
      if (error.code === "P2025") {
        return c.json({ message: "Betta not found" }, 404);
      }

      return c.json({ message: "Internal Server error", error }, 500);
    }
  }
);
