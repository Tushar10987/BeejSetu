import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Search,
  Plus,
  Filter,
  ChevronDown,
  UserPlus,
  Tractor,
  Map,
  Calendar,
  LineChart,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  Home,
  Leaf,
  Warehouse,
  AlertTriangle,
  X,
} from 'lucide-react'

interface Farmer {
  id: string
  name: string
  location: string
  phone: string
  email: string
  crops: Array<{
    name: string
    area: string
    status: string
  }>
  totalArea: string
  registrationDate: string
  lastActivity: string
  status: 'active' | 'inactive'
  profileImage?: string
}

export default function Farmers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [showAddFarmer, setShowAddFarmer] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [newFarmer, setNewFarmer] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    totalArea: '',
    primaryCrop: ''
  })

  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: 'F001',
      name: 'Rajesh Kumar',
      location: 'Maharashtra',
      phone: '+91 98765 43210',
      email: 'rajesh.k@example.com',
      crops: [
        { name: 'Soybean', area: '5 acres', status: 'growing' },
        { name: 'Wheat', area: '3 acres', status: 'harvested' },
      ],
      totalArea: '8 acres',
      registrationDate: '2024-01-15',
      lastActivity: '2024-01-20',
      status: 'active',
    },
    {
      id: 'F002',
      name: 'Priya Sharma',
      location: 'Punjab',
      phone: '+91 98765 43211',
      email: 'priya.s@example.com',
      crops: [
        { name: 'Rice', area: '10 acres', status: 'growing' },
        { name: 'Cotton', area: '5 acres', status: 'harvested' },
      ],
      totalArea: '15 acres',
      registrationDate: '2024-01-10',
      lastActivity: '2024-01-19',
      status: 'active',
    },
    {
      id: 'F003',
      name: 'Sukhwinder Singh',
      location: 'Punjab',
      phone: '+91 89765 43212',
      email: 'sukhwinder@example.com',
      crops: [
        { name: 'Wheat', area: '15 acres', status: 'growing' },
        { name: 'Mustard', area: '5 acres', status: 'growing' },
        { name: 'Potato', area: '3 acres', status: 'harvested' },
      ],
      totalArea: '23 acres',
      registrationDate: '2024-02-01',
      lastActivity: '2024-02-15',
      status: 'active',
    },
    {
      id: 'F004',
      name: 'Meena Patel',
      location: 'Gujarat',
      phone: '+91 77665 43213',
      email: 'meena.p@example.com',
      crops: [
        { name: 'Cotton', area: '12 acres', status: 'growing' },
        { name: 'Groundnut', area: '8 acres', status: 'growing' },
      ],
      totalArea: '20 acres',
      registrationDate: '2024-01-20',
      lastActivity: '2024-02-10',
      status: 'active',
    },
    {
      id: 'F005',
      name: 'Ramesh Yadav',
      location: 'Haryana',
      phone: '+91 95555 43214',
      email: 'r.yadav@example.com',
      crops: [
        { name: 'Rice', area: '8 acres', status: 'harvested' },
        { name: 'Sugarcane', area: '7 acres', status: 'growing' },
      ],
      totalArea: '15 acres',
      registrationDate: '2024-01-05',
      lastActivity: '2024-01-25',
      status: 'inactive',
    },
    {
      id: 'F006',
      name: 'Anita Deshmukh',
      location: 'Maharashtra',
      phone: '+91 88885 43215',
      email: 'anita.d@example.com',
      crops: [
        { name: 'Tomato', area: '4 acres', status: 'growing' },
        { name: 'Onion', area: '6 acres', status: 'growing' },
        { name: 'Chilli', area: '2 acres', status: 'harvested' },
      ],
      totalArea: '12 acres',
      registrationDate: '2024-02-10',
      lastActivity: '2024-02-20',
      status: 'active',
    },
    {
      id: 'F007',
      name: 'Mohammad Hussain',
      location: 'Haryana',
      phone: '+91 92225 43216',
      email: 'm.hussain@example.com',
      crops: [
        { name: 'Wheat', area: '20 acres', status: 'growing' },
      ],
      totalArea: '20 acres',
      registrationDate: '2024-01-25',
      lastActivity: '2024-02-05',
      status: 'active',
    },
    {
      id: 'F008',
      name: 'Lakshmi Reddy',
      location: 'Karnataka',
      phone: '+91 81115 43217',
      email: 'l.reddy@example.com',
      crops: [
        { name: 'Coffee', area: '15 acres', status: 'growing' },
        { name: 'Black Pepper', area: '5 acres', status: 'growing' },
      ],
      totalArea: '20 acres',
      registrationDate: '2024-02-05',
      lastActivity: '2024-02-18',
      status: 'active',
    },
    {
      id: 'F009',
      name: 'Sanjay Verma',
      location: 'Madhya Pradesh',
      phone: '+91 94445 43218',
      email: 'sanjay.v@example.com',
      crops: [
        { name: 'Soybean', area: '10 acres', status: 'harvested' },
        { name: 'Corn', area: '8 acres', status: 'growing' },
      ],
      totalArea: '18 acres',
      registrationDate: '2024-01-08',
      lastActivity: '2024-01-28',
      status: 'inactive',
    },
    {
      id: 'F010',
      name: 'Kavita Patil',
      location: 'Maharashtra',
      phone: '+91 83335 43219',
      email: 'k.patil@example.com',
      crops: [
        { name: 'Sugarcane', area: '12 acres', status: 'growing' },
        { name: 'Turmeric', area: '3 acres', status: 'growing' },
        { name: 'Ginger', area: '2 acres', status: 'harvested' },
      ],
      totalArea: '17 acres',
      registrationDate: '2024-02-15',
      lastActivity: '2024-02-25',
      status: 'active',
    }
  ])

  const handleAddFarmer = () => {
    const id = `F${(farmers.length + 1).toString().padStart(3, '0')}`
    const newFarmerData: Farmer = {
      id,
      name: newFarmer.name,
      location: newFarmer.location,
      phone: newFarmer.phone,
      email: newFarmer.email,
      crops: [
        { name: newFarmer.primaryCrop, area: newFarmer.totalArea, status: 'growing' }
      ],
      totalArea: newFarmer.totalArea,
      registrationDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      status: 'active'
    }

    if (!newFarmer.name || !newFarmer.phone || !newFarmer.location) {
      setNotification({
        type: 'error',
        message: 'Please fill in all required fields'
      })
      return
    }

    setFarmers(prev => [...prev, newFarmerData])
    setShowAddFarmer(false)
    setNewFarmer({
      name: '',
      phone: '',
      email: '',
      location: '',
      totalArea: '',
      primaryCrop: ''
    })
    setNotification({
      type: 'success',
      message: 'Farmer added successfully'
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewFarmer(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const filteredFarmers = farmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.crops.some(crop => crop.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = filterStatus === 'all' || farmer.status === filterStatus
    const matchesLocation = selectedLocation === 'all' || 
      farmer.location.toLowerCase() === selectedLocation.toLowerCase()

    return matchesSearch && matchesStatus && matchesLocation
  })

  return (
    <div className="space-y-6">
      {/* Farmers Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Users className="h-8 w-8 text-amber-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{farmers.length}</div>
          <div className="text-sm text-gray-600">Total Farmers</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Leaf className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{farmers.reduce((acc, f) => acc + f.crops.length, 0)}</div>
          <div className="text-sm text-gray-600">Active Crops</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Warehouse className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{farmers.reduce((acc, f) => acc + parseInt(f.totalArea), 0) || '—'}</div>
          <div className="text-sm text-gray-600">Total Area (acres)</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Tractor className="h-8 w-8 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{farmers.filter(f => f.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Active Farmers</div>
        </div>
      </div>

      {/* Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-amber-700 mb-2">Farmer Insights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Most popular crop: <span className="font-medium">{farmers.flatMap(f => f.crops.map(c => c.name)).sort((a, b) => farmers.flatMap(f => f.crops.map(c => c.name)).filter(x => x === b).length - farmers.flatMap(f => f.crops.map(c => c.name)).filter(x => x === a).length)[0] || '—'}</span></li>
            <li>Average farm size: <span className="font-medium">{(farmers.reduce((acc, f) => acc + parseInt(f.totalArea), 0) / (farmers.length || 1)).toFixed(1)}</span> acres</li>
            <li>Recently registered: <span className="font-medium">{farmers[0]?.name || '—'}</span></li>
            <li>Most active region: <span className="font-medium">{farmers.sort((a, b) => farmers.filter(f => f.location === b.location).length - farmers.filter(f => f.location === a.location).length)[0]?.location || '—'}</span></li>
          </ul>
        </div>
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-amber-700 mb-2">Tips for Farmers</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Keep your profile updated for better support and market access.</li>
            <li>Monitor crop status regularly to maximize yield.</li>
            <li>Connect with your local FPO for resources and training.</li>
            <li>Use the platform to track weather and market trends.</li>
            <li>Contact support for any technical or business queries.</li>
          </ul>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmers</h1>
          <p className="text-gray-600 mt-2">Manage farmer profiles and registrations</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddFarmer(true)}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow-md"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          <span>Add Farmer</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-amber-100 dark:border-amber-800">
        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search farmers by name, location, or crop..."
                className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 bg-white/50"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
              className="rounded-lg border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 bg-white/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="rounded-lg border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 bg-white/50"
            >
              <option value="all">All Locations</option>
              <option value="maharashtra">Maharashtra</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
              <option value="gujarat">Gujarat</option>
              <option value="karnataka">Karnataka</option>
              <option value="madhya pradesh">Madhya Pradesh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 flex items-center justify-between px-4 py-3 rounded-lg shadow-lg ${
              notification.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <span className="flex items-center">
              {notification.type === 'success' ? '✓' : '⚠'} {notification.message}
            </span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Farmer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFarmers.map((farmer) => (
          <motion.div
            key={farmer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-white/50 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${
              // Subtle border and background tint based on primary crop
              farmer.crops[0].name.toLowerCase().includes('wheat') 
                ? 'border border-amber-100 bg-amber-50/30' 
                : farmer.crops[0].name.toLowerCase().includes('rice')
                ? 'border border-green-100 bg-green-50/30'
                : farmer.crops[0].name.toLowerCase().includes('cotton')
                ? 'border border-blue-100 bg-blue-50/30'
                : farmer.crops[0].name.toLowerCase().includes('soybean')
                ? 'border border-yellow-100 bg-yellow-50/30'
                : farmer.crops[0].name.toLowerCase().includes('sugarcane')
                ? 'border border-lime-100 bg-lime-50/30'
                : farmer.crops[0].name.toLowerCase().includes('coffee')
                ? 'border border-amber-200 bg-amber-50/30'
                : farmer.crops[0].name.toLowerCase().includes('tomato') || 
                  farmer.crops[0].name.toLowerCase().includes('chilli') ||
                  farmer.crops[0].name.toLowerCase().includes('onion')
                ? 'border border-red-100 bg-red-50/30'
                : farmer.crops[0].name.toLowerCase().includes('groundnut') ||
                  farmer.crops[0].name.toLowerCase().includes('mustard')
                ? 'border border-yellow-200 bg-yellow-50/30'
                : farmer.crops[0].name.toLowerCase().includes('potato') ||
                  farmer.crops[0].name.toLowerCase().includes('corn')
                ? 'border border-amber-100 bg-amber-50/30'
                : farmer.crops[0].name.toLowerCase().includes('turmeric') ||
                  farmer.crops[0].name.toLowerCase().includes('ginger') ||
                  farmer.crops[0].name.toLowerCase().includes('pepper')
                ? 'border border-orange-100 bg-orange-50/30'
                : 'border border-violet-100 bg-violet-50/30'
            }`}
          >
            {/* Farmer Card Header */}
            <div className={`px-6 py-4 flex items-center justify-between ${
              // Header background based on primary crop
              farmer.crops[0].name.toLowerCase().includes('wheat') 
                ? 'bg-amber-50/50 border-b border-amber-100' 
                : farmer.crops[0].name.toLowerCase().includes('rice')
                ? 'bg-green-50/50 border-b border-green-100'
                : farmer.crops[0].name.toLowerCase().includes('cotton')
                ? 'bg-blue-50/50 border-b border-blue-100'
                : farmer.crops[0].name.toLowerCase().includes('soybean')
                ? 'bg-yellow-50/50 border-b border-yellow-100'
                : farmer.crops[0].name.toLowerCase().includes('sugarcane')
                ? 'bg-lime-50/50 border-b border-lime-100'
                : farmer.crops[0].name.toLowerCase().includes('coffee')
                ? 'bg-amber-100/50 border-b border-amber-200'
                : farmer.crops[0].name.toLowerCase().includes('tomato') || 
                  farmer.crops[0].name.toLowerCase().includes('chilli') ||
                  farmer.crops[0].name.toLowerCase().includes('onion')
                ? 'bg-red-50/50 border-b border-red-100'
                : farmer.crops[0].name.toLowerCase().includes('groundnut') ||
                  farmer.crops[0].name.toLowerCase().includes('mustard')
                ? 'bg-yellow-100/50 border-b border-yellow-200'
                : farmer.crops[0].name.toLowerCase().includes('potato') ||
                  farmer.crops[0].name.toLowerCase().includes('corn')
                ? 'bg-amber-50/50 border-b border-amber-100'
                : farmer.crops[0].name.toLowerCase().includes('turmeric') ||
                  farmer.crops[0].name.toLowerCase().includes('ginger') ||
                  farmer.crops[0].name.toLowerCase().includes('pepper')
                ? 'bg-orange-50/50 border-b border-orange-100'
                : 'bg-violet-50/50 border-b border-violet-100'
            }`}>
              <div className="flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white text-xl font-semibold ${
                  // Color based on primary crop type
                  farmer.crops[0].name.toLowerCase().includes('wheat') 
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500' // Wheat
                    : farmer.crops[0].name.toLowerCase().includes('rice')
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500' // Rice
                    : farmer.crops[0].name.toLowerCase().includes('cotton')
                    ? 'bg-gradient-to-br from-blue-400 to-indigo-500' // Cotton
                    : farmer.crops[0].name.toLowerCase().includes('soybean')
                    ? 'bg-gradient-to-br from-yellow-400 to-amber-500' // Soybean
                    : farmer.crops[0].name.toLowerCase().includes('sugarcane')
                    ? 'bg-gradient-to-br from-lime-400 to-green-500' // Sugarcane
                    : farmer.crops[0].name.toLowerCase().includes('coffee')
                    ? 'bg-gradient-to-br from-brown-400 to-amber-700' // Coffee
                    : farmer.crops[0].name.toLowerCase().includes('tomato') || 
                      farmer.crops[0].name.toLowerCase().includes('chilli') ||
                      farmer.crops[0].name.toLowerCase().includes('onion')
                    ? 'bg-gradient-to-br from-red-400 to-rose-500' // Vegetables
                    : farmer.crops[0].name.toLowerCase().includes('groundnut') ||
                      farmer.crops[0].name.toLowerCase().includes('mustard')
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-600' // Oilseeds
                    : farmer.crops[0].name.toLowerCase().includes('potato') ||
                      farmer.crops[0].name.toLowerCase().includes('corn')
                    ? 'bg-gradient-to-br from-amber-300 to-yellow-500' // Staples
                    : farmer.crops[0].name.toLowerCase().includes('turmeric') ||
                      farmer.crops[0].name.toLowerCase().includes('ginger') ||
                      farmer.crops[0].name.toLowerCase().includes('pepper')
                    ? 'bg-gradient-to-br from-orange-400 to-red-500' // Spices
                    : 'bg-gradient-to-br from-violet-400 to-purple-500' // Default
                }`}>
                  {farmer.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{farmer.name}</h3>
                  <p className="text-sm text-gray-600">{farmer.location}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                farmer.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {farmer.status}
              </span>
            </div>

            {/* Farmer Card Content */}
            <div className="p-6 space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span className="text-sm">{farmer.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">{farmer.email}</span>
                </div>
              </div>

              {/* Crops */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Current Crops</h4>
                {farmer.crops.map((crop, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-amber-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 text-amber-600 mr-2" />
                      <span className="text-sm text-gray-900">{crop.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{crop.area}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        crop.status === 'growing'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {crop.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedFarmer(farmer)
                    setShowDetails(true)
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-amber-50"
                >
                  <FileText className="h-5 w-5 text-amber-600" />
                  <span className="text-xs text-gray-600 mt-1">Details</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedFarmer(farmer)
                    setShowMessage(true)
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-amber-50"
                >
                  <MessageSquare className="h-5 w-5 text-amber-600" />
                  <span className="text-xs text-gray-600 mt-1">Message</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedFarmer(farmer)
                    setShowAnalytics(true)
                  }}
                  className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-amber-50"
                >
                  <LineChart className="h-5 w-5 text-amber-600" />
                  <span className="text-xs text-gray-600 mt-1">Analytics</span>
                </motion.button>
              </div>

              {/* Message Modal */}
              <AnimatePresence>
                {showMessage && selectedFarmer?.id === farmer.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowMessage(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
                        <h2 className="text-lg font-semibold">Message {farmer.name}</h2>
                      </div>
                      <div className="p-6">
                        <textarea
                          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="Type your message..."
                        ></textarea>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
                        <button
                          onClick={() => setShowMessage(false)}
                          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            setShowMessage(false)
                            setNotification({
                              type: 'success',
                              message: `Message sent to ${farmer.name}`
                            })
                          }}
                          className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
                        >
                          Send Message
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Analytics Modal */}
              <AnimatePresence>
                {showAnalytics && selectedFarmer?.id === farmer.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowAnalytics(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
                        <h2 className="text-lg font-semibold">Analytics for {farmer.name}</h2>
                      </div>
                      <div className="p-6">
                        <div className="space-y-4">
                          {/* Sample Analytics */}
                          <div>
                            <h3 className="font-medium mb-2">Crop Performance</h3>
                            <div className="bg-gray-100 rounded-lg p-4">
                              {farmer.crops.map((crop, i) => (
                                <div key={i} className="flex justify-between items-center mb-2">
                                  <span>{crop.name}</span>
                                  <span className="font-medium">{crop.area}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => setShowAnalytics(false)}
                          className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Details Modal */}
              <AnimatePresence>
                {showDetails && selectedFarmer?.id === farmer.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowDetails(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
                        <h2 className="text-lg font-semibold">Farmer Details</h2>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="font-medium">{farmer.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-medium">{farmer.location}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Contact</p>
                            <p className="font-medium">{farmer.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{farmer.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Total Area</p>
                            <p className="font-medium">{farmer.totalArea}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Status</p>
                            <p className="font-medium capitalize">{farmer.status}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium mb-2">Current Crops</h3>
                          <div className="space-y-2">
                            {farmer.crops.map((crop, i) => (
                              <div key={i} className="p-3 bg-amber-50 rounded-lg">
                                <div className="flex justify-between">
                                  <span className="font-medium">{crop.name}</span>
                                  <span>{crop.area}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 capitalize">{crop.status}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                        <button
                          onClick={() => setShowDetails(false)}
                          className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
                        >
                          Close
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Farmer Modal */}
      <AnimatePresence>
        {showAddFarmer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setShowAddFarmer(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden"
            >
              <div className="px-6 py-4 bg-amber-50 border-b border-amber-100">
                <h2 className="text-xl font-semibold text-gray-900">Add New Farmer</h2>
                <p className="text-sm text-gray-600 mt-1">Enter farmer details to register</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newFarmer.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newFarmer.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={newFarmer.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <select
                      name="location"
                      value={newFarmer.location}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                      required
                    >
                      <option value="">Select Location</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farm Details</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600">Total Area</label>
                      <input
                        type="text"
                        name="totalArea"
                        value={newFarmer.totalArea}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., 10 acres"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600">Primary Crop</label>
                      <input
                        type="text"
                        name="primaryCrop"
                        value={newFarmer.primaryCrop}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500"
                        placeholder="e.g., Soybean"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between">
                <div className="text-sm text-red-600">
                  {notification?.type === 'error' && notification.message}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowAddFarmer(false)
                      setNewFarmer({
                        name: '',
                        phone: '',
                        email: '',
                        location: '',
                        totalArea: '',
                        primaryCrop: ''
                      })
                      setNotification(null)
                    }}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFarmer}
                    className="px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg"
                  >
                    Add Farmer
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {farmers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-12 text-center"
        >
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Farmers Found</h3>
          <p className="text-gray-600 mb-6">Start by adding your first farmer to the platform</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddFarmer(true)}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            <span>Add First Farmer</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
