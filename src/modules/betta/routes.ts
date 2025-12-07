import { Hono } from "hono";
import { dataBettas } from "./data";

export const bettaRoute = new Hono();

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

// Search Data by Name

// Search Data's by Category

// Add new Data

// bettaRoute.post("/", ())

// Delete Data

// Update Data
