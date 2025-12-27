// import { Hono } from "hono";
import { logger } from "hono/logger";
import { bettaRoute } from "./modules/betta/routes";
import { commonRoute } from "./modules/common/route";
import { Scalar } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.use(logger());
app.route("/", commonRoute);
app.route("/bettas", bettaRoute);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Indonesia Wildbbetta API",
    description:
      "Indonesia has a wealth of beautiful wild betta fish. Their colors are natural and vibrant. Many of them are still unknown to many people.",
  },
});

app.get("/", Scalar({ url: "/doc" }));

export default app;
