import { Hono } from "hono";

export const commonRoute = new Hono();

commonRoute.get("/", (c) => {
  return c.json({
    title: "Indonesia Wild Betta API",
    bettas: "/bettas",
  });
});
