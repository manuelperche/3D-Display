import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { initTRPC } from "@trpc/server";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const t = initTRPC.create();

const appRouter = t.router({
  hello: t.procedure.query(() => "Hello World"),
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
