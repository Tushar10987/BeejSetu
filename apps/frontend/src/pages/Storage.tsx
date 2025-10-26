import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Building2,
  ChevronRight,
  CircleDollarSign,
  CloudSun,
  Cog,
  Droplets,
  Factory,
  FileText,
  FlaskConical,
  Forklift,
  Gauge,
  Leaf,
  ListChecks,
  MapPin,
  Package,
  PackageSearch,
  Plus,
  Search,
  Settings2,
  Shield,
  ShieldCheck,
  Thermometer,
  Truck,
  Users,
  Warehouse,
  Wind
} from 'lucide-react'

type StorageType = 'Warehouse' | 'Cold Storage' | 'Silo' | 'Processing Unit' | 'Distribution Center' | 'Grain Storage'

interface StorageUnit {
  id: string
  name: string
  type: StorageType
  location: string
  capacity: {
    total: number
    unit: string
    occupied: number
    reserved: number
  }
  environment: {
    temperature: number
    humidity: number
    co2: number
    airQuality: number
  }
  alerts: {
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }[]
  inventory: {
    crop: string
    quantity: number
    quality: string
    grade: string
    storageDate: string
    expiryDate: string
    certificates: string[]
  }[]
  maintenance: {
    lastCheck: string
    nextScheduled: string
    status: string
    issues: string[]
    history: {
      date: string
      type: string
      description: string
      cost: number
    }[]
  }
  metrics: {
    turnoverRate: number
    utilizationRate: number
    energyEfficiency: number
    qualityScore: number
    costPerUnit: number
  }
  staff: {
    total: number
    present: number
    shifts: {
      morning: number
      afternoon: number
      night: number
    }
  }
  equipment: {
    total: number
    operational: number
    underMaintenance: number
    critical: string[]
  }
  certifications: string[]
  status: 'operational' | 'maintenance' | 'alert' | 'offline'
}

const storageColors: Record<StorageType, { light: string, gradient: string, text: string }> = {
  'Warehouse': { light: 'from-blue-400 to-blue-600', gradient: 'bg-blue-50', text: 'text-blue-800' },
  'Cold Storage': { light: 'from-cyan-400 to-cyan-600', gradient: 'bg-cyan-50', text: 'text-cyan-800' },
  'Silo': { light: 'from-amber-400 to-amber-600', gradient: 'bg-amber-50', text: 'text-amber-800' },
  'Processing Unit': { light: 'from-emerald-400 to-emerald-600', gradient: 'bg-emerald-50', text: 'text-emerald-800' },
  'Distribution Center': { light: 'from-purple-400 to-purple-600', gradient: 'bg-purple-50', text: 'text-purple-800' },
  'Grain Storage': { light: 'from-orange-400 to-orange-600', gradient: 'bg-orange-50', text: 'text-orange-800' }
}

