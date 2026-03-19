import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, PhoneCall } from 'lucide-react';
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MainLayout, SurfaceCard } from '../../components/layout';

function SectionTitle({ text }: { text: string }) {
  return (
    <HStack gap="3" mb="4">
      <Box w="1" h="5" borderRadius="full" bg="brand.500" />
      <Text fontSize={{ base: '20px', md: '24px' }} fontWeight="700" letterSpacing="-0.03em" color="ink.900">
        {text}
      </Text>
    </HStack>
  );
}

function IlluFlow() {
  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="262" cy="28" r="42" fill="#8b8cf6" fillOpacity="0.12" />
      <circle cx="62" cy="126" r="34" fill="#6b7cff" fillOpacity="0.08" />
      <rect x="30" y="48" width="260" height="68" rx="22" fill="white" fillOpacity="0.72" />
      <path d="M86 82 H122" stroke="#c9d4ff" strokeWidth="3" strokeDasharray="6 6" />
      <path d="M194 82 H228" stroke="#c9d4ff" strokeWidth="3" strokeDasharray="6 6" />

      <rect x="40" y="58" width="46" height="46" rx="16" fill="#eef2ff" stroke="#9eb0ff" strokeWidth="1.5" />
      <circle cx="63" cy="75" r="9" fill="#6677ff" />
      <rect x="50" y="89" width="26" height="5" rx="2.5" fill="#a7b5ff" />

      <rect x="122" y="56" width="72" height="52" rx="18" fill="#f4efff" stroke="#c8b6ff" strokeWidth="1.5" />
      <path d="M158 68 L170 82 L158 96 L146 82Z" fill="#8357f4" />
      <rect x="140" y="98" width="36" height="5" rx="2.5" fill="#c8b6ff" />

      <rect x="228" y="52" width="44" height="60" rx="16" fill="#eaf4ff" stroke="#8ec3ff" strokeWidth="1.5" />
      <rect x="240" y="68" width="20" height="5" rx="2.5" fill="#4e8fff" fillOpacity="0.78" />
      <rect x="240" y="78" width="14" height="5" rx="2.5" fill="#4e8fff" fillOpacity="0.46" />
      <rect x="240" y="88" width="18" height="5" rx="2.5" fill="#4e8fff" fillOpacity="0.28" />

      <rect x="280" y="64" width="16" height="34" rx="8" fill="#dff8ea" stroke="#7edca4" strokeWidth="1.5" />
      <path d="M285 81 L292 84 L285 87Z" fill="#17a34a" />
    </svg>
  );
}

function IlluVariable() {
  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="268" cy="134" r="52" fill="#4ab7ff" fillOpacity="0.12" />
      <circle cx="60" cy="24" r="30" fill="#5ec5ff" fillOpacity="0.10" />

      <rect x="40" y="24" width="240" height="112" rx="24" fill="white" fillOpacity="0.82" />
      <rect x="40" y="24" width="240" height="26" rx="24" fill="#1f9fdb" />
      <rect x="40" y="38" width="240" height="12" fill="#1f9fdb" />
      <circle cx="58" cy="37" r="7" fill="white" fillOpacity="0.26" />
      <rect x="74" y="33" width="54" height="4.5" rx="2.25" fill="white" fillOpacity="0.7" />

      <rect x="176" y="58" width="76" height="20" rx="10" fill="#1f9fdb" />
      <rect x="190" y="66" width="48" height="4" rx="2" fill="white" fillOpacity="0.9" />

      <rect x="56" y="88" width="174" height="28" rx="14" fill="#f8fbff" stroke="#d6e2ee" strokeWidth="1.5" />
      <rect x="68" y="96" width="34" height="12" rx="6" fill="#e0efff" />
      <rect x="106" y="96" width="38" height="12" rx="6" fill="#efe6ff" />
      <rect x="150" y="98" width="54" height="8" rx="4" fill="#b1bfd2" fillOpacity="0.82" />

      <rect x="56" y="58" width="92" height="12" rx="6" fill="#cce8f8" fillOpacity="0.8" />
      <rect x="56" y="74" width="64" height="8" rx="4" fill="#d7e3ef" />
    </svg>
  );
}

