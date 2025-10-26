import React from 'react'
import { useNavigate } from 'react-router-dom'
import LiveDot from '../components/LiveDot'
import { motion } from 'framer-motion'
import {
  Users,
  Building2,
  Factory,
  Store,
  TrendingUp,
  Package,
  Map,
  Route,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const stats = [
  { name: 'Total Farmers', value: '1,247', icon: Users, change: '+12%', changeType: 'positive' },
  { name: 'Active FPOs', value: '23', icon: Building2, change: '+5%', changeType: 'positive' },
  { name: 'Processors', value: '8', icon: Factory, change: '+2%', changeType: 'positive' },
  { name: 'Retailers', value: '156', icon: Store, change: '+8%', changeType: 'positive' },
  { name: 'Total Batches', value: '3,421', icon: Package, change: '+15%', changeType: 'positive' },
  { name: 'Active Routes', value: '47', icon: Route, change: '+3%', changeType: 'positive' },
]

const recentActivities = [
  {
    id: 1,
    type: 'procurement',
    message: 'New procurement request from Farmer John',
    time: '2 minutes ago',
    status: 'pending',
  },
  {
    id: 2,
    type: 'delivery',
    message: 'Batch #1234 delivered to Warehouse A',
    time: '15 minutes ago',
    status: 'completed',
  },
  {
    id: 3,
    type: 'weather',
    message: 'Weather advisory issued for Region B',
    time: '1 hour ago',
    status: 'warning',
  },
  {
    id: 4,
    type: 'quality',
    message: 'Quality check completed for Batch #1233',
    time: '2 hours ago',
    status: 'completed',
  },
]

import { Search } from 'lucide-react'

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      {/* Live Indicator Header */}
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          Dashboard
          <LiveDot size={12} />
          <span className="text-xs font-semibold text-red-600 ml-1">LIVE</span>
        </h1>
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to the Oilseeds Value Chain Platform
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="relative max-w-2xl mx-auto"
      >
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Search className="h-6 w-6 text-blue-600" />
        </div>
        <input
          type="text"
          placeholder="Search farmers, batches, analytics, and more..."
          className="w-full pl-14 pr-4 py-4 rounded-2xl border-2 border-violet-500 bg-white text-lg text-gray-900 shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-600 placeholder-gray-500 font-medium transition-all"
        />
      </motion.div>

      {/* Platform Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Platform Overview</h2>
        <p className="text-gray-700 mb-2">
          BeejSetu connects farmers, FPOs, processors, and retailers to create a transparent, efficient, and profitable oilseeds value chain. Track batches, monitor analytics, and access real-time market trends—all in one place.
        </p>
        <a href="/help" className="text-blue-600 hover:underline text-sm">Read documentation &rarr;</a>
      </motion.div>

      {/* Market Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">Commodity</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Price</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Change</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Trend</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Soybean</td>
                <td className="px-4 py-2">₹4,250/qtl</td>
                <td className="px-4 py-2 text-green-600 font-semibold flex items-center gap-1">+2.1% <ArrowUpRight className="inline h-4 w-4 text-green-600" /></td>
                <td className="px-4 py-2 text-green-600">Bullish</td>
                <td className="px-4 py-2 text-gray-500">Strong demand, steady exports</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Mustard</td>
                <td className="px-4 py-2">₹5,100/qtl</td>
                <td className="px-4 py-2 text-red-600 font-semibold flex items-center gap-1">-1.3% <ArrowDownRight className="inline h-4 w-4 text-red-600" /></td>
                <td className="px-4 py-2 text-red-600">Bearish</td>
                <td className="px-4 py-2 text-gray-500">Increased arrivals in mandis</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Groundnut</td>
                <td className="px-4 py-2">₹5,800/qtl</td>
                <td className="px-4 py-2 text-green-600 font-semibold flex items-center gap-1">+0.7% <ArrowUpRight className="inline h-4 w-4 text-green-600" /></td>
                <td className="px-4 py-2 text-green-600">Stable</td>
                <td className="px-4 py-2 text-gray-500">Export orders, low stocks</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Sunflower</td>
                <td className="px-4 py-2">₹6,200/qtl</td>
                <td className="px-4 py-2 text-green-600 font-semibold flex items-center gap-1">+1.9% <ArrowUpRight className="inline h-4 w-4 text-green-600" /></td>
                <td className="px-4 py-2 text-green-600">Bullish</td>
                <td className="px-4 py-2 text-gray-500">Lower production estimates</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Sesame</td>
                <td className="px-4 py-2">₹13,400/qtl</td>
                <td className="px-4 py-2 text-green-600 font-semibold flex items-center gap-1">+3.2% <ArrowUpRight className="inline h-4 w-4 text-green-600" /></td>
                <td className="px-4 py-2 text-green-600">Top Gainer</td>
                <td className="px-4 py-2 text-gray-500">Strong export demand</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-medium">Cottonseed</td>
                <td className="px-4 py-2">₹2,950/qtl</td>
                <td className="px-4 py-2 text-red-600 font-semibold flex items-center gap-1">-0.8% <ArrowDownRight className="inline h-4 w-4 text-red-600" /></td>
                <td className="px-4 py-2 text-red-600">Bearish</td>
                <td className="px-4 py-2 text-gray-500">Arrivals increase post-harvest</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 text-xs text-gray-500">Last updated: Today, 10:00 AM</div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions & Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="bg-white shadow rounded-lg p-6"
      >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
          <button
            className="btn btn-primary flex items-center justify-center space-x-2 text-black"
            onClick={() => navigate('/3d-map')}
          >
            <Map className="h-5 w-5" />
            <span>View 3D Map</span>
          </button>
          <button
            className="btn btn-outline flex items-center justify-center space-x-2 text-black"
            onClick={() => navigate('/traceability')}
          >
            <Route className="h-5 w-5" />
            <span>Track Batch</span>
          </button>
          <button
            className="btn btn-outline flex items-center justify-center space-x-2 text-black"
            onClick={() => navigate('/storage')}
          >
            <Package className="h-5 w-5" />
            <span>Manage Inventory</span>
          </button>
          <button
            className="btn btn-outline flex items-center justify-center space-x-2 text-black"
            onClick={() => navigate('/analytics')}
          >
            <TrendingUp className="h-5 w-5" />
            <span>View Analytics</span>
          </button>
        </div>
        <div className="mt-2">
          <span className="text-gray-700 text-sm">Need help? </span>
          <a href="/help" className="text-blue-600 hover:underline text-sm">Contact Support</a>
        </div>
      </motion.div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="bg-white shadow rounded-lg"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activities</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="px-6 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.status === 'pending' ? 'bg-yellow-400' :
                    activity.status === 'completed' ? 'bg-green-400' :
                    activity.status === 'warning' ? 'bg-red-400' : 'bg-gray-400'
                  }`} />
                  <p className="text-sm text-gray-900">{activity.message}</p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

