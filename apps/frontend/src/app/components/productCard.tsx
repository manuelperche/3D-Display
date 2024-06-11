import React, { memo, Suspense, useState } from "react";
import { Card, CardContent, Typography, Stack, Box } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import { useNavigate } from "react-router-dom";
import type { Product as ProductType } from "../Types/Product";
import Model from "./Model";
import Loader from "./Loader";
import Product from "../Views/Product";
import ProductProvider from "../Contexts/ProductContext";
import { trpc } from "../Utils/trpc";

function ProductCard(props: ProductType) {
  const { id, name, modelFileName, likes, dislikes, comments } = props;
  const utils = trpc.useUtils();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    utils.products.getProducts.invalidate()
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent
        onClick={() => {
          handleOpen();
        }}
        sx={{ cursor: "pointer" }}
      >
        <Typography component="div" variant="h5">
          {name}
        </Typography>
        <Box sx={{ height: "260px" }}>
          {open ? (
            <Box />
          ) : (
            <Suspense fallback={<Loader />}>
              <Model sceneUrl={modelFileName} />
            </Suspense>
          )}
        </Box>
        <Stack direction="row" sx={{ marginTop: 2 }}>
          <Stack alignItems="center" direction="row" gap={1} sx={{ marginRight: 3 }}>
            <ThumbUpAltIcon />
            <Typography variant="body1">{likes}</Typography>
          </Stack>

          <Stack alignItems="center" direction="row" gap={1} sx={{ marginRight: 3 }}>
            <ThumbDownAltIcon />
            <Typography variant="body1">{dislikes}</Typography>
          </Stack>
          <Stack alignItems="center" direction="row" gap={1} sx={{ marginRight: 3 }}>
            <CommentIcon />
            <Typography variant="body1">{comments.length}</Typography>
          </Stack>
        </Stack>
      </CardContent>
      <ProductProvider id={id}>
        <Product handleClose={handleClose} open={open} />
      </ProductProvider>
    </Card>
  );
}

export default memo(ProductCard);
