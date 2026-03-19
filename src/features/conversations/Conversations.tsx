import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Star,
  Tag,
  Clock,
  MessageSquare,
  Bot,
  User,
} from 'lucide-react';
import { MainLayout } from '../../components/layout';
import { SearchInput, Badge, Avatar, Button, Card } from '../../components/ui';
import { PlatformIcon, MessageBubble } from '../../components/shared';
import type { Conversation, Message } from '../../types';

const mockConversations: Conversation[] = [
  {
    id: '1',
    user: { id: 'u1', name: 'Alice Chen', avatar: '', platform: 'wechat' },
    platform: 'wechat',
    lastMessage: 'How do I reset my password?',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 1000),
    unreadCount: 2,
    status: 'active',
    isAIHandled: true,
  },
  {
    id: '2',
    user: { id: 'u2', name: 'Bob Wang', avatar: '', platform: 'web' },
    platform: 'web',
    lastMessage: 'I need help with my order #12345',
    lastMessageTime: new Date(Date.now() - 5 * 60 * 1000),
    unreadCount: 0,
    status: 'pending',
    isAIHandled: false,
  },
  {
    id: '3',
    user: { id: 'u3', name: 'Carol Li', avatar: '', platform: 'whatsapp' },
    platform: 'whatsapp',
    lastMessage: 'What are your business hours?',
    lastMessageTime: new Date(Date.now() - 10 * 60 * 1000),
    unreadCount: 0,
    status: 'resolved',
    isAIHandled: true,
  },
  {
    id: '4',
    user: { id: 'u4', name: 'David Zhang', avatar: '', platform: 'telegram' },
    platform: 'telegram',
    lastMessage: 'Can I change my shipping address?',
    lastMessageTime: new Date(Date.now() - 15 * 60 * 1000),
    unreadCount: 1,
    status: 'active',
    isAIHandled: true,
  },
  {
    id: '5',
    user: { id: 'u5', name: 'Emma Liu', avatar: '', platform: 'weibo' },
    platform: 'weibo',
    lastMessage: 'Thanks for your help!',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    status: 'resolved',
    isAIHandled: true,
  },
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: '1',
    content: 'Hi, I forgot my password and cannot log in. Can you help me?',
    type: 'text',
    sender: 'user',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: 'm2',
    conversationId: '1',
    content: 'Hello! I can help you reset your password. Please go to the login page and click on "Forgot Password". You will receive a reset link via email.',
    type: 'text',
    sender: 'ai',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
    status: 'read',
  },
  {
    id: 'm3',
    conversationId: '1',
    content: 'I tried that but I did not receive the email.',
    type: 'text',
    sender: 'user',
    timestamp: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: 'm4',
    conversationId: '1',
    content: 'I understand. Please check your spam folder. If you still do not see it, I can manually send you a reset link. What email address is associated with your account?',
    type: 'text',
    sender: 'ai',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: 'read',
  },
  {
    id: 'm5',
    conversationId: '1',
    content: 'How do I reset my password?',
    type: 'text',
    sender: 'user',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
];

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);

  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

