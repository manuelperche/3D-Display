import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";

export const createServer = (): Express => {
  const app = express();

  const corsOptions = {
    origin: 'https://3-d-display-frontend.vercel.app',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors(corsOptions));

  app.use("/trpc", createExpressMiddleware({ router: appRouter }));

  app.get('/ping', (req, res) => {
    return res.send('pong 🏓')
  })

  return app;
};

export type AppRouter = typeof appRouter;
