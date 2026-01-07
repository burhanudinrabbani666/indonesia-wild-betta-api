import { logger } from "hono/logger";
import { bettaRoute } from "./modules/betta/betta/route";
import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { complexRoute } from "./modules/betta/complex/route";

const app = new OpenAPIHono();

app.use(logger());
app.route("/bettas", bettaRoute);
app.route("/complex", complexRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Indonesia Wildbetta API",
    description:
      "Indonesia has a wealth of beautiful wild betta fish. Their colors are natural and vibrant. Many of them are still unknown to many people. This API contains information about Indonesian wild betta fish, I hope this is helpful and that you're interested in Indonesian wild betta fish.",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));
export default app;
