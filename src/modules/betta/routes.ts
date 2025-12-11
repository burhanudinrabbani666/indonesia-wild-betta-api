import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { dataBettas } from "./data";
import { CreateBetta, CreateBettaSchema, BettaClass } from "../type/schema";
export const bettaRoute = new Hono();

let bettas: BettaClass[] = dataBettas;

// Get all bettas
bettaRoute.get("/", (c) => {
  return c.json(bettas);
});

// Get one betta by slug
bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const betta = bettas.find((betta) => betta.slug === slug);

  if (!betta) {
    return c.notFound();
  }

  return c.json(betta);
});

// Add new betta
bettaRoute.post("/", zValidator("json", CreateBettaSchema), (c) => {
  const body: CreateBetta = c.req.valid("json");

  const newBetta = new BettaClass(body);

  bettas = [...bettas, newBetta];

  return c.json(newBetta, 201);
});

// Delete betta by id
bettaRoute.delete("/:id", (c) => {
  try {
    const id = c.req.param("id");

    const updatedBettas = bettas.filter((betta) => betta.id !== id);

    if (bettas === updatedBettas) {
      throw new Error("Betta to delete not found");
    }

    bettas = updatedBettas;

    return c.json({ message: "Betta has been deleted" });
  } catch (error) {
    return c.json({ message: "Betta failed to delete" });
  }
});

// Update Data
