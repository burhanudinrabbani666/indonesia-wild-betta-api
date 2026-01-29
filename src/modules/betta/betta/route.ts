import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import {
  BettaSchema,
  GetBettaBySlugSchema,
  GetBettaByIdSchema,
  GetBettaScheama,
} from "../schema";

export const bettaRoute = new OpenAPIHono();

// 1. Get all bettas
bettaRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all bettas",
    responses: {
      200: {
        description: "Successfully get all bettas",
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
      return c.json({ message: "Failed to get all Betta's", error }, 500);
    }
  },
);

// 2. Get one betta By Slug
bettaRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get One Betta by slug",
    request: {
      params: GetBettaBySlugSchema,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: GetBettaScheama } },
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
        400,
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
      return c.json({ message: "Internal server error!", error, slug }, 500);
    }
  },
);

// 3. Get one Betta by ID
bettaRoute.openapi(
  {
    method: "get",
    path: "/id/{id}",
    description: "Get Betta by ID",
    request: {
      params: GetBettaByIdSchema,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      400: {
        description: "Bad Request!",
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

    if (!id) return c.json({ message: "Id not Valid" }, 400);

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
  },
);

// 4. Delete Betta by id
bettaRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    description: "Delete Betta by id",
    request: {
      params: GetBettaByIdSchema,
    },
    responses: {
      200: {
        description: "Bettas has been deleted",
      },
      404: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const id = Number(c.req.param("id"));

    try {
      const deleteBetta = await prisma.betta.delete({
        where: { id },
      });

      return c.json(
        {
          message: "betta has been deleted",
        },
        200,
      );
    } catch (error) {
      return c.json(
        {
          message: "Betta not found!",
          id,
        },
        404,
      );
    }
  },
);

// 5. Add new Betta
bettaRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": { schema: BettaSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Successfully create Betta",
      },
      400: {
        description:
          "Failed to enter data. Make sure the data matches what was requested.",
      },
    },
  },
  async (c) => {
    const body = c.req.valid("json");

    try {
      const result = await prisma.$transaction(async (tx) => {
        const complex = body.complexSlug
          ? await tx.complex.upsert({
              where: { slug: body.complexSlug },
              update: {},
              create: {
                name: body.complexSlug,
                slug: body.complexSlug,
              },
            })
          : null;

        const category = body.categorySlug
          ? await tx.category.upsert({
              where: { slug: body.categorySlug },
              update: {},
              create: {
                name: body.categorySlug,
                slug: body.categorySlug,
              },
            })
          : null;

        return await tx.betta.create({
          data: {
            name: body.name,
            slug: body.slug,
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
        result,
      });
    } catch (error) {
      return c.json({ message: error }, 400);
    }
  },
);

// 6. Patch Betta by id
bettaRoute.openapi(
  {
    method: "patch",
    path: "/{id}",
    description: "Patch betta by ID",
    request: {
      params: GetBettaByIdSchema,
      body: {
        content: {
          "application/json": { schema: BettaSchema.partial() },
        },
      },
    },
    responses: {
      200: {
        description: "Succesfully update Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      404: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const id = Number(c.req.param("id"));

    try {
      const body = await c.req.json();

      const updateBetta = await prisma.betta.update({
        where: { id },
        data: { ...body },
      });

      return c.json({ updateBetta });
    } catch (error) {
      return c.json({ message: "Betta not found", error }, 404);
    }
  },
);
