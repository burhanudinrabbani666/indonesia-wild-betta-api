import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import {
  GetBettaByCategorySchema,
  BettaSchema,
  GetComplexSchema,
} from "../schema";

export const categoryRoutes = new OpenAPIHono();
const tag = ["category"];

// Get all complexs
categoryRoutes.openapi(
  {
    method: "get",
    path: "/",
    description: "Get complex's",
    tags: tag,
    responses: {
      200: {
        description: "Succesfully get all Complex",
        content: {
          "application/json": { schema: GetComplexSchema },
        },
      },
      400: {
        description: "Failed get all Complex",
      },
    },
  },
  async (c) => {
    try {
      const complex = await prisma.category.findMany();

      return c.json(complex, 200);
    } catch (error) {
      return c.json(
        {
          message: "Failed get all Complex",
          error,
        },
        400,
      );
    }
  },
);

// Get one bt
categoryRoutes.openapi(
  {
    method: "get",
    path: "/{category}",
    description: "Get one Betta by Category",
    tags: tag,
    request: {
      params: GetBettaByCategorySchema,
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": { schema: BettaSchema },
        },
      },
      404: {
        description: "Category not found",
      },
    },
  },
  async (c) => {
    const bettas = c.req.param("category");
    const bettasByCategory = await prisma.betta.findMany({
      where: {
        category: bettas,
      },
    });

    if (bettasByCategory.length === 0)
      return c.json({ message: "Category not found" }, 400);

    return c.json({ bettasByCategory });
  },
);
