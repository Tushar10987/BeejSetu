import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Warehouse3D } from '../../../types'

interface WarehouseMarkerProps {
  warehouse: Warehouse3D
  onClick?: () => void
}

export default function WarehouseMarker({ warehouse, onClick }: WarehouseMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = warehouse.position[1] + Math.sin(state.clock.elapsedTime + warehouse.position[0]) * 0.5
      
      // Hover animation
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = () => {
    setClicked(!clicked)
    onClick?.()
  }

  return (
    <group position={warehouse.position}>
      {/* Warehouse Building */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[8, 12, 8]} />
        <meshStandardMaterial
          color={hovered ? '#3b82f6' : '#6366f1'}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 8, 0]} castShadow>
        <boxGeometry args={[10, 2, 10]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Inventory Indicator */}
      <mesh position={[0, 16, 0]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshStandardMaterial
          color={
            warehouse.inventory.length > 50 ? '#10b981' :
            warehouse.inventory.length > 20 ? '#f59e0b' : '#ef4444'
          }
          emissive={
            warehouse.inventory.length > 50 ? '#10b981' :
            warehouse.inventory.length > 20 ? '#f59e0b' : '#ef4444'
          }
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Label */}
      <Html
        position={[0, 20, 0]}
        distanceFactor={10}
        occlude
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0.8, scale: hovered ? 1.1 : 1 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg border border-gray-200"
        >
          <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
            {warehouse.model}
          </p>
          <p className="text-xs text-gray-600">
            {warehouse.inventory.length} items
          </p>
        </motion.div>
      </Html>

      {/* Status Text */}
      <Text
        position={[0, -8, 0]}
        fontSize={2}
        color="#374151"
        anchorX="center"
        anchorY="middle"
      >
        {warehouse.model}
      </Text>
    </group>
  )
}
