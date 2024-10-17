import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  name: z.string().min(3),
  amount: z.number().positive(),
});

const createPostSchema = expenseSchema.omit({ id: true });

const fakeExpenses: z.infer<typeof expenseSchema>[] = [
  {
    id: 1,
    name: "Rent",
    amount: 1000,
  },
  {
    id: 2,
    name: "Food",
    amount: 100,
  },
  {
    id: 3,
    name: "Transport",
    amount: 50,
  },
];

export const expensesRoute = new Hono()

  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .get("/total-spent", (c) => {
    const totalSpent = fakeExpenses.reduce((acc, expense) => acc + expense.amount, 0);
    return c.json({ totalSpent });
  })

  .post("/", zValidator("json", createPostSchema), (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json({ expense });
  })

  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const index = fakeExpenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
      return c.notFound();
    }
    const deltedExpense = fakeExpenses.splice(index, 1);
    return c.json({ message: "Expense deleted", expense: deltedExpense });
  });
