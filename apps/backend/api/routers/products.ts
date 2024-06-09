import { z } from "zod";
import { asc, eq, sql } from "drizzle-orm";
import { t } from "../trpc";
import { db } from "../utils/db";
import { ProductTable } from "../utils/schema";

export const productsRouter = t.router({
  getProduct: t.procedure.query(async () => {
    const post = await db.query.ProductTable.findFirst({
      columns: {
        id: true,
        name: true,
        modelFileName: true,
        likes: true,
        dislikes: true,
      },
      with: {
        comments: true,
      },
    });
    return post;
  }),
  getProducts: t.procedure.query(async () => {
    const posts = await db.query.ProductTable.findMany({
      orderBy: [asc(ProductTable.id)],
      columns: {
        id: true,
        name: true,
        modelFileName: true,
        likes: true,
        dislikes: true,
      },
      with: {
        comments: true,
      },
    });
    return posts;
  }),
  like: t.procedure.input(z.string().uuid()).mutation(async (req) => {
    await db
      .update(ProductTable)
      .set({
        likes: sql`${ProductTable.likes} + 1`,
      })
      .where(eq(ProductTable.id, req.input))
      .execute();
  }),
  dislike: t.procedure.input(z.string().uuid()).mutation(async (req) => {
    await db
      .update(ProductTable)
      .set({
        dislikes: sql`${ProductTable.dislikes} + 1`,
      })
      .where(eq(ProductTable.id, req.input))
      .execute();
  }),
});
