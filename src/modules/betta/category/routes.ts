import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import {
  GetBettaByCategorySchema,
  GetCategorySchema,
  PostCategory,
} from "./schema";
import { GetBettaSchema } from "../betta/schema";
import slugify from "slugify";

export const categoryRoutes = new OpenAPIHono();
const tag = ["Category"];

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
          "application/json": { schema: GetBettaSchema },
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

// Post Category
categoryRoutes.openapi(
  {
    method: "post",
    path: "/",
    description: "Create new category",
    tags: tag,
    request: {
      body: {
        content: { "application/json": { schema: PostCategory } },
      },
    },
    responses: {
      201: {
        description: "Successfully create category",
        content: { "application/json": { schema: GetCategorySchema } },
      },
      400: {
        description:
          "Failed to enter data. Make sure the data matches what was requested.",
      },
      500: {
        description: "Internal server error",
      },
    },
  },
  async (c) => {
    try {
      const { name } = c.req.valid("json");
      const slug = slugify(name);

      const newCategory = await prisma.category.upsert({
        where: { slug },
        update: { name },
        create: { name, slug },
      });

      return c.json(newCategory, 201);
    } catch (error) {
      console.log(error);

      return c.json(error, 500);
    }
  },
);
