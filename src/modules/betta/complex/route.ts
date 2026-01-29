import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { BettaSchema, GetBettaByComplexSchema } from "../betta/schema";

export const complexRoute = new OpenAPIHono();

complexRoute.openapi(
  {
    method: "get",
    path: "/{complexSlug}",
    description: "Get Betta by complex",
    request: {
      params: GetBettaByComplexSchema,
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": { schema: BettaSchema },
        },
      },
      404: {
        description: "Complex not found",
      },
    },
  },
  async (c) => {
    const bettas = c.req.param("complexSlug");
    const bettasByComplexSlug = await prisma.betta.findMany({
      where: {
        complexSlug: bettas,
      },
    });

    if (bettasByComplexSlug.length === 0)
      return c.json({ message: "Complex not found" }, 400);

    return c.json(bettasByComplexSlug, 200);
  },
);
