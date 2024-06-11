import React from "react";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "../Utils/trpc";
import { useProduct } from "../Contexts/ProductContext";

interface CommentsProps {
  id?: string;
  name?: string;
  text?: string;
  onCancel?: () => void;
  handleAddComment?: () => void;
}

interface Comment {
  name: string;
  text: string;
}

const schema = z.object({
  name: z.string().min(2).max(255, "Name must be 255 characters or less"),
  text: z.string().min(2).max(255, "Comment ˝must be 255 characters or less"),
});

function CommentBox({ id, name, text, onCancel }: CommentsProps) {
  const { updateLocalComment, createLocalComment, product } = useProduct();

  const addComment = trpc.comments.addComment.useMutation();
  const editComment = trpc.comments.editComment.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: name || "",
      text: text || "",
    },
  });

  const onSubmit = async (data: Comment) => {
    if (id) {
      const result = await editComment.mutateAsync({ id, text: data.text });
      if (result) {
        updateLocalComment(id, result[0].text, result[0].updatedAt);
      }
      if (onCancel) onCancel();
    } else {
      const result = await addComment.mutateAsync({
        productId: product.id,
        name: data.name,
        text: data.text,
      });
      if (result) {
        createLocalComment(result[0]);
        reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!id ? (
        <TextField
          {...register("name")}
          error={Boolean(errors.name)}
          fullWidth
          helperText={errors.name?.message}
          placeholder="Write your name"
          sx={{ mt: 2 }}
          variant="outlined"
        />
      ) : null}

      <TextField
        {...register("text")}
        error={Boolean(errors.text)}
        fullWidth
        helperText={errors.text?.message}
        multiline
        placeholder="Write a comment..."
        rows={4}
        sx={{ mt: 2 }}
        variant="outlined"
      />
      {id ? (
        <Button fullWidth onClick={onCancel} sx={{ mt: 2 }} variant="outlined">
          Cancel
        </Button>
      ) : null}
      <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained">
        {`${id ? "Edit" : "Add"} Comment`}
      </Button>
    </form>
  );
}

export default CommentBox;
