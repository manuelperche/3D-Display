import React, { Suspense } from "react";
import type { FunctionComponentElement } from "react";
import { Grid } from "@mui/material";
import { trpc } from "../utils/trpc";
import ProductCard from "./components/productCard";
import Loader from "./components/loader";

function Container(): FunctionComponentElement<JSX.Element> {
  const { data, isFetching } = trpc.products.getProducts.useQuery();

  if (isFetching) return <Loader />;

  return (
    <Grid alignItems="center" container justifyContent="center" spacing={3} sx={{ minHeight: "100vh", padding: 5 }}>
      {data?.map((product) => (
        <Grid item key={product.id} md={4} sm={6} xs={12}>
          <Suspense fallback={<Loader />}>
            <ProductCard {...product} />
          </Suspense>
        </Grid>
      ))}
    </Grid>
  );
}

export default Container;
