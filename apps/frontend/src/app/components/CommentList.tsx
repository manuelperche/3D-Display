import React from "react";
import { Box, Typography } from "@mui/material";
import type { Comment as CommentProps } from "../Types/Product";
import Comment from "./Comment";

function commentList({ comments }: { comments: CommentProps[] }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Comments:</Typography>
      <Box sx={{ overflow: "auto", padding: 1 }}>
        {comments.map((comment) => (
          <React.Fragment key={comment.id}>
            <Comment comment={comment} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}

export default commentList;
