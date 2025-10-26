import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Farm3D } from '../../../types'

interface FarmExtrusionProps {
  farm: Farm3D
  onClick?: () => void
}

export default function FarmExtrusion({ farm, onClick }: FarmExtrusionProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Create extruded geometry from farm polygon
  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    
    // Convert polygon to Three.js shape
    if (farm.polygon.length > 0) {
      shape.moveTo(farm.polygon[0][0], farm.polygon[0][1])
      for (let i = 1; i < farm.polygon.length; i++) {
        shape.lineTo(farm.polygon[i][0], farm.polygon[i][1])
      }
      shape.closePath()
    }

    // Extrude the shape
    const extrudeSettings = {
      depth: farm.height,
      bevelEnabled: false,
    }

    return new THREE.ExtrudeGeometry(shape, extrudeSettings)
  }, [farm.polygon, farm.height])

  // Calculate color based on NDVI data
  const color = useMemo(() => {
    if (farm.ndviData.length === 0) return '#10b981'
    
    const latestNDVI = farm.ndviData[farm.ndviData.length - 1]
    const ndviValue = latestNDVI.value
    
    // NDVI color mapping: red (low) -> yellow -> green (high)
    if (ndviValue < 0.3) return '#ef4444' // Red
    if (ndviValue < 0.5) return '#f59e0b' // Yellow
    if (ndviValue < 0.7) return '#10b981' // Green
    return '#059669' // Dark green
  }, [farm.ndviData])

  useFrame((state) => {
    if (meshRef.current && hovered) {
      // Gentle pulsing animation on hover
      meshRef.current.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.1
    }
  })

  const handleClick = () => {
    onClick?.()
  }

  return (
    <group>
      {/* Farm Extrusion */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>

      {/* NDVI Data Overlay */}
      <Html
        position={[0, farm.height + 5, 0]}
        distanceFactor={20}
        occlude
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200"
        >
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">Farm {farm.id}</p>
            {farm.ndviData.length > 0 && (
              <div className="mt-1">
                <p className="text-xs text-gray-600">
                  NDVI: {(farm.ndviData[farm.ndviData.length - 1].value * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-600">
                  Health: {farm.ndviData[farm.ndviData.length - 1].healthIndex}/100
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </Html>

      {/* Growth Animation Particles */}
      {farm.ndviData.length > 0 && (
        <group>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh
              key={i}
              position={[
                (Math.random() - 0.5) * 20,
                farm.height + Math.random() * 5,
                (Math.random() - 0.5) * 20
              ]}
            >
              <sphereGeometry args={[0.1, 4, 4]} />
              <meshBasicMaterial
                color="#10b981"
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  )
}

