import { Hono } from "hono";

export const bettaRoute = new Hono();

bettaRoute.get("/", (c) => {
  return c.json([
    { id: 1, name: "Betta channoides" },
    { id: 1, name: "Betta albimarginata" },
    { id: 1, name: "Betta hendra " },
  ]);
});
