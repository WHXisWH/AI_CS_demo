export interface User {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  platform?: Platform;
  lastActive?: Date;
}

export type Platform = 'wechat' | 'weibo' | 'douyin' | 'whatsapp' | 'telegram' | 'web';

export interface Conversation {
  id: string;
  user: User;
  platform: Platform;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'active' | 'pending' | 'resolved';
  isAIHandled: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'system';
  sender: 'user' | 'ai' | 'agent';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
}

export interface KnowledgeBase {
  id: string;
  name: string;
  description?: string;
  documentCount: number;
  lastUpdated: Date;
  status: 'ready' | 'training' | 'error';
  progress?: number;
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: string[];
  isSelected: boolean;
}

export interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
}

export interface AnalyticsData {
  totalConversations: number;
  aiHandledRate: number;
  humanHandoverCount: number;
  satisfactionRate: number;
  avgResponseTime: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface FlowNode {
  id: string;
  type: 'trigger' | 'condition' | 'ai-process' | 'action' | 'end';
  label: string;
  config?: Record<string, unknown>;
  position: { x: number; y: number };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
}

export interface StatCard {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
}
