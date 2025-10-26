import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './Sidebar'
import Header from './Header'
import MobileSidebar from './MobileSidebar'
import FooterBlackBox from './FooterBlackBox'
import { pageThemes } from '../utils/theme'
import ChatBot from './ChatBot/ChatBot'

interface LayoutProps {
  children?: React.ReactNode;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 1
};

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const [currentTheme, setCurrentTheme] = useState(pageThemes.dashboard)

  useEffect(() => {
    // Extract the page name from the current path
    const pageName = location.pathname.split('/')[1] || 'dashboard'
    setCurrentTheme(pageThemes[pageName as keyof typeof pageThemes] || pageThemes.dashboard)
    
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.background}`}>
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <MobileSidebar onClose={() => setSidebarOpen(false)} />
        )}
      </AnimatePresence>

      {/* Hamburger button */}
      <motion.button
        onClick={toggleSidebar}
        className="fixed top-3 z-50 p-1.5 rounded-md bg-gray-900/90 hover:bg-gray-800 transition-all duration-300 ease-in-out backdrop-blur-sm shadow-lg"
        initial={{ x: 12 }}
        animate={{
          x: sidebarOpen ? 184 : 12
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative w-4 h-4">
          <motion.div 
            className="absolute top-0 h-[1.5px] bg-white rounded-full w-full origin-center"
            animate={{ 
              rotate: sidebarOpen ? 45 : 0,
              y: sidebarOpen ? 1.75 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
          <motion.div 
            className="absolute top-1/2 -mt-[0.75px] h-[1.5px] bg-white rounded-full w-full"
            animate={{ 
              opacity: sidebarOpen ? 0 : 1,
              x: sidebarOpen ? 4 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
          <motion.div 
            className="absolute bottom-0 h-[1.5px] bg-white rounded-full w-full origin-center"
            animate={{ 
              rotate: sidebarOpen ? -45 : 0,
              y: sidebarOpen ? -1.75 : 0
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </div>
      </motion.button>

      {/* Desktop sidebar */}
      <motion.div 
        className="fixed inset-y-0 flex flex-col bg-gray-900/95 backdrop-blur-sm shadow-2xl"
        style={{ width: '200px' }}
        initial={{ x: -200 }}
        animate={{ 
          x: sidebarOpen ? 0 : -200,
          boxShadow: sidebarOpen ? "4px 0 25px rgba(0,0,0,0.1)" : "none"
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <Sidebar />
      </motion.div>

      {/* Main content */}
      <motion.div 
        className="min-h-screen"
        animate={{ 
          paddingLeft: sidebarOpen ? 200 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="py-6 min-h-[calc(100vh-4rem-16rem)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={springTransition}
              className="h-full"
            >
              {children || <Outlet />}
            </motion.div>
          </div>
        </main>
        <FooterBlackBox />
      </motion.div>
      <ChatBot />
    </div>
  );
};

export default Layout;
