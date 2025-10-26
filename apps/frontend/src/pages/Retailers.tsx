import React, { useState } from 'react'
import { 
  Store, 
  Package, 
  Users, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  ShoppingCart,
  Search,
  Filter,
  ChevronDown,
  ArrowUpRight,
  Building2,
  Truck,
  Boxes,
  Activity,
  Clock,
  AlertTriangle,
  Wallet,
  BarChart2,
  Plus
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Retailer {
  id: string
  name: string
  type: RetailerType
  location: string
  status: 'active' | 'inactive' | 'pending'
  metrics: {
    activeOrders: number
    monthlyVolume: number
    avgOrderValue: number
    returnRate: number
    qualityScore: number
  }
  performance: {
    orderAccuracy: number
    deliveryTime: number
    customerSatisfaction: number
    paymentReliability: number
  }
  inventory: {
    stockLevel: number
    reorderPoint: number
    turnoverRate: number
  }
  contact: {
    phone: string
    email: string
    address: string
    manager: string
  }
  businessInfo: {
    registrationNo: string
    establishedYear: number
    employeeCount: number
    storageCapacity: number
    creditLimit: number
  }
  orderHistory: {
    totalOrders: number
    completedOrders: number
    cancelledOrders: number
    returnsProcessed: number
  }
  preferences: {
    paymentTerms: string
    deliverySlots: string[]
    specialHandling: string[]
  }
  compliance: {
    licenses: string[]
    certifications: string[]
    lastAudit: string
    score: number
  }
}

type RetailerType = 'Supermarket Chain' | 'Wholesale Distributor' | 'Specialty Store' | 'Online Marketplace' | 'Department Store' | 'Convenience Store'

const retailerColors: Record<RetailerType, { light: string, gradient: string, text: string }> = {
  'Supermarket Chain': { light: 'from-blue-400 to-blue-600', gradient: 'bg-blue-50', text: 'text-blue-800' },
  'Wholesale Distributor': { light: 'from-purple-400 to-purple-600', gradient: 'bg-purple-50', text: 'text-purple-800' },
  'Specialty Store': { light: 'from-emerald-400 to-emerald-600', gradient: 'bg-emerald-50', text: 'text-emerald-800' },
  'Online Marketplace': { light: 'from-cyan-400 to-cyan-600', gradient: 'bg-cyan-50', text: 'text-cyan-800' },
  'Department Store': { light: 'from-amber-400 to-amber-600', gradient: 'bg-amber-50', text: 'text-amber-800' },
  'Convenience Store': { light: 'from-rose-400 to-rose-600', gradient: 'bg-rose-50', text: 'text-rose-800' }
}

const mockRetailers: Retailer[] = [
  {
    id: 'RET001',
    name: 'Fresh Mart Stores',
    type: 'Supermarket Chain',
    location: 'Mumbai Metropolitan',
    status: 'active',
    metrics: {
      activeOrders: 24,
      monthlyVolume: 45,
      avgOrderValue: 85000,
      returnRate: 1.2,
      qualityScore: 98
    },
    performance: {
      orderAccuracy: 99.5,
      deliveryTime: 24,
      customerSatisfaction: 4.8,
      paymentReliability: 100
    },
    inventory: {
      stockLevel: 85,
      reorderPoint: 20,
      turnoverRate: 15
    },
    contact: {
      phone: '+91 98765 43210',
      email: 'orders@freshmart.in',
      address: '123 Market Complex, Andheri West, Mumbai - 400053',
      manager: 'Rajesh Kumar'
    },
    businessInfo: {
      registrationNo: 'RETAIL123MH2020',
      establishedYear: 2020,
      employeeCount: 250,
      storageCapacity: 1500,
      creditLimit: 2500000
    },
    orderHistory: {
      totalOrders: 1250,
      completedOrders: 1200,
      cancelledOrders: 35,
      returnsProcessed: 15
    },
    preferences: {
      paymentTerms: 'Net 30',
      deliverySlots: ['Morning 6-9 AM', 'Evening 4-7 PM'],
      specialHandling: ['Temperature Controlled', 'Fragile Items']
    },
    compliance: {
      licenses: ['FSSAI', 'Shop & Establishment'],
      certifications: ['ISO 9001', 'HACCP'],
      lastAudit: '2025-09-15',
      score: 92
    }
  },
  {
    id: 'RET002',
    name: 'Green Grocers Co.',
    type: 'Wholesale Distributor',
    location: 'Delhi NCR',
    status: 'active',
    metrics: {
      activeOrders: 32,
      monthlyVolume: 120,
      avgOrderValue: 155000,
      returnRate: 0.8,
      qualityScore: 96
    },
    performance: {
      orderAccuracy: 98.5,
      deliveryTime: 36,
      customerSatisfaction: 4.6,
      paymentReliability: 95
    },
    inventory: {
      stockLevel: 75,
      reorderPoint: 25,
      turnoverRate: 12
    },
    contact: {
      phone: '+91 98765 43211',
      email: 'supply@greengrocer.in',
      address: '45 Wholesale Market, Azadpur, Delhi - 110033',
      manager: 'Amit Sharma'
    },
    businessInfo: {
      registrationNo: 'WHOL456DL2019',
      establishedYear: 2019,
      employeeCount: 180,
      storageCapacity: 2500,
      creditLimit: 5000000
    },
    orderHistory: {
      totalOrders: 2800,
      completedOrders: 2650,
      cancelledOrders: 120,
      returnsProcessed: 30
    },
    preferences: {
      paymentTerms: 'Net 45',
      deliverySlots: ['Night 11 PM-4 AM'],
      specialHandling: ['Bulk Orders', 'Cold Storage']
    },
    compliance: {
      licenses: ['FSSAI', 'Trade License'],
      certifications: ['ISO 22000', 'GMP'],
      lastAudit: '2025-08-20',
      score: 88
    }
  },
  {
    id: 'RET003',
    name: 'Specialty Foods Inc',
    type: 'Specialty Store',
    location: 'Bangalore Urban',
    status: 'active',
    metrics: {
      activeOrders: 18,
      monthlyVolume: 25,
      avgOrderValue: 45000,
      returnRate: 0.5,
      qualityScore: 99
    },
    performance: {
      orderAccuracy: 99.8,
      deliveryTime: 18,
      customerSatisfaction: 4.9,
      paymentReliability: 100
    },
    inventory: {
      stockLevel: 92,
      reorderPoint: 15,
      turnoverRate: 8
    },
    contact: {
      phone: '+91 98765 43213',
      email: 'orders@specialtyfoods.in',
      address: '789 Gourmet Lane, Indiranagar, Bangalore - 560038',
      manager: 'Priya Menon'
    },
    businessInfo: {
      registrationNo: 'SPEC789KA2021',
      establishedYear: 2021,
      employeeCount: 45,
      storageCapacity: 500,
      creditLimit: 1000000
    },
    orderHistory: {
      totalOrders: 850,
      completedOrders: 830,
      cancelledOrders: 15,
      returnsProcessed: 5
    },
    preferences: {
      paymentTerms: 'Net 15',
      deliverySlots: ['Afternoon 2-4 PM'],
      specialHandling: ['Premium Packaging', 'Express Delivery']
    },
    compliance: {
      licenses: ['FSSAI', 'Health Trade'],
      certifications: ['Organic', 'Fair Trade'],
      lastAudit: '2025-10-01',
      score: 96
    }
  },
  {
    id: 'RET004',
    name: 'QuickBuy Digital',
    type: 'Online Marketplace',
    location: 'Pan India',
    status: 'active',
    metrics: {
      activeOrders: 156,
      monthlyVolume: 280,
      avgOrderValue: 25000,
      returnRate: 2.5,
      qualityScore: 92
    },
    performance: {
      orderAccuracy: 97.5,
      deliveryTime: 48,
      customerSatisfaction: 4.4,
      paymentReliability: 98
    },
    inventory: {
      stockLevel: 65,
      reorderPoint: 30,
      turnoverRate: 20
    },
    contact: {
      phone: '+91 98765 43214',
      email: 'support@quickbuy.in',
      address: 'Digital Hub, Sector 5, Gurgaon - 122001',
      manager: 'Vikram Singh'
    },
    businessInfo: {
      registrationNo: 'ERET101HR2018',
      establishedYear: 2018,
      employeeCount: 500,
      storageCapacity: 5000,
      creditLimit: 10000000
    },
    orderHistory: {
      totalOrders: 15000,
      completedOrders: 14200,
      cancelledOrders: 650,
      returnsProcessed: 150
    },
    preferences: {
      paymentTerms: 'Immediate',
      deliverySlots: ['24x7'],
      specialHandling: ['Digital Invoice', 'Real-time Tracking']
    },
    compliance: {
      licenses: ['E-commerce', 'Digital Payments'],
      certifications: ['ISO 27001', 'PCI DSS'],
      lastAudit: '2025-09-30',
      score: 94
    }
  }
]

export default function Retailers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<RetailerType | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'pending'>('all')
  const [sortField, setSortField] = useState<'name' | 'metrics.activeOrders' | 'metrics.monthlyVolume' | 'performance.customerSatisfaction'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedRetailer, setSelectedRetailer] = useState<Retailer | null>(null)
  const [showAddRetailer, setShowAddRetailer] = useState(false)

  // Filter and sort retailers
  const filteredAndSortedRetailers = mockRetailers
    .filter(retailer => 
      (searchQuery === '' || 
        retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        retailer.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (filterType === 'all' || retailer.type === filterType) &&
      (filterStatus === 'all' || retailer.status === filterStatus)
    )
    .sort((a, b) => {
      let compareValue = 0
      switch (sortField) {
        case 'name':
          compareValue = a.name.localeCompare(b.name)
          break
        case 'metrics.activeOrders':
          compareValue = a.metrics.activeOrders - b.metrics.activeOrders
          break
        case 'metrics.monthlyVolume':
          compareValue = a.metrics.monthlyVolume - b.metrics.monthlyVolume
          break
        case 'performance.customerSatisfaction':
          compareValue = a.performance.customerSatisfaction - b.performance.customerSatisfaction
          break
      }
      return sortOrder === 'asc' ? compareValue : -compareValue
    })
  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Retailers</h1>
          <p className="text-gray-600 mt-2">Monitor and manage retail partners</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddRetailer(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add Retailer</span>
        </motion.button>
      </div>

      {/* Retailers Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Store className="h-8 w-8 text-indigo-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{filteredAndSortedRetailers.length}</div>
          <div className="text-sm text-gray-600">Total Retailers</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <ShoppingCart className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {filteredAndSortedRetailers.reduce((acc, r) => acc + r.metrics.activeOrders, 0)}
          </div>
          <div className="text-sm text-gray-600">Active Orders</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Package className="h-8 w-8 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {filteredAndSortedRetailers.reduce((acc, r) => acc + r.metrics.monthlyVolume, 0)} tonnes
          </div>
          <div className="text-sm text-gray-600">Monthly Volume</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <BarChart2 className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.round(filteredAndSortedRetailers.reduce((acc, r) => acc + r.performance.customerSatisfaction, 0) / filteredAndSortedRetailers.length * 10) / 10}/5
          </div>
          <div className="text-sm text-gray-600">Avg. Satisfaction</div>
        </div>
      </div>

      {/* Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Retailer Insights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>
              Top Performer: <span className="font-medium">
                {[...filteredAndSortedRetailers].sort((a, b) => b.performance.customerSatisfaction - a.performance.customerSatisfaction)[0]?.name || '—'}
              </span>
            </li>
            <li>
              Most Orders: <span className="font-medium">
                {[...filteredAndSortedRetailers].sort((a, b) => b.metrics.activeOrders - a.metrics.activeOrders)[0]?.name || '—'}
              </span>
            </li>
            <li>
              Highest Volume: <span className="font-medium">
                {[...filteredAndSortedRetailers].sort((a, b) => b.metrics.monthlyVolume - a.metrics.monthlyVolume)[0]?.name || '—'}
              </span>
            </li>
            <li>
              Best Quality Score: <span className="font-medium">
                {[...filteredAndSortedRetailers].sort((a, b) => b.metrics.qualityScore - a.metrics.qualityScore)[0]?.name || '—'}
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Current Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-green-700">
                {filteredAndSortedRetailers.filter(r => r.status === 'active').length}
              </div>
              <div className="text-sm text-green-600">Active</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-amber-700">
                {filteredAndSortedRetailers.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-amber-600">Pending</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-blue-700">
                {Math.round(filteredAndSortedRetailers.reduce((acc, r) => acc + r.metrics.returnRate, 0) / filteredAndSortedRetailers.length * 10) / 10}%
              </div>
              <div className="text-sm text-blue-600">Avg. Returns</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <div className="text-xl font-semibold text-purple-700">
                {Math.round(filteredAndSortedRetailers.reduce((acc, r) => acc + r.performance.orderAccuracy, 0) / filteredAndSortedRetailers.length * 10) / 10}%
              </div>
              <div className="text-sm text-purple-600">Order Accuracy</div>
            </div>
          </div>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-100">
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
                placeholder="Search retailers by name, location..."
                className="block w-full rounded-lg border-0 py-2.5 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white/50"
              />
            </div>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border ${
                showAdvancedFilters
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
              Filters
            </button>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as 'name' | 'metrics.activeOrders' | 'metrics.monthlyVolume' | 'performance.customerSatisfaction')}
              className="rounded-lg border-0 py-2.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white/50"
            >
              <option value="name">Sort by Name</option>
              <option value="metrics.activeOrders">Sort by Orders</option>
              <option value="metrics.monthlyVolume">Sort by Volume</option>
              <option value="performance.customerSatisfaction">Sort by Satisfaction</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Retailer Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as RetailerType | 'all')}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white/50"
                >
                  <option value="all">All Types</option>
                  {Object.keys(retailerColors).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive' | 'pending')}
                  className="block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-500 bg-white/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Retailers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAndSortedRetailers.map((retailer) => (
          <motion.div
            key={retailer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border overflow-hidden hover:shadow-xl transition-shadow ${
              retailerColors[retailer.type].gradient
            } border-${retailerColors[retailer.type].text}/20`}
          >
            {/* Retailer Card Header */}
            <div className={`px-4 py-3 border-b flex items-center justify-between ${
              retailerColors[retailer.type].gradient
            } border-${retailerColors[retailer.type].text}/20`}>
              <div className="flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${
                  retailerColors[retailer.type].light
                } flex items-center justify-center text-white`}>
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{retailer.name}</h3>
                  <p className="text-xs text-gray-600 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {retailer.location}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                retailer.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : retailer.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {retailer.status}
              </span>
            </div>

            {/* Key Metrics */}
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className={`${retailerColors[retailer.type].gradient} rounded-lg p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <BarChart2 className={`h-4 w-4 ${retailerColors[retailer.type].text}`} />
                    <span className={`text-xs ${
                      retailer.performance.customerSatisfaction >= 4.5 ? 'text-green-600' : 
                      retailer.performance.customerSatisfaction >= 4.0 ? 'text-yellow-600' : 
                      'text-red-600'
                    }`}>
                      {retailer.performance.customerSatisfaction}/5
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {retailer.metrics.monthlyVolume} tonnes/mo
                  </p>
                  <p className="text-xs text-gray-600">Monthly Volume</p>
                </div>
                <div className={`${retailerColors[retailer.type].gradient} rounded-lg p-3`}>
                  <div className="flex items-center justify-between mb-1">
                    <Package className={`h-4 w-4 ${retailerColors[retailer.type].text}`} />
                    <AlertTriangle className={`h-3 w-3 ${
                      retailer.metrics.returnRate > 2 ? 'text-red-500' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {retailer.metrics.activeOrders}
                  </p>
                  <p className="text-xs text-gray-600">Active Orders</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className={`${retailerColors[retailer.type].gradient} rounded-lg p-2 text-center`}>
                  <p className="text-xs text-gray-600">Quality Score</p>
                  <p className="font-semibold text-gray-900">{retailer.metrics.qualityScore}%</p>
                </div>
                <div className={`${retailerColors[retailer.type].gradient} rounded-lg p-2 text-center`}>
                  <p className="text-xs text-gray-600">Return Rate</p>
                  <p className="font-semibold text-gray-900">{retailer.metrics.returnRate}%</p>
                </div>
                <div className={`${retailerColors[retailer.type].gradient} rounded-lg p-2 text-center`}>
                  <p className="text-xs text-gray-600">Order Accuracy</p>
                  <p className="font-semibold text-gray-900">{retailer.performance.orderAccuracy}%</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {retailer.contact.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {retailer.contact.email}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setSelectedRetailer(retailer)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  View Details
                </button>
                <div className="flex gap-2">
                  <button className={`p-1.5 rounded-lg hover:${retailerColors[retailer.type].gradient}`}>
                    <Activity className={`h-4 w-4 ${retailerColors[retailer.type].text}`} />
                  </button>
                  <button className={`p-1.5 rounded-lg hover:${retailerColors[retailer.type].gradient}`}>
                    <Clock className={`h-4 w-4 ${retailerColors[retailer.type].text}`} />
                  </button>
                  <button className={`p-1.5 rounded-lg hover:${retailerColors[retailer.type].gradient}`}>
                    <Boxes className={`h-4 w-4 ${retailerColors[retailer.type].text}`} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

