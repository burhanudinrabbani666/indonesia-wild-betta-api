import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { dataBettas } from "./data";
import {
  createBetta,
  createBettaSchema,
  Betta,
  UpdateBettaSchema,
  BettaSchema,
} from "./schema";
export const bettaRoute = new Hono();

let bettas: Betta[] = dataBettas;

// get all bettas
bettaRoute.get("/", (c) => {
  return c.json(bettas);
});

// Get one betta By Slug
bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const betta = bettas.find((betta) => betta.slug === slug);

  if (!betta) {
    return c.notFound();
  }

  return c.json(betta);
});

// Add new Data
bettaRoute.post("/", zValidator("json", createBettaSchema), (c) => {
  const body: createBetta = c.req.valid("json");

  const newBetta = BettaSchema.parse(body);

  bettas = [...dataBettas, newBetta];

  return c.json(newBetta, 201);
});

// Delete Data by id
bettaRoute.delete("/:id", (c) => {
  const id = c.req.param("id").toLowerCase();

  const checkId = bettas.find((betta) => betta.id === id);
  if (!checkId) return c.json({ message: "Wrong ID" });

  const updatedBettas = bettas.filter((betta) => betta.id !== id);
  const deletedBetta = bettas.find((betta) => betta.id == id);

  bettas = updatedBettas;

  return c.json({
    message: "Betta has been deleted",
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

    const updatedBetta = {
      ...betta,
      ...body,
      location: body.location
        ? { ...betta.location, ...body.location }
        : { ...betta.location },
      updateAt: new Date(),
    };

    bettas = bettas.map((betta) => (betta.id === id ? updatedBetta : betta));

    return c.json(updatedBetta);
  }
);

bettaRoute.put("/:id", zValidator("json", UpdateBettaSchema), async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const betta = bettas.find((betta) => betta.id === id);

  if (!betta) {
    // TODO: With PUT method, create new betta if not found
    return c.json({ message: "Betta not found" });
  }

  const newBettaData = {
    id: id,
    slug: body.name.toLocaleLowerCase().trim().split(" ").join("-"),
    ...body,
    createdAt: betta.createdAt,
    updateAt: new Date(),
  };

  bettas = bettas.map((betta) => (betta.id === id ? newBettaData : betta));

  return c.json(newBettaData);
});
