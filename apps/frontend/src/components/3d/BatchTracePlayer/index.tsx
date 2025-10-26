import React, { useState, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Batch, TraceabilityEvent, Location } from '../../../types';

interface BatchTracePlayerProps {
  batch: Batch;
  onEventClick?: (event: TraceabilityEvent) => void;
}

const STAGES = ['harvested', 'collected', 'stored', 'processed', 'delivered'] as const;

interface StageConfig {
  position: [number, number, number];
  color: string;
  icon: string;
  label: string;
}

const STAGE_CONFIG: Record<typeof STAGES[number], StageConfig> = {
  harvested: {
    position: [-40, 0, 0],
    color: '#10b981',
    icon: '🌾',
    label: 'Harvested',
  },
  collected: {
    position: [-20, 0, 0],
    color: '#f59e0b',
    icon: '🚛',
    label: 'Collected',
  },
  stored: {
    position: [0, 0, 0],
    color: '#3b82f6',
    icon: '🏢',
    label: 'Stored',
  },
  processed: {
    position: [20, 0, 0],
    color: '#6366f1',
    icon: '⚙️',
    label: 'Processed',
  },
  delivered: {
    position: [40, 0, 0],
    color: '#10b981',
    icon: '📦',
    label: 'Delivered',
  },
};

function BatchStage({
  stage,
  isActive,
  config,
  onClick,
}: {
  stage: typeof STAGES[number];
  isActive: boolean;
  config: StageConfig;
  onClick: () => void;
}) {
  return (
    <group position={config.position}>
      {/* Platform */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5, 0.5, 32]} />
        <meshStandardMaterial color={config.color} opacity={0.3} transparent />
      </mesh>

      {/* Stage Icon */}
      <Html center position={[0, 5, 0]}>
        <div className="text-4xl">{config.icon}</div>
      </Html>

      {/* Stage Label */}
      <Html center position={[0, -5, 0]}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`px-4 py-2 rounded-full ${
            isActive
              ? 'bg-primary-500 text-white'
              : 'bg-white/80 text-gray-600'
          }`}
        >
          {config.label}
        </motion.div>
      </Html>

      {/* Active Stage Indicator */}
      {isActive && (
        <group>
          <mesh position={[0, 8, 0]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={config.color}
              emissive={config.color}
              emissiveIntensity={0.5}
            />
          </mesh>
          <pointLight position={[0, 10, 0]} color={config.color} intensity={5} />
        </group>
      )}
    </group>
  );
}

function BatchJourney({
  currentStage,
  onStageClick,
}: {
  currentStage: string;
  onStageClick: (stage: typeof STAGES[number]) => void;
}) {
  return (
    <group>
      {/* Connection Lines */}
      {STAGES.slice(0, -1).map((stage, index) => {
        const start = STAGE_CONFIG[stage].position;
        const end = STAGE_CONFIG[STAGES[index + 1]].position;
        
        const points = [
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2]),
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <line key={stage} geometry={lineGeometry}>
            <lineBasicMaterial
              color={currentStage === stage ? '#6366f1' : '#e5e7eb'}
              linewidth={2}
            />
          </line>
        );
      })}

      {/* Stage Markers */}
      {STAGES.map((stage) => (
        <BatchStage
          key={stage}
          stage={stage}
          isActive={currentStage === stage}
          config={STAGE_CONFIG[stage]}
          onClick={() => onStageClick(stage)}
        />
      ))}
    </group>
  );
}

export function BatchTracePlayer({ batch, onEventClick }: BatchTracePlayerProps) {
  const [currentStage, setCurrentStage] = useState<typeof STAGES[number]>(
    batch.status
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  const sortedEvents = useMemo(
    () =>
      [...batch.traceabilityEvents].sort(
        (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
      ),
    [batch.traceabilityEvents]
  );

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => {
        if (prev >= sortedEvents.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, sortedEvents.length]);

  useEffect(() => {
    if (sortedEvents[currentEventIndex]) {
      setCurrentStage(
        sortedEvents[currentEventIndex].eventType as typeof STAGES[number]
      );
    }
  }, [currentEventIndex, sortedEvents]);

  return (
    <div className="relative w-full h-[500px]">
      <Canvas
        shadows
        camera={{ position: [0, 30, 100], fov: 50 }}
        className="bg-gray-50"
      >
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 10]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        <BatchJourney
          currentStage={currentStage}
          onStageClick={(stage) => {
            const eventIndex = sortedEvents.findIndex(
              (e) => e.eventType === stage
            );
            if (eventIndex !== -1) {
              setCurrentEventIndex(eventIndex);
              onEventClick?.(sortedEvents[eventIndex]);
            }
          }}
        />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          target={[0, 0, 0]}
        />
      </Canvas>

      {/* Timeline Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={sortedEvents.length - 1}
              value={currentEventIndex}
              onChange={(e) => setCurrentEventIndex(Number(e.target.value))}
              className="w-48"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{new Date(sortedEvents[0]?.timestamp).toLocaleDateString()}</span>
              <span>
                {new Date(
                  sortedEvents[sortedEvents.length - 1]?.timestamp
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {currentEventIndex + 1} / {sortedEvents.length}
          </div>
        </div>
      </div>

      {/* Event Info */}
      <AnimatePresence>
        {sortedEvents[currentEventIndex] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {STAGE_CONFIG[
                sortedEvents[currentEventIndex].eventType as typeof STAGES[number]
              ]?.label || 'Unknown Stage'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(
                sortedEvents[currentEventIndex].timestamp
              ).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              Actor: {sortedEvents[currentEventIndex].actorType}
            </p>
            {sortedEvents[currentEventIndex].blockchainHash && (
              <p className="text-xs text-primary-600 mt-2 font-mono">
                TX: {sortedEvents[currentEventIndex].blockchainHash.slice(0, 10)}...
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}