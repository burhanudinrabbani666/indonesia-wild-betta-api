import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { wildBettas } from "./data";
import { BettaInput, BettaSchemaInput, WildBetta } from "../type/schema";
export const bettaRoute = new Hono();

let dataWildBettas: WildBetta[] = wildBettas;

bettaRoute.get("/", (c) => {
  return c.json(dataWildBettas);
});

// Get Data By Slug
bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const getBetta = dataWildBettas.find((betta) => betta.slug === slug);

  if (!getBetta) {
    return c.notFound();
  }

  return c.json(getBetta);
});

// Add new Data
bettaRoute.post("/", zValidator("json", BettaSchemaInput), (c) => {
  const bettaJSON: BettaInput = c.req.valid("json");

  const newWildBetta = new WildBetta(bettaJSON);
  const updatedWildBettas = [...wildBettas, newWildBetta];
  dataWildBettas = updatedWildBettas;

  return c.json(updatedWildBettas, 201);
});

// Delete Data
bettaRoute.delete("/:slug", (c) => {
  try {
    const name = c.req.param("slug").toLowerCase();
    const updatedBettas = dataWildBettas.filter((betta) => betta.slug !== name);

    dataWildBettas = updatedBettas;
    return c.json({ message: "data has been successfully deleted" });
  } catch (error) {
    return c.json({ message: "failed to delete, wild betta data not found" });
  }
});

// Update Data
