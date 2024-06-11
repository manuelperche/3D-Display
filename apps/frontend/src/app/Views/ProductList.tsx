import React from "react";
import type { FunctionComponentElement } from "react";
import { Container, Grid } from "@mui/material";
import { trpc } from "../Utils/trpc";
import ProductCards from "../Components/ProductCards";
import Loader from "../Components/Loader";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function ProductList(): FunctionComponentElement<JSX.Element> {
  const { data, isFetching, isRefetching } = trpc.products.getProducts.useQuery();

  if (isFetching && !isRefetching) return <Loader />;

  return (
    <Container maxWidth="xl" sx={{ minHeight: "100vh", padding: 5, display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
      <Header />
      <main>
        <Grid alignItems="center" container justifyContent="center" spacing={3}>
          {data?.map((product) => (
            <Grid item key={product.id} md={4} sm={6} sx={{ height: 400 }} xs={12}>
              <ProductCards {...product} />
            </Grid>
          ))}
        </Grid>
      </main>
      <Footer />
    </Container>
  );
}

export default ProductList;
