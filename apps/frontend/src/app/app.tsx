import React from "react";
import type { FunctionComponentElement } from "react";
import { trpc } from "../utils/trpc";

export default function Container(): FunctionComponentElement<JSX.Element> {
  const userQuery = trpc.hello.useQuery();

  return (
    <div>
      <h1>{userQuery.data}</h1>
    </div>
  );
}
