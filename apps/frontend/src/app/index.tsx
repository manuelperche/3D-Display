import React from "react";
import type { FunctionComponentElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { trpc } from "./Utils/trpc";
import theme from "./theme";
import ProductList from "./Views/ProductList";

function App(): FunctionComponentElement<JSX.Element> {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: `${import.meta.env.VITE_API_URL}/trpc`,
      }),
    ],
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ProductList />
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}

export default App;
