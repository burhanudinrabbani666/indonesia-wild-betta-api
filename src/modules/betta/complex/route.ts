import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { betta, getBettaBySlug } from "../schema";

export const complexRoute = new OpenAPIHono();

// Still Error
complexRoute.openapi(
  {
    method: "get",
    path: "/:complexSlug",
    description: "Get Betta by complex",
    request: {
      params: getBettaBySlug,
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
