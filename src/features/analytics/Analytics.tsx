import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  Bot,
  Users,
  Clock,
  ThumbsUp,
  ArrowUpRight,
} from 'lucide-react';
import { MainLayout } from '../../components/layout';
import { Card, Progress, Badge } from '../../components/ui';
import { AreaChart, PieChart, BarChart, SparkLine } from '../../components/charts';

const kpiData = [
  {
    title: 'Total Conversations',
    value: '12,847',
    change: 12.5,
    trend: 'up' as const,
    icon: MessageSquare,
    color: '#667EEA',
    sparkData: [30, 40, 35, 50, 49, 60, 70, 91, 81, 85, 90, 100],
  },
  {
    title: 'AI Resolution Rate',
    value: '87.3%',
    change: 5.2,
    trend: 'up' as const,
    icon: Bot,
    color: '#4FACFE',
    sparkData: [60, 65, 70, 68, 75, 80, 78, 82, 85, 87, 86, 87],
  },
  {
    title: 'Avg Response Time',
    value: '1.2s',
    change: 15.3,
    trend: 'down' as const,
    icon: Clock,
    color: '#10B981',
    sparkData: [3, 2.8, 2.5, 2.2, 2, 1.8, 1.6, 1.5, 1.4, 1.3, 1.2, 1.2],
  },
  {
    title: 'Human Handover',
    value: '1,634',
    change: 8.1,
    trend: 'down' as const,
    icon: Users,
    color: '#F59E0B',
    sparkData: [50, 48, 45, 42, 40, 38, 35, 32, 30, 28, 25, 20],
  },
  {
    title: 'Satisfaction Score',
    value: '4.8/5',
    change: 2.3,
    trend: 'up' as const,
    icon: ThumbsUp,
    color: '#8B5CF6',
    sparkData: [4.2, 4.3, 4.4, 4.5, 4.5, 4.6, 4.6, 4.7, 4.7, 4.8, 4.8, 4.8],
  },
];

const conversationTrendData = [
  { date: 'Jan', value: 4200, ai: 3600, human: 600 },
  { date: 'Feb', value: 4800, ai: 4100, human: 700 },
  { date: 'Mar', value: 5100, ai: 4400, human: 700 },
  { date: 'Apr', value: 5600, ai: 4900, human: 700 },
  { date: 'May', value: 6200, ai: 5500, human: 700 },
  { date: 'Jun', value: 6800, ai: 6100, human: 700 },
  { date: 'Jul', value: 7400, ai: 6700, human: 700 },
];

const channelData = [
  { name: 'WeChat', value: 4500, color: '#07C160' },
  { name: 'Web', value: 3200, color: '#667EEA' },
  { name: 'WhatsApp', value: 2100, color: '#25D366' },
  { name: 'Telegram', value: 1800, color: '#0088CC' },
  { name: 'Others', value: 1247, color: '#9CA3AF' },
];

const topQuestions = [
  { name: 'Password Reset', value: 1234 },
  { name: 'Order Status', value: 987 },
  { name: 'Return Policy', value: 876 },
  { name: 'Shipping Info', value: 765 },
  { name: 'Payment Issues', value: 654 },
  { name: 'Account Setup', value: 543 },
  { name: 'Product Info', value: 432 },
  { name: 'Discounts', value: 321 },
  { name: 'Technical Help', value: 210 },
  { name: 'Contact Sales', value: 199 },
];

const aiPerformance = [
  { label: 'Intent Recognition', value: 94, color: 'primary' as const },
  { label: 'Response Accuracy', value: 89, color: 'secondary' as const },
  { label: 'Context Retention', value: 86, color: 'success' as const },
  { label: 'Sentiment Analysis', value: 82, color: 'warning' as const },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Analytics() {
  return (
    <MainLayout title="Analytics" subtitle="Monitor your AI assistant performance">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* KPI Cards with Sparklines */}
        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {kpiData.map((kpi, index) => (
            <Card key={index} hover className="relative overflow-hidden">
              <div className="flex items-start justify-between mb-2">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${kpi.color}15` }}
                >
                  <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    kpi.trend === 'up'
                      ? 'text-[var(--color-success)]'
                      : 'text-[var(--color-error)]'
                  }`}
                >
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {kpi.change}%
                </div>
              </div>
              <p className="text-2xl font-bold text-[var(--color-gray-900)] mb-1">
                {kpi.value}
              </p>
              <p className="text-sm text-[var(--color-gray-500)] mb-3">
                {kpi.title}
              </p>
              <SparkLine data={kpi.sparkData} color={kpi.color} height={32} />
            </Card>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversation Trend */}
          <motion.div variants={item} className="lg:col-span-2">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                    Conversation Trends
                  </h3>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Monthly conversation volume
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#667EEA]" />
                    <span className="text-sm text-[var(--color-gray-600)]">AI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4FACFE]" />
                    <span className="text-sm text-[var(--color-gray-600)]">Human</span>
                  </div>
                </div>
              </div>
              <AreaChart data={conversationTrendData} height={280} />
            </Card>
          </motion.div>

          {/* Channel Distribution */}
          <motion.div variants={item}>
            <Card>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                  Channel Distribution
                </h3>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Conversations by platform
                </p>
              </div>
              <PieChart data={channelData} height={280} />
            </Card>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Questions */}
          <motion.div variants={item}>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                    Top 10 Questions
                  </h3>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Most frequently asked questions
                  </p>
                </div>
                <button className="flex items-center gap-1 text-sm text-[#667EEA] hover:underline">
                  View all
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
              <BarChart data={topQuestions} horizontal height={360} />
            </Card>
          </motion.div>

          {/* AI Performance */}
          <motion.div variants={item}>
            <Card>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[var(--color-gray-900)]">
                  AI Performance Metrics
                </h3>
                <p className="text-sm text-[var(--color-gray-500)]">
                  Model accuracy and efficiency
                </p>
              </div>
              <div className="space-y-6">
                {aiPerformance.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[var(--color-gray-700)]">
                        {metric.label}
                      </span>
                      <Badge
                        variant={
                          metric.value >= 90
                            ? 'success'
                            : metric.value >= 80
                            ? 'primary'
                            : 'warning'
                        }
                      >
                        {metric.value}%
                      </Badge>
                    </div>
                    <Progress value={metric.value} color={metric.color} size="lg" />
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[var(--color-gray-100)]">
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text-primary">
                    23,456
                  </p>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Total AI Responses
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold gradient-text-secondary">
                    98.2%
                  </p>
                  <p className="text-sm text-[var(--color-gray-500)]">
                    Uptime
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
