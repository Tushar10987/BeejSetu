import type { Meta, StoryObj } from '@storybook/react';
import Map3DScene from '.';

const meta = {
  title: '3D/Map3D',
  component: Map3DScene,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Map3DScene>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleWarehouses = [
  {
    id: 'WH-001',
    model: 'Large Warehouse',
    position: [0, 0, 0] as [number, number, number],
    inventory: [
      {
        id: 'INV-001',
        batchId: 'BATCH-001',
        cropType: 'Soybean',
        quantity: 1000,
        quality: 'A',
        storageDate: new Date(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        source: 'Farm A',
      },
    ],
    sensors: [
      {
        id: 'SENSOR-001',
        type: 'temperature',
        location: 'Storage Area 1',
        value: 25,
        unit: '°C',
        lastReading: new Date(),
        status: 'active',
      },
      {
        id: 'SENSOR-002',
        type: 'humidity',
        location: 'Storage Area 1',
        value: 45,
        unit: '%',
        lastReading: new Date(),
        status: 'active',
      },
    ],
  },
  {
    id: 'WH-002',
    model: 'Medium Warehouse',
    position: [30, 0, 30] as [number, number, number],
    inventory: [
      {
        id: 'INV-002',
        batchId: 'BATCH-002',
        cropType: 'Sunflower',
        quantity: 500,
        quality: 'B',
        storageDate: new Date(),
        expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        source: 'Farm B',
      },
    ],
    sensors: [
      {
        id: 'SENSOR-003',
        type: 'temperature',
        location: 'Storage Area 1',
        value: 24,
        unit: '°C',
        lastReading: new Date(),
        status: 'active',
      },
    ],
  },
];

const sampleFarms = [
  {
    id: 'FARM-001',
    polygon: [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
    ],
    height: 5,
    color: '#10b981',
    ndviData: [
      {
        date: new Date(),
        value: 0.8,
        healthIndex: 85,
      },
    ],
  },
  {
    id: 'FARM-002',
    polygon: [
      [15, 15],
      [25, 15],
      [25, 25],
      [15, 25],
    ],
    height: 3,
    color: '#f59e0b',
    ndviData: [
      {
        date: new Date(),
        value: 0.6,
        healthIndex: 65,
      },
    ],
  },
];

const sampleTrucks = [
  {
    id: 'TRUCK-001',
    position: [5, 0, 5] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    route: {
      id: 'ROUTE-001',
      startLocation: {
        latitude: 28.6139,
        longitude: 77.2090,
        address: 'Start Location',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
      },
      endLocation: {
        latitude: 28.7139,
        longitude: 77.3090,
        address: 'End Location',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
      },
      waypoints: [
        {
          latitude: 28.6639,
          longitude: 77.2590,
          address: 'Waypoint 1',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          zipCode: '110001',
        },
      ],
      distance: 15,
      estimatedDuration: 45,
      status: 'in_progress',
    },
    status: 'in_transit',
  },
];

export const Primary: Story = {
  args: {
    config: {
      center: { latitude: 28.6139, longitude: 77.2090 },
      zoom: 12,
      pitch: 60,
      bearing: 0,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
    },
    warehouses: sampleWarehouses,
    farms: sampleFarms,
    trucks: sampleTrucks,
  },
};

export const EmptyState: Story = {
  args: {
    config: {
      center: { latitude: 28.6139, longitude: 77.2090 },
      zoom: 12,
      pitch: 60,
      bearing: 0,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
    },
    warehouses: [],
    farms: [],
    trucks: [],
  },
};

export const LoadingState: Story = {
  parameters: {
    mockData: [
      {
        url: '/api/map/data',
        method: 'GET',
        status: 200,
        delay: 2000,
        response: {
          warehouses: sampleWarehouses,
          farms: sampleFarms,
          trucks: sampleTrucks,
        },
      },
    ],
  },
  args: Primary.args,
};

export const HighPerformance: Story = {
  args: {
    ...Primary.args,
    performanceMode: 'high',
  },
};

export const LowPerformance: Story = {
  args: {
    ...Primary.args,
    performanceMode: 'low',
  },
};