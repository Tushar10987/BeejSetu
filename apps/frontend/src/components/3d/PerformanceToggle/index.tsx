import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Battery, Power } from 'lucide-react'

interface PerformanceToggleProps {
  mode: 'high' | 'balanced' | 'low'
  onModeChange: (mode: 'high' | 'balanced' | 'low') => void
}

export default function PerformanceToggle({ mode, onModeChange }: PerformanceToggleProps) {
  const modes = [
    {
      id: 'high' as const,
      label: 'High',
      icon: Zap,
      description: '60 FPS target, all effects',
      color: 'text-green-600 bg-green-50',
    },
    {
      id: 'balanced' as const,
      label: 'Balanced',
      icon: Battery,
      description: '45 FPS target, some effects',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      id: 'low' as const,
      label: 'Low',
      icon: Power,
      description: '30 FPS target, minimal effects',
      color: 'text-red-600 bg-red-50',
    },
  ]

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 p-3">
      <div className="flex items-center space-x-2">
        {modes.map((modeOption) => {
          const Icon = modeOption.icon
          const isActive = mode === modeOption.id
          
          return (
            <motion.button
              key={modeOption.id}
              onClick={() => onModeChange(modeOption.id)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${isActive 
                  ? `${modeOption.color} border-2 border-current` 
                  : 'text-gray-600 hover:bg-gray-50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-4 w-4" />
              <span>{modeOption.label}</span>
            </motion.button>
          )
        })}
      </div>
      
      {/* Performance Info */}
      <div className="mt-2 pt-2 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p className="font-medium">Current Mode: {modes.find(m => m.id === mode)?.label}</p>
          <p>{modes.find(m => m.id === mode)?.description}</p>
        </div>
      </div>
    </div>
  )
}

