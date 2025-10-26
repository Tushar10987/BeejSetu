import React, { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Truck3D } from '../../../types'

interface TruckRouteProps {
  truck: Truck3D
  onClick?: () => void
}

export default function TruckRoute({ truck, onClick }: TruckRouteProps) {
  const truckRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [progress, setProgress] = useState(0)

  // Generate route points
  const routePoints = useMemo(() => {
    const points: THREE.Vector3[] = []
    
    // Start point
    points.push(new THREE.Vector3(
      truck.route.startLocation.longitude * 100,
      2,
      truck.route.startLocation.latitude * 100
    ))
    
    // Waypoints
    truck.route.waypoints.forEach(waypoint => {
      points.push(new THREE.Vector3(
        waypoint.longitude * 100,
        2,
        waypoint.latitude * 100
      ))
    })
    
    // End point
    points.push(new THREE.Vector3(
      truck.route.endLocation.longitude * 100,
      2,
      truck.route.endLocation.latitude * 100
    ))
    
    return points
  }, [truck.route])

  // Create smooth curve from route points
  const curve = useMemo(() => {
    if (routePoints.length < 2) return null
    
    const curve = new THREE.CatmullRomCurve3(routePoints)
    curve.closed = false
    return curve
  }, [routePoints])

  useFrame((state) => {
    if (truckRef.current && curve) {
      // Animate truck along the route
      const elapsedTime = state.clock.elapsedTime * 0.1 // Slow down animation
      const routeProgress = (elapsedTime % 1) // Loop from 0 to 1
      
      setProgress(routeProgress)
      
      // Get position along the curve
      const position = curve.getPoint(routeProgress)
      const tangent = curve.getTangent(routeProgress)
      
      // Position the truck
      truckRef.current.position.copy(position)
      
      // Rotate truck to face direction of travel
      if (tangent.length() > 0) {
        const angle = Math.atan2(tangent.x, tangent.z)
        truckRef.current.rotation.y = angle
      }
      
      // Gentle floating animation
      truckRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.2
    }
  })

  const handleClick = () => {
    onClick?.()
  }

  if (!curve) return null

  return (
    <group>
      {/* Route Line */}
      <mesh>
        <tubeGeometry args={[curve, 64, 0.5, 8, false]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Truck */}
      <group
        ref={truckRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Truck Body */}
        <mesh castShadow>
          <boxGeometry args={[4, 2, 8]} />
          <meshStandardMaterial
            color={hovered ? '#f59e0b' : '#374151'}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Truck Cabin */}
        <mesh position={[0, 1.5, -2]} castShadow>
          <boxGeometry args={[3, 2, 4]} />
          <meshStandardMaterial
            color={hovered ? '#fbbf24' : '#6b7280'}
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Wheels */}
        {[-3, 3].map((x, i) => (
          <group key={i}>
            {[-3, 3].map((z, j) => (
              <mesh
                key={j}
                position={[x, -1, z]}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow
              >
                <cylinderGeometry args={[0.8, 0.8, 0.5, 8]} />
                <meshStandardMaterial color="#1f2937" />
              </mesh>
            ))}
          </group>
        ))}

        {/* Status Indicator */}
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[0.3, 8, 6]} />
          <meshBasicMaterial
            color={
              truck.status === 'in_transit' ? '#10b981' :
              truck.status === 'available' ? '#3b82f6' :
              truck.status === 'maintenance' ? '#f59e0b' : '#6b7280'
            }
            emissive={
              truck.status === 'in_transit' ? '#10b981' :
              truck.status === 'available' ? '#3b82f6' :
              truck.status === 'maintenance' ? '#f59e0b' : '#6b7280'
            }
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Route Progress Indicator */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 2, 8]} />
        <meshBasicMaterial
          color="#ef4444"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Truck Info Overlay */}
      <Html
        position={[0, 6, 0]}
        distanceFactor={15}
        occlude
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200"
        >
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">Truck {truck.id}</p>
            <p className="text-xs text-gray-600 capitalize">
              Status: {truck.status.replace('_', ' ')}
            </p>
            <p className="text-xs text-gray-600">
              Progress: {(progress * 100).toFixed(1)}%
            </p>
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

