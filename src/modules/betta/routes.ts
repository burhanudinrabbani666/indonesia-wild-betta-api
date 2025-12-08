import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { wildBettas } from "./data";
import { BettaInput, BettaSchemaInput, WildBetta } from "../type/schema";
export const bettaRoute = new Hono();

let dataBettas: WildBetta[] = wildBettas;

bettaRoute.get("/", (c) => {
  return c.json(dataBettas);
});

// Get Data By Slug
bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const getBetta = dataBettas.find((betta) => betta.slug === slug);

  if (!getBetta) {
    return c.notFound();
  }

  return c.json(getBetta);
});

// Add new Data
bettaRoute.post("/", zValidator("json", BettaSchemaInput), (c) => {
  const bettaJSON: BettaInput = c.req.valid("json");

  const newBetta = new WildBetta(bettaJSON);
  const updatedBettas = [...wildBettas, newBetta];
  dataBettas = updatedBettas;

  return c.json(updatedBettas, 201);
});

// Delete Data
bettaRoute.delete("/:name", (c) => {
  try {
    const name = c.req.param("name").toLowerCase();
    const updatedBettas = dataBettas.filter((betta) => betta.name !== name);

    dataBettas = updatedBettas;
    return c.json({ message: "data has been successfully deleted" });
  } catch (error) {
    return c.json({ message: "Something Wrong" });
  }
});

// bettaRoute.post("/", ())
// Search Data by Name
// Search Data's by Category

// Update Data
