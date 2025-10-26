import React, { useState } from 'react'
import { 
  Factory, 
  ArrowUpRight, 
  Clock, 
  BarChart2,  
  Package, 
  Search,
  Plus,
  AlertTriangle,
  Boxes,
  Users,
  Activity,
  ChevronDown,
  MapPin
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Processor {
  id: string
  name: string
  location: string
  type: ProcessorType
  specialties: string[]
  capacity: {
    daily: number
    unit: string
  }
  activeOrders: number
  efficiency: number
  nextMaintenance: string
  status: 'operational' | 'maintenance' | 'offline'
  metrics: {
    inputVolume: string
    outputVolume: string
    wastage: string
    qualityScore: number
  }
  equipment: {
    total: number
    operational: number
    maintenance: number
  }
  certifications: string[]
  staff: {
    total: number
    present: number
    shifts: number
  }
  inventory: {
    raw: number
    processed: number
    packaging: number
  }
  maintenanceHistory: {
    date: string
    type: string
    duration: string
    cost: string
  }[]
}

type ProcessorType = 'Milling' | 'Packaging' | 'Cold Storage' | 'Oil Extraction' | 'Spice Processing' | 'Grain Processing'

const processorColors: Record<ProcessorType, { light: string, gradient: string, text: string }> = {
  'Milling': { light: 'from-amber-400 to-amber-600', gradient: 'bg-amber-50', text: 'text-amber-800' },
  'Packaging': { light: 'from-blue-400 to-blue-600', gradient: 'bg-blue-50', text: 'text-blue-800' },
  'Cold Storage': { light: 'from-cyan-400 to-cyan-600', gradient: 'bg-cyan-50', text: 'text-cyan-800' },
  'Oil Extraction': { light: 'from-yellow-400 to-yellow-600', gradient: 'bg-yellow-50', text: 'text-yellow-800' },
  'Spice Processing': { light: 'from-red-400 to-red-600', gradient: 'bg-red-50', text: 'text-red-800' },
  'Grain Processing': { light: 'from-orange-400 to-orange-600', gradient: 'bg-orange-50', text: 'text-orange-800' }
}

const mockProcessors: Processor[] = [
  {
    id: 'PROC001',
    name: 'Green Seed Processing Unit',
    location: 'Nagpur, Maharashtra',
    type: 'Oil Extraction',
    specialties: ['Soybean Oil', 'Groundnut Oil', 'Sunflower Oil'],
    capacity: {
      daily: 500,
      unit: 'tonnes'
    },
    activeOrders: 12,
    efficiency: 94,
    nextMaintenance: '3 days',
    status: 'operational',
    metrics: {
      inputVolume: '450 tonnes',
      outputVolume: '180 tonnes',
      wastage: '2%',
      qualityScore: 98
    },
    equipment: {
      total: 24,
      operational: 22,
      maintenance: 2
    },
    certifications: ['ISO 9001', 'FSSAI', 'HACCP'],
    staff: {
      total: 120,
      present: 112,
      shifts: 3
    },
    inventory: {
      raw: 800,
      processed: 350,
      packaging: 5000
    },
    maintenanceHistory: [
      {
        date: '2025-10-20',
        type: 'Preventive',
        duration: '8 hours',
        cost: '₹45,000'
      }
    ]
  },
  {
    id: 'PROC002',
    name: 'AgriTech Processing Center',
    location: 'Ahmedabad, Gujarat',
    type: 'Grain Processing',
    specialties: ['Wheat', 'Rice', 'Pulses'],
    capacity: {
      daily: 350,
      unit: 'tonnes'
    },
    activeOrders: 8,
    efficiency: 92,
    nextMaintenance: '5 days',
    status: 'operational',
    metrics: {
      inputVolume: '320 tonnes',
      outputVolume: '315 tonnes',
      wastage: '1.5%',
      qualityScore: 96
    },
    equipment: {
      total: 18,
      operational: 17,
      maintenance: 1
    },
    certifications: ['ISO 22000', 'FSSAI'],
    staff: {
      total: 85,
      present: 80,
      shifts: 2
    },
    inventory: {
      raw: 600,
      processed: 280,
      packaging: 3500
    },
    maintenanceHistory: [
      {
        date: '2025-10-15',
        type: 'Scheduled',
        duration: '6 hours',
        cost: '₹35,000'
      }
    ]
  },
  {
    id: 'PROC003',
    name: 'Modern Mills Limited',
    location: 'Indore, Madhya Pradesh',
    type: 'Milling',
    specialties: ['Wheat Flour', 'Rice Flour', 'Corn Flour'],
    capacity: {
      daily: 450,
      unit: 'tonnes'
    },
    activeOrders: 15,
    efficiency: 96,
    nextMaintenance: '1 day',
    status: 'maintenance',
    metrics: {
      inputVolume: '420 tonnes',
      outputVolume: '410 tonnes',
      wastage: '2.5%',
      qualityScore: 94
    },
    equipment: {
      total: 20,
      operational: 18,
      maintenance: 2
    },
    certifications: ['ISO 9001', 'FSSAI', 'GMP'],
    staff: {
      total: 95,
      present: 88,
      shifts: 3
    },
    inventory: {
      raw: 750,
      processed: 320,
      packaging: 4200
    },
    maintenanceHistory: [
      {
        date: '2025-10-22',
        type: 'Emergency',
        duration: '4 hours',
        cost: '₹28,000'
      }
    ]
  },
  {
    id: 'PROC004',
    name: 'Spice World Processing',
    location: 'Kochi, Kerala',
    type: 'Spice Processing',
    specialties: ['Black Pepper', 'Cardamom', 'Turmeric'],
    capacity: {
      daily: 200,
      unit: 'tonnes'
    },
    activeOrders: 18,
    efficiency: 91,
    nextMaintenance: '7 days',
    status: 'operational',
    metrics: {
      inputVolume: '180 tonnes',
      outputVolume: '175 tonnes',
      wastage: '3%',
      qualityScore: 97
    },
    equipment: {
      total: 15,
      operational: 14,
      maintenance: 1
    },
    certifications: ['ISO 22000', 'FSSAI', 'Organic'],
    staff: {
      total: 75,
      present: 70,
      shifts: 2
    },
    inventory: {
      raw: 400,
      processed: 180,
      packaging: 2800
    },
    maintenanceHistory: [
      {
        date: '2025-10-18',
        type: 'Scheduled',
        duration: '5 hours',
        cost: '₹32,000'
      }
    ]
  },
  {
    id: 'PROC005',
    name: 'Fresh Pack Solutions',
    location: 'Pune, Maharashtra',
    type: 'Packaging',
    specialties: ['Vacuum Packing', 'Modified Atmosphere', 'Aseptic'],
    capacity: {
      daily: 300,
      unit: 'tonnes'
    },
    activeOrders: 22,
    efficiency: 95,
    nextMaintenance: '4 days',
    status: 'operational',
    metrics: {
      inputVolume: '290 tonnes',
      outputVolume: '285 tonnes',
      wastage: '1%',
      qualityScore: 99
    },
    equipment: {
      total: 25,
      operational: 24,
      maintenance: 1
    },
    certifications: ['ISO 9001', 'BRC', 'FSSC 22000'],
    staff: {
      total: 110,
      present: 105,
      shifts: 3
    },
    inventory: {
      raw: 500,
      processed: 450,
      packaging: 8000
    },
    maintenanceHistory: [
      {
        date: '2025-10-21',
        type: 'Preventive',
        duration: '6 hours',
        cost: '₹40,000'
      }
    ]
  },
  {
    id: 'PROC006',
    name: 'ColdStar Storage',
    location: 'Chandigarh, Punjab',
    type: 'Cold Storage',
    specialties: ['Fruits', 'Vegetables', 'Dairy'],
    capacity: {
      daily: 400,
      unit: 'tonnes'
    },
    activeOrders: 16,
    efficiency: 93,
    nextMaintenance: '2 days',
    status: 'offline',
    metrics: {
      inputVolume: '380 tonnes',
      outputVolume: '375 tonnes',
      wastage: '1.2%',
      qualityScore: 95
    },
    equipment: {
      total: 30,
      operational: 27,
      maintenance: 3
    },
    certifications: ['ISO 9001', 'FSSAI', 'Cold Chain'],
    staff: {
      total: 65,
      present: 60,
      shifts: 3
    },
    inventory: {
      raw: 900,
      processed: 850,
      packaging: 2000
    },
    maintenanceHistory: [
      {
        date: '2025-10-23',
        type: 'Emergency',
        duration: '12 hours',
        cost: '₹65,000'
      }
    ]
  }
]

export default function Processors() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<ProcessorType | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'operational' | 'maintenance' | 'offline'>('all')
  const [sortField, setSortField] = useState<'name' | 'efficiency' | 'capacity' | 'activeOrders'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedProcessor, setSelectedProcessor] = useState<Processor | null>(null)
  const [currentAction, setCurrentAction] = useState<'monitor' | 'maintenance' | 'inventory' | 'staff' | null>(null)
  const [showAddProcessor, setShowAddProcessor] = useState(false)

  // Filter and sort processors
  const filteredAndSortedProcessors = mockProcessors
    .filter(processor => 
      (searchQuery === '' || 
        processor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        processor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        processor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      ) &&
      (filterType === 'all' || processor.type === filterType) &&
      (filterStatus === 'all' || processor.status === filterStatus)
    )
    .sort((a, b) => {
      let compareValue = 0
      switch (sortField) {
        case 'name':
          compareValue = a.name.localeCompare(b.name)
          break
        case 'efficiency':
          compareValue = a.efficiency - b.efficiency
          break
        case 'capacity':
          compareValue = a.capacity.daily - b.capacity.daily
          break
        case 'activeOrders':
          compareValue = a.activeOrders - b.activeOrders
          break
      }
      return sortOrder === 'asc' ? compareValue : -compareValue
    })

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Processors</h1>
          <p className="text-gray-600 mt-2">Monitor and manage processing units</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddProcessor(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Processor</span>
        </motion.button>
      </div>

      {/* Processors Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Factory className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockProcessors.length}</div>
          <div className="text-sm text-gray-600">Total Units</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockProcessors.reduce((acc: number, p) => acc + p.capacity.daily, 0)}</div>
          <div className="text-sm text-gray-600">Total Capacity (tonnes/day)</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Package className="h-8 w-8 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockProcessors.reduce((acc: number, p) => acc + p.activeOrders, 0)}</div>
          <div className="text-sm text-gray-600">Active Orders</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Activity className="h-8 w-8 text-indigo-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(mockProcessors.reduce((acc: number, p) => acc + p.efficiency, 0) / mockProcessors.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg. Efficiency</div>
        </div>
      </div>

      {/* Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Processor Insights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Highest efficiency: <span className="font-medium">{[...mockProcessors].sort((a, b) => b.efficiency - a.efficiency)[0]?.name || '—'}</span></li>
            <li>Most orders: <span className="font-medium">{[...mockProcessors].sort((a, b) => b.activeOrders - a.activeOrders)[0]?.name || '—'}</span></li>
            <li>Next maintenance: <span className="font-medium">{[...mockProcessors].sort((a, b) => parseInt(a.nextMaintenance) - parseInt(b.nextMaintenance))[0]?.name || '—'}</span></li>
            <li>Quality leader: <span className="font-medium">{[...mockProcessors].sort((a, b) => b.metrics.qualityScore - a.metrics.qualityScore)[0]?.name || '—'}</span></li>
          </ul>
        </div>
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Status Overview</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-green-700">
                {mockProcessors.filter(p => p.status === 'operational').length}
              </div>
              <div className="text-sm text-green-600">Operational</div>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-yellow-700">
                {mockProcessors.filter(p => p.status === 'maintenance').length}
              </div>
              <div className="text-sm text-yellow-600">Maintenance</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-red-700">
                {mockProcessors.filter(p => p.status === 'offline').length}
              </div>
              <div className="text-sm text-red-600">Offline</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-blue-100">
        <div className="p-4 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px] relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search processors by name, location, or specialty..."
                className="block w-full rounded-lg border-0 py-2.5 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/50"
              />
            </div>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${
                showAdvancedFilters
                  ? 'bg-blue-50 border-blue-200 text-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              Filters
            </button>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as 'name' | 'efficiency' | 'capacity' | 'activeOrders')}
              className="rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/50"
            >
              <option value="name">Sort by Name</option>
              <option value="efficiency">Sort by Efficiency</option>
              <option value="capacity">Sort by Capacity</option>
              <option value="activeOrders">Sort by Orders</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <ArrowUpRight className={`h-5 w-5 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processor Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as ProcessorType | 'all')}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/50"
                >
                  <option value="all">All Types</option>
                  {Object.keys(processorColors).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'operational' | 'maintenance' | 'offline')}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/50"
                >
                  <option value="all">All Status</option>
                  <option value="operational">Operational</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="offline">Offline</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Processors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedProcessors.map((processor) => (
          <motion.div
            key={processor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow ${
              processorColors[processor.type].gradient
            } border-${processorColors[processor.type].text}/20`}
          >
            {/* Processor Card Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              processorColors[processor.type].gradient
            } border-${processorColors[processor.type].text}/20`}>
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${
                  processorColors[processor.type].light
                } flex items-center justify-center text-white`}>
                  <Factory className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{processor.name}</h3>
                  <p className="text-xs text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {processor.location}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                processor.status === 'operational'
                  ? 'bg-green-100 text-green-800'
                  : processor.status === 'maintenance'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {processor.status}
              </span>
            </div>

            {/* Key Metrics */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`${processorColors[processor.type].gradient} rounded-lg p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <BarChart2 className={`h-4 w-4 ${processorColors[processor.type].text}`} />
                    <span className={`text-xs ${
                      processor.efficiency >= 95 ? 'text-green-600' : 
                      processor.efficiency >= 90 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {processor.efficiency}%
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {processor.capacity.daily} {processor.capacity.unit}/day
                  </p>
                  <p className="text-xs text-gray-600">Capacity</p>
                </div>
                <div className={`${processorColors[processor.type].gradient} rounded-lg p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <Package className={`h-4 w-4 ${processorColors[processor.type].text}`} />
                    <AlertTriangle className={`h-3 w-3 ${
                      processor.inventory.raw < 100 ? 'text-red-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {processor.activeOrders}
                  </p>
                  <p className="text-xs text-gray-600">Active Orders</p>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-xs font-medium text-gray-900 mb-1.5">Specialties</h4>
                <div className="flex flex-wrap gap-1.5">
                  {processor.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        processorColors[processor.type].gradient
                      } ${processorColors[processor.type].text}`}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className={`${processorColors[processor.type].gradient} rounded-lg p-2 text-center`}>
                  <p className="text-xs text-gray-600">Quality Score</p>
                  <p className="font-semibold text-gray-900">{processor.metrics.qualityScore}%</p>
                </div>
                <div className={`${processorColors[processor.type].gradient} rounded-lg p-2 text-center`}>
                  <p className="text-xs text-gray-600">Staff Present</p>
                  <p className="font-semibold text-gray-900">{processor.staff.present}/{processor.staff.total}</p>
                </div>
                <div className={`${processorColors[processor.type].gradient} rounded-lg p-2 text-center`}>
                  <p className="text-xs text-gray-600">Equipment</p>
                  <p className="font-semibold text-gray-900">{processor.equipment.operational}/{processor.equipment.total}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-1 pt-3 mt-3 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedProcessor(processor)
                    setCurrentAction('monitor')
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${processorColors[processor.type].gradient}`}
                >
                  <Activity className={`h-4 w-4 ${processorColors[processor.type].text}`} />
                  <span className="text-[10px] text-gray-600">Monitor</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedProcessor(processor)
                    setCurrentAction('maintenance')
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${processorColors[processor.type].gradient}`}
                >
                  <Clock className={`h-4 w-4 ${processorColors[processor.type].text}`} />
                  <span className="text-[10px] text-gray-600">Maintenance</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedProcessor(processor)
                    setCurrentAction('inventory')
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${processorColors[processor.type].gradient}`}
                >
                  <Boxes className={`h-4 w-4 ${processorColors[processor.type].text}`} />
                  <span className="text-[10px] text-gray-600">Inventory</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedProcessor(processor)
                    setCurrentAction('staff')
                  }}
                  className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${processorColors[processor.type].gradient}`}
                >
                  <Users className={`h-4 w-4 ${processorColors[processor.type].text}`} />
                  <span className="text-[10px] text-gray-600">Staff</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
