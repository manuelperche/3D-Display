import React, { useState } from "react";
import { Modal, Box, Typography, Button, Stack, Grid, Paper, Avatar } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import { timeAgo } from "../Utils/TimeAgo";
import { trpc } from "../Utils/trpc";
import type { Product } from "./ProductCard";
import Model from "./Model";
import CommentForm from "./commentForm";

interface ProductModalProps {
  open: boolean;
  handleClose: () => void;
  product: Product;
}

function ProductModal({ open, handleClose, product }: ProductModalProps): JSX.Element {
  const [productForModal, setProductForModal] = useState<Product>(product);
  const [EditingComment, setEditingComment] = useState("");

  const like = trpc.products.like.useMutation();
  const dislike = trpc.products.dislike.useMutation();
  const addComment = trpc.comments.addComment.useMutation();

  const handleLike = async () => {
    const newLikes = await like.mutateAsync(productForModal.id);
    if (newLikes.length < 0) return;
    setProductForModal({ ...productForModal, likes: newLikes[0].likes });
  };

  const handleDislike = async () => {
    const newDislikes = await dislike.mutateAsync(productForModal.id);
    if (newDislikes.length < 0) return;
    setProductForModal({ ...productForModal, dislikes: newDislikes[0].dislikes });
  };

  const onCancel = () => {
    setEditingComment("");
  };

  const handleAddComment = (comment: { name: string; text: string }) => {

  }

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
        <Grid container spacing={2} sx={{ height: { xs: "70%", md: "100%" } }}>
          <Grid item md={8} xs={12}>
            <Model rotate sceneUrl={productForModal.modelFileName} />
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography component="h2" id="modal-modal-title" variant="h6">
              {productForModal.name}
            </Typography>
            <Stack direction="row" sx={{ marginTop: 2 }}>
              <Button onClick={handleLike} startIcon={<ThumbUpAltIcon />}>
                {productForModal.likes}
              </Button>
              <Button onClick={handleDislike} startIcon={<ThumbDownAltIcon />}>
                {productForModal.dislikes}
              </Button>
              <Button startIcon={<CommentIcon />}>{productForModal.comments.length}</Button>
            </Stack>
            <CommentForm productId={productForModal.id} />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Comments:</Typography>
              <Box sx={{ maxHeight: 700, overflow: "auto", padding: 1 }}>
                {productForModal.comments.map((comment) => (
                  <Paper key={comment.id} style={{ padding: "30px 30px", marginTop: 10 }}>
                    {EditingComment === comment.id ? (
                      <CommentForm id={comment.id} name={comment.name} onCancel={onCancel} productId={productForModal.id} text={comment.text} />
                    ) : (
                      <Grid container spacing={2} wrap="nowrap">
                        <Grid item>
                          <Avatar alt="Avatar" />
                          <EditIcon
                            onClick={() => {
                              setEditingComment(comment.id);
                            }}
                            sx={{ marginX: 1, marginTop: 2, cursor: "pointer" }}
                          />
                        </Grid>
                        <Grid item justifyContent="left" xs zeroMinWidth>
                          <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
                          <p style={{ textAlign: "left" }}>{comment.text}</p>
                          <p style={{ textAlign: "left", color: "gray" }}>{`Posted ${timeAgo(comment.createdAt)}`}</p>
                        </Grid>
                      </Grid>
                    )}
                  </Paper>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ProductModal;
