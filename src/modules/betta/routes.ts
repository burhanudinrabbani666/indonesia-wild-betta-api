import { Hono } from "hono";
import { dataBettas } from "./data";
import { sleep } from "bun";

export const bettaRoute = new Hono();

bettaRoute.get("/", (c) => {
  return c.json(dataBettas);
});

bettaRoute.get("/:slug", (c) => {
  const slug = c.req.param("slug");

  const getBetta = dataBettas.find((betta) => betta.slug === slug);

  if (!getBetta) {
    return c.notFound();
  }

  return c.json(getBetta);
});
