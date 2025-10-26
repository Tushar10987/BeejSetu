import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, MessageCircle, Book, FileText, PhoneCall, ChevronDown, ChevronUp } from 'lucide-react';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // FAQ categories and their icons
  const categories = [
    { id: 'all', label: 'All', icon: HelpCircle },
    { id: 'general', label: 'General', icon: Book },
    { id: 'account', label: 'Account', icon: FileText },
    { id: 'technical', label: 'Technical', icon: MessageCircle },
  ];

  // FAQ data
  const faqs = [
    {
      id: 'faq1',
      category: 'general',
      question: 'What is BeejSetu?',
      answer: 'BeejSetu is a comprehensive platform that connects farmers, FPOs, processors, and buyers to maximize value from oilseed by-products. Our platform facilitates direct trade, provides market insights, and enables traceable supply chains.',
    },
    {
      id: 'faq2',
      category: 'general',
      question: 'How does the marketplace work?',
      answer: 'Our marketplace connects sellers directly with buyers. Sellers can list their products with detailed specifications, while buyers can browse listings, compare prices, and make purchase decisions. We ensure secure transactions and quality assurance throughout the process.',
    },
    {
      id: 'faq3',
      category: 'account',
      question: 'How do I create an account?',
      answer: 'To create an account, click the "Sign Up" button, choose your role (Farmer, FPO, Processor, or Buyer), fill in your details, verify your email, and complete your profile with relevant documentation.',
    },
    {
      id: 'faq4',
      category: 'account',
      question: 'How can I update my profile information?',
      answer: 'Go to Settings > Profile, where you can update your personal information, business details, and contact information. Don\'t forget to save your changes.',
    },
    {
      id: 'faq5',
      category: 'technical',
      question: 'What should I do if I encounter a technical issue?',
      answer: 'If you experience technical issues, first try refreshing the page. If the problem persists, clear your browser cache and cookies. For further assistance, contact our technical support team via the help desk or email support@beejsetu.in.',
    },
    {
      id: 'faq6',
      category: 'technical',
      question: 'How secure is my data on BeejSetu?',
      answer: 'We implement industry-standard security measures including end-to-end encryption, secure socket layer (SSL) technology, and regular security audits to protect your data. We comply with all relevant data protection regulations.',
    },
  ];

  // Filter FAQs based on search query and selected category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <HelpCircle className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-black">Help Center</h1>
          </div>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Find answers to common questions and learn how to make the most of BeejSetu
          </p>
        </header>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-violet-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-transparent backdrop-blur-sm text-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 text-sm text-black"
              >
                <span className="text-black font-medium">{faq.question}</span>
                {expandedFaq === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <AnimatePresence>
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-3 text-sm"
                  >
                    <p className="text-black">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg p-4 border border-gray-200 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Still need help?</h2>
              <p className="text-gray-600">Our support team is available 24/7 to assist you</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Contact Support</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Help;