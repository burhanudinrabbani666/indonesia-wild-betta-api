import { zValidator } from "@hono/zod-validator";
import { dataBettas } from "./data";
import {
  createBetta,
  createBettaSchema,
  BettaClass,
  BettaSchema,
  Betta,
  UpdateBettaSchema,
  GetBettaBySlug,
  GetBettaById,
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

// Add new Data
bettaRoute.post("/", zValidator("json", createBettaSchema), (c) => {
  const body: createBetta = c.req.valid("json");

  const newBetta = new BettaClass(body);

  bettas = [...dataBettas, newBetta];

  return c.json(newBetta, 201);
});

// Delete Data by id
bettaRoute.delete("/:id", (c) => {
  const id = c.req.param("id").toLowerCase();

  const checkId = bettas.find((betta) => betta.id === id);
  if (!checkId) return c.json({ message: "Wrong ID" });

  const updatedBettas = bettas.filter((betta) => betta.id !== id);
  const deletedBetta = bettas.filter((betta) => betta.id == id);

  bettas = updatedBettas;
  return c.json({
    message: "Bettas has been deleted",
    data: deletedBetta,
  });
});

// Update Data
bettaRoute.patch(
  "/:id",
  zValidator("json", UpdateBettaSchema.partial()),
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
    });
  }
);

bettaRoute.put("/:id", zValidator("json", UpdateBettaSchema), async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const betta = bettas.find((betta) => betta.id === id);

  if (!betta) {
    const newBetta = new BettaClass(body);

    bettas = [...bettas, newBetta];

    return c.json({
      message: "id not found in old data, adding new data",
      data: newBetta,
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
});

//Get by complex
complexRoute.get("/:complex", (c) => {
  const complex = c.req.param("complex").toLowerCase();
  const betta = bettas.filter((betta) => betta.complex === complex);

  if (!betta) {
    return c.notFound();
  }

  return c.json(betta);
});
