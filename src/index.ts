import { Hono } from "hono";
import { logger } from "hono/logger";
import { bettaRoute } from "./modules/betta/routes";
import { commonRoute } from "./modules/common/route";

const app = new Hono();

app.use(logger());
app.route("/", commonRoute);
app.route("/wild-bettas", bettaRoute);

export default app;
