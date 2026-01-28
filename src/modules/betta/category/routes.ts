import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { GetBettaByCategorySchema, BettaSchema } from "../schema";

export const categoryRoutes = new OpenAPIHono();

categoryRoutes.openapi(
  {
    method: "get",
    path: "/{category}",
    description: "Get Betta by complex",
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
