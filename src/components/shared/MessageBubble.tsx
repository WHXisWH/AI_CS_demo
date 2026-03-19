import { motion } from 'framer-motion';
import { Bot, Check, CheckCheck } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
  userName?: string;
  userAvatar?: string;
}

export function MessageBubble({
  message,
  showAvatar = true,
  userName,
  userAvatar,
}: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const isAI = message.sender === 'ai';

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusIcon = () => {
    if (isUser) return null;
    switch (message.status) {
      case 'sent':
        return <Check className="w-3 h-3 text-[var(--color-gray-400)]" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-[var(--color-gray-400)]" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-[#667EEA]" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {showAvatar && (
        <div className="flex-shrink-0">
          {isUser ? (
            <Avatar src={userAvatar} name={userName} size="sm" />
          ) : isAI ? (
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
          ) : (
            <Avatar name="Agent" size="sm" />
          )}
        </div>
      )}
      <div
        className={`max-w-[70%] ${
          isUser ? 'items-end' : 'items-start'
        } flex flex-col`}
      >
        {isAI && (
          <span className="text-xs text-[#667EEA] font-medium mb-1 flex items-center gap-1">
            <Bot className="w-3 h-3" />
            AI Assistant
          </span>
        )}
        <div
          className={`px-4 py-2.5 rounded-2xl ${
            isUser
              ? 'gradient-primary text-white rounded-br-md'
              : 'bg-white text-[var(--color-gray-900)] rounded-bl-md shadow-sm border border-[var(--color-gray-100)]'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 mt-1 ${
            isUser ? 'flex-row-reverse' : ''
          }`}
        >
          <span className="text-xs text-[var(--color-gray-400)]">
            {formatTime(message.timestamp)}
          </span>
          {getStatusIcon()}
        </div>
      </div>
    </motion.div>
  );
}

interface SystemMessageProps {
  content: string;
  timestamp?: Date;
}

export function SystemMessage({ content, timestamp }: SystemMessageProps) {
  return (
    <div className="flex justify-center my-4">
      <div className="px-4 py-1.5 bg-[var(--color-gray-100)] rounded-full">
        <span className="text-xs text-[var(--color-gray-500)]">
          {content}
          {timestamp && ` - ${new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          }).format(timestamp)}`}
        </span>
      </div>
    </div>
  );
}
