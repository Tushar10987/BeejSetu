import React, { Suspense, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Html, useProgress } from '@react-three/drei'
import { EffectComposer, Bloom, ToneMapping } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Map3DConfig, Warehouse3D, Farm3D, Truck3D } from '../../../types'
import WarehouseMarker from './WarehouseMarker'
import FarmExtrusion from './FarmExtrusion'
import TruckRoute from './TruckRoute'
import PerformanceToggle from '../PerformanceToggle'
import LoadingSpinner from '../../LoadingSpinner'

interface Map3DProps {
  config?: Map3DConfig
  warehouses?: Warehouse3D[]
  farms?: Farm3D[]
  trucks?: Truck3D[]
  onWarehouseClick?: (warehouse: Warehouse3D) => void
  onFarmClick?: (farm: Farm3D) => void
  onTruckClick?: (truck: Truck3D) => void
}

function LoadingFallback() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-primary-600 animate-spin" />
        <p className="text-sm text-gray-600">Loading 3D assets... {Math.round(progress)}%</p>
      </div>
    </Html>
  )
}

function CameraController({ config }: { config: Map3DConfig }) {
  const { camera } = useThree()
  
  useMemo(() => {
    camera.position.set(0, 100, 200)
    camera.lookAt(0, 0, 0)
  }, [camera])

  return null
}

function Map3DScene({
  warehouses = [],
  farms = [],
  trucks = [],
  onWarehouseClick,
  onFarmClick,
  onTruckClick,
}: Map3DProps) {
  const [performanceMode, setPerformanceMode] = useState<'high' | 'balanced' | 'low'>('balanced')
  
  const controlsRef = useRef<any>()
  
  const enableEffects = performanceMode === 'high'
  const enableShadows = performanceMode !== 'low'
  
  return (
    <div className="relative w-full h-full">
      {/* Performance Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <PerformanceToggle
          mode={performanceMode}
          onModeChange={setPerformanceMode}
        />
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 100, 200], fov: 60 }}
        shadows={enableShadows}
        gl={{ 
          antialias: performanceMode !== 'low',
          alpha: true,
          powerPreference: performanceMode === 'high' ? 'high-performance' : 'default'
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[100, 100, 50]}
            intensity={1}
            castShadow={enableShadows}
            shadow-mapSize={[2048, 2048]}
          />
          
          {/* Environment */}
          <Environment preset="city" />
          
          {/* Controls */}
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={50}
            maxDistance={500}
          />
          
          {/* Camera Controller */}
          <CameraController config={{ center: { latitude: 0, longitude: 0 }, zoom: 1, pitch: 0, bearing: 0, style: '' }} />
          
          {/* Ground Plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshLambertMaterial color="#f0f0f0" />
          </mesh>
          
          {/* Warehouses */}
          {warehouses.map((warehouse) => (
            <WarehouseMarker
              key={warehouse.id}
              warehouse={warehouse}
              onClick={() => onWarehouseClick?.(warehouse)}
            />
          ))}
          
          {/* Farms */}
          {farms.map((farm) => (
            <FarmExtrusion
              key={farm.id}
              farm={farm}
              onClick={() => onFarmClick?.(farm)}
            />
          ))}
          
          {/* Trucks */}
          {trucks.map((truck) => (
            <TruckRoute
              key={truck.id}
              truck={truck}
              onClick={() => onTruckClick?.(truck)}
            />
          ))}
          
          {/* Post-processing Effects */}
          {enableEffects && (
            <EffectComposer>
              <Bloom intensity={0.5} luminanceThreshold={0.9} />
              <ToneMapping />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">3D Map Controls</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Mouse: Rotate view</p>
          <p>• Scroll: Zoom in/out</p>
          <p>• Right-click + drag: Pan</p>
          <p>• Click objects for details</p>
        </div>
      </div>
    </div>
  )
}

export default Map3DScene

