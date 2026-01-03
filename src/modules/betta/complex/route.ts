import { dataBettas } from "../data";
import { OpenAPIHono } from "@hono/zod-openapi";
import { BettaSchema, GetBettaByComplexSlug } from "../schema";

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
  (c) => {
    const complexSlug = c.req.param("complexSlug");
    console.log(complexSlug);
    if (!complexSlug) {
      return c.json({ message: "complex is required" }, 400);
    }

    console.log(complexSlug);
    const betta = dataBettas.find((betta) => betta.complexSlug === complexSlug);

    if (!betta) {
      return c.json(
        {
          message: "Not found",
          data: complexSlug,
        },
        404
      );
    }

    return c.json(betta);
  }
);
