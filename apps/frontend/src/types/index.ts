// Core entity types
export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  organizationId?: string
  createdAt: Date
  updatedAt: Date
}

export type UserRole = 'farmer' | 'fpo' | 'processor' | 'retailer' | 'admin'

export interface Organization {
  id: string
  name: string
  type: OrganizationType
  location: Location
  contactInfo: ContactInfo
  createdAt: Date
  updatedAt: Date
}

export type OrganizationType = 'farm' | 'fpo' | 'processor' | 'retailer' | 'warehouse'

export interface Location {
  latitude: number
  longitude: number
  address: string
  city: string
  state: string
  country: string
  zipCode: string
}

export interface ContactInfo {
  phone: string
  email: string
  website?: string
}

// Farm and crop types
export interface Farm {
  id: string
  name: string
  ownerId: string
  location: Location
  totalArea: number // in hectares
  cropTypes: CropType[]
  ndviData: NDVIData[]
  soilData: SoilData
  createdAt: Date
  updatedAt: Date
}

export interface CropType {
  id: string
  name: string
  variety: string
  plantingDate: Date
  expectedHarvestDate: Date
  area: number // in hectares
  status: CropStatus
}

export type CropStatus = 'planted' | 'growing' | 'ready_harvest' | 'harvested'

export interface NDVIData {
  date: Date
  value: number // 0-1 scale
  healthIndex: number // 0-100
}

export interface SoilData {
  ph: number
  organicMatter: number
  nitrogen: number
  phosphorus: number
  potassium: number
  moisture: number
  lastTested: Date
}

// Storage facility types
export interface StorageUnit {
  id: string
  name: string
  type: StorageType
  location: string
  capacity: StorageCapacity
  environment: EnvironmentMetrics
  alerts: Alert[]
  inventory: StorageInventory[]
  maintenance: MaintenanceInfo
  metrics: OperationalMetrics
  staff: StaffInfo
  equipment: EquipmentStatus
  certifications: string[]
  status: StorageStatus
}

export type StorageType = 'Warehouse' | 'Cold Storage' | 'Silo'
export type StorageStatus = 'operational' | 'maintenance' | 'alert' | 'offline'

export interface StorageCapacity {
  total: number
  unit: string
  occupied: number
  reserved: number
}

export interface EnvironmentMetrics {
  temperature: number
  humidity: number
  co2: number
  airQuality: number
}

export interface Alert {
  type: AlertType
  message: string
  timestamp: string
}

export type AlertType = 'info' | 'warning' | 'critical'

export interface StorageInventory {
  crop: string
  quantity: number
  quality: string
  grade: string
  storageDate: string
  expiryDate: string
  certificates: string[]
}

export interface MaintenanceInfo {
  lastCheck: string
  nextScheduled: string
  status: string
  issues: string[]
  history: MaintenanceRecord[]
}

export interface MaintenanceRecord {
  date: string
  type: string
  description: string
  cost: number
}

export interface OperationalMetrics {
  turnoverRate: number
  utilizationRate: number
  energyEfficiency: number
  qualityScore: number
  costPerUnit: number
}

export interface StaffInfo {
  total: number
  present: number
  shifts: {
    morning: number
    afternoon: number
    night: number
  }
}

export interface EquipmentStatus {
  total: number
  operational: number
  underMaintenance: number
  critical: string[]
}

export interface Sensor {
  id: string
  type: SensorType
  location: string
  value: number
  unit: string
  lastReading: Date
  status: SensorStatus
}

export type SensorType = 'temperature' | 'humidity' | 'moisture' | 'pressure'
export type SensorStatus = 'active' | 'inactive' | 'maintenance'

// Procurement and logistics types
export interface Procurement {
  id: string
  batchId: string
  farmerId: string
  fpoId?: string
  processorId: string
  quantity: number
  price: number
  quality: string
  status: ProcurementStatus
  pickupDate: Date
  deliveryDate?: Date
  route?: Route
  createdAt: Date
  updatedAt: Date
}

export type ProcurementStatus = 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'cancelled'

export interface Route {
  id: string
  startLocation: Location
  endLocation: Location
  waypoints: Location[]
  distance: number // in km
  estimatedDuration: number // in minutes
  status: RouteStatus
  vehicleId?: string
}

export type RouteStatus = 'planned' | 'in_progress' | 'completed' | 'cancelled'

export interface Vehicle {
  id: string
  licensePlate: string
  type: VehicleType
  capacity: number
  currentLocation: Location
  status: VehicleStatus
  driverId: string
  route?: Route
}

export type VehicleType = 'truck' | 'van' | 'tractor'
export type VehicleStatus = 'available' | 'in_transit' | 'maintenance' | 'offline'

// Batch and traceability types
export interface Batch {
  id: string
  batchNumber: string
  cropType: string
  farmerId: string
  farmId: string
  quantity: number
  quality: string
  harvestDate: Date
  status: BatchStatus
  traceabilityEvents: TraceabilityEvent[]
  createdAt: Date
  updatedAt: Date
}

