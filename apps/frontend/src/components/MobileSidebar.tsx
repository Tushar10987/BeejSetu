import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Sidebar from './Sidebar'

interface MobileSidebarProps {
  onClose: () => void
}

export default function MobileSidebar({ onClose }: MobileSidebarProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 lg:hidden"
      >
        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={onClose}
        />

        {/* Sidebar */}
        <motion.div
          initial={{ x: -256 }}
          animate={{ x: 0 }}
          exit={{ x: -256 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative flex w-64 flex-col bg-white shadow-xl"
        >
          {/* Close button */}
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Oilseeds</h1>
                <p className="text-xs text-gray-500">Value Chain</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation content */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

