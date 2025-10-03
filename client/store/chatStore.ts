// src/store/chatStore.ts
import { create } from "zustand";

interface ChatStore {
  selectedChatId: string | null;
  setSelectedChat: (chatId: string | null) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  selectedChatId: null,
  setSelectedChat: (chatId) => set({ selectedChatId: chatId }),
}));
