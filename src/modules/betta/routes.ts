import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { wildBettas } from "./data";
import { BettaInput, BettaSchemaInput, WildBetta } from "../type/schema";
export const bettaRoute = new Hono();

let dataBettas: WildBetta[] = wildBettas;

bettaRoute.get("/", (c) => {
  return c.json(wildBettas);
});

// Get Data By Slug
bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const getBetta = wildBettas.find((betta) => betta.slug === slug);

  if (!getBetta) {
    return c.notFound();
  }

  return c.json(getBetta);
});

// Search Data by Name

// Search Data's by Category

// Add new Data
bettaRoute.post("/", zValidator("json", BettaSchemaInput), (c) => {
  const bettaJSON: BettaInput = c.req.valid("json");

  const newBetta = new WildBetta(bettaJSON);
  const updatedBettas = [...wildBettas, newBetta];
  dataBettas = updatedBettas;

  return c.json(updatedBettas, 201);
});
// bettaRoute.post("/", ())

// Delete Data

// Update Data
