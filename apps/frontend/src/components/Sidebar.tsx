import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  Map,
  Route,
  Users,
  Building2,
  Factory,
  Store,
  BarChart3,
  CreditCard,
  CloudRain,
  Package,
  Settings,
  HelpCircle,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: '3D Map', href: '/3d-map', icon: Map },
  { name: 'Traceability', href: '/traceability', icon: Route },
  { name: 'Farmers', href: '/farmers', icon: Users },
  { name: 'FPOs', href: '/fpos', icon: Building2 },
  { name: 'Processors', href: '/processors', icon: Factory },
  { name: 'Retailers', href: '/retailers', icon: Store },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Credit', href: '/credit', icon: CreditCard },
  { name: 'Weather', href: '/weather', icon: CloudRain },
  { name: 'Storage', href: '/storage', icon: Package },
]

const secondaryNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help', href: '/help', icon: HelpCircle },
]

export default function Sidebar() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gray-900 shadow-xl">
      {/* Logo */}
      <div className="flex h-16 flex-shrink-0 items-center px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center space-x-2"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg ring-2 ring-green-500/30 relative overflow-hidden">
            <svg 
              viewBox="0 0 24 24" 
              className="w-5 h-5 text-white absolute"
              fill="currentColor"
            >
              <path d="M6.05 4.14l-.39-.39c-.54-.54-.54-1.41 0-1.96l.39-.39c.54-.54 1.41-.54 1.96 0l.39.39c.54.54.54 1.41 0 1.96l-.39.39c-.54.54-1.41.54-1.96 0zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9l2.86 2.86c.21.21.49.33.79.33.28 0 .55-.11.75-.31l2.83-2.83c.42-.42.39-1.12-.08-1.49-.44-.35-1.08-.33-1.49.08l-2.13 2.13-2.47-2.47C8.49 4.67 10.16 4 12 4c4.42 0 8 3.58 8 8s-3.58 8-8 8z"/>
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                strokeWidth="0.5"
                stroke="currentColor"
                fill="none"
              />
            </svg>
            <motion.div 
              className="absolute w-full h-full bg-gradient-to-tr from-green-300/20 to-transparent"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">BeejSetu</h1>
            <p className="text-[10px] text-blue-300/80 font-medium leading-tight">Connecting every seed</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-2 py-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navigation.map((item, index) => {
            const active = window.location.pathname === item.href
            const getItemColors = () => {
              switch (item.name) {
                case 'Dashboard':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Traceability':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Farmers':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'FPOs':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Processors':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Retailers':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Analytics':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Storage':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Weather':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                case 'Credit':
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
                default:
                  return active ? 'from-blue-800 to-indigo-900 text-blue-100 shadow-blue-900/50' : 'hover:from-blue-800/30 hover:to-indigo-900/30 hover:text-blue-100'
              }
            }
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NavLink
                  to={item.href}
                  className={`group relative flex items-center px-2.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-300 bg-gradient-to-r ${getItemColors()} ${
                    active ? 'shadow-lg' : 'text-gray-400'
                  }`}
                >
                  {active && (
                    <motion.span
                      className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full bg-white"
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors ${
                      active ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`}
                  />
                  {item.name}
                </NavLink>
              </motion.div>
            )
          })}
        </div>

        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="space-y-1">
            {secondaryNavigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (navigation.length + index) * 0.1 }}
              >
                <NavLink
                  to={item.href}
                  className="group flex items-center px-2.5 py-1.5 text-sm font-medium rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-white" />
                  {item.name}
                </NavLink>
              </motion.div>
            ))}
          </div>
        </div>
      </nav>

      {/* User info */}
      <div className="flex-shrink-0 border-t border-gray-800 p-3 bg-gradient-to-r from-gray-900 to-gray-800">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg ring-2 ring-blue-500/30">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">User Name</p>
            <p className="text-xs text-gray-400 truncate">user@example.com</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

