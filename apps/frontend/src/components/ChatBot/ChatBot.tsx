import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import useChatStore from './store';
import ChatbotIcon from './ChatbotIcon';

const ChatBot: React.FC = () => {
  const { messages, isOpen, toggleChat, addMessage } = useChatStore();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    addMessage({
      content: input,
      type: 'user',
    });

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      addMessage({
        content: 'Thank you for your message! This is a placeholder response.',
        type: 'bot',
      });
    }, 1000);

    setInput('');
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 p-5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-lg border-2 border-white/20"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChatbotIcon />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] bg-gradient-to-b from-violet-600/95 to-indigo-700/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/10">
              <div className="flex items-center gap-2">
                <ChatbotIcon />
                <span className="font-semibold text-white text-base">AI Assistant</span>
              </div>
              <button
                onClick={toggleChat}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} className="text-white/80" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white/10 to-transparent">
              <AnimatePresence>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/10 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/50"
                />
                <button
                  type="submit"
                  className="p-3 bg-white text-violet-700 rounded-full hover:bg-white/90 transition-colors shadow-lg"
                  disabled={!input.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;