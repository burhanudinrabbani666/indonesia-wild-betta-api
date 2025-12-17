import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { dataBettas } from "./data";
import { createBetta, createBettaSchema, BettaClass } from "../type/schema";
export const bettaRoute = new Hono();

let bettas: BettaClass[] = dataBettas;

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

  const newBetta = new BettaClass(body);

  bettas = [...dataBettas, newBetta];

  return c.json(newBetta, 201);
});

// Delete Data by id
bettaRoute.delete("/:id", (c) => {
  const id = c.req.param("id").toLowerCase();

  const updatedBettas = bettas.filter((betta) => betta.id !== id);

  bettas = updatedBettas;
  return c.json({ message: "Bettas has been deleted" });
});

// Update Data
