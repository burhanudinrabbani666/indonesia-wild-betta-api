import { dataBettas } from "./data";
import {
  createBetta,
  createBettaSchema,
  BettaClass,
  BettaSchema,
  Betta,
  GetBettaBySlug,
  GetBettaById,
  GetBettaByComplex,
} from "./schema";
import { OpenAPIHono } from "@hono/zod-openapi";

//
export const bettaRoute = new OpenAPIHono();
export const complexRoute = new OpenAPIHono();

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
  (c) => {
    return c.json(bettas);
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
  (c) => {
    const slug = c.req.param("slug");
    const betta = bettas.find((betta) => betta.slug === slug);

    if (!betta) return c.json("Betta Not Found", 400);

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
  (c) => {
    const id = c.req.param("id");
    const betta = bettas.find((betta) => betta.id === id);

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
  (c) => {
    const id = c.req.param("id");

    const checkId = bettas.find((betta) => betta.id === id?.toLowerCase());
    if (!checkId) return c.json({ message: "Wrong ID" });

    const updatedBettas = bettas.filter((betta) => betta.id !== id);
    const deletedBetta = bettas.filter((betta) => betta.id == id);

    bettas = updatedBettas;
    return c.json({
      data: deletedBetta,
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

// Error
bettaRoute.openapi(
  {
    method: "get",
    path: "/complex/:complex", // OpenAPI syntax
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
      return c.json({ message: "Not found", data: complexParam, complex }, 404);
    }

    return c.json(betta);
  }
);
