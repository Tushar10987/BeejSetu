import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Search,
  Plus,
  Users,
  TrendingUp,
  Package,
  Calendar,
  Settings,
  ChevronDown,
  Map,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  BarChart3,
  PieChart,
  BadgeDollarSign,
} from 'lucide-react'

interface FPO {
  id: string
  name: string
  location: string
  memberCount: number
  cropTypes: string[]
  totalRevenue: string
  growthRate: number
  establishedDate: string
  certifications: string[]
  status: 'active' | 'pending' | 'inactive'
  metrics: {
    procurementVolume: string
    activeMembers: number
    avgYield: string
    marketAccess: number
  }
}

type SortField = 'name' | 'memberCount' | 'totalRevenue' | 'growthRate' | 'marketAccess'
type SortOrder = 'asc' | 'desc'

// Mock FPO data
const mockFPOs: FPO[] = [
  {
    id: 'FPO001',
    name: 'Vidarbha Farmers Collective',
    location: 'Nagpur, Maharashtra',
    memberCount: 500,
    cropTypes: ['Soybean', 'Cotton', 'Pulses'],
    totalRevenue: '₹2.5 Cr',
    growthRate: 15,
    establishedDate: '2022-06-15',
    certifications: ['Organic', 'Fair Trade'],
    status: 'active',
    metrics: {
      procurementVolume: '1000 tons',
      activeMembers: 450,
      avgYield: '2.5 tons/acre',
      marketAccess: 85,
    },
  },
  {
    id: 'FPO002',
    name: 'Punjab Agri Producers',
    location: 'Ludhiana, Punjab',
    memberCount: 750,
    cropTypes: ['Wheat', 'Rice', 'Vegetables'],
    totalRevenue: '₹3.8 Cr',
    growthRate: 22,
    establishedDate: '2021-03-10',
    certifications: ['GMP', 'ISO 9001'],
    status: 'active',
    metrics: {
      procurementVolume: '1500 tons',
      activeMembers: 680,
      avgYield: '3.2 tons/acre',
      marketAccess: 92,
    },
  },
  {
    id: 'FPO003',
    name: 'Kerala Spice Growers',
    location: 'Kochi, Kerala',
    memberCount: 320,
    cropTypes: ['Spices', 'Fruits'],
    totalRevenue: '₹1.8 Cr',
    growthRate: -5,
    establishedDate: '2023-01-20',
    certifications: ['Organic'],
    status: 'pending',
    metrics: {
      procurementVolume: '450 tons',
      activeMembers: 280,
      avgYield: '1.8 tons/acre',
      marketAccess: 60,
    },
  },
  {
    id: 'FPO004',
    name: 'Karnataka Coffee Cooperative',
    location: 'Chikmagalur, Karnataka',
    memberCount: 420,
    cropTypes: ['Spices', 'Fruits', 'Vegetables'],
    totalRevenue: '₹2.2 Cr',
    growthRate: 8,
    establishedDate: '2022-08-15',
    certifications: ['Fair Trade', 'Rainforest Alliance'],
    status: 'active',
    metrics: {
      procurementVolume: '800 tons',
      activeMembers: 390,
      avgYield: '2.1 tons/acre',
      marketAccess: 75,
    },
  },
  {
    id: 'FPO005',
    name: 'MP Organic Farmers',
    location: 'Indore, Madhya Pradesh',
    memberCount: 280,
    cropTypes: ['Pulses', 'Soybean'],
    totalRevenue: '₹1.2 Cr',
    growthRate: -2,
    establishedDate: '2023-03-01',
    certifications: ['Organic'],
    status: 'inactive',
    metrics: {
      procurementVolume: '300 tons',
      activeMembers: 220,
      avgYield: '1.5 tons/acre',
      marketAccess: 45,
    },
  },
  {
    id: 'FPO006',
    name: 'Gujarat Cotton Producers',
    location: 'Rajkot, Gujarat',
    memberCount: 620,
    cropTypes: ['Cotton', 'Pulses'],
    totalRevenue: '₹3.1 Cr',
    growthRate: 18,
    establishedDate: '2021-12-10',
    certifications: ['BCI Certified', 'ISO 9001'],
    status: 'active',
    metrics: {
      procurementVolume: '1200 tons',
      activeMembers: 580,
      avgYield: '2.8 tons/acre',
      marketAccess: 88,
    },
  }
];