function IlluContact() {
  const people = [
    { x: 88, y: 68, init: '张', bg: '#3b82f6', tag: 'VIP', tc: '#1677ff' },
    { x: 160, y: 68, init: '李', bg: '#10b981', tag: '高意向', tc: '#059669' },
    { x: 232, y: 68, init: '王', bg: '#8b5cf6', tag: '企业', tc: '#7c3aed' },
    { x: 88, y: 118, init: '陈', bg: '#f59e0b', tag: '微信', tc: '#d97706' },
    { x: 160, y: 118, init: '赵', bg: '#ef4444', tag: '电话', tc: '#dc2626' },
    { x: 232, y: 118, init: '孙', bg: '#06b6d4', tag: '新客', tc: '#0891b2' },
  ];

  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="160" cy="80" r="84" fill="#f4fff8" />
      <circle cx="160" cy="80" r="84" stroke="#c6f3d8" strokeWidth="1.5" />
      {people.map((p) => (
        <g key={p.x + p.y}>
          <circle cx={p.x} cy={p.y} r="19" fill={p.bg} fillOpacity="0.14" />
          <circle cx={p.x} cy={p.y} r="15" fill={p.bg} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fill="white" fontWeight="700" fontFamily="sans-serif">{p.init}</text>
          <rect x={p.x - 17} y={p.y + 19} width="34" height="12" rx="6" fill={p.tc} fillOpacity="0.12" />
          <rect x={p.x - 10} y={p.y + 23} width="20" height="4" rx="2" fill={p.tc} fillOpacity="0.65" />
        </g>
      ))}
    </svg>
  );
}

function IlluWorkHours() {
  const days = ['一', '二', '三', '四', '五', '六', '日'];
  const on = [true, true, true, true, true, false, false];

  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%', display: 'block' }}>
      <circle cx="276" cy="24" r="52" fill="#fff2b8" fillOpacity="0.7" />
      <circle cx="44" cy="136" r="40" fill="#ffe28a" fillOpacity="0.28" />
      <rect x="40" y="24" width="240" height="112" rx="24" fill="white" stroke="#f4d877" strokeWidth="1.5" />
      <rect x="190" y="34" width="70" height="18" rx="9" fill="#fff7dd" stroke="#f4d877" strokeWidth="1.5" />
      <rect x="58" y="34" width="74" height="6" rx="3" fill="#4d5668" />
      {days.map((d, i) => (
        <g key={d}>
          <rect x={54 + i * 30} y={60} width="24" height="24" rx="8" fill={on[i] ? '#1677ff' : '#f3f6fa'} stroke={on[i] ? '#1677ff' : '#dfe5ed'} strokeWidth="1.2" />
          <text x={54 + i * 30 + 12} y={76} textAnchor="middle" fontSize="8.5" fill={on[i] ? 'white' : '#9aa6b5'} fontFamily="sans-serif" fontWeight={on[i] ? '700' : '500'}>{d}</text>
        </g>
      ))}
      <rect x="56" y="98" width="176" height="24" rx="12" fill="#f8fafc" stroke="#e1e7ef" strokeWidth="1.2" />
      <rect x="222" y="101" width="32" height="18" rx="9" fill="#1677ff" />
      <circle cx="243" cy="110" r="6" fill="white" />
    </svg>
  );
}

