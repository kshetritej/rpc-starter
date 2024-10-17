import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());
const apiRoutes = app.basePath("/api")
  .route("/expenses", expensesRoute);

app.get("/", (c) =>
  c.json({
    message: "Honō is running",
  }),
);


app.use('*', serveStatic({ root: './frontend/dist' }))
app.use('*', serveStatic({ path: './frontend/dist/index.html' }))

export default app;
export type ApiRoutes = typeof apiRoutes;