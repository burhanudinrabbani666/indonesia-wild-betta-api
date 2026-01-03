import { dataBettas } from "./data";
import { OpenAPIHono } from "@hono/zod-openapi";
import { BettaSchema, GetBettaByComplex } from "./schema";

export const complexRoute = new OpenAPIHono();

// Still Error
complexRoute.openapi(
  {
    method: "get",
    path: "/:complex",
    description: "Get Betta by complex",
    request: {
      params: GetBettaByComplex,
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
    const complexParam = c.req.param("complex");
    if (!complexParam) {
      return c.json({ message: "complex is required" }, 400);
    }

    const complex = complexParam.toLowerCase();
    const betta = dataBettas.find((b) => b.complex === complex);

    if (!betta) {
      return c.json(
        {
          message: "Not found",
          data: complexParam,
          complex,
          betta,
          databettas: dataBettas,
        },
        404
      );
    }

    return c.json(betta);
  }
);
