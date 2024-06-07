import React from "react";
import type { FunctionComponentElement } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useLoader } from "@react-three/fiber";
import { trpc } from "../utils/trpc";
import Model from "./components/model";

export default function Container(): FunctionComponentElement<JSX.Element> {
  const { data } = trpc.hello.useQuery();

  const { scene } = useLoader(GLTFLoader, "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/60116119-5d4f-4d4a-a150-e5ebe1346603-saawxt.glb");

  return (
    <Box alignItems="center" display="flex" justifyContent="center" minHeight="100vh">
      <Card>
        <CardContent sx={{height: 500, width: 500}} >
          <Typography component="div" variant="h5">
            {data}
          </Typography>
          <Model scene={scene} />
        </CardContent>
      </Card>
    </Box>
  );
}
