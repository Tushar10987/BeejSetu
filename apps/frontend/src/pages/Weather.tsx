import React, { useState, useEffect } from 'react'
import { CloudRain, Thermometer, Wind, Droplets, Sun, CloudLightning, AlertTriangle, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

// In a real app, this would come from your environment variables
const API_KEY = 'YOUR_OPENWEATHER_API_KEY'

interface WeatherData {
  current: {
    temp: number
    humidity: number
    windSpeed: number
    condition: string
  }
  forecast: Array<{
    date: string
    temp: { min: number; max: number }
    condition: string
  }>
}

const weatherAdvisories = [
  {
    id: 1,
    type: 'warning',
    message: 'Heavy rainfall expected in the next 48 hours. Consider postponing pesticide application.',
    region: 'Western Maharashtra',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'info',
    message: 'Optimal conditions for wheat harvesting in the coming week.',
    region: 'Central Region',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    type: 'alert',
    message: 'Heat wave conditions likely to persist. Ensure proper irrigation.',
    region: 'Southern Districts',
    timestamp: '1 day ago'
  }
]

export default function Weather() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    current: {
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      condition: 'Partly Cloudy'
    },
    forecast: [
      { date: '2025-10-27', temp: { min: 22, max: 30 }, condition: 'Sunny' },
      { date: '2025-10-28', temp: { min: 23, max: 31 }, condition: 'Cloudy' },
      { date: '2025-10-29', temp: { min: 21, max: 29 }, condition: 'Rain' },
      { date: '2025-10-30', temp: { min: 20, max: 28 }, condition: 'Thunderstorm' },
      { date: '2025-10-31', temp: { min: 22, max: 30 }, condition: 'Partly Cloudy' },
    ]
  })

  useEffect(() => {
    // In a real application, you would fetch live weather data here
    // Example:
    // fetch(\`https://api.openweathermap.org/data/2.5/forecast?q=YourCity&appid=\${API_KEY}\`)
    //   .then(response => response.json())
    //   .then(data => {
    //     // Transform and set weather data
    //   })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Weather & Advisories</h1>
        <p className="text-gray-600 mt-2">Real-time weather updates and agricultural guidance</p>
      </div>

      {/* Weather Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Sun className="h-8 w-8 text-yellow-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{weatherData.current.temp}°C</div>
          <div className="text-sm text-gray-600">Current Temp</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Droplets className="h-8 w-8 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{weatherData.current.humidity}%</div>
          <div className="text-sm text-gray-600">Humidity</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <Wind className="h-8 w-8 text-cyan-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{weatherData.current.windSpeed} km/h</div>
          <div className="text-sm text-gray-600">Wind Speed</div>
        </div>
        <div className="bg-white/70 rounded-xl shadow p-6 flex flex-col items-center">
          <CloudLightning className="h-8 w-8 text-indigo-400 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{weatherAdvisories.length}</div>
          <div className="text-sm text-gray-600">Active Advisories</div>
        </div>
      </div>

      {/* Insights & Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Weather Insights</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Most common condition: <span className="font-medium">{weatherData.forecast.sort((a, b) => weatherData.forecast.filter(x => x.condition === b.condition).length - weatherData.forecast.filter(x => x.condition === a.condition).length)[0]?.condition || '—'}</span></li>
            <li>Highest temp forecast: <span className="font-medium">{Math.max(...weatherData.forecast.map(f => f.temp.max))}°C</span></li>
            <li>Lowest temp forecast: <span className="font-medium">{Math.min(...weatherData.forecast.map(f => f.temp.min))}°C</span></li>
            <li>Most advisories: <span className="font-medium">{weatherAdvisories.sort((a, b) => b.type.localeCompare(a.type))[0]?.region || '—'}</span></li>
          </ul>
        </div>
        <div className="bg-white/60 rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-blue-700 mb-2">Tips for Weather & Crops</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
            <li>Monitor advisories for timely action on your farm.</li>
            <li>Plan irrigation and pesticide use based on forecast.</li>
            <li>Use the platform for real-time weather and alerts.</li>
            <li>Contact local experts for region-specific advice.</li>
            <li>Leverage advisories to reduce risk and maximize yield.</li>
          </ul>
        </div>
      </div>

      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-white/20 p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <CloudRain className="h-16 w-16 text-blue-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{weatherData.current.temp}°C</h2>
                <p className="text-lg text-gray-600">{weatherData.current.condition}</p>
                <p className="text-sm text-gray-500 mt-1">Maharashtra, India</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 border-l border-gray-200 pl-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Thermometer className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Feels like {weatherData.current.temp}°C</span>
              </div>
              <div className="flex items-center">
                <Wind className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Wind {weatherData.current.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <Droplets className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-600">Humidity {weatherData.current.humidity}%</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 border-l border-gray-200 pl-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Agricultural Advisory</h3>
            <p className="text-sm text-gray-600">
              Current conditions are suitable for crop maintenance. Moderate humidity levels are ideal for crop growth.
            </p>
          </div>
        </div>
      </motion.div>

      {/* 5-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-white/20"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">5-Day Forecast</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {weatherData.forecast.map((day, index) => (
            <div key={day.date} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </span>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Min</span>
                    <span className="text-sm font-medium text-gray-900">{day.temp.min}°C</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">Max</span>
                    <span className="text-sm font-medium text-gray-900">{day.temp.max}°C</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-900">{day.condition}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weather Advisories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-white/80 backdrop-blur-sm shadow-lg rounded-lg border border-white/20"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Weather Advisories</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {weatherAdvisories.map((advisory, index) => (
            <motion.div
              key={advisory.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="px-6 py-4"
            >
              <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 rounded-full p-1 ${
                  advisory.type === 'warning' ? 'bg-yellow-100' :
                  advisory.type === 'alert' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  <AlertTriangle className={`h-5 w-5 ${
                    advisory.type === 'warning' ? 'text-yellow-600' :
                    advisory.type === 'alert' ? 'text-red-600' : 'text-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{advisory.message}</p>
                  <div className="mt-1 flex items-center text-xs text-gray-500">
                    <span>{advisory.region}</span>
                    <span className="mx-2">•</span>
                    <span>{advisory.timestamp}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

