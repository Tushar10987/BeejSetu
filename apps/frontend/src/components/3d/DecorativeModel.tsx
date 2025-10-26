import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh } from 'three';

interface DecorativeModelProps {
  modelPath: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  animationSpeed?: number;
  floatHeight?: number;
}

export const DecorativeModel: React.FC<DecorativeModelProps> = ({
  modelPath,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  animationSpeed = 1,
  floatHeight = 0.2
}) => {
  const modelRef = useRef<THREE.Group>();
  const { scene } = useGLTF(modelPath);
  const initialY = position[1];

  useFrame((state) => {
    if (!modelRef.current) return;

    // Gentle floating animation
    const time = state.clock.getElapsedTime();
    modelRef.current.position.y = initialY + Math.sin(time * animationSpeed) * floatHeight;

    // Slow rotation
    modelRef.current.rotation.y += 0.002 * animationSpeed;
  });

  return (
    <primitive
      ref={modelRef}
      object={scene.clone()}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
    />
  );
};

// List of available models
export const ModelPaths = {
  TRACTOR: '/3d-assets/models/farms/tractor.glb',
  FARMER: '/3d-assets/models/farms/farmer.glb',
  PLANT: '/3d-assets/models/farms/plant.glb',
  WHEAT: '/3d-assets/models/farms/wheat.glb',
} as const;