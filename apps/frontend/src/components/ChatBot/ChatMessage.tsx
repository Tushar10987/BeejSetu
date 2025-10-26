import React from 'react';
import { Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatMessage as ChatMessageType } from './types';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'} mb-4`}
    >
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
        isBot ? 'bg-white shadow-md' : 'bg-violet-200'
      }`}>
        {isBot ? <Bot size={20} className="text-violet-600" /> : <User size={20} className="text-violet-600" />}
      </div>
      <div
        className={`max-w-[80%] px-5 py-3 rounded-2xl shadow-md ${
          isBot
            ? 'bg-white text-gray-800 rounded-tl-none'
            : 'bg-white text-gray-800 rounded-tr-none'
        }`}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;