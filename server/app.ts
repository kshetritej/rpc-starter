import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";

export const app = new Hono();

app.use("*", logger());

app.get("/", (c) =>
  c.json({
    message: "hello,world!",
  }),
);

app.route("/api/expenses", expensesRoute);
