import { t } from "../trpc";
import { productsRouter } from "./products";

export const appRouter = t.router({
  testing: t.procedure.query(() => "Testing"),
  products: productsRouter,
});
