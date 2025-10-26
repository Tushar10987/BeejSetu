import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Map3D = lazy(() => import('./pages/Map3D'))
const Traceability = lazy(() => import('./pages/Traceability'))
const Farmers = lazy(() => import('./pages/Farmers'))
const FPOs = lazy(() => import('./pages/FPOs'))
const Processors = lazy(() => import('./pages/Processors'))
const Retailers = lazy(() => import('./pages/Retailers'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Credit = lazy(() => import('./pages/Credit'))
const Weather = lazy(() => import('./pages/Weather'))
const Storage = lazy(() => import('./pages/Storage'))
const Settings = lazy(() => import('./pages/Settings'))
const Help = lazy(() => import('./pages/Help'))

function App() {
  return (
    <ErrorBoundary>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-hero-gradient animate-fade-in"
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/3d-map" element={<Map3D />} />
              <Route path="/traceability" element={<Traceability />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/fpos" element={<FPOs />} />
              <Route path="/processors" element={<Processors />} />
              <Route path="/retailers" element={<Retailers />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/credit" element={<Credit />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </motion.div>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}

export default App