export type BatchStatus = 'harvested' | 'collected' | 'stored' | 'processed' | 'delivered'

export interface TraceabilityEvent {
  id: string
  batchId: string
  eventType: EventType
  actorId: string
  actorType: UserRole
  location: Location
  timestamp: Date
  data: Record<string, any>
  blockchainHash?: string
}

export type EventType = 
  | 'harvest'
  | 'collection'
  | 'storage'
  | 'processing'
  | 'quality_check'
  | 'transport'
  | 'delivery'

// Weather and advisory types
export interface WeatherData {
  id: string
  location: Location
  date: Date
  temperature: {
    min: number
    max: number
    average: number
  }
  humidity: number
  rainfall: number
  windSpeed: number
  windDirection: number
  pressure: number
  uvIndex: number
  conditions: WeatherCondition[]
}

export interface WeatherCondition {
  type: string
  intensity: number
  description: string
}

export interface Advisory {
  id: string
  type: AdvisoryType
  title: string
  description: string
  severity: AdvisorySeverity
  location: Location
  validFrom: Date
  validTo: Date
  recommendations: string[]
  createdAt: Date
}

export type AdvisoryType = 'weather' | 'pest' | 'disease' | 'market' | 'logistics'
export type AdvisorySeverity = 'low' | 'medium' | 'high' | 'critical'

// ML and analytics types
export interface Forecast {
  id: string
  type: ForecastType
  location: Location
  horizon: number // days
  data: ForecastData[]
  accuracy: number
  model: string
  createdAt: Date
}

export type ForecastType = 'yield' | 'price' | 'demand' | 'weather'

export interface ForecastData {
  date: Date
  value: number
  confidence: number
  factors: Record<string, number>
}

export interface Analytics {
  id: string
  type: AnalyticsType
  data: AnalyticsData
  insights: string[]
  recommendations: string[]
  createdAt: Date
}

export type AnalyticsType = 'performance' | 'trend' | 'comparison' | 'optimization'

export interface AnalyticsData {
  metrics: Record<string, number>
  trends: Record<string, number[]>
  comparisons: Record<string, any>
}

// Credit and insurance types
export interface CreditApplication {
  id: string
  applicantId: string
  amount: number
  purpose: string
  status: CreditStatus
  documents: Document[]
  decision?: CreditDecision
  createdAt: Date
  updatedAt: Date
}

export type CreditStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'disbursed'

export interface CreditDecision {
  approved: boolean
  amount?: number
  interestRate?: number
  tenure?: number
  conditions?: string[]
  reason?: string
  decisionDate: Date
}

export interface Document {
  id: string
  type: DocumentType
  url: string
  status: DocumentStatus
  uploadedAt: Date
}

export type DocumentType = 'identity' | 'income' | 'land' | 'crop' | 'insurance'
export type DocumentStatus = 'pending' | 'verified' | 'rejected'

export interface InsurancePolicy {
  id: string
  policyholderId: string
  type: InsuranceType
  coverage: number
  premium: number
  status: InsuranceStatus
  startDate: Date
  endDate: Date
  claims: InsuranceClaim[]
}

export type InsuranceType = 'crop' | 'livestock' | 'equipment' | 'liability'
export type InsuranceStatus = 'active' | 'expired' | 'cancelled'

export interface InsuranceClaim {
  id: string
  policyId: string
  amount: number
  reason: string
  status: ClaimStatus
  documents: Document[]
  decision?: ClaimDecision
  createdAt: Date
}

export type ClaimStatus = 'submitted' | 'under_review' | 'approved' | 'rejected'
export type ClaimDecision = {
  approved: boolean
  amount?: number
  reason?: string
  decisionDate: Date
}

// 3D Visualization types
export interface Map3DConfig {
  center: Location
  zoom: number
  pitch: number
  bearing: number
  style: string
}

export interface Warehouse3D {
  id: string
  position: [number, number, number]
  model: string
  inventory: StorageInventory[]
  sensors: Sensor[]
}

export interface Farm3D {
  id: string
  polygon: number[][]
  height: number
  color: string
  ndviData: NDVIData[]
}

export interface Truck3D {
  id: string
  position: [number, number, number]
  rotation: [number, number, number]
  route: Route
  status: VehicleStatus
}

// BatchData types for traceability
export interface BatchData {
  batchNumber: string
  cropType: string
  farmer: string
  farm: string
  harvestDate: string
  quantity: string
  quality: string
  currentTemperature?: number
  currentHumidity?: number
  qrCode?: string
  events: {
    id: number
    eventType: string
    actor: string
    location: string
    timestamp: string
    status: string
    temperature?: number
    humidity?: number
  }[]
}

// API response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
  organizationName: string
  organizationType: OrganizationType
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

