import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import type { Group} from "three";

interface ModelProps {
  scene: Group;
}

function Model({ scene }: ModelProps) {
  return (
    <Canvas camera={{ position: [1, 1, 10] }}>
      <ambientLight />
      <spotLight intensity={2} position={[20, 20, 20]} />
      <Suspense fallback={<Html center>loading...</Html>}>
        <primitive dispose={null} object={scene} position={[0, 0, 0]} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default Model;
