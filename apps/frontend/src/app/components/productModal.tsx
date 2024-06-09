import React from "react";
import { Modal, Box, Typography, TextField, Button, Stack, Grid, Paper, Avatar } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { timeAgo } from "../../utils/timeAgo";
import type { Product } from "./productCard";
import Model from "./model";
import { trpc } from "../../utils/trpc";

interface PostModalProps {
  open: boolean;
  handleClose: () => void;
  product: Product;
}

export default function PostModal({ open, handleClose, product }: PostModalProps): JSX.Element {
  const { id, name, modelFileName, likes, dislikes, comments } = product;

  const like = trpc.products.like.useMutation();
  const dislike = trpc.products.dislike.useMutation();

  const handleLike = () => {
    like.mutate(id);
  };

  const handleDislike = () => {
    dislike.mutate(id);
  };

  return (
    <Modal aria-describedby="modal-modal-description" aria-labelledby="modal-modal-title" onClose={handleClose} open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={2} sx={{ height: "100%" }}>
          <Grid item xs={8}>
            <Model rotate sceneUrl={modelFileName} />
          </Grid>
          <Grid item xs={4}>
            <Typography component="h2" id="modal-modal-title" variant="h6">
              {name}
            </Typography>
            <Stack direction="row" sx={{ marginTop: 2 }}>
              <Button onClick={handleLike} startIcon={<ThumbUpAltIcon />}>
                {likes}
              </Button>
              <Button onClick={handleDislike} startIcon={<ThumbDownAltIcon />}>
                {dislikes}
              </Button>
              <Button startIcon={<CommentIcon />}>{comments.length}</Button>
            </Stack>
            <TextField fullWidth multiline placeholder="Write a comment..." rows={4} sx={{ mt: 2 }} variant="outlined" />
            <Button fullWidth sx={{ mt: 2 }} variant="contained">
              Send Comment
            </Button>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Comments:</Typography>
              {comments.map((comment) => (
                <Paper key={comment.id} style={{ padding: "20px 20px", marginTop: 10 }}>
                  <Grid container spacing={2} wrap="nowrap">
                    <Grid item>
                      <Avatar alt="Avatar" />
                    </Grid>
                    <Grid item justifyContent="left" xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
                      <p style={{ textAlign: "left" }}>{comment.text}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>{`Posted ${timeAgo(comment.createdAt)}`}</p>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
