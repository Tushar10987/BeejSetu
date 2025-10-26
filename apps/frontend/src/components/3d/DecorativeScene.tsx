import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { DecorativeModel } from './DecorativeModel';

interface DecorativeSceneProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  className?: string;
  height?: string;
}

export const DecorativeScene: React.FC<DecorativeSceneProps> = ({
  modelPath,
  position,
  rotation,
  scale,
  className = 'h-64',
  height = '16rem'
}) => {
  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <DecorativeModel
            modelPath={modelPath}
            position={position}
            rotation={rotation}
            scale={scale}
          />
          <Environment preset="warehouse" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
};