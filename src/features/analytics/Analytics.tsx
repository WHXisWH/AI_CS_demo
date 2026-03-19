import { ArrowUpRight, Bot, Clock3, MessageCircleMore, TrendingUp, UsersRound } from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MainLayout, SurfaceCard } from '../../components/layout';

const trendData = [
  { month: '1月', ai: 46, manual: 18 },
  { month: '2月', ai: 52, manual: 21 },
  { month: '3月', ai: 58, manual: 20 },
  { month: '4月', ai: 61, manual: 19 },
  { month: '5月', ai: 66, manual: 18 },
  { month: '6月', ai: 71, manual: 16 },
];

const sourceData = [
  { name: '微信', value: 42, color: '#3d68ff' },
  { name: '网页', value: 24, color: '#7f9cff' },
  { name: '企业微信', value: 18, color: '#a8b9ff' },
  { name: '其他渠道', value: 16, color: '#d5deff' },
];

const issueData = [
  { name: '售后咨询', value: 88 },
  { name: '套餐价格', value: 73 },
  { name: '工作时间', value: 64 },
  { name: '转人工策略', value: 51 },
  { name: '接口接入', value: 42 },
];

const kpis = [
  { label: '总会话量', value: '12,480', hint: '近 30 天多渠道累计', icon: MessageCircleMore },
  { label: 'AI 解决率', value: '78%', hint: '已覆盖标准服务场景', icon: Bot },
  { label: '平均响应', value: '1.4s', hint: '高于人工首响效率', icon: Clock3 },
  { label: '人工介入率', value: '22%', hint: '高价值问题精准兜底', icon: UsersRound },
];

function StatCard({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: typeof MessageCircleMore;
}) {
  return (
    <SurfaceCard p="5">
      <HStack justify="space-between" align="start">
        <Box>
          <Text fontSize="13px" color="ink.400">
            {label}
          </Text>
          <Text mt="3" fontSize="36px" lineHeight="1" letterSpacing="-0.05em" fontWeight="700" color="ink.900">
            {value}
          </Text>
          <Text mt="3" fontSize="14px" color="ink.500" lineHeight="1.8">
            {hint}
          </Text>
        </Box>
        <Box
          w="12"
          h="12"
          borderRadius="18px"
          bg="#eef3ff"
          color="brand.600"
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon size={18} />
        </Box>
      </HStack>
    </SurfaceCard>
  );
}

export function Analytics() {
  return (
    <MainLayout
      title="数据分析"
      subtitle="查看会话趋势、渠道分布和 AI 处理效果。"
      actions={
        <>
          <Button variant="outline" borderRadius="full" px="5">
            时间范围
          </Button>
          <Button bg="brand.500" color="white" borderRadius="full" px="5" _hover={{ bg: 'brand.600' }}>
            导出报表
          </Button>
        </>
      }
    >
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="6" mb="6">
        {kpis.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6" alignItems="start">
        <SurfaceCard p="6" gridColumn={{ xl: 'span 2' }}>
          <Flex justify="space-between" align={{ base: 'start', md: 'center' }} gap="4" direction={{ base: 'column', md: 'row' }} mb="6">
            <Box>
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                趋势表现
              </Text>
              <Text mt="2" fontSize="26px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
                会话处理趋势
              </Text>
            </Box>
            <HStack gap="3" color="ink.500">
              <HStack gap="2">
                <Box w="2.5" h="2.5" borderRadius="full" bg="brand.500" />
                <Text fontSize="13px">AI 处理</Text>
              </HStack>
              <HStack gap="2">
                <Box w="2.5" h="2.5" borderRadius="full" bg="#c8d5ff" />
                <Text fontSize="13px">人工处理</Text>
              </HStack>
            </HStack>
          </Flex>

          <Box h="340px">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="aiFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#3d68ff" stopOpacity={0.24} />
                    <stop offset="100%" stopColor="#3d68ff" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="manualFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#9eb6ff" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#9eb6ff" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="rgba(165, 176, 198, 0.18)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#7f8aa3', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7f8aa3', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(165,176,198,0.18)', boxShadow: '0 16px 30px rgba(15, 23, 42, 0.08)' }} />
                <Area type="monotone" dataKey="manual" stroke="#b2c1ff" fill="url(#manualFill)" strokeWidth={2} />
                <Area type="monotone" dataKey="ai" stroke="#3d68ff" fill="url(#aiFill)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </SurfaceCard>

        <Stack gap="6">
          <SurfaceCard p="6">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              渠道占比
            </Text>
            <Box h="240px" mt="4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sourceData} dataKey="value" innerRadius={56} outerRadius={82} paddingAngle={4}>
                    {sourceData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(165,176,198,0.18)', boxShadow: '0 16px 30px rgba(15, 23, 42, 0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Stack gap="2.5">
              {sourceData.map((item) => (
                <HStack key={item.name} justify="space-between">
                  <HStack gap="2.5">
                    <Box w="2.5" h="2.5" borderRadius="full" bg={item.color} />
                    <Text fontSize="14px" color="ink.600">
                      {item.name}
                    </Text>
                  </HStack>
                  <Text fontSize="14px" fontWeight="600" color="ink.900">
                    {item.value}%
                  </Text>
                </HStack>
              ))}
            </Stack>
          </SurfaceCard>

          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              结论摘要
            </Text>
            <Stack mt="4" gap="3.5">
              {[
                'AI 已覆盖大部分标准咨询场景。',
                '人工接管主要集中在复杂问题和重点客户。',
                '建议重点关注响应时间、解决率和转人工率。',
              ].map((item) => (
                <HStack key={item} align="start" gap="3">
                  <Box w="2" h="2" borderRadius="full" bg="brand.500" mt="2.5" />
                  <Text fontSize="14px" lineHeight="1.85" color="ink.500">
                    {item}
                  </Text>
                </HStack>
              ))}
            </Stack>
          </SurfaceCard>
        </Stack>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6" mt="6">
        <SurfaceCard p="6">
          <Flex justify="space-between" align="center" mb="5">
            <Box>
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                高频问题
              </Text>
              <Text mt="2" fontSize="24px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
                常见咨询主题
              </Text>
            </Box>
            <Button variant="ghost" color="brand.600">
              查看全部
              <ArrowUpRight size={14} />
            </Button>
          </Flex>

          <Box h="320px">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issueData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid horizontal={false} stroke="rgba(165, 176, 198, 0.12)" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#7f8aa3', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#44506a', fontSize: 13 }} width={80} />
                <Tooltip contentStyle={{ borderRadius: 18, border: '1px solid rgba(165,176,198,0.18)', boxShadow: '0 16px 30px rgba(15, 23, 42, 0.08)' }} />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} fill="#3d68ff" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SurfaceCard>

        <SurfaceCard p="6">
          <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              指标解读
            </Text>
            <Text mt="2" fontSize="24px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
              指标说明
            </Text>

          <Stack mt="5" gap="4">
            {[
              {
                title: '解决率',
                description: '衡量 AI 在标准场景下完成问题处理的比例。',
              },
              {
                title: '响应时间',
                description: '反映系统首轮响应效率，适合与人工处理效率进行对比。',
              },
              {
                title: '转人工率',
                description: '用于观察复杂问题的人工介入情况和服务兜底能力。',
              },
            ].map((item) => (
              <Box key={item.title} p="4.5" borderRadius="22px" border="1px solid rgba(165, 176, 198, 0.18)">
                <HStack mb="2.5" color="brand.600">
                  <TrendingUp size={16} />
                  <Text fontSize="15px" fontWeight="700" color="ink.800">
                    {item.title}
                  </Text>
                </HStack>
                <Text fontSize="14px" lineHeight="1.85" color="ink.500">
                  {item.description}
                </Text>
              </Box>
            ))}
          </Stack>
        </SurfaceCard>
      </SimpleGrid>
    </MainLayout>
  );
}
