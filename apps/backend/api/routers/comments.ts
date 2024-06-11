import { z } from "zod";
import { eq } from "drizzle-orm";
import { t } from "../trpc";
import { db } from "../utils/db";
import { CommentsTable } from "../utils/schema";

export const commentsRouter = t.router({
  addComment: t.procedure.input(z.object({ productId: z.string().uuid(), name: z.string(), text: z.string() })).mutation(async (req) => {
    const comments = await db
      .insert(CommentsTable)
      .values({
        productId: req.input.productId,
        name: req.input.name,
        text: req.input.text,
      })
      .returning();

    return comments;
  }),
  editComment: t.procedure.input(z.object({ id: z.string().uuid(), text: z.string() })).mutation(async (req) => {
    const comments = await db
      .update(CommentsTable)
      .set({
        text: req.input.text,
        updatedAt: new Date(),
      })
      .where(eq(CommentsTable.id, req.input.id))
      .returning();
    return comments;
  }),
  deleteComment: t.procedure.input(z.string().uuid()).mutation(async (req) => {
    const comments = await db.delete(CommentsTable).where(eq(CommentsTable.id, req.input)).returning();
    return comments;
  }),
});
