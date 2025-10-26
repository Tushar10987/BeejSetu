export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  toggleChat: () => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
}