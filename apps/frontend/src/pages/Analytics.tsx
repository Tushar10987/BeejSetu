import { useState } from 'react'
import LiveDot from '../components/LiveDot'
import { motion } from 'framer-motion'
import {
  Download,
  Filter,
  RefreshCcw,
  Maximize2,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

// Custom label for PieChart to fit inside the pie
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const RADIAN = Math.PI / 180;
  // Place label inside the pie
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#222"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const productionData = [
  { month: 'Jan', soybean: 400, wheat: 240, rice: 240 },
  { month: 'Feb', soybean: 300, wheat: 139, rice: 221 },
  { month: 'Mar', soybean: 200, wheat: 980, rice: 229 },
  { month: 'Apr', soybean: 278, wheat: 390, rice: 200 },
  { month: 'May', soybean: 189, wheat: 480, rice: 218 },
  { month: 'Jun', soybean: 239, wheat: 380, rice: 250 },
  { month: 'Jul', soybean: 349, wheat: 430, rice: 210 },
  { month: 'Aug', soybean: 400, wheat: 240, rice: 240 },
  { month: 'Sep', soybean: 300, wheat: 139, rice: 221 },
  { month: 'Oct', soybean: 200, wheat: 980, rice: 229 },
  { month: 'Nov', soybean: 278, wheat: 390, rice: 200 },
  { month: 'Dec', soybean: 189, wheat: 480, rice: 218 },
];

const revenueData = [
  { name: 'Soybean', value: 400 },
  { name: 'Wheat', value: 300 },
  { name: 'Rice', value: 300 },
  { name: 'Cotton', value: 200 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedMetric, setSelectedMetric] = useState('production')

  const stats = [
    {
      title: 'Total Production',
      value: '12,456',
      unit: 'tons',
      change: '+14.6%',
      trend: 'up',
    },
    {
      title: 'Active Farmers',
      value: '1,893',
      change: '+7.2%',
      trend: 'up',
    },
    {
      title: 'Revenue',
      value: '₹2.4Cr',
      change: '+20.1%',
      trend: 'up',
    },
    {
      title: 'Avg. Yield',
      value: '2.8',
      unit: 'tons/acre',
      change: '+4.3%',
      trend: 'up',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            Analytics
            <LiveDot size={12} />
            <span className="text-xs font-semibold text-red-600 ml-1">LIVE</span>
          </h1>
          <p className="text-gray-600 mt-2">Performance metrics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-500 bg-white/50"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 shadow-md"
          >
            <Download className="h-5 w-5 mr-2" />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-violet-100 dark:border-violet-800 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600">{stat.title}</h3>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${
                stat.trend === 'up' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">
              {stat.value}
              {stat.unit && <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Production Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-violet-100 dark:border-violet-800 overflow-hidden"
        >
          <div className="px-6 py-4 bg-violet-50/50 border-b border-violet-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Production Trends</h2>
              <p className="text-sm text-gray-600">Monthly production by crop type</p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <Maximize2 className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <RefreshCcw className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
          <div className="p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="soybean" fill="#8884d8" />
                <Bar dataKey="wheat" fill="#82ca9d" />
                <Bar dataKey="rice" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Revenue Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-violet-100 dark:border-violet-800 overflow-hidden"
        >
          <div className="px-6 py-4 bg-violet-50/50 border-b border-violet-100 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Revenue Distribution</h2>
              <p className="text-sm text-gray-600">Revenue share by crop type</p>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <Maximize2 className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
              >
                <RefreshCcw className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
          <div className="p-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Detailed Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg border border-violet-100 dark:border-violet-800 overflow-hidden"
      >
        <div className="px-6 py-4 bg-violet-50/50 border-b border-violet-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Performance Metrics</h2>
            <p className="text-sm text-gray-600">Detailed performance analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="rounded-lg border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-violet-500 bg-white/50"
            >
              <option value="production">Production</option>
              <option value="revenue">Revenue</option>
              <option value="yield">Yield</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-white/50 text-gray-600"
            >
              <Filter className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
        <div className="p-6 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="soybean"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="wheat" stroke="#82ca9d" />
              <Line type="monotone" dataKey="rice" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  )
}

