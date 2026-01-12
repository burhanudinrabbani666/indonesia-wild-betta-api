import { dataBettas } from "../data";
import { OpenAPIHono } from "@hono/zod-openapi";
import { BettaSchema, GetBettaByComplexSlug } from "../schema";
import { prisma } from "../../../lib/prisma";

export const complexRoute = new OpenAPIHono();

// Still Error
complexRoute.openapi(
  {
    method: "get",
    path: "/:complexSlug",
    description: "Get Betta by complex",
    request: {
      params: GetBettaByComplexSlug,
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": { schema: BettaSchema },
        },
      },
      404: {
        description: "Not found",
      },
    },
  },
  async (c) => {
    const complexSlug = c.req.param("complexSlug");

    const bettasByComplexSlug = await prisma.betta.findMany({
      where: {
        complex_slug: complexSlug,
      },
    });

    if (!bettasByComplexSlug)
      return c.json({ message: "Complex not found" }, 400);

    return c.json(bettasByComplexSlug, 200);
  }
);
