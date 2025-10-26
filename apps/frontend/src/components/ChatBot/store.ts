import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { ChatState, ChatMessage } from './types';

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: uuidv4(),
          timestamp: new Date(),
        },
      ],
    })),
}));

export default useChatStore;