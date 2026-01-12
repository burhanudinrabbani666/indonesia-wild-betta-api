import { OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../../lib/prisma";
import { Betta, betta, getBettaBySlug, getBettaByID } from "../schema";

export const bettaRoute = new OpenAPIHono();

// 1. Get all bettas
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

// 2. Get one betta By Slug
bettaRoute.openapi(
  {
    method: "get",
    path: "/:slug",
    description: "Get One Betta by slug",
    request: {
      params: getBettaBySlug,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: betta } },
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

// 3. Get one Betta by ID
bettaRoute.openapi(
  {
    method: "get",
    path: "/id/:id",
    description: "Get Betta by ID",
    request: {
      params: getBettaByID,
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: betta } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaID = Number(c.req.param("id"));
    const betta = await prisma.betta.findUnique({
      where: {
        id: bettaID,
      },
    });

    if (!betta) return c.json("Betta Not Found", 400);

    return c.json(betta, 200);
  }
);

// 4. Delete Betta by id
bettaRoute.openapi(
  {
    method: "delete",
    path: "/:id",
    description: "Delete Betta by id",
    request: {
      params: getBettaByID,
    },
    responses: {
      200: {
        description: "Bettas has been deleted",
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

// 5. Add new Data
bettaRoute.openapi(
  {
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": { schema: betta },
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
  async (c) => {
    const body = c.req.valid("json");

    const newBetta = await prisma.betta.create({
      data: body,
    });

    return c.json({
      message: "create betta succesed",
      betta: await prisma.betta.findUnique({
        where: {
          slug: body.slug,
        },
      }),
    });
  }
);

// 6. Update Bettas by id
bettaRoute.openapi(
  {
    method: "patch",
    path: "/:id",
    description: "Patch betta by ID",
    request: {
      params: getBettaByID,
      body: {
        content: {
          "application/json": { schema: betta.partial() },
        },
      },
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: betta } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaID = Number(c.req.param("id"));
    const body: Betta = await c.req.json();

    const oldDataBetta = await prisma.betta.findUnique({
      where: {
        id: bettaID,
      },
    });
    const updateBetta = await prisma.betta.update({
      where: {
        id: bettaID,
      },
      data: { ...oldDataBetta, ...body },
    });

    return c.json({
      message: "Betta Has been Updates",
      updatedBetta: await prisma.betta.findUnique({
        where: {
          id: bettaID,
        },
      }),
    });
  }
);

// 7. Put Betta by id
bettaRoute.openapi(
  {
    method: "put",
    path: "/:id",
    description: "Edit data Betta by ID",
    request: {
      params: getBettaByID,
      body: {
        content: {
          "application/json": { schema: betta },
        },
      },
    },
    responses: {
      200: {
        description: "Succesfully get Betta",
        content: { "application/json": { schema: betta } },
      },
      400: {
        description: "Betta not found",
      },
    },
  },
  async (c) => {
    const bettaID = Number(c.req.param("id"));
    const body = await c.req.json();

    const upsertedBetta = await prisma.betta.upsert({
      where: {
        id: bettaID,
      },
      update: body,
      create: body,
    });

    return c.json({ message: "succesefully put betta" });
  }
);
