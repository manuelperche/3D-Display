import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { db } from "./drizzle/db";

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(async () => {
    const post = await db.query.ProductTable.findFirst({
      columns: {
        name: true,
        modelFileName: true,
        likes: true,
        dislikes: true,
      },
    });
    return post;
  }),
  testing: t.procedure.query(() => "Testing"),
});

export const createServer = (): Express => {
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  app.use("/trpc", createExpressMiddleware({ router: appRouter }));

  return app;
};

export type AppRouter = typeof appRouter;