const featureCards = [
  { title: '创建AI流程', desc: 'AI流程可以让AI按照指定方式完整任务，调用第三方工具解决', Illu: IlluFlow, bg: 'linear-gradient(180deg,#f8f6ff 0%,#f0ebff 100%)', route: '/flow-designer', artScale: 0.88 },
  { title: '使用对话变量', desc: '将用联系人信息，工具，知识作为AI大模型提示词变量', Illu: IlluVariable, bg: 'linear-gradient(180deg,#f4fbff 0%,#eaf5ff 100%)', route: '/ai-assistant', artScale: 0.84 },
  { title: '自定义联系人字段', desc: '在移动端处理客户消息，查看AI对话，或者人工回复', Illu: IlluContact, bg: 'linear-gradient(180deg,#f5fff8 0%,#eafaf0 100%)', route: '/conversations', artScale: 0.84 },
  { title: '如何设置人工工作时间', desc: '配置何时转入人工对话，非工作时间如何处理', Illu: IlluWorkHours, bg: 'linear-gradient(180deg,#fffdf5 0%,#fff6db 100%)', route: '/ai-assistant', artScale: 0.84 },
];

const helpCards = [
  { icon: BookOpen, title: '产品教学文章', desc: '查看更多帮助教学' },
  { icon: PhoneCall, title: '联系我们', desc: '点击这里联系客服' },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout title="首页">
      <Stack gap="8">
        <Box>
          <SectionTitle text="功能导览" />
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
            {featureCards.map((card) => (
              <SurfaceCard
                key={card.title}
                overflow="hidden"
                border="1px solid rgba(175, 187, 209, 0.16)"
                boxShadow="0 18px 34px rgba(29, 37, 55, 0.06)"
              >
                <Box
                  h={{ base: '216px', xl: '228px' }}
                  bg={card.bg}
                  borderBottom="1px solid rgba(165, 176, 198, 0.10)"
                  px={{ base: '5', xl: '6' }}
                  py="5"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                >
                  <Box
                    w="100%"
                    h="100%"
                    borderRadius="22px"
                    bg="rgba(255,255,255,0.30)"
                    boxShadow="inset 0 1px 0 rgba(255,255,255,0.65)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    <Box
                      w="100%"
                      h="100%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      transform={`scale(${card.artScale})`}
                      transformOrigin="center center"
                    >
                      <card.Illu />
                    </Box>
                  </Box>
                </Box>
                <Box p={{ base: '5', md: '6' }} minH={{ base: 'auto', xl: '190px' }} display="flex" flexDirection="column" justifyContent="space-between">
                  <Text fontSize={{ base: '20px', md: '22px' }} fontWeight="700" letterSpacing="-0.03em" color="ink.900">
                    {card.title}
                  </Text>
                  <Text mt="3" fontSize="14px" lineHeight="1.85" color="ink.500" minH={{ base: 'auto', xl: '52px' }}>
                    {card.desc}
                  </Text>
                  <Stack mt="5" gap="3" direction={{ base: 'column', sm: 'row' }}>
                    <Button variant="outline" size="sm" borderRadius="14px" w={{ base: 'full', sm: 'auto' }}>
                      帮助文档
                    </Button>
                    <Button
                      size="sm"
                      borderRadius="14px"
                      w={{ base: 'full', sm: 'auto' }}
                      bg="brand.500"
                      color="white"
                      _hover={{ bg: 'brand.600' }}
                      onClick={() => navigate(card.route)}
                    >
                      使用
                      <ArrowRight size={14} />
                    </Button>
                  </Stack>
                </Box>
              </SurfaceCard>
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <SectionTitle text="更多帮助" />
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap="6">
            {helpCards.map((card) => (
              <SurfaceCard key={card.title} p="6">
                <HStack justify="space-between" align="center">
                  <HStack gap="4" align="start">
                    <Box
                      w="14"
                      h="14"
                      borderRadius="20px"
                      bg="#f7f8fd"
                      color="brand.600"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <card.icon size={24} />
                    </Box>
                    <Box flex="1">
                      <Text fontSize={{ base: '18px', md: '20px' }} fontWeight="700" letterSpacing="-0.03em" color="ink.900">
                        {card.title}
                      </Text>
                      <Text mt="2" fontSize="14px" color="ink.500">
                        {card.desc}
                      </Text>
                    </Box>
                  </HStack>
                  <Box color="ink.300" display={{ base: 'none', md: 'block' }}>
                    <ArrowRight size={16} />
                  </Box>
                </HStack>
              </SurfaceCard>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </MainLayout>
  );
}
