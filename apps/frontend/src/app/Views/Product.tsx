import React, { Suspense, useState } from "react";
import { Modal, Box, Typography, Button, Stack, Grid, Tooltip } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { trpc } from "../Utils/trpc";
import { useProduct } from "../Contexts/ProductContext";
import Model from "../Components/Model";
import CommentForm from "../Components/CommentForm";
import Loader from "../Components/Loader";
import CommentList from "../Components/CommentList";

interface ProductModalProps {
  open: boolean;
  handleClose: () => void;
}

function Product({ open, handleClose }: ProductModalProps): JSX.Element {
  const { product, setProduct, comments } = useProduct();

  const like = trpc.products.like.useMutation();
  const dislike = trpc.products.dislike.useMutation();

  const handleLike = async () => {
    const newLikes = await like.mutateAsync(product.id);
    if (newLikes.length < 0) return;
    setProduct({ ...product, likes: newLikes[0].likes });
  };

  const handleDislike = async () => {
    const newDislikes = await dislike.mutateAsync(product.id);
    if (newDislikes.length < 0) return;
    setProduct({ ...product, dislikes: newDislikes[0].dislikes });
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
        <Grid container spacing={2} sx={{ height: "100%", padding: 2 }}>
          <Grid item xs={12}>
            <Tooltip
              onClick={() => {
                handleClose();
              }}
              title="Go back"
            >
              <ArrowBackIcon sx={{ cursor: "pointer" }} />
            </Tooltip>
          </Grid>
          <Grid item md={8} xs={12}>
            <Suspense fallback={<Loader />}>
              <Model rotate sceneUrl={product.modelFileName} />
            </Suspense>
          </Grid>
          <Grid item md={4} xs={12} sx={{ height: "100%", overflow: "auto", padding: 2 }}>
            <Typography component="h2" id="modal-modal-title" variant="h6">
              {product.name}
            </Typography>
            <Stack direction="row" sx={{ marginTop: 2 }}>
              <Button onClick={handleLike} startIcon={<ThumbUpAltIcon />}>
                {product.likes}
              </Button>
              <Button onClick={handleDislike} startIcon={<ThumbDownAltIcon />}>
                {product.dislikes}
              </Button>
              <Button startIcon={<CommentIcon />}>{comments.length}</Button>
            </Stack>
            <CommentForm />
            <CommentList comments={comments} />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default Product;
