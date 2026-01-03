import { OpenAPIHono } from "@hono/zod-openapi";

import { BettaSchema, ParamComplexSlug } from "../betta/schema";
import { dataBettas } from "../betta/data";

export const complexRoute = new OpenAPIHono();

complexRoute.openapi(
  {
    method: "get",
    path: "/:complexSlug",
    description: "Get Betta by complex",
    request: {
      params: ParamComplexSlug,
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
    if (!complexSlug) {
      return c.json({ message: "Complex slug is required" }, 400);
    }

    const betta = dataBettas.find((betta) => betta.complex === complexSlug);

    if (!betta) {
      return c.json(
        {
          message: "Not found",
          complexSlug,
        },
        404
      );
    }

    return c.json(betta);
  }
);
