import React from "react";
import type { FunctionComponentElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "../utils/trpc";
import Container from "./app";

export default function App(): FunctionComponentElement<JSX.Element> {
  const queryClient = new QueryClient();
  const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:5001/trpc",
      }),
    ],
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Container />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
