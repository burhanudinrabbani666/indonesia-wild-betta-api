import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import {
  Betta,
  BettaSchema,
  GetBettaBySlugSchema,
  GetBettaByIdSchema,
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
        description: "Failed to get all bettas",
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
      return c.json(
        {
          message: "Failed to get all bettas",
          error,
        },
        500
      );
    }
  }
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
        content: { "application/json": { schema: BettaSchema } },
      },
      404: {
        description: "Betta not found",
      },
      500: {
        description: "Failed to get all bettas",
      },
    },
  },
  async (c) => {
    const slug = c.req.param("slug");

    try {
      const betta = await prisma.betta.findUnique({
        where: { slug },
      });

      if (!betta) return c.notFound();

      return c.json(betta, 200);
    } catch (error) {
      return c.json(
        {
          message: "Failed to get one betta by slug",
          error,
          slug,
        },
        500
      );
    }
  }
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
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const id = Number(c.req.param("id"));

    const betta = await prisma.betta.findUnique({
      where: { id },
    });

    if (!betta) return c.json("Betta Not Found", 400);

    return c.json(betta, 200);
  }
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
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaID = Number(c.req.param("id"));

    const deleteBetta = await prisma.betta.delete({
      where: {
        id: bettaID,
      },
    });

    return c.json({
      message: "betta has been deleted",
    });
  }
);

// 5. Add new Data
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
        description: "Successfully added Betta",
      },
      400: {
        description:
          "Failed to enter data. Make sure the data matches what was requested.",
      },
    },
  },
  async (c) => {
    const body = c.req.valid("json");

    const newBetta = await prisma.betta.create({
      data: body,
    });

    return c.json({
      message: "Successfully added Betta",
      betta: newBetta,
    });
  }
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
        description: "Succesfully updated Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const { id } = c.req.valid("param");
    const body = c.req.valid("json");

    const updatedBetta = await prisma.betta.update({
      where: { id },
      data: { ...body },
    });

    return c.json(updatedBetta);
  }
);
