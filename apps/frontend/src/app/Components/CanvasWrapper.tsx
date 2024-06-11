import { Canvas } from '@react-three/fiber'
import type { ReactNode } from 'react';
import React from 'react'


function CanvasWrapper({ children }: { children: ReactNode }) {
  return (
    <Canvas camera={{ position: [1, 1, 10] }}>
      {children}
    </Canvas>
  )
}

export default CanvasWrapper