import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
        <div className="absolute inset-0 rounded-full border-2 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-2 border-t-primary-600 animate-spin" />
        <div className="relative h-full w-full rounded-full bg-white/80 flex items-center justify-center">
          <div className="h-1/3 w-1/3 rounded-full bg-primary-600/80" />
        </div>
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm text-gray-600"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