export default function FPOs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')
  const [filterCrop, setFilterCrop] = useState<string>('all')
  const [filterLocation, setFilterLocation] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showAddFPO, setShowAddFPO] = useState(false)
  const [selectedFPO, setSelectedFPO] = useState<FPO | null>(null)
  const [currentAction, setCurrentAction] = useState<'members' | 'inventory' | 'analytics' | 'settings' | null>(null)

  // Get unique locations
  const locations = Array.from(new Set(mockFPOs.map(fpo => fpo.location.split(', ')[1])))
  
  // Get unique crops
  const crops = Array.from(new Set(mockFPOs.flatMap(fpo => fpo.cropTypes)))

  // Filter and sort FPOs
  const filteredAndSortedFPOs = mockFPOs
    .filter(fpo => 
      (searchQuery === '' || 
        fpo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fpo.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fpo.certifications.some(cert => cert.toLowerCase().includes(searchQuery.toLowerCase())) ||
        fpo.cropTypes.some(crop => crop.toLowerCase().includes(searchQuery.toLowerCase()))
      ) &&
      (filterStatus === 'all' || fpo.status === filterStatus) &&
      (filterCrop === 'all' || fpo.cropTypes.includes(filterCrop)) &&
      (filterLocation === 'all' || fpo.location.includes(filterLocation))
    )
    .sort((a, b) => {
      let compareValue = 0
      switch (sortField) {
        case 'name':
          compareValue = a.name.localeCompare(b.name)
          break
        case 'memberCount':
          compareValue = a.memberCount - b.memberCount
          break
        case 'totalRevenue':
          compareValue = parseFloat(a.totalRevenue.replace(/[^\d.]/g, '')) - parseFloat(b.totalRevenue.replace(/[^\d.]/g, ''))
          break
        case 'growthRate':
          compareValue = a.growthRate - b.growthRate
          break
        case 'marketAccess':
          compareValue = a.metrics.marketAccess - b.metrics.marketAccess
          break
      }
      return sortOrder === 'asc' ? compareValue : -compareValue
    })

  // Crop type color mapping
  const cropColors: Record<string, { light: string, gradient: string, text: string }> = {
    'Soybean': { light: 'from-yellow-400 to-yellow-600', gradient: 'bg-yellow-50', text: 'text-yellow-800' },
    'Cotton': { light: 'from-blue-400 to-blue-600', gradient: 'bg-blue-50', text: 'text-blue-800' },
    'Wheat': { light: 'from-amber-400 to-amber-600', gradient: 'bg-amber-50', text: 'text-amber-800' },
    'Rice': { light: 'from-green-400 to-green-600', gradient: 'bg-green-50', text: 'text-green-800' },
    'Vegetables': { light: 'from-emerald-400 to-emerald-600', gradient: 'bg-emerald-50', text: 'text-emerald-800' },
    'Pulses': { light: 'from-orange-400 to-orange-600', gradient: 'bg-orange-50', text: 'text-orange-800' },
    'Fruits': { light: 'from-red-400 to-red-600', gradient: 'bg-red-50', text: 'text-red-800' },
    'Spices': { light: 'from-purple-400 to-purple-600', gradient: 'bg-purple-50', text: 'text-purple-800' }
  }

  // Mock FPO data
  const fpos: FPO[] = [
    {
      id: 'FPO001',
      name: 'Vidarbha Farmers Collective',
      location: 'Nagpur, Maharashtra',
      memberCount: 500,
      cropTypes: ['Soybean', 'Cotton', 'Pulses'],
      totalRevenue: '₹2.5 Cr',
      growthRate: 15,
      establishedDate: '2022-06-15',
      certifications: ['Organic', 'Fair Trade'],
      status: 'active',
      metrics: {
        procurementVolume: '1000 tons',
        activeMembers: 450,
        avgYield: '2.5 tons/acre',
        marketAccess: 85,
      },
    },
    {
      id: 'FPO002',
      name: 'Punjab Agri Producers',
      location: 'Ludhiana, Punjab',
      memberCount: 750,
      cropTypes: ['Wheat', 'Rice', 'Vegetables'],
      totalRevenue: '₹3.8 Cr',
      growthRate: 22,
      establishedDate: '2021-03-10',
      certifications: ['GMP', 'ISO 9001'],
      status: 'active',
      metrics: {
        procurementVolume: '1500 tons',
        activeMembers: 680,
        avgYield: '3.2 tons/acre',
        marketAccess: 92,
      },
    },
    {
      id: 'FPO003',
      name: 'Kerala Spice Growers',
      location: 'Kochi, Kerala',
      memberCount: 320,
      cropTypes: ['Spices', 'Fruits'],
      totalRevenue: '₹1.8 Cr',
      growthRate: -5,
      establishedDate: '2023-01-20',
      certifications: ['Organic'],
      status: 'pending',
      metrics: {
        procurementVolume: '450 tons',
        activeMembers: 280,
        avgYield: '1.8 tons/acre',
        marketAccess: 60,
      },
    },
    {
      id: 'FPO004',
      name: 'Karnataka Coffee Cooperative',
      location: 'Chikmagalur, Karnataka',
      memberCount: 420,
      cropTypes: ['Spices', 'Fruits', 'Vegetables'],
      totalRevenue: '₹2.2 Cr',
      growthRate: 8,
      establishedDate: '2022-08-15',
      certifications: ['Fair Trade', 'Rainforest Alliance'],
      status: 'active',
      metrics: {
        procurementVolume: '800 tons',
        activeMembers: 390,
        avgYield: '2.1 tons/acre',
        marketAccess: 75,
      },
    },
    {
      id: 'FPO005',
      name: 'MP Organic Farmers',
      location: 'Indore, Madhya Pradesh',
      memberCount: 280,
      cropTypes: ['Pulses', 'Soybean'],
      totalRevenue: '₹1.2 Cr',
      growthRate: -2,
      establishedDate: '2023-03-01',
      certifications: ['Organic'],
      status: 'inactive',
      metrics: {
        procurementVolume: '300 tons',
        activeMembers: 220,
        avgYield: '1.5 tons/acre',
        marketAccess: 45,
      },
    },
    {
      id: 'FPO006',
      name: 'Gujarat Cotton Producers',
      location: 'Rajkot, Gujarat',
      memberCount: 620,
      cropTypes: ['Cotton', 'Pulses'],
      totalRevenue: '₹3.1 Cr',
      growthRate: 18,
      establishedDate: '2021-12-10',
      certifications: ['BCI Certified', 'ISO 9001'],
      status: 'active',
      metrics: {
        procurementVolume: '1200 tons',
        activeMembers: 580,
        avgYield: '2.8 tons/acre',
        marketAccess: 88,
      },
    }
  ]

  return (
    <div className="space-y-6">
      {/* FPOs Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Building2 className="h-8 w-8 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockFPOs.length}</div>
          <div className="text-sm text-gray-600">Total FPOs</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Users className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockFPOs.reduce((acc, f) => acc + f.memberCount, 0)}</div>
          <div className="text-sm text-gray-600">Total Members</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <BadgeDollarSign className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockFPOs.reduce((acc, f) => acc + parseFloat(f.totalRevenue.replace(/[^\d.]/g, '')), 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <TrendingUp className="h-8 w-8 text-emerald-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Math.round(mockFPOs.reduce((acc, f) => acc + f.growthRate, 0) / (mockFPOs.length || 1))}%</div>
          <div className="text-sm text-gray-600">Avg. Growth Rate</div>
        </div>
      </div>

      {/* Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">FPO Insights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Most common crop: <span className="font-medium">{mockFPOs.flatMap(f => f.cropTypes).sort((a, b) => mockFPOs.flatMap(f => f.cropTypes).filter(x => x === b).length - mockFPOs.flatMap(f => f.cropTypes).filter(x => x === a).length)[0] || '—'}</span></li>
            <li>Largest FPO: <span className="font-medium">{[...mockFPOs].sort((a, b) => b.memberCount - a.memberCount)[0]?.name || '—'}</span></li>
            <li>Highest revenue: <span className="font-medium">{[...mockFPOs].sort((a, b) => parseFloat(b.totalRevenue.replace(/[^\d.]/g, '')) - parseFloat(a.totalRevenue.replace(/[^\d.]/g, '')))[0]?.name || '—'}</span></li>
            <li>Most certifications: <span className="font-medium">{[...mockFPOs].sort((a, b) => b.certifications.length - a.certifications.length)[0]?.name || '—'}</span></li>
          </ul>
        </div>
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-orange-700 mb-2">Tips for FPOs</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Encourage member participation for better procurement and bargaining power.</li>
            <li>Maintain up-to-date certifications to access premium markets.</li>
            <li>Leverage analytics to optimize crop planning and sales.</li>
            <li>Connect with local processors and retailers for direct market access.</li>
            <li>Utilize the platform for transparent record-keeping and reporting.</li>
          </ul>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FPOs</h1>
          <p className="text-gray-600 mt-2">Manage Farmer Producer Organizations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddFPO(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700 shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add FPO</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-orange-100 dark:border-orange-800">
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
                placeholder="Search FPOs by name, location, or certification..."
                className="block w-full rounded-lg border-0 py-2.5 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500 bg-white/50"
              />
            </div>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${
                showAdvancedFilters
                  ? 'bg-orange-50 border-orange-200 text-orange-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              Filters
            </button>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500 bg-white/50"
            >
              <option value="name">Sort by Name</option>
              <option value="memberCount">Sort by Members</option>
              <option value="totalRevenue">Sort by Revenue</option>
              <option value="growthRate">Sort by Growth</option>
              <option value="marketAccess">Sort by Market Access</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2.5 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <TrendingUp className={`h-5 w-5 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showAdvancedFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-200"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'pending' | 'inactive')}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500 bg-white/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Crop</label>
                <select
                  value={filterCrop}
                  onChange={(e) => setFilterCrop(e.target.value)}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500 bg-white/50"
                >
                  <option value="all">All Crops</option>
                  {crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <select
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500 bg-white/50"
                >
                  <option value="all">All States</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* FPO Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedFPOs.map((fpo) => (
          <motion.div
            key={fpo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow ${cropColors[fpo.cropTypes[0]].gradient} border-${cropColors[fpo.cropTypes[0]].text}/20`}
          >
            {/* FPO Card Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${cropColors[fpo.cropTypes[0]].gradient} border-${cropColors[fpo.cropTypes[0]].text}/20`}>
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${cropColors[fpo.cropTypes[0]].light} flex items-center justify-center text-white`}>
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{fpo.name}</h3>
                  <p className="text-xs text-gray-600 flex items-center">
                    <Map className="h-3 w-3 mr-1" />
                    {fpo.location}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                fpo.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : fpo.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {fpo.status}
              </span>
            </div>

            {/* Key Metrics */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`${cropColors[fpo.cropTypes[0]].gradient} rounded-lg p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <Users className={`h-4 w-4 ${cropColors[fpo.cropTypes[0]].text}`} />
                    <span className={`text-xs ${
                      fpo.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {fpo.growthRate > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {Math.abs(fpo.growthRate)}%
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {fpo.memberCount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-600">Members</p>
                </div>
                <div className={`${cropColors[fpo.cropTypes[0]].gradient} rounded-lg p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <BadgeDollarSign className={`h-4 w-4 ${cropColors[fpo.cropTypes[0]].text}`} />
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {fpo.totalRevenue}
                  </p>
                  <p className="text-xs text-gray-600">Revenue</p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                {/* Crop Types */}
                <div>
                  <h4 className="text-xs font-medium text-gray-900 mb-1.5">Primary Crops</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {fpo.cropTypes.map((crop, index) => (
                      <span
                        key={index}
                        className={`px-2 py-0.5 rounded-full text-xs ${cropColors[crop].gradient} ${cropColors[crop].text}`}
                      >
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Summary */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`${cropColors[fpo.cropTypes[0]].gradient} rounded-lg p-2`}>
                    <p className="text-gray-600 mb-0.5">Procurement</p>
                    <p className="font-semibold text-gray-900">
                      {fpo.metrics.procurementVolume}
                    </p>
                  </div>
                  <div className={`${cropColors[fpo.cropTypes[0]].gradient} rounded-lg p-2`}>
                    <p className="text-gray-600 mb-0.5">Market Access</p>
                    <p className="font-semibold text-gray-900">
                      {fpo.metrics.marketAccess}%
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-1 pt-2 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFPO(fpo)
                      setCurrentAction('members')
                    }}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${cropColors[fpo.cropTypes[0]].gradient}`}
                  >
                    <Users className={`h-4 w-4 ${cropColors[fpo.cropTypes[0]].text}`} />
                    <span className="text-[10px] text-gray-600">Members</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFPO(fpo)
                      setCurrentAction('inventory')
                    }}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${cropColors[fpo.cropTypes[0]].gradient}`}
                  >
                    <Package className={`h-4 w-4 ${cropColors[fpo.cropTypes[0]].text}`} />
                    <span className="text-[10px] text-gray-600">Inventory</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFPO(fpo)
                      setCurrentAction('analytics')
                    }}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${cropColors[fpo.cropTypes[0]].gradient}`}
                  >
                    <LineChart className={`h-4 w-4 ${cropColors[fpo.cropTypes[0]].text}`} />
                    <span className="text-[10px] text-gray-600">Analytics</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFPO(fpo)
                      setCurrentAction('settings')
                    }}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg hover:${cropColors[fpo.cropTypes[0]].gradient}`}
                  >
                    <Settings className={`h-4 w-4 ${cropColors[fpo.cropTypes[0]].text}`} />
                    <span className="text-[10px] text-gray-600">Settings</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {fpos.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center"
        >
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No FPOs Found</h3>
          <p className="text-gray-600 mb-6">Start by adding your first FPO to the platform</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddFPO(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add First FPO</span>
          </motion.button>
        </motion.div>
      )}

      {/* Add FPO Modal */}
      <AnimatePresence>
        {showAddFPO && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddFPO(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="sticky top-0 px-6 py-4 bg-orange-50 border-b border-orange-100">
                <h2 className="text-xl font-semibold text-gray-900">Add New FPO</h2>
                <p className="text-sm text-gray-600 mt-1">Enter FPO details to register</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                // Add form submission logic here
                setShowAddFPO(false)
              }} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">FPO Name*</label>
                    <input
                      type="text"
                      required
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      placeholder="Enter FPO name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location*</label>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      <input
                        type="text"
                        required
                        placeholder="City"
                        className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      />
                      <select 
                        required
                        className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Select State</option>
                        {locations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Count*</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="Number of members"
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Establishment Date*</label>
                    <input
                      type="date"
                      required
                      max={new Date().toISOString().split('T')[0]}
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Crops*</label>
                  <div className="grid grid-cols-4 gap-4">
                    {crops.map(crop => (
                      <div key={crop} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`crop-${crop}`}
                          value={crop}
                          className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <label htmlFor={`crop-${crop}`} className="ml-2 text-sm text-gray-700">{crop}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cert-organic"
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="cert-organic" className="ml-2 text-sm text-gray-700">Organic</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cert-fairtrade"
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="cert-fairtrade" className="ml-2 text-sm text-gray-700">Fair Trade</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cert-gmp"
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="cert-gmp" className="ml-2 text-sm text-gray-700">GMP</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cert-iso"
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="cert-iso" className="ml-2 text-sm text-gray-700">ISO 9001</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="cert-rainforest"
                        className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <label htmlFor="cert-rainforest" className="ml-2 text-sm text-gray-700">Rainforest Alliance</label>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Initial Metrics</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-600">Procurement Volume (tons)*</label>
                      <input
                        type="number"
                        required
                        min="0"
                        placeholder="Annual volume"
                        className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Average Yield (tons/acre)*</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.1"
                        placeholder="Average yield"
                        className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Market Access (%)*</label>
                      <input
                        type="number"
                        required
                        min="0"
                        max="100"
                        placeholder="Market access"
                        className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Initial Revenue (₹ Cr)*</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.1"
                        placeholder="Revenue"
                        className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 -mx-6 -mb-6 px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAddFPO(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg"
                  >
                    Add FPO
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Modals */}
      <AnimatePresence>
        {selectedFPO && currentAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => {
              setSelectedFPO(null)
              setCurrentAction(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
            >
              {currentAction === 'members' && (
                <>
                  <div className={`sticky top-0 px-6 py-4 ${cropColors[selectedFPO.cropTypes[0]].gradient} border-b border-${cropColors[selectedFPO.cropTypes[0]].text}/20`}>
                    <h2 className="text-xl font-semibold text-gray-900">FPO Members</h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedFPO.name}</p>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedFPO.metrics.activeMembers}</p>
                        <p className="text-sm text-gray-600">Active Members</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedFPO.memberCount}</p>
                        <p className="text-sm text-gray-600">Total Members</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg bg-gradient-to-r ${cropColors[selectedFPO.cropTypes[0]].light} text-white`}
                      >
                        Add Member
                      </motion.button>
                    </div>
                    <div className="space-y-4">
                      {/* Sample member list */}
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                            <div>
                              <p className="font-medium text-gray-900">Member #{i + 1}</p>
                              <p className="text-sm text-gray-600">Joined {new Date().toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">
                            2.5 acres
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentAction === 'inventory' && (
                <>
                  <div className={`sticky top-0 px-6 py-4 ${cropColors[selectedFPO.cropTypes[0]].gradient} border-b border-${cropColors[selectedFPO.cropTypes[0]].text}/20`}>
                    <h2 className="text-xl font-semibold text-gray-900">Inventory Management</h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedFPO.name}</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className={`${cropColors[selectedFPO.cropTypes[0]].gradient} rounded-lg p-4`}>
                        <p className="text-sm text-gray-600">Total Stock</p>
                        <p className="text-2xl font-bold text-gray-900">{selectedFPO.metrics.procurementVolume}</p>
                      </div>
                      <div className={`${cropColors[selectedFPO.cropTypes[0]].gradient} rounded-lg p-4`}>
                        <p className="text-sm text-gray-600">In Transit</p>
                        <p className="text-2xl font-bold text-gray-900">120 tons</p>
                      </div>
                      <div className={`${cropColors[selectedFPO.cropTypes[0]].gradient} rounded-lg p-4`}>
                        <p className="text-sm text-gray-600">Available</p>
                        <p className="text-2xl font-bold text-gray-900">880 tons</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {selectedFPO.cropTypes.map((crop, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-4">
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${cropColors[crop].light}`} />
                            <div>
                              <p className="font-medium text-gray-900">{crop}</p>
                              <p className="text-sm text-gray-600">Grade A</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">300 tons</p>
                            <p className="text-sm text-gray-600">₹45/kg</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {currentAction === 'analytics' && (
                <>
                  <div className={`sticky top-0 px-6 py-4 ${cropColors[selectedFPO.cropTypes[0]].gradient} border-b border-${cropColors[selectedFPO.cropTypes[0]].text}/20`}>
                    <h2 className="text-xl font-semibold text-gray-900">Analytics Dashboard</h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedFPO.name}</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div className={`${cropColors[selectedFPO.cropTypes[0]].gradient} rounded-lg p-4`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Revenue Growth</p>
                          <span className={`text-sm px-2 py-0.5 rounded-full ${
                            selectedFPO.growthRate > 0 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {selectedFPO.growthRate}%
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedFPO.totalRevenue}</p>
                      </div>
                      <div className={`${cropColors[selectedFPO.cropTypes[0]].gradient} rounded-lg p-4`}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-600">Market Access</p>
                          <span className="text-sm px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            {selectedFPO.metrics.marketAccess}%
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{selectedFPO.metrics.avgYield}</p>
                        <p className="text-sm text-gray-600">Avg. Yield</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-4">Monthly Performance</h3>
                        <div className="h-48 flex items-end justify-between">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex flex-col items-center">
                              <div className={`w-12 bg-gradient-to-t ${cropColors[selectedFPO.cropTypes[0]].light}`} 
                                style={{ height: `${Math.random() * 100}%` }} 
                              />
                              <p className="text-xs text-gray-600 mt-2">Month {i + 1}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-4">Crop Distribution</h3>
                        <div className="flex justify-around">
                          {selectedFPO.cropTypes.map((crop, i) => (
                            <div key={i} className="text-center">
                              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cropColors[crop].light} mb-2`} />
                              <p className="text-sm font-medium text-gray-900">{crop}</p>
                              <p className="text-xs text-gray-600">{Math.round(100 / selectedFPO.cropTypes.length)}%</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentAction === 'settings' && (
                <>
                  <div className={`sticky top-0 px-6 py-4 ${cropColors[selectedFPO.cropTypes[0]].gradient} border-b border-${cropColors[selectedFPO.cropTypes[0]].text}/20`}>
                    <h2 className="text-xl font-semibold text-gray-900">FPO Settings</h2>
                    <p className="text-sm text-gray-600 mt-1">{selectedFPO.name}</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">General Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">FPO Name</label>
                          <input
                            type="text"
                            defaultValue={selectedFPO.name}
                            className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Location</label>
                          <input
                            type="text"
                            defaultValue={selectedFPO.location}
                            className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Certifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedFPO.certifications.map((cert, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                            />
                            <label className="text-sm text-gray-700">{cert}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Danger Zone</h3>
                      <div className="rounded-lg border border-red-200 p-4">
                        <p className="text-sm text-gray-600 mb-4">
                          Deactivating the FPO will suspend all operations and remove access for all members.
                        </p>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                          Deactivate FPO
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="sticky bottom-0 px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedFPO(null)
                      setCurrentAction(null)
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

