import React, { useState } from "react";
import { Paper, Grid, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Comment as CommentProps } from "../Types/Product";
import { TimeAgo } from "../Utils/TimeAgo";
import { useProduct } from "../Contexts/ProductContext";
import { trpc } from "../Utils/trpc";
import CommentForm from "./CommentForm";

function Comment({ comment }: { comment: CommentProps }) {
  const [isEditing, setIsEditing] = useState(false);

  const deleteComment = trpc.comments.deleteComment.useMutation();

  const { deleteLocalComment } = useProduct();

  const onDelete = async () => {
    const result = await deleteComment.mutateAsync(comment.id);
    if (result) {
      deleteLocalComment(comment.id);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
  };

  return (
    <Paper key={comment.id} style={{ padding: "30px 30px", marginTop: 10 }}>
      {isEditing ? (
        <CommentForm id={comment.id} name={comment.name} onCancel={onCancel} text={comment.text} />
      ) : (
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            <Avatar alt="Avatar" />
            <div>
              <EditIcon
                onClick={() => {
                  setIsEditing((prev) => !prev);
                }}
                sx={{ marginX: 1, marginTop: 2, cursor: "pointer" }}
              />
            </div>
            <DeleteIcon onClick={onDelete} sx={{ marginX: 1, marginTop: 2, cursor: "pointer" }} />
          </Grid>
          <Grid item justifyContent="left" xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
            <p style={{ textAlign: "left" }}>{comment.text}</p>
            {comment.createdAt !== comment.updatedAt ? (
              <p style={{ textAlign: "left", color: "gray" }}>{`Edited ${TimeAgo(comment.updatedAt)}`}</p>
            ) : (
              <p style={{ textAlign: "left", color: "gray" }}>{`Posted ${TimeAgo(comment.createdAt)}`}</p>
            )}
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}

export default Comment;
