import React from "react";
import type { FunctionComponentElement } from "react";
import { Grid } from "@mui/material";
import { trpc } from "../Utils/trpc";
import ProductCards from "../Components/productCards";
import Loader from "../Components/loader";

function ProductList(): FunctionComponentElement<JSX.Element> {
  const { data, isFetching, isRefetching } = trpc.products.getProducts.useQuery();

  if (isFetching && !isRefetching) return <Loader />;

  return (
    <Grid alignItems="center" container justifyContent="center" spacing={3} sx={{ minHeight: "100vh", padding: 5 }}>
      {data?.map((product) => (
        <Grid item key={product.id} md={4} sm={6} sx={{ height: 400 }} xs={12}>
          <ProductCards {...product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
