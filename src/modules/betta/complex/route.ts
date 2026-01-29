import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { BettaSchema, GetBettaByComplexSchema } from "../betta/schema";
import {
  GetBettaByComplex,
  GetComplexSchema,
  PostComplexSchema,
} from "./schema";
import slugify from "slugify";

export const complexRoute = new OpenAPIHono();
const tag = ["Complex"];

// 1. Get all Complex
complexRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get Betta by complex",
    tags: tag,
    responses: {
      200: {
        description: "Succesfully get all Complex",
        content: {
          "application/json": { schema: GetComplexSchema },
        },
      },
      500: {
        description: "Failed get all Complex",
      },
    },
  },
  async (c) => {
    try {
      const complex = await prisma.complex.findMany();

      return c.json(complex, 200);
    } catch (error) {
      return c.json(error, 500);
    }
  },
);

// Get Bettas by complex slug
complexRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    description: "Get Betta by Complex",
    tags: tag,
    request: {
      params: GetBettaByComplex,
    },
    responses: {
      200: {
        description: "Succesfully get Bettas",
        content: {
          "application/json": { schema: GetComplexSchema },
        },
      },
      404: {
        description: "Failes get Bettas, not found!",
      },
      500: {
        description: "Internal server error!",
      },
    },
  },
  async (c) => {
    const { slug } = c.req.valid("param");

    try {
      const bettas = await prisma.betta.findMany({
        where: { complex: { slug } },
        include: { complex: true, category: true },
      });

      if (bettas.length === 0)
        return c.json({ message: "Failes get Bettas, not found!" }, 404);

      return c.json(bettas, 200);
    } catch (error) {
      return c.json({ message: "Internal server error!", error, slug }, 500);
    }
  },
);

// Post new Complex
complexRoute.openapi(
  {
    method: "post",
    path: "/",
    description: "Post new Complex",
    tags: tag,
    request: {
      params: PostComplexSchema,
    },
    responses: {
      201: {
        description: "Succesfully Create new Complex",
        content: {
          "application/json": { schema: GetComplexSchema },
        },
      },
      400: {
        description: "Failed Create new Complex",
      },
      500: {
        description: "Internal server error!",
      },
    },
  },
  async (c) => {
    const { name } = c.req.valid("param");
    const slug = slugify(name);
    try {
      const newComplex = await prisma.complex.create({
        data: { name, slug },
      });

      return c.json(
        { message: "Succesfully Create new Complex", newComplex },
        201,
      );
    } catch (error) {
      return c.json({ message: "Failed Create new Complex", name }, 400);
    }
  },
);
