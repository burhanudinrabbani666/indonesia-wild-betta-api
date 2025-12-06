import { Hono } from "hono";
import { dataBettas } from "./data";

export const bettaRoute = new Hono();

bettaRoute.get("/", (c) => {
  return c.json(dataBettas);
});
