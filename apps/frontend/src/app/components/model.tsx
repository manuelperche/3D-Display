import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import type { Group } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface ModelProps {
  sceneUrl: string;
  rotate?: boolean;
}

function Model({ sceneUrl, rotate = false }: ModelProps) {
  const { scene } = useLoader(GLTFLoader, sceneUrl);

  return (
    <Canvas camera={{ position: [1, 1, 10] }}>
      <ambientLight />
      <spotLight intensity={2} position={[20, 20, 20]} />
      <primitive dispose={null} object={scene} position={[0, 0, 0]} />
      {rotate && <OrbitControls />}
    </Canvas>
  );
}

export default Model;
