import { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Globe, Bell, Shield, Eye, Monitor, UserCog } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('system');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    updates: true,
    alerts: true,
    marketing: false,
  });
  const [privacy, setPrivacy] = useState({
    shareData: true,
    analytics: true,
    advertising: false,
  });

  const settingsSections = [
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Monitor,
      settings: [
        {
          id: 'theme',
          label: 'Theme',
          description: 'Choose your preferred color scheme',
          control: (
            <div className="flex space-x-4">
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  theme === 'light'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Sun size={16} />
                <span>Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Moon size={16} />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  theme === 'system'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Monitor size={16} />
                <span>System</span>
              </button>
            </div>
          ),
        },
      ],
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: Globe,
      settings: [
        {
          id: 'language',
          label: 'Interface Language',
          description: 'Select your preferred language',
          control: (
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white text-gray-900 rounded-md px-2.5 py-1.5 border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="gu">Gujarati</option>
              <option value="pa">Punjabi</option>
              <option value="bn">Bengali</option>
            </select>
          ),
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          id: 'notification-settings',
          label: 'Notification Preferences',
          description: 'Manage your notification settings',
          control: (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Platform Updates</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications(prev => ({ ...prev, updates: !prev.updates }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notifications.updates ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: notifications.updates ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Price Alerts</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications(prev => ({ ...prev, alerts: !prev.alerts }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notifications.alerts ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: notifications.alerts ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Marketing Updates</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    notifications.marketing ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: notifications.marketing ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
            </div>
          ),
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      settings: [
        {
          id: 'privacy-settings',
          label: 'Privacy Settings',
          description: 'Manage your privacy preferences',
          control: (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Share Usage Data</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPrivacy(prev => ({ ...prev, shareData: !prev.shareData }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    privacy.shareData ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: privacy.shareData ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Analytics</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPrivacy(prev => ({ ...prev, analytics: !prev.analytics }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    privacy.analytics ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: privacy.analytics ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Personalized Advertising</label>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPrivacy(prev => ({ ...prev, advertising: !prev.advertising }))}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    privacy.advertising ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <motion.div
                    animate={{ x: privacy.advertising ? 24 : 0 }}
                    className="w-4 h-4 bg-white rounded-full"
                  />
                </motion.button>
              </div>
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8">
          <div className="flex items-center space-x-3">
            <UserCog className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-black">Settings</h1>
          </div>
          <p className="mt-2 text-gray-700">Manage your account preferences and platform settings</p>
        </header>

        <div className="space-y-8">
          {settingsSections.map((section) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200"
            >
              <div className="flex items-center space-x-3 mb-6">
                <section.icon className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-black">{section.title}</h2>
              </div>

              <div className="space-y-6">
                {section.settings.map((setting) => (
                  <div key={setting.id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-black">{setting.label}</h3>
                        <p className="text-sm text-black/80">{setting.description}</p>
                      </div>
                    </div>
                    <div>{setting.control}</div>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;