import { logger } from "hono/logger";
import { bettaRoute, complexRoute } from "./modules/betta/routes";
import { commonRoute } from "./modules/common/route";
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.use(logger());
app.route("/", commonRoute);
app.route("/bettas", bettaRoute);
app.route("/complex", complexRoute);

export default app;
