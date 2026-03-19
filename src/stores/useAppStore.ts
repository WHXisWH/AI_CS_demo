import { create } from 'zustand';
import type { Conversation, Message, KnowledgeBase, AIModel, ModelConfig } from '../types';

interface AppState {
  // Sidebar
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Conversations
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;

  // Messages
  messages: Message[];
  addMessage: (message: Message) => void;

  // AI Assistant
  knowledgeBases: KnowledgeBase[];
  selectedModel: AIModel | null;
  modelConfig: ModelConfig;
  setModelConfig: (config: Partial<ModelConfig>) => void;

  // UI
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Sidebar
  isSidebarCollapsed: false,
  toggleSidebar: () =>
    set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),

  // Conversations
  conversations: [],
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

  // Messages
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  // AI Assistant
  knowledgeBases: [],
  selectedModel: null,
  modelConfig: {
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
  },
  setModelConfig: (config) =>
    set((state) => ({ modelConfig: { ...state.modelConfig, ...config } })),

  // UI
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
