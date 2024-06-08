import React, { Suspense } from "react";
import type { FunctionComponentElement } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { trpc } from "../utils/trpc";
import ProductCard from "./components/productCard";

function Container(): FunctionComponentElement<JSX.Element> {
  const { data, isFetching } = trpc.products.getProducts.useQuery();

  if (isFetching) return <CircularProgress color="info" />;

  return (
    <Grid alignItems="center" container justifyContent="center" spacing={3} sx={{ minHeight: "100vh", padding: 5 }}>
      {data?.map((product) => (
        <Grid item key={product.id} md={4} sm={6} xs={12}>
          <Suspense fallback={<CircularProgress color="info" />}>
            <ProductCard {...product} />
          </Suspense>
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
