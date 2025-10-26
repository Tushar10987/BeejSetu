import React from 'react'
import { CreditCard, Shield, TrendingUp, Users, AlertCircle, CheckCircle2, Clock, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const loanApplications = [
  {
    id: 1,
    farmer: 'Rajesh Kumar',
    amount: '₹2,50,000',
    purpose: 'Equipment Purchase',
    status: 'approved',
    date: '2 days ago',
    creditScore: 750
  },
  {
    id: 2,
    farmer: 'Amit Patel',
    amount: '₹1,75,000',
    purpose: 'Crop Insurance',
    status: 'pending',
    date: '1 day ago',
    creditScore: 720
  },
  {
    id: 3,
    farmer: 'Priya Singh',
    amount: '₹3,00,000',
    purpose: 'Storage Facility',
    status: 'processing',
    date: '5 hours ago',
    creditScore: 780
  }
]

const stats = [
  { 
    name: 'Total Credit Disbursed', 
    value: '₹2.5 Cr', 
    change: '+14%',
    icon: CreditCard 
  },
  { 
    name: 'Active Insurance Policies', 
    value: '234', 
    change: '+8%',
    icon: Shield 
  },
  { 
    name: 'Average Credit Score', 
    value: '725', 
    change: '+5%',
    icon: TrendingUp 
  },
  { 
    name: 'Beneficiary Farmers', 
    value: '450', 
    change: '+12%',
    icon: Users 
  },
]

export default function Credit() {
  return (
    <div className="space-y-6">
      {/* Credit Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <CreditCard className="h-8 w-8 text-indigo-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">₹2.5 Cr</div>
          <div className="text-sm text-gray-600">Total Disbursed</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Shield className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">234</div>
          <div className="text-sm text-gray-600">Active Policies</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <TrendingUp className="h-8 w-8 text-emerald-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">725</div>
          <div className="text-sm text-gray-600">Avg. Credit Score</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Users className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">450</div>
          <div className="text-sm text-gray-600">Beneficiaries</div>
        </div>
      </div>

      {/* Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Credit Insights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Highest loan: <span className="font-medium">{loanApplications.sort((a, b) => parseInt(b.amount.replace(/[^\d]/g, '')) - parseInt(a.amount.replace(/[^\d]/g, '')))[0]?.farmer || '—'}</span></li>
            <li>Best credit score: <span className="font-medium">{loanApplications.sort((a, b) => b.creditScore - a.creditScore)[0]?.farmer || '—'}</span></li>
            <li>Most recent approval: <span className="font-medium">{loanApplications.find(a => a.status === 'approved')?.farmer || '—'}</span></li>
            <li>Most common purpose: <span className="font-medium">{loanApplications.sort((a, b) => loanApplications.filter(x => x.purpose === b.purpose).length - loanApplications.filter(x => x.purpose === a.purpose).length)[0]?.purpose || '—'}</span></li>
          </ul>
        </div>
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-indigo-700 mb-2">Tips for Credit & Insurance</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Maintain a good credit score for better loan terms.</li>
            <li>Apply for insurance to protect against crop loss.</li>
            <li>Track application status and respond to queries promptly.</li>
            <li>Use the platform for transparent documentation and support.</li>
            <li>Contact support for any credit or insurance queries.</li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Credit & Insurance</h1>
        <p className="text-gray-600 mt-2">Manage farmer loans and insurance policies</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-sm overflow-hidden shadow-lg rounded-lg border border-white/20 px-4 py-5"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <p className="text-sm font-medium text-gray-500 truncate">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                  <p className="ml-2 text-sm font-medium text-green-600">{stat.change}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-6 text-white"
        >
          <h3 className="text-lg font-medium">Apply for Credit</h3>
          <p className="mt-2 text-purple-100">Quick loan application with minimal documentation</p>
          <button className="mt-4 bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors">
            Start Application
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg shadow-lg p-6 text-white"
        >
          <h3 className="text-lg font-medium">Crop Insurance</h3>
          <p className="mt-2 text-blue-100">Protect your harvest with comprehensive coverage</p>
          <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            Get Quote
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg p-6 text-white"
        >
          <h3 className="text-lg font-medium">Financial Advisory</h3>
          <p className="mt-2 text-emerald-100">Expert guidance for your agri-business</p>
          <button className="mt-4 bg-white text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition-colors">
            Book Consultation
          </button>
        </motion.div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-white/20">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {loanApplications.map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="px-6 py-4 hover:bg-gray-50/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900">{application.farmer}</h3>
                    <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {application.status === 'approved' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {application.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {application.status === 'processing' && <AlertCircle className="mr-1 h-3 w-3" />}
                      {application.status}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <span>{application.purpose}</span>
                    <span className="mx-2">•</span>
                    <span>Credit Score: {application.creditScore}</span>
                  </div>
                </div>
                <div className="ml-6 flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{application.amount}</p>
                    <p className="text-sm text-gray-500">{application.date}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

