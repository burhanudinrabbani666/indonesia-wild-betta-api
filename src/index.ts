import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    title: "Indonesia Wild Betta API",
    bettas: "/bettas",
  });
});

export default app;
