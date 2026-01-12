import { dataBettas } from "../data";
import {
  createBetta,
  createBettaSchema,
  BettaClass,
  BettaSchema,
  Betta,
  GetBettaBySlug,
  GetBettaById,
} from "../schema";
import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { tr } from "zod/v4/locales";

//
export const bettaRoute = new OpenAPIHono();

let bettas: BettaClass[] = dataBettas;

// get all bettas
bettaRoute.openapi(
  {
    method: "get",
    path: "/",
    description: "Get all bettas",
    responses: {
      200: {
        description: "Successfully get all bettas",
      },
    },
  },
  async (c) => {
    try {
      const allBettas = await prisma.betta.findMany({});
      return c.json(allBettas, 200);
    } catch (error) {
      return c.json(
        {
          message: "Can't get bettas from server",
        },
        500
      );
    }
  }
);

// Get one betta By Slug
bettaRoute.openapi(
  {
    method: "get",
    path: "/:slug",
    description: "Get One Betta by slug",
    request: {
      params: GetBettaBySlug,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaSlug = c.req.param("slug");
    const betta = await prisma.betta.findUnique({
      where: {
        slug: bettaSlug,
      },
    });

    if (!betta) return c.json({ message: "Betta not found" }, 400);

    return c.json(betta, 200);
  }
);

// Get one Betta by ID
bettaRoute.openapi(
  {
    method: "get",
    path: "/id/:id",
    description: "Get Betta by ID",
    request: {
      params: GetBettaById,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaID = Number(c.req.param("id"));
    // const betta = bettas.find((betta) => betta.id === id);

    const betta = await prisma.betta.findUnique({
      where: {
        id: bettaID,
      },
    });

    if (!betta) return c.json("Betta Not Found", 400);

    return c.json(betta, 200);
  }
);

// Delete Betta by id
bettaRoute.openapi(
  {
    method: "delete",
    path: "/:id",
    description: "Delete Betta by id",
    request: {
      params: GetBettaById,
    },
    responses: {
      200: {
        description: "Bettas has been deleted",
        content: {
          "application/json": {
            schema: BettaSchema,
          },
        },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaID = Number(c.req.param("id"));

    const deleteBetta = await prisma.betta.delete({
      where: {
        id: bettaID,
      },
    });

    return c.json({
      message: "betta has been deleted",
    });
  }
);

// Add new Data
bettaRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": { schema: createBettaSchema },
        },
      },
    },
    responses: {
      201: {
        description: "successfully added Betta",
      },
      400: {
        description:
          "Failed to enter data. Make sure the data matches what was requested.",
      },
    },
  },
  (c) => {
    const body: createBetta = c.req.valid("json");
    const newBetta = new BettaClass(body);

    bettas = [...dataBettas, newBetta];

    return c.json(newBetta, 201);
  }
);

// Update Bettas by d
bettaRoute.openapi(
  {
    method: "patch",
    path: "/:id",
    description: "Patch betta by ID",
    request: {
      params: GetBettaById,
      body: {
        content: {
          "application/json": { schema: createBettaSchema.partial() },
        },
      },
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const id = c.req.param("id");
    const body: Betta = await c.req.json();
    const betta = bettas.find((betta) => betta.id === id);

    if (!betta) return c.json({ message: "Betta not found" });

    const newBettaData = {
      ...betta,
      ...body,
      location: body.location
        ? { ...betta.location, ...body.location }
        : { ...betta.location },
      updateAt: new Date(),
    };

    bettas = bettas.map((betta) => (betta.id === id ? newBettaData : betta));

    return c.json({
      message: "Betta Has been Updates",
      data: newBettaData,
      old: betta,
    });
  }
);

// Put Betta by id
bettaRoute.openapi(
  {
    method: "put",
    path: "/:id",
    description: "Edit data Betta by ID",
    request: {
      params: GetBettaById,
      body: {
        content: {
          "application/json": { schema: createBettaSchema },
        },
      },
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: BettaSchema } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const betta = bettas.find((betta) => betta.id === id);

    if (!betta) {
      const newBetta = new BettaClass(body);

      bettas = [...bettas, newBetta];

      return c.json({
        message: "id not found in old data, adding new data",
        data: newBetta,
        old: betta,
      });
    }

    const newBettaData = {
      id: id,
      slug: body.name.toLocaleLowerCase().trim().split(" ").join("-"),
      ...body,
      createdAt: betta.createdAt,
      updateAt: new Date(),
    };

    bettas = bettas.map((betta) => (betta.id === id ? newBettaData : betta));

    return c.json({
      message: "Betta Has been Updates",
      newBettaData: newBettaData,
      oldBettaData: betta,
    });
  }
);
