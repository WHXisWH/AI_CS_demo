import { motion } from 'framer-motion';
import {
  MessageSquare,
  Bot,
  Users,
  ThumbsUp,
  ArrowRight,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { MainLayout } from '../../components/layout';
import { Card, StatCard, Badge, Avatar } from '../../components/ui';
import { LineChart } from '../../components/charts';
import { PlatformIcon } from '../../components/shared';

const statsData = [
  {
    title: 'Today Conversations',
    value: '1,284',
    change: 12.5,
    changeType: 'increase' as const,
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'primary' as const,
  },
  {
    title: 'AI Handled Rate',
    value: '87.3%',
    change: 5.2,
    changeType: 'increase' as const,
    icon: <Bot className="w-6 h-6" />,
    color: 'secondary' as const,
  },
  {
    title: 'Human Handover',
    value: '163',
    change: 3.1,
    changeType: 'decrease' as const,
    icon: <Users className="w-6 h-6" />,
    color: 'warning' as const,
  },
  {
    title: 'Satisfaction Rate',
    value: '94.8%',
    change: 2.3,
    changeType: 'increase' as const,
    icon: <ThumbsUp className="w-6 h-6" />,
    color: 'success' as const,
  },
];

const trendData = [
  { date: 'Mon', value: 120 },
  { date: 'Tue', value: 180 },
  { date: 'Wed', value: 150 },
  { date: 'Thu', value: 210 },
  { date: 'Fri', value: 190 },
  { date: 'Sat', value: 140 },
  { date: 'Sun', value: 160 },
];

const quickActions = [
  {
    title: 'Knowledge Base',
    description: 'Manage AI knowledge',
    icon: <Bot className="w-6 h-6" />,
    color: 'from-[#667EEA] to-[#764BA2]',
  },
  {
    title: 'Flow Designer',
    description: 'Create automation',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'from-[#4FACFE] to-[#00F2FE]',
  },
  {
    title: 'Analytics',
    description: 'View reports',
    icon: <ThumbsUp className="w-6 h-6" />,
    color: 'from-[#10B981] to-[#059669]',
  },
  {
    title: 'Settings',
    description: 'Configure system',
    icon: <Users className="w-6 h-6" />,
    color: 'from-[#F59E0B] to-[#D97706]',
  },
];

const recentConversations = [
  {
    id: '1',
    user: 'Alice Chen',
    message: 'How do I reset my password?',
    platform: 'wechat' as const,
    time: '2 min ago',
    isAI: true,
    status: 'resolved',
  },
  {
    id: '2',
    user: 'Bob Wang',
    message: 'I need help with my order #12345',
    platform: 'web' as const,
    time: '5 min ago',
    isAI: false,
    status: 'active',
  },
  {
    id: '3',
    user: 'Carol Li',
    message: 'What are your business hours?',
    platform: 'whatsapp' as const,
    time: '10 min ago',
    isAI: true,
    status: 'resolved',
  },
  {
    id: '4',
    user: 'David Zhang',
    message: 'Can I change my shipping address?',
    platform: 'telegram' as const,
    time: '15 min ago',
    isAI: true,
    status: 'pending',
  },
];

const pendingTasks = [
  { id: '1', title: 'Review escalated conversation', priority: 'high', time: '10 min ago' },
  { id: '2', title: 'Update knowledge base', priority: 'medium', time: '1 hour ago' },
  { id: '3', title: 'Check failed AI responses', priority: 'high', time: '2 hours ago' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Dashboard() {
  return (
    <MainLayout title="Dashboard" subtitle="Welcome back, John!">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Stats Grid */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              changeType={stat.changeType}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                    Conversation Trends
                  </h3>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Last 7 days overview
                  </p>
                </div>
                <button className="flex items-center gap-2 text-sm text-[#667EEA] hover:underline">
                  View details
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <LineChart data={trendData} height={280} />
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={item}>
            <Card>
              <h3 className="text-lg font-semibold text-[var(--color-gray-900)] mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-4 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-100)] transition-colors text-left group"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
                    >
                      {action.icon}
                    </div>
                    <p className="font-medium text-[var(--color-gray-900)] text-sm">
                      {action.title}
                    </p>
                    <p className="text-xs text-[var(--color-gray-500)]">
                      {action.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Conversations */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                  Recent Conversations
                </h3>
                <button className="flex items-center gap-2 text-sm text-[#667EEA] hover:underline">
                  View all
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    whileHover={{ backgroundColor: 'var(--color-gray-50)' }}
                    className="flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-colors"
                  >
                    <Avatar name={conv.user} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[var(--color-gray-900)]">
                          {conv.user}
                        </p>
                        <PlatformIcon platform={conv.platform} size="sm" />
                        {conv.isAI && (
                          <Badge variant="primary" size="sm">
                            AI
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-[var(--color-gray-500)] truncate">
                        {conv.message}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--color-gray-400)]">
                        {conv.time}
                      </p>
                      <Badge
                        variant={
                          conv.status === 'resolved'
                            ? 'success'
                            : conv.status === 'active'
                            ? 'primary'
                            : 'warning'
                        }
                        size="sm"
                      >
                        {conv.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Pending Tasks */}
          <motion.div variants={item}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                  Pending Tasks
                </h3>
                <span className="px-2 py-1 bg-[var(--color-error)]/10 text-[var(--color-error)] text-xs font-medium rounded-full">
                  {pendingTasks.length} items
                </span>
              </div>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-gray-50)] cursor-pointer"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        task.priority === 'high'
                          ? 'bg-[var(--color-error)]/10 text-[var(--color-error)]'
                          : 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                      }`}
                    >
                      {task.priority === 'high' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-[var(--color-gray-900)]">
                        {task.title}
                      </p>
                      <p className="text-xs text-[var(--color-gray-500)]">
                        {task.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
