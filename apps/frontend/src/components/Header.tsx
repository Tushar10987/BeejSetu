import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react'

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  const notifications = [
    {
      id: 1,
      title: 'New procurement request',
      message: 'Farmer John has submitted a new procurement request',
      time: '2 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Weather advisory',
      message: 'Heavy rainfall expected in your area',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Storage alert',
      message: 'Warehouse temperature is above threshold',
      time: '3 hours ago',
      unread: false,
    },
  ]

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    // Apply theme logic here
  }

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 animate-fade-in dark:bg-gray-900/80 dark:border-gray-700">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/50 via-accent-100/30 to-secondary-100/50 dark:from-primary-900/20 dark:via-accent-900/10 dark:to-secondary-900/20" />

      {/* Main content on top of gradient */}
      <div className="relative z-10 flex w-full items-center">
        {/* Mobile menu button */}
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden hover:bg-white/50 rounded-lg transition-all duration-200 ease-in-out"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          {/* Search */}
          <form className="relative flex flex-1" action="#" method="GET">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search-field"
                className="block h-10 w-full rounded-full border-0 bg-white/50 py-0 pl-10 pr-4 text-gray-900 backdrop-blur-sm placeholder:text-gray-400 focus:ring-2 focus:ring-primary-500 sm:text-sm"
                placeholder="Search anything..."
                type="search"
                name="search"
              />
            </div>
          </form>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            {/* Theme toggle */}
            <motion.button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-gray-400 hover:bg-white hover:text-gray-600 hover:shadow-md transition-all duration-200"
              onClick={() => handleThemeChange(theme === 'light' ? 'dark' : 'light')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Toggle theme</span>
              {theme === 'light' ? (
                <Sun className="h-5 w-5" />
              ) : theme === 'dark' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Monitor className="h-5 w-5" />
              )}
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-gray-400 hover:bg-white hover:text-gray-600 hover:shadow-md transition-all duration-200"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen)
                  setIsUserMenuOpen(false)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
                )}
              </motion.button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-10 mt-2 w-80 origin-top-right overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="border-b border-gray-100 bg-gradient-to-r from-primary-50 to-secondary-50 px-4 py-3">
                      <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto overscroll-contain">
                      {notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`group cursor-pointer border-l-4 px-4 py-3 transition-colors hover:bg-gray-50 ${
                            notification.unread
                              ? 'border-primary-500 bg-primary-50/50'
                              : 'border-transparent'
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1 space-y-1">
                              <p className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-600">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <div className="ml-3 mt-1 h-2 w-2 rounded-full bg-primary-500 group-hover:animate-ping" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Separator */}
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

            {/* Profile dropdown */}
            <div className="relative">
              <motion.button
                type="button"
                className="flex items-center gap-x-3 rounded-full bg-white/50 py-1.5 pl-2 pr-4 text-sm font-medium text-gray-900 hover:bg-white hover:shadow-md transition-all duration-200"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen)
                  setIsNotificationsOpen(false)
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative h-8 w-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400 to-secondary-500 animate-pulse-slow" />
                  <div className="absolute inset-0.5 flex items-center justify-center rounded-full bg-white">
                    <span className="text-sm font-medium text-gray-900">U</span>
                  </div>
                </div>
                <span className="hidden lg:block">User Name</span>
              </motion.button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-900">User Name</p>
                      <p className="truncate text-sm text-gray-500">user@example.com</p>
                    </div>
                    <div className="py-1">
                      <motion.a
                        whileHover={{ x: 4 }}
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <User className="mr-3 h-4 w-4" />
                        Your Profile
                      </motion.a>
                      <motion.a
                        whileHover={{ x: 4 }}
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </motion.a>
                    </div>
                    <div className="py-1">
                      <motion.a
                        whileHover={{ x: 4 }}
                        href="#"
                        className="flex items-center px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Sign out
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