export function Conversations() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [messageInput, setMessageInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'ai' | 'human'>('all');

  const filteredConversations = mockConversations.filter((conv) => {
    if (filter === 'all') return true;
    if (filter === 'ai') return conv.isAIHandled;
    return !conv.isAIHandled;
  });

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessageInput('');
  };

  return (
    <MainLayout title="Conversations" subtitle="Manage all customer conversations">
      <div className="flex gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel - Conversation List */}
        <Card className="w-80 flex-shrink-0 flex flex-col !p-0 overflow-hidden">
          <div className="p-4 border-b border-[var(--color-gray-100)]">
            <SearchInput placeholder="Search conversations..." className="mb-3" />
            <div className="flex gap-2">
              {(['all', 'ai', 'human'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? 'gradient-primary text-white'
                      : 'bg-[var(--color-gray-100)] text-[var(--color-gray-600)] hover:bg-[var(--color-gray-200)]'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'ai' ? 'AI' : 'Human'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {filteredConversations.map((conv) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 cursor-pointer border-b border-[var(--color-gray-50)] hover:bg-[var(--color-gray-50)] transition-colors ${
                    selectedConversation?.id === conv.id
                      ? 'bg-[#667EEA]/5 border-l-2 border-l-[#667EEA]'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar name={conv.user.name} size="md" online />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[var(--color-gray-900)] truncate">
                            {conv.user.name}
                          </span>
                          <PlatformIcon platform={conv.platform} size="sm" showBackground={false} />
                        </div>
                        <span className="text-xs text-[var(--color-gray-400)]">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-[var(--color-gray-500)] truncate pr-2">
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                          {conv.isAIHandled && (
                            <Bot className="w-3.5 h-3.5 text-[#667EEA]" />
                          )}
                          {conv.unreadCount > 0 && (
                            <span className="px-1.5 py-0.5 bg-[var(--color-error)] text-white text-xs rounded-full min-w-[18px] text-center">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>

        {/* Middle Panel - Chat Window */}
        <Card className="flex-1 flex flex-col !p-0 overflow-hidden">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-[var(--color-gray-100)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={selectedConversation.user.name} size="md" online />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--color-gray-900)]">
                        {selectedConversation.user.name}
                      </span>
                      <PlatformIcon platform={selectedConversation.platform} size="sm" />
                      {selectedConversation.isAIHandled && (
                        <Badge variant="primary" size="sm">
                          AI Handling
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-[var(--color-gray-500)]">
                      Active now
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
                    <Phone className="w-5 h-5 text-[var(--color-gray-600)]" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
                    <Video className="w-5 h-5 text-[var(--color-gray-600)]" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
                    <MoreVertical className="w-5 h-5 text-[var(--color-gray-600)]" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--color-gray-50)]">
                {mockMessages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    userName={selectedConversation.user.name}
                  />
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-[var(--color-gray-100)] bg-white">
                <div className="flex items-end gap-3">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
                      <Paperclip className="w-5 h-5 text-[var(--color-gray-500)]" />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
                      <Smile className="w-5 h-5 text-[var(--color-gray-500)]" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[var(--color-gray-200)] bg-[var(--color-gray-50)] focus:outline-none focus:ring-2 focus:ring-[#667EEA] focus:border-transparent transition-all"
                    />
                  </div>
                  <Button onClick={handleSendMessage} icon={<Send className="w-4 h-4" />}>
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[var(--color-gray-400)]">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>

        {/* Right Panel - Customer Info */}
        <Card className="w-72 flex-shrink-0 !p-0 overflow-hidden">
          {selectedConversation ? (
            <div className="h-full flex flex-col">
              {/* Customer Profile */}
              <div className="p-6 text-center border-b border-[var(--color-gray-100)]">
                <Avatar
                  name={selectedConversation.user.name}
                  size="xl"
                  className="mx-auto mb-3"
                />
                <h3 className="font-semibold text-[var(--color-gray-900)]">
                  {selectedConversation.user.name}
                </h3>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Customer since Jan 2024
                </p>
                <div className="flex justify-center gap-2 mt-3">
                  <button className="p-2 rounded-xl bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition-colors">
                    <Star className="w-4 h-4 text-[var(--color-warning)]" />
                  </button>
                  <button className="p-2 rounded-xl bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] transition-colors">
                    <Tag className="w-4 h-4 text-[var(--color-gray-600)]" />
                  </button>
                </div>
              </div>

              {/* Customer Details */}
              <div className="p-4 border-b border-[var(--color-gray-100)]">
                <h4 className="text-sm font-semibold text-[var(--color-gray-900)] mb-3">
                  Contact Info
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <PlatformIcon platform={selectedConversation.platform} size="sm" />
                    <span className="text-[var(--color-gray-600)]">
                      {selectedConversation.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-[var(--color-gray-400)]" />
                    <span className="text-[var(--color-gray-600)]">
                      Local time: 3:45 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="p-4 border-b border-[var(--color-gray-100)]">
                <h4 className="text-sm font-semibold text-[var(--color-gray-900)] mb-3">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">VIP</Badge>
                  <Badge variant="success">Returning</Badge>
                  <Badge variant="default">Premium</Badge>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="p-4 flex-1 overflow-y-auto">
                <h4 className="text-sm font-semibold text-[var(--color-gray-900)] mb-3">
                  Recent Activity
                </h4>
                <div className="space-y-3">
                  {[
                    { action: 'Order placed', time: '2 days ago' },
                    { action: 'Support ticket', time: '1 week ago' },
                    { action: 'Account created', time: '2 months ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-[#667EEA]" />
                      <span className="flex-1 text-[var(--color-gray-600)]">
                        {activity.action}
                      </span>
                      <span className="text-[var(--color-gray-400)]">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-[var(--color-gray-100)]">
                <Button variant="outline" className="w-full" icon={<User className="w-4 h-4" />}>
                  View Full Profile
                </Button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-[var(--color-gray-400)]">
              <p className="text-sm">Select a conversation</p>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
}
