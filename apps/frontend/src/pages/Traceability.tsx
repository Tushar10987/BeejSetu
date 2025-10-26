import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Package, Map, Truck, Building2, Store, CheckCircle, QrCode, 
  Download, Share2, Filter, Printer, BarChart2, Camera, Thermometer, Droplets,
  History
} from 'lucide-react'
import { BatchData } from '../types'
import { suggestedBatchIds, mockBatchData } from '../utils/batchData'

export default function Traceability() {
  const [batchId, setBatchId] = useState('')
  const [batchData, setBatchData] = useState<BatchData | null>(null)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('all')
  const [recentBatches, setRecentBatches] = useState<string[]>(['SOYB-2024-001', 'WHET-2024-002'])

  const handleSearch = () => {
    if (mockBatchData[batchId]) {
      setBatchData(mockBatchData[batchId])
      if (!recentBatches.includes(batchId)) {
        setRecentBatches(prev => [batchId, ...prev].slice(0, 5))
      }
    }
  }

  const getEventIcon = (eventType: string) => {
    switch (eventType) {
      case 'harvest':
        return Package
      case 'collection':
        return Map
      case 'storage':
        return Building2
      case 'processing':
        return Truck
      case 'delivery':
        return Store
      default:
        return CheckCircle
    }
  }

  const getEventColor = (eventType: string) => {
    switch (eventType) {
      case 'harvest':
        return 'bg-green-100 text-green-800'
      case 'collection':
        return 'bg-blue-100 text-blue-800'
      case 'storage':
        return 'bg-purple-100 text-purple-800'
      case 'processing':
        return 'bg-orange-100 text-orange-800'
      case 'delivery':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Batch Traceability</h1>
        <p className="text-gray-600 mt-2">
          Track your batch journey from farm to retailer
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 dark:border-primary-800">
        <div className="p-6 space-y-4">
          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="Enter Batch ID or scan QR code"
                className="block w-full rounded-lg border-0 py-3 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 bg-white/50"
                list="batch-suggestions"
              />
              <datalist id="batch-suggestions">
                {suggestedBatchIds.map(id => (
                  <option key={id} value={id} />
                ))}
              </datalist>
            </div>
            
            {/* Recent Batches */}
            <div className="flex flex-wrap gap-2">
              {recentBatches.map(id => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setBatchId(id)
                    handleSearch()
                  }}
                  className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm text-gray-700"
                >
                  <History className="h-4 w-4 mr-1" />
                  {id}
                </motion.button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQRScanner(!showQRScanner)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200"
              >
                <QrCode className="h-5 w-5 mr-2" />
                <span>Scan QR</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="inline-flex items-center px-6 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 shadow-md"
              >
                <Search className="h-5 w-5 mr-2" />
                <span>Search</span>
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center text-sm">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Filter by:</span>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 bg-white/50 sm:text-sm"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-500 bg-white/50 sm:text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* QR Scanner */}
          <AnimatePresence>
            {showQRScanner && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="relative overflow-hidden rounded-lg bg-gray-900"
              >
                <div className="aspect-video flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                  <p className="absolute bottom-4 text-sm text-gray-400">Camera access required for QR scanning</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Batch Info */}
      {batchData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 dark:border-primary-800 overflow-hidden"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-primary-50/50 border-b border-primary-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Batch Information</h2>
              <p className="text-sm text-gray-600 mt-1">Last updated: Just now</p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <Download className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <Printer className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <p className="text-xs text-gray-500">Batch</p>
                <p className="text-sm font-medium">{batchData.batchNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Crop</p>
                <p className="text-sm font-medium">{batchData.cropType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Farmer</p>
                <p className="text-sm font-medium">{batchData.farmer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-medium">{batchData.farm}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Status</p>
                <div className="flex items-center gap-1">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">{batchData.currentTemperature}°C</span>
                  <Droplets className="h-4 w-4 text-blue-500 ml-2" />
                  <span className="text-sm">{batchData.currentHumidity}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Quality</p>
                <p className="text-sm font-medium">{batchData.quality} • {batchData.quantity}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Timeline */}
      {batchData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-primary-100 dark:border-primary-800 overflow-hidden"
        >
          <div className="px-6 py-4 bg-primary-50/50 border-b border-primary-100 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Journey Timeline</h2>
              <p className="text-sm text-gray-600 mt-1">Real-time tracking updates</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200"
            >
              <BarChart2 className="h-5 w-5 mr-2" />
              <span>View Analytics</span>
            </motion.button>
          </div>
          
          <div className="p-6">
            <div className="space-y-8">
              {batchData.events.map((event, index) => {
                const Icon = getEventIcon(event.eventType)
                const isCompleted = event.status === 'completed'
                const isInProgress = event.status === 'in_progress'
                const colorClass = getEventColor(event.eventType)

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Connecting Line */}
                    {index < batchData.events.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200" />
                    )}

                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`relative flex items-center justify-center h-12 w-12 rounded-full ${
                          isCompleted
                            ? 'bg-green-500 shadow-lg shadow-green-200'
                            : isInProgress
                            ? 'bg-blue-500 shadow-lg shadow-blue-200 animate-pulse'
                            : 'bg-gray-300'
                        }`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold capitalize flex items-center">
                            {event.eventType}
                            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${colorClass}`}>
                              {event.status === 'completed' ? 'Completed' : 'In Progress'}
                            </span>
                          </h3>
                          <span className="text-sm text-gray-500">{event.timestamp}</span>
                        </div>
                        
                        <p className="text-gray-600 mb-2">{event.actor} • {event.location}</p>
                        
                        {/* Environmental Data */}
                        {(event.temperature || event.humidity) && (
                          <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600">
                            {event.temperature && (
                              <div className="flex items-center">
                                <Thermometer className="h-4 w-4 text-orange-500 mr-1" />
                                <span>{event.temperature}°C</span>
                              </div>
                            )}
                            {event.humidity && (
                              <div className="flex items-center">
                                <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                                <span>{event.humidity}%</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!batchData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-lg shadow p-12 text-center"
        >
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Batch Selected
          </h3>
          <p className="text-gray-600 mb-4">
            Enter a batch ID or try one of these sample batches:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedBatchIds.map(id => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setBatchId(id)
                  handleSearch()
                }}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200"
              >
                {id}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