export default function Storage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'operational' | 'maintenance' | 'alert'>('all')
  const [showAddStorage, setShowAddStorage] = useState(false)

  // Mock storage data
  const storageUnits: StorageUnit[] = [
    {
      id: 'WH001',
      name: 'Central Warehouse A',
      type: 'Warehouse',
      location: 'Nagpur, Maharashtra',
      capacity: {
        total: 10000,
        unit: 'tons',
        occupied: 7500,
        reserved: 1000
      },
      environment: {
        temperature: 24.5,
        humidity: 65,
        co2: 420,
        airQuality: 92
      },
      alerts: [
        {
          type: 'warning',
          message: 'Temperature above threshold',
          timestamp: '2025-10-26T08:30:00Z'
        },
        {
          type: 'info',
          message: 'Scheduled maintenance tomorrow',
          timestamp: '2025-10-26T09:15:00Z'
        }
      ],
      inventory: [
        {
          crop: 'Soybean',
          quantity: 5000,
          quality: 'Premium',
          grade: 'A',
          storageDate: '2025-10-01',
          expiryDate: '2026-04-01',
          certificates: ['Organic', 'Non-GMO']
        },
        {
          crop: 'Wheat',
          quantity: 2500,
          quality: 'Standard',
          grade: 'B',
          storageDate: '2025-10-15',
          expiryDate: '2026-03-15',
          certificates: ['FSSAI']
        }
      ],
      maintenance: {
        lastCheck: '2025-10-20',
        nextScheduled: '2025-11-20',
        status: 'Good',
        issues: [],
        history: [
          {
            date: '2025-10-20',
            type: 'Preventive',
            description: 'Regular maintenance check',
            cost: 25000
          }
        ]
      },
      metrics: {
        turnoverRate: 15,
        utilizationRate: 85,
        energyEfficiency: 92,
        qualityScore: 95,
        costPerUnit: 12.5
      },
      staff: {
        total: 45,
        present: 42,
        shifts: {
          morning: 18,
          afternoon: 15,
          night: 12
        }
      },
      equipment: {
        total: 24,
        operational: 22,
        underMaintenance: 2,
        critical: ['Ventilation System', 'Temperature Sensors']
      },
      certifications: ['ISO 9001', 'FSSAI', 'Warehouse Safety'],
      status: 'operational'
    },
    {
      id: 'CS001',
      name: 'FreshCold Storage',
      type: 'Cold Storage',
      location: 'Amravati, Maharashtra',
      capacity: {
        total: 5000,
        unit: 'tons',
        occupied: 3200,
        reserved: 800
      },
      environment: {
        temperature: -2.5,
        humidity: 70,
        co2: 380,
        airQuality: 95
      },
      alerts: [],
      inventory: [
        {
          crop: 'Apples',
          quantity: 1500,
          quality: 'Premium',
          grade: 'A',
          storageDate: '2025-10-10',
          expiryDate: '2026-02-10',
          certificates: ['Fresh Chain Certified']
        },
        {
          crop: 'Potatoes',
          quantity: 1700,
          quality: 'Standard',
          grade: 'A',
          storageDate: '2025-10-05',
          expiryDate: '2026-01-05',
          certificates: ['Cold Chain Verified']
        }
      ],
      maintenance: {
        lastCheck: '2025-10-15',
        nextScheduled: '2025-11-15',
        status: 'Excellent',
        issues: [],
        history: [
          {
            date: '2025-10-15',
            type: 'Comprehensive',
            description: 'Cooling system inspection',
            cost: 35000
          }
        ]
      },
      metrics: {
        turnoverRate: 12,
        utilizationRate: 80,
        energyEfficiency: 88,
        qualityScore: 97,
        costPerUnit: 18.5
      },
      staff: {
        total: 35,
        present: 32,
        shifts: {
          morning: 12,
          afternoon: 12,
          night: 11
        }
      },
      equipment: {
        total: 18,
        operational: 17,
        underMaintenance: 1,
        critical: ['Cooling System']
      },
      certifications: ['ISO 22000', 'Cold Chain Certified', 'Energy Star'],
      status: 'operational'
    },
    {
      id: 'SL001',
      name: 'Grain Silo Complex',
      type: 'Silo',
      location: 'Wardha, Maharashtra',
      capacity: {
        total: 15000,
        unit: 'tons',
        occupied: 11000,
        reserved: 2000
      },
      environment: {
        temperature: 22.0,
        humidity: 45,
        co2: 400,
        airQuality: 90
      },
      alerts: [
        {
          type: 'critical',
          message: 'Moisture level critical in Silo 3',
          timestamp: '2025-10-26T10:00:00Z'
        }
      ],
      inventory: [
        {
          crop: 'Rice',
          quantity: 6000,
          quality: 'Premium',
          grade: 'A+',
          storageDate: '2025-09-15',
          expiryDate: '2026-03-15',
          certificates: ['Premium Grade']
        },
        {
          crop: 'Maize',
          quantity: 5000,
          quality: 'Standard',
          grade: 'A',
          storageDate: '2025-09-20',
          expiryDate: '2026-03-20',
          certificates: ['Quality Assured']
        }
      ],
      maintenance: {
        lastCheck: '2025-10-01',
        nextScheduled: '2025-11-01',
        status: 'Needs Attention',
        issues: ['Moisture sensor calibration required'],
        history: [
          {
            date: '2025-10-01',
            type: 'Regular',
            description: 'Aeration system check',
            cost: 45000
          }
        ]
      },
      metrics: {
        turnoverRate: 18,
        utilizationRate: 87,
        energyEfficiency: 94,
        qualityScore: 93,
        costPerUnit: 8.5
      },
      staff: {
        total: 25,
        present: 23,
        shifts: {
          morning: 10,
          afternoon: 8,
          night: 7
        }
      },
      equipment: {
        total: 15,
        operational: 13,
        underMaintenance: 2,
        critical: ['Aeration System']
      },
      certifications: ['ISO 9001', 'Grain Storage Safety'],
      status: 'alert'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800'
      case 'alert':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Storage Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Capacity & Utilization */}
        <div className="bg-white/70 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Warehouse className="h-8 w-8 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-2">Storage Overview</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{storageUnits.length}</div>
              <div className="text-sm text-gray-600">Total Units</div>
            </div>
          </div>
          <div className="space-y-2">
            {Object.entries(
              storageUnits.reduce((acc, unit) => {
                acc[unit.type] = (acc[unit.type] || 0) + 1
                return acc
              }, {} as Record<string, number>)
            ).map(([type, count]) => (
              <div key={type} className="flex justify-between text-sm">
                <span className="text-gray-600">{type}</span>
                <span className="font-medium text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory & Capacity */}
        <div className="bg-white/70 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Package className="h-8 w-8 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-2">Total Capacity</h3>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {storageUnits.reduce((acc, unit) => acc + unit.capacity.total, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">tons</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Occupied</span>
              <span className="font-medium text-gray-900">
                {storageUnits.reduce((acc, unit) => acc + unit.capacity.occupied, 0).toLocaleString()} tons
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Reserved</span>
              <span className="font-medium text-gray-900">
                {storageUnits.reduce((acc, unit) => acc + unit.capacity.reserved, 0).toLocaleString()} tons
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Available</span>
              <span className="font-medium text-gray-900">
                {storageUnits
                  .reduce(
                    (acc, unit) =>
                      acc + (unit.capacity.total - unit.capacity.occupied - unit.capacity.reserved),
                    0
                  )
                  .toLocaleString()} tons
              </span>
            </div>
          </div>
        </div>

        {/* Environmental Monitoring */}
        <div className="bg-white/70 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Gauge className="h-8 w-8 text-emerald-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-2">Environment</h3>
            </div>
            {storageUnits.some(unit => 
              unit.environment.temperature > 25 || 
              unit.environment.humidity > 70 || 
              unit.environment.co2 > 1000 || 
              unit.environment.airQuality < 70
            ) && (
              <AlertTriangle className="h-6 w-6 text-amber-500" />
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg. Temperature</span>
              <span className="font-medium text-gray-900">
                {(storageUnits.reduce((acc, unit) => acc + unit.environment.temperature, 0) / (storageUnits.length || 1)).toFixed(1)}°C
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg. Humidity</span>
              <span className="font-medium text-gray-900">
                {(storageUnits.reduce((acc, unit) => acc + unit.environment.humidity, 0) / (storageUnits.length || 1)).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Air Quality</span>
              <span className="font-medium text-gray-900">
                {(storageUnits.reduce((acc, unit) => acc + unit.environment.airQuality, 0) / (storageUnits.length || 1)).toFixed(0)}/100
              </span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white/70 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Activity className="h-8 w-8 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 mt-2">Performance</h3>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg. Utilization</span>
              <span className="font-medium text-gray-900">
                {(storageUnits.reduce((acc, unit) => acc + unit.metrics.utilizationRate, 0) / (storageUnits.length || 1)).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Energy Efficiency</span>
              <span className="font-medium text-gray-900">
                {(storageUnits.reduce((acc, unit) => acc + unit.metrics.energyEfficiency, 0) / (storageUnits.length || 1)).toFixed(0)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Quality Score</span>
              <span className="font-medium text-gray-900">
                {(storageUnits.reduce((acc, unit) => acc + unit.metrics.qualityScore, 0) / (storageUnits.length || 1)).toFixed(0)}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Storage Analytics</h2>
            <BarChart2 className="h-5 w-5 text-cyan-600" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Top Performers</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-gray-600">Best Quality Score</span>
                  <div className="font-medium text-gray-900 flex items-center justify-between">
                    {storageUnits.sort((a, b) => b.metrics.qualityScore - a.metrics.qualityScore)[0]?.name || '—'}
                    <span className="text-emerald-600">
                      {storageUnits[0]?.metrics.qualityScore}/100
                    </span>
                  </div>
                </li>
                <li>
                  <span className="text-gray-600">Highest Energy Efficiency</span>
                  <div className="font-medium text-gray-900 flex items-center justify-between">
                    {storageUnits.sort((a, b) => b.metrics.energyEfficiency - a.metrics.energyEfficiency)[0]?.name || '—'}
                    <span className="text-emerald-600">
                      {storageUnits[0]?.metrics.energyEfficiency}%
                    </span>
                  </div>
                </li>
                <li>
                  <span className="text-gray-600">Best Utilization</span>
                  <div className="font-medium text-gray-900 flex items-center justify-between">
                    {storageUnits.sort((a, b) => b.metrics.utilizationRate - a.metrics.utilizationRate)[0]?.name || '—'}
                    <span className="text-emerald-600">
                      {storageUnits[0]?.metrics.utilizationRate}%
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Attention Required</h3>
              <ul className="space-y-2 text-sm">
                {storageUnits.filter(unit => unit.alerts.some(a => a.type === 'critical')).map(unit => (
                  <li key={unit.id}>
                    <span className="text-gray-600">{unit.name}</span>
                    <div className="font-medium text-red-600">
                      {unit.alerts.find(a => a.type === 'critical')?.message}
                    </div>
                  </li>
                ))}
                {storageUnits.filter(unit => unit.equipment.critical.length > 0).map(unit => (
                  <li key={unit.id}>
                    <span className="text-gray-600">{unit.name}</span>
                    <div className="font-medium text-amber-600">
                      Critical: {unit.equipment.critical[0]}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white/60 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recommendations</h2>
            <ListChecks className="h-5 w-5 text-cyan-600" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Maintenance</h3>
              <ul className="space-y-2">
                {storageUnits
                  .filter(unit => unit.maintenance.status !== 'Good' && unit.maintenance.status !== 'Excellent')
                  .slice(0, 2)
                  .map(unit => (
                    <li key={unit.id} className="text-sm">
                      <span className="text-gray-600">{unit.name}</span>
                      <div className="font-medium text-amber-600">{unit.maintenance.status}</div>
                      {unit.maintenance.issues.map((issue, i) => (
                        <div key={i} className="text-xs text-gray-600">{issue}</div>
                      ))}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Optimization</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {storageUnits.some(unit => unit.metrics.utilizationRate < 70) && (
                  <li>Improve utilization in low-usage units</li>
                )}
                {storageUnits.some(unit => unit.metrics.energyEfficiency < 85) && (
                  <li>Energy efficiency improvements needed</li>
                )}
                {storageUnits.some(unit => unit.environment.airQuality < 85) && (
                  <li>Air quality maintenance recommended</li>
                )}
                {storageUnits.some(unit => unit.staff.present < unit.staff.total * 0.9) && (
                  <li>Staff attendance needs attention</li>
                )}
                {storageUnits.some(unit => unit.equipment.underMaintenance > 1) && (
                  <li>Equipment maintenance backlog</li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Scheduled Maintenance</h3>
            <div className="space-y-2">
              {storageUnits
                .filter(unit => new Date(unit.maintenance.nextScheduled).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000)
                .map(unit => (
                  <div key={unit.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{unit.name}</span>
                    <span className="text-cyan-600">
                      {new Date(unit.maintenance.nextScheduled).toLocaleDateString()}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Storage Management</h1>
          <p className="text-gray-600 mt-2">Warehouse and inventory management</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddStorage(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Storage</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-cyan-100 dark:border-cyan-800">
        <div className="p-4 space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search storage units by name or location..."
                className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500 bg-white/50"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'operational' | 'maintenance' | 'alert')}
              className="rounded-lg border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500 bg-white/50"
            >
              <option value="all">All Status</option>
              <option value="operational">Operational</option>
              <option value="maintenance">Maintenance</option>
              <option value="alert">Alert</option>
            </select>
          </div>
        </div>
      </div>

      {/* Storage Units Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {storageUnits.map((unit) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-cyan-100 dark:border-cyan-800 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-cyan-50/50 border-b border-cyan-100 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                  <Warehouse className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{unit.name}</h3>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {unit.location}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(unit.status)}`}>
                {unit.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Alerts */}
              {unit.alerts.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Active Alerts</h4>
                  <div className="space-y-2">
                    {unit.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg flex items-center justify-between ${
                          alert.type === 'critical'
                            ? 'bg-red-50 text-red-700'
                            : alert.type === 'warning'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-sm">{alert.message}</span>
                        </div>
                        <span className="text-xs opacity-75">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Environmental Monitoring */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Environmental Monitoring</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Thermometer className="h-5 w-5 text-cyan-600" />
                      {unit.environment.temperature > 25 && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {unit.environment.temperature}°C
                    </p>
                    <p className="text-xs text-gray-600">Temperature</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Droplets className="h-5 w-5 text-cyan-600" />
                      {unit.environment.humidity > 70 && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {unit.environment.humidity}%
                    </p>
                    <p className="text-xs text-gray-600">Humidity</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-cyan-600 text-sm">CO₂</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {unit.environment.co2}ppm
                    </p>
                    <p className="text-xs text-gray-600">Carbon Dioxide</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-cyan-600 text-sm">AQI</span>
                    </div>
                    <p className="text-xl font-semibold text-gray-900">
                      {unit.environment.airQuality}
                    </p>
                    <p className="text-xs text-gray-600">Air Quality</p>
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Storage Capacity</h4>
                <div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-4 text-xs flex rounded-full bg-gray-100">
                      <div
                        style={{ width: `${(unit.capacity.occupied / unit.capacity.total) * 100}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-cyan-400 to-blue-500"
                      />
                      <div
                        style={{
                          width: `${(unit.capacity.reserved / unit.capacity.total) * 100}%`,
                          marginLeft: '-2px'
                        }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-amber-400 to-amber-500 opacity-50"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mt-2 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Occupied:</span>{' '}
                      {unit.capacity.occupied} {unit.capacity.unit}
                    </div>
                    <div>
                      <span className="font-medium">Reserved:</span>{' '}
                      {unit.capacity.reserved} {unit.capacity.unit}
                    </div>
                    <div className="text-right">
                      <span className="font-medium">Total:</span>{' '}
                      {unit.capacity.total} {unit.capacity.unit}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Performance Metrics</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="bg-cyan-50 rounded-lg p-3">
                    <p className="text-lg font-semibold text-gray-900">
                      {unit.metrics.utilizationRate}%
                    </p>
                    <p className="text-xs text-gray-600">Utilization Rate</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-3">
                    <p className="text-lg font-semibold text-gray-900">
                      {unit.metrics.energyEfficiency}%
                    </p>
                    <p className="text-xs text-gray-600">Energy Efficiency</p>
                  </div>
                  <div className="bg-cyan-50 rounded-lg p-3">
                    <p className="text-lg font-semibold text-gray-900">
                      {unit.metrics.qualityScore}/100
                    </p>
                    <p className="text-xs text-gray-600">Quality Score</p>
                  </div>
                </div>
              </div>

              {/* Inventory */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Current Inventory</h4>
                  <span className="text-xs text-cyan-600">{unit.inventory.length} items</span>
                </div>
                <div className="space-y-2">
                  {unit.inventory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-cyan-50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.crop}
                          <span className="ml-2 text-xs text-cyan-600">Grade {item.grade}</span>
                        </p>
                        <div className="flex space-x-2 mt-1">
                          {item.certificates.map((cert, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 text-cyan-800"
                            >
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {item.quantity} {unit.capacity.unit}
                        </p>
                        <p className="text-xs text-gray-500">
                          Stored: {new Date(item.storageDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Staff Overview</h4>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Present</span>
                      <span className="text-sm font-medium text-gray-900">
                        {unit.staff.present}/{unit.staff.total}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Morning</span>
                        <span>{unit.staff.shifts.morning}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Afternoon</span>
                        <span>{unit.staff.shifts.afternoon}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Night</span>
                        <span>{unit.staff.shifts.night}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900">Equipment Status</h4>
                  <div className="bg-cyan-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-600">Operational</span>
                      <span className="text-sm font-medium text-gray-900">
                        {unit.equipment.operational}/{unit.equipment.total}
                      </span>
                    </div>
                    {unit.equipment.critical.length > 0 && (
                      <div className="mt-2">
                        <span className="text-xs font-medium text-gray-700">Critical Systems:</span>
                        <div className="mt-1 space-y-1">
                          {unit.equipment.critical.map((sys, i) => (
                            <div key={i} className="text-xs text-red-600 flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              {sys}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Certifications */}
              {unit.certifications.length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {unit.certifications.map((cert, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {storageUnits.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center"
        >
          <Warehouse className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Storage Units Found</h3>
          <p className="text-gray-600 mb-6">Start by adding your first storage unit</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddStorage(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add Storage Unit</span>
          </motion.button>
        </motion.div>
      )}

      {/* Add Storage Modal */}
      <AnimatePresence>
        {showAddStorage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddStorage(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-cyan-50 border-b border-cyan-100">
                <h2 className="text-xl font-semibold text-gray-900">Add Storage Unit</h2>
                <p className="text-sm text-gray-600 mt-1">Enter storage unit details</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Storage Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g., Central Warehouse A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g., Nagpur, Maharashtra"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Storage Capacity</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                      placeholder="e.g., 10,000 tons"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500">
                      <option value="warehouse">Warehouse</option>
                      <option value="silo">Silo</option>
                      <option value="coldStorage">Cold Storage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Environmental Controls
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600">Temperature Range (°C)</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600">Humidity Range (%)</label>
                      <div className="flex space-x-2">
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-cyan-500"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddStorage(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddStorage(false)}
                  className="px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 rounded-lg"
                >
                  Add Storage Unit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

