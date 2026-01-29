import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import {
  GetBettaByCategorySchema,
  GetBettaScheama,
  GetCategorySchema,
} from "./schema";

export const categoryRoutes = new OpenAPIHono();
const tag = ["category"];

// Get all complexs
categoryRoutes.openapi(
  {
    method: "get",
    path: "/",
    description: "Get Category's data",
    tags: tag,
    responses: {
      200: {
        description: "Succesfully get all Complex",
        content: {
          "application/json": { schema: GetCategorySchema },
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

// Get Bettas By category slug
categoryRoutes.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get one Betta by Category",
    tags: tag,
    request: {
      params: GetBettaByCategorySchema,
    },
    responses: {
      200: {
        description: "Succesfully get Bettas by category",
        content: {
          "application/json": { schema: GetBettaScheama },
        },
      },
      404: {
        description: "Category not found!",
      },
      500: {
        description: "Internal server error",
      },
    },
  },
  async (c) => {
    const { slug } = c.req.valid("param");
    try {
      const bettas = await prisma.betta.findMany({
        where: {
          category: {
            slug,
          },
        },
        include: {
          complex: true,
          category: true,
        },
      });

      if (!bettas || bettas.length === 0) {
        return c.json(
          {
            message: "Category or Betta not found!",
          },
          404,
        );
      }

      return c.json(bettas, 200);
    } catch (error) {
      return c.json(
        {
          message: "Internal server error",
        },
        500,
      );
    }
  },
);
