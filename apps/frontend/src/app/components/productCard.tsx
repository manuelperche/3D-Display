import React from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import Model from "./model";

interface ProductCardProps {
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

function ProductCard(props: ProductCardProps) {
  const { name, modelFileName, likes, dislikes, comments } = props;
  return (
    <Card>
      <CardContent>
        <Typography component="div" variant="h5">
          {name}
        </Typography>
        <Model sceneUrl={modelFileName} />
        <Stack direction="row" sx={{ marginTop: 2 }}>
          <Button startIcon={<ThumbUpAltIcon />}>{likes}</Button>
          <Button startIcon={<ThumbDownAltIcon />}>{dislikes}</Button>
          <Button startIcon={<CommentIcon />}>{comments.length}</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
