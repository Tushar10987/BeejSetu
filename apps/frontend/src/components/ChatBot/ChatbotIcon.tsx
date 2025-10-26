import React from 'react';
import { MessageCircle } from 'lucide-react';

const ChatbotIcon = () => {
  return (
    <div className="relative">
      <MessageCircle size={28} className="text-white" />
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
    </div>
  );
}

export default ChatbotIcon;