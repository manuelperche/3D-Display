import { t } from "../trpc";
import { db } from "../utils/db";

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
});
