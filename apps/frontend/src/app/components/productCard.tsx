import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Stack, Box } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { trpc } from "../../utils/trpc";
import Model from "./model";
import PostModal from "./productModal";

export interface Product {
  id: string;
  name: string;
  modelFileName: string;
  likes: number;
  dislikes: number;
  comments: {
    id: string;
    name: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    productId: string;
  }[];
}

function ProductCard(props: Product) {
  const { id, name, modelFileName, likes, dislikes, comments } = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card>
      <CardContent onClick={handleOpen} sx={{ cursor: "pointer" }}>
        <Typography component="div" variant="h5">
          {name}
        </Typography>
        {open ? <Box sx={{ height: "150px" }} /> : <Model sceneUrl={modelFileName} />}
        <Stack direction="row" sx={{ marginTop: 2 }}>
          {/* <Button onClick={handleLike} startIcon={<ThumbUpAltIcon />}>
            {likes}
          </Button> */}
          <Stack alignItems="center" direction="row" gap={1} sx={{ marginRight: 3 }}>
            <ThumbUpAltIcon />
            <Typography variant="body1">{likes}</Typography>
          </Stack>
          {/* <Button onClick={handleDislike} startIcon={<ThumbDownAltIcon />}>
            {dislikes}
          </Button> */}
          <Stack alignItems="center" direction="row" gap={1} sx={{ marginRight: 3 }}>
            <ThumbDownAltIcon />
            <Typography variant="body1">{dislikes}</Typography>
          </Stack>
          {/* <Button startIcon={<CommentIcon />}>{comments.length}</Button> */}
          <Stack alignItems="center" direction="row" gap={1} sx={{ marginRight: 3 }}>
            <CommentIcon />
            <Typography variant="body1">{comments.length}</Typography>
          </Stack>
        </Stack>
        {/* <Button color="primary" onClick={handleOpen} variant="contained">
          Open Post
        </Button> */}
      </CardContent>
      <PostModal handleClose={handleClose} open={open} product={props} />
    </Card>
  );
}

export default ProductCard;
