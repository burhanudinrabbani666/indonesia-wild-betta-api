import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { betta, getBettaByComplex } from "../schema";

export const complexRoute = new OpenAPIHono();

complexRoute.openapi(
  {
    method: "get",
    path: "/:complex_slug",
    description: "Get Betta by complex",
    request: {
      params: getBettaByComplex,
    },
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": { schema: betta },
        },
      },
      404: {
        description: "Not found",
      },
    },
  },
  async (c) => {
    const bettas = c.req.param("complex_slug");
    console.log("---------------------------", bettas);

    const bettasByComplexSlug = await prisma.betta.findMany({
      where: {
        complex_slug: bettas,
      },
    });

    console.log("---------------------------", bettasByComplexSlug);

    if (bettasByComplexSlug.length === 0)
      return c.json({ message: "Complex not found" }, 400);

    return c.json(bettasByComplexSlug, 200);
  }
);
