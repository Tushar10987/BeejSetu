// Sample data simulator for truck movement
import { Vehicle, Location, Route, VehicleStatus } from '../types';

// Constants
const UPDATE_INTERVAL = 1000; // 1 second
const SPEED = 0.0001; // degrees per update
const BASE_COORDINATES = {
  lat: 28.6139, // Delhi
  lng: 77.2090,
};

interface SimulatedTruck extends Vehicle {
  currentRouteIndex: number;
  progress: number;
}

class TruckSimulator {
  private trucks: Map<string, SimulatedTruck> = new Map();
  private subscribers: Set<(updates: SimulatedTruck[]) => void> = new Set();
  private intervalId?: NodeJS.Timeout;

  constructor() {
    // Initialize with some sample trucks
    this.addTruck('TRUCK-001', 'Large Delivery Truck', 10);
    this.addTruck('TRUCK-002', 'Medium Cargo Van', 5);
    this.addTruck('TRUCK-003', 'Refrigerated Truck', 8);
  }

  private addTruck(id: string, type: string, capacity: number) {
    const route: Route = {
      id: `ROUTE-${id}`,
      startLocation: {
        latitude: BASE_COORDINATES.lat,
        longitude: BASE_COORDINATES.lng,
        address: 'Start Location',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
      },
      endLocation: {
        latitude: BASE_COORDINATES.lat + 0.1,
        longitude: BASE_COORDINATES.lng + 0.1,
        address: 'End Location',
        city: 'Delhi',
        state: 'Delhi',
        country: 'India',
        zipCode: '110001',
      },
      waypoints: [
        {
          latitude: BASE_COORDINATES.lat + 0.05,
          longitude: BASE_COORDINATES.lng + 0.02,
          address: 'Waypoint 1',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          zipCode: '110001',
        },
        {
          latitude: BASE_COORDINATES.lat + 0.08,
          longitude: BASE_COORDINATES.lng + 0.07,
          address: 'Waypoint 2',
          city: 'Delhi',
          state: 'Delhi',
          country: 'India',
          zipCode: '110001',
        },
      ],
      distance: 15,
      estimatedDuration: 45,
      status: 'in_progress',
    };

    const truck: SimulatedTruck = {
      id,
      licensePlate: `DL-${Math.floor(Math.random() * 1000)}`,
      type: 'truck',
      capacity,
      currentLocation: route.startLocation,
      status: 'in_transit',
      driverId: `DRIVER-${id}`,
      route,
      currentRouteIndex: 0,
      progress: 0,
    };

    this.trucks.set(id, truck);
  }

  private interpolateLocation(start: Location, end: Location, progress: number): Location {
    return {
      latitude: start.latitude + (end.latitude - start.latitude) * progress,
      longitude: start.longitude + (end.longitude - start.longitude) * progress,
      address: progress < 0.5 ? start.address : end.address,
      city: progress < 0.5 ? start.city : end.city,
      state: progress < 0.5 ? start.state : end.state,
      country: progress < 0.5 ? start.country : end.country,
      zipCode: progress < 0.5 ? start.zipCode : end.zipCode,
    };
  }

  private updateTruckPositions() {
    for (const truck of this.trucks.values()) {
      if (truck.status !== 'in_transit') continue;

      const route = truck.route;
      if (!route) continue;

      // Get current segment points
      const routePoints = [route.startLocation, ...route.waypoints, route.endLocation];
      const start = routePoints[truck.currentRouteIndex];
      const end = routePoints[truck.currentRouteIndex + 1];

      if (!start || !end) continue;

      // Update progress
      truck.progress += SPEED;

      // Move to next segment if current one is complete
      if (truck.progress >= 1) {
        truck.currentRouteIndex++;
        truck.progress = 0;

        // Reset or complete route
        if (truck.currentRouteIndex >= routePoints.length - 1) {
          truck.currentRouteIndex = 0;
          truck.progress = 0;
          truck.currentLocation = route.startLocation;
        }
      } else {
        // Interpolate current position
        truck.currentLocation = this.interpolateLocation(start, end, truck.progress);
      }
    }

    // Notify subscribers
    this.notifySubscribers();
  }

  subscribe(callback: (updates: SimulatedTruck[]) => void) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    const updates = Array.from(this.trucks.values());
    this.subscribers.forEach(callback => callback(updates));
  }

  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.updateTruckPositions(), UPDATE_INTERVAL);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  getTrucks(): SimulatedTruck[] {
    return Array.from(this.trucks.values());
  }
}

// Export singleton instance
export const truckSimulator = new TruckSimulator();

export default truckSimulator;