import React, { useState, useMemo } from 'react'
import LiveDot from '../components/LiveDot'
import { motion } from 'framer-motion'
import Map3DScene from '../components/3d/Map3D'
import { Warehouse3D, Farm3D, Truck3D } from '../types'

export default function Map3D() {
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse3D | null>(null)
  const [selectedFarm, setSelectedFarm] = useState<Farm3D | null>(null)
  const [selectedTruck, setSelectedTruck] = useState<Truck3D | null>(null)

  // Sample data - in real app, this would come from API
  const warehouses = useMemo<Warehouse3D[]>(() => [
    {
      id: '1',
      position: [0, 0, 0],
      model: 'Warehouse A',
      inventory: Array.from({ length: 45 }, (_, i) => ({
        id: `inv-${i}`,
        batchId: `batch-${i}`,
        cropType: 'Soybean',
        quantity: Math.random() * 100,
        quality: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] as any,
        storageDate: new Date(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        source: `Farm ${i}`,
      })),
      sensors: [
        {
          id: 'temp-1',
          type: 'temperature',
          location: 'Main Hall',
          value: 22.5,
          unit: '°C',
          lastReading: new Date(),
          status: 'active',
        },
        {
          id: 'humidity-1',
          type: 'humidity',
          location: 'Main Hall',
          value: 65,
          unit: '%',
          lastReading: new Date(),
          status: 'active',
        },
      ],
    },
    {
      id: '2',
      position: [50, 0, 30],
      model: 'Warehouse B',
      inventory: Array.from({ length: 32 }, (_, i) => ({
        id: `inv-${i}`,
        batchId: `batch-${i}`,
        cropType: 'Sunflower',
        quantity: Math.random() * 80,
        quality: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)] as any,
        storageDate: new Date(),
        expiryDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        source: `Farm ${i}`,
      })),
      sensors: [
        {
          id: 'temp-2',
          type: 'temperature',
          location: 'Storage Room',
          value: 24.2,
          unit: '°C',
          lastReading: new Date(),
          status: 'active',
        },
      ],
    },
  ], [])

  const farms = useMemo<Farm3D[]>(() => [
    {
      id: 'farm-1',
      polygon: [
        [-20, -20],
        [20, -20],
        [20, 20],
        [-20, 20],
      ],
      height: 15,
      color: '#10b981',
      ndviData: [
        { date: new Date(), value: 0.75, healthIndex: 85 },
        { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), value: 0.72, healthIndex: 82 },
        { date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), value: 0.68, healthIndex: 78 },
      ],
    },
    {
      id: 'farm-2',
      polygon: [
        [30, -30],
        [70, -30],
        [70, 10],
        [30, 10],
      ],
      height: 12,
      color: '#f59e0b',
      ndviData: [
        { date: new Date(), value: 0.45, healthIndex: 65 },
        { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), value: 0.48, healthIndex: 68 },
      ],
    },
    // Added visible 3D farm
    {
      id: 'farm-3d',
      polygon: [
        [80, 0],
        [120, 0],
        [120, 40],
        [80, 40],
      ],
      height: 18,
      color: '#22d3ee',
      ndviData: [
        { date: new Date(), value: 0.62, healthIndex: 77 },
        { date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), value: 0.59, healthIndex: 74 },
      ],
    },
  ], [])

  const trucks = useMemo<Truck3D[]>(() => [
    {
      id: 'truck-1',
      position: [10, 0, 10],
      rotation: [0, 0, 0],
      route: {
        id: 'route-1',
        startLocation: { latitude: 0, longitude: 0, address: 'Start', city: 'City', state: 'State', country: 'Country', zipCode: '12345' },
        endLocation: { latitude: 0.3, longitude: 0.3, address: 'End', city: 'City', state: 'State', country: 'Country', zipCode: '12345' },
        waypoints: [
          { latitude: 0.1, longitude: 0.1, address: 'Waypoint 1', city: 'City', state: 'State', country: 'Country', zipCode: '12345' },
          { latitude: 0.2, longitude: 0.2, address: 'Waypoint 2', city: 'City', state: 'State', country: 'Country', zipCode: '12345' },
        ],
        distance: 42.5,
        estimatedDuration: 120,
        status: 'in_progress',
      },
      status: 'in_transit',
    },
  ], [])

  const handleWarehouseClick = (warehouse: Warehouse3D) => {
    setSelectedWarehouse(warehouse)
    setSelectedFarm(null)
    setSelectedTruck(null)
  }

  const handleFarmClick = (farm: Farm3D) => {
    setSelectedFarm(farm)
    setSelectedWarehouse(null)
    setSelectedTruck(null)
  }

  const handleTruckClick = (truck: Truck3D) => {
    setSelectedTruck(truck)
    setSelectedWarehouse(null)
    setSelectedFarm(null)
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-br from-violet-100 via-white to-blue-100">
      {/* Header */}
      <div className="bg-white/80 shadow-sm border-b border-violet-200 p-4 backdrop-blur-xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 drop-shadow-md flex items-center gap-2">
            3D Interactive Map
            <LiveDot size={12} />
            <span className="text-xs font-semibold text-red-600 ml-1">LIVE</span>
          </h1>
          <p className="text-gray-600 mt-1">Explore warehouses, farms, and logistics in real-time</p>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Map */}
        <div className="flex-1 relative min-h-[70vh] h-[80vh] bg-white/60 rounded-3xl shadow-2xl m-6 border border-violet-200 backdrop-blur-xl">
          <Map3DScene
            warehouses={warehouses}
            farms={farms}
            trucks={trucks}
            onWarehouseClick={handleWarehouseClick}
            onFarmClick={handleFarmClick}
            onTruckClick={handleTruckClick}
          />
        </div>

        {/* Side Panel */}
        <div className="w-80 bg-white/90 shadow-2xl border-l border-violet-200 overflow-y-auto m-6 rounded-2xl backdrop-blur-xl">
          {selectedWarehouse && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedWarehouse.model}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Inventory</h3>
                  <p className="text-2xl font-bold text-primary-600">
                    {selectedWarehouse.inventory.length} items
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Sensors</h3>
                  <div className="space-y-2">
                    {selectedWarehouse.sensors.map((sensor) => (
                      <div key={sensor.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-600">{sensor.type}</span>
                        <span className="text-sm font-medium">
                          {sensor.value} {sensor.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedFarm && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Farm {selectedFarm.id}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">NDVI Health</h3>
                  {selectedFarm.ndviData.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Current</span>
                        <span className="text-sm font-medium">
                          {(selectedFarm.ndviData[0].value * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Health Index</span>
                        <span className="text-sm font-medium">
                          {selectedFarm.ndviData[0].healthIndex}/100
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Trends</h3>
                  <div className="space-y-1">
                    {selectedFarm.ndviData.slice(0, 3).map((data, index) => (
                      <div key={index} className="flex justify-between text-xs text-gray-500">
                        <span>{data.date.toLocaleDateString()}</span>
                        <span>{(data.value * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTruck && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Truck {selectedTruck.id}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    selectedTruck.status === 'in_transit' ? 'bg-green-100 text-green-800' :
                    selectedTruck.status === 'available' ? 'bg-blue-100 text-blue-800' :
                    selectedTruck.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedTruck.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Route Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance</span>
                      <span className="font-medium">{selectedTruck.route.distance} km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">{selectedTruck.route.estimatedDuration} min</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {!selectedWarehouse && !selectedFarm && !selectedTruck && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Interactive 3D Map
              </h2>
              <p className="text-gray-600 mb-4">
                Click on any warehouse, farm, or truck to view detailed information.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-600">Warehouses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Farms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-4 w-4 bg-gray-500 rounded"></div>
                  <span className="text-sm text-gray-600">Trucks</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

