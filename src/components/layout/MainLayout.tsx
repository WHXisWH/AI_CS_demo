import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Bell,
  BookOpen,
  Bot,
  Brain,
  ChevronDown,
  CreditCard,
  Headphones,
  HelpCircle,
  Home,
  LayoutTemplate,
  MessageCircleMore,
  Send,
  Settings,
  Sparkles,
  SquareTerminal,
  Users,
} from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  type BoxProps,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const primaryNav = [
  { label: '首页', path: '/', icon: Home },
  { label: '聚合对话', path: '/conversations', icon: MessageCircleMore },
  { label: 'AI 助手', path: '/ai-assistant', icon: Bot },
  { label: '数据分析', path: '/analytics', icon: Brain },
  { label: 'AI 流程', path: '/flow-designer', icon: LayoutTemplate },
];

const secondaryNav = [
  { label: '联系人管理', path: '/settings', icon: Users },
  { label: '知识管理', path: '/help', icon: BookOpen },
  { label: '工具编排', path: '/flow-designer', icon: SquareTerminal },
  { label: '系统设置', path: '/settings', icon: Settings },
];

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

interface SurfaceCardProps extends BoxProps {
  children: ReactNode;
}

export function SurfaceCard({ children, ...props }: SurfaceCardProps) {
  return (
    <Box
      bg="white"
      border="1px solid rgba(165, 176, 198, 0.18)"
      borderRadius="24px"
      boxShadow="card"
      {...props}
    >
      {children}
    </Box>
  );
}

function BrandMark() {
  return (
    <Box
      position="relative"
      w="12"
      h="12"
      borderRadius="18px"
      bg="linear-gradient(145deg, rgba(87, 127, 255, 0.24), rgba(255,255,255,0.08))"
      border="1px solid rgba(255,255,255,0.14)"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="3"
        left="3"
        w="6"
        h="1.5"
        borderRadius="full"
        bg="white"
        transform="rotate(-38deg)"
      />
      <Box
        position="absolute"
        top="5.5"
        left="4"
        w="4"
        h="1.5"
        borderRadius="full"
        bg="rgba(255,255,255,0.72)"
        transform="rotate(-38deg)"
      />
      <Box
        position="absolute"
        right="-3"
        bottom="-4"
        w="10"
        h="10"
        borderRadius="full"
        bg="rgba(61, 104, 255, 0.42)"
        filter="blur(10px)"
      />
    </Box>
  );
}

function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavButton = (item: (typeof primaryNav)[number]) => {
    const isActive = location.pathname === item.path;

    return (
      <Box
        key={item.label}
        as="button"
        onClick={() => navigate(item.path)}
        w="full"
        textAlign="left"
        cursor="pointer"
        px="4"
        py="3.5"
        borderRadius="18px"
        transition="all 0.18s ease"
        bg={isActive ? 'rgba(255,255,255,0.12)' : 'transparent'}
        color={isActive ? 'white' : 'rgba(231, 237, 255, 0.78)'}
        _hover={{
          bg: isActive ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.06)',
          color: 'white',
        }}
      >
        <HStack gap="3">
          <Box
            w="8"
            h="8"
            borderRadius="14px"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            bg={isActive ? 'rgba(255,255,255,0.1)' : 'transparent'}
          >
            <item.icon size={18} />
          </Box>
          <Text fontSize="15px" fontWeight={isActive ? '600' : '500'}>
            {item.label}
          </Text>
        </HStack>
      </Box>
    );
  };

  return (
    <Box
      as="aside"
      display={{ base: 'none', lg: 'flex' }}
      w="280px"
      minW="280px"
      h="100vh"
      position="sticky"
      top="0"
      flexDirection="column"
      bg="#0e1628"
      color="white"
      borderRight="1px solid rgba(255,255,255,0.06)"
      boxShadow="inset -1px 0 0 rgba(255,255,255,0.04)"
    >
      <Flex
        align="center"
        gap="3.5"
        px="6"
        py="6"
        borderBottom="1px solid rgba(255,255,255,0.06)"
      >
        <BrandMark />
        <Box>
          <Text fontSize="28px" fontWeight="700" lineHeight="1.1" letterSpacing="-0.03em">
            云栖AI
          </Text>
          <Text fontSize="12px" color="rgba(255,255,255,0.5)">
            工作台
          </Text>
        </Box>
      </Flex>

      <Stack gap="8" px="4" py="6" flex="1" overflowY="auto">
        <Box>
          <Text px="4" mb="3" fontSize="11px" letterSpacing="0.12em" color="rgba(255,255,255,0.38)">
            核心模块
          </Text>
          <Stack gap="1.5">{primaryNav.map(renderNavButton)}</Stack>
        </Box>

        <Box>
          <Text px="4" mb="3" fontSize="11px" letterSpacing="0.12em" color="rgba(255,255,255,0.38)">
            管理能力
          </Text>
          <Stack gap="1.5">
            {secondaryNav.map(renderNavButton)}
          </Stack>
        </Box>
      </Stack>

      <Box px="4" py="5" borderTop="1px solid rgba(255,255,255,0.06)">
        <SurfaceCard
          bg="rgba(255,255,255,0.04)"
          borderColor="rgba(255,255,255,0.08)"
          color="white"
          boxShadow="none"
          px="4"
          py="4"
        >
          <HStack justify="space-between" align="start">
            <Box>
              <Text fontSize="13px" fontWeight="600">
                在线服务
              </Text>
              <Text mt="1.5" fontSize="12px" color="rgba(255,255,255,0.58)">
                当前可查看产品功能与服务能力。
              </Text>
            </Box>
            <Sparkles size={16} />
          </HStack>
        </SurfaceCard>
      </Box>
    </Box>
  );
}

function TopBar() {
  return (
    <Box
      position="sticky"
      top="0"
      zIndex="20"
      bg="rgba(14, 22, 40, 0.9)"
      backdropFilter="blur(18px)"
      borderBottom="1px solid rgba(255,255,255,0.06)"
    >
      <Flex
        px={{ base: '5', md: '8' }}
        py="4"
        align="center"
        justify="space-between"
        gap="4"
      >
        <Flex display={{ base: 'flex', lg: 'none' }} align="center" gap="3">
          <BrandMark />
          <Text color="white" fontWeight="700" fontSize="22px" letterSpacing="-0.03em">
            云栖AI
          </Text>
        </Flex>

        <HStack gap="3" ml={{ base: '0', lg: 'auto' }}>
          <Flex
            align="center"
            gap="2.5"
            px="4"
            py="2.5"
            borderRadius="full"
            bg="rgba(255,255,255,0.08)"
            color="white"
            border="1px solid rgba(255,255,255,0.08)"
          >
            <CreditCard size={16} />
            <Text fontSize="14px" color="rgba(255,255,255,0.76)">
              余额：
            </Text>
            <Text fontSize="14px" fontWeight="600">
              ¥ 5
            </Text>
            <Box w="1px" h="4" bg="rgba(255,255,255,0.14)" />
            <Text fontSize="14px" color="#d7e0ff">
              充值
            </Text>
          </Flex>

          <Button
            size="sm"
            bg="rgba(61, 104, 255, 0.14)"
            color="white"
            border="1px solid rgba(111, 141, 255, 0.48)"
            borderRadius="full"
            px="4"
            _hover={{ bg: 'rgba(61, 104, 255, 0.2)' }}
          >
            我的套餐
            <ChevronDown size={14} />
          </Button>

          <Button
            display={{ base: 'none', md: 'inline-flex' }}
            size="sm"
            variant="ghost"
            color="rgba(255,255,255,0.86)"
            _hover={{ bg: 'rgba(255,255,255,0.08)' }}
          >
            <HelpCircle size={16} />
            帮助中心
          </Button>

          <Box
            w="10"
            h="10"
            borderRadius="full"
            bg="rgba(255,255,255,0.08)"
            border="1px solid rgba(255,255,255,0.08)"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            color="white"
          >
            <Bell size={16} />
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

type ChatMessage = {
  id: number;
  from: 'assistant' | 'user';
  text: string;
};

const initialChatMessages: ChatMessage[] = [
  { id: 1, from: 'assistant', text: '您好，欢迎使用人工服务，请问有什么可以帮助您？' },
];

const quickReplies = ['如何设置人工工作时间？', '怎么创建 AI 流程？', '如何使用对话变量？'];

function getAssistantReply(input: string) {
  if (input.includes('工作时间')) {
    return '您可以在 AI 助手或流程设置中配置工作时间，并设置非工作时间的接待方式。';
  }

  if (input.includes('流程')) {
    return '您可以在 AI 流程页面拖拽节点创建自动化工作流，并设置触发条件、判断逻辑和转人工规则。';
  }

  if (input.includes('变量')) {
    return '对话变量可引用联系人信息、工具结果和知识内容，帮助 AI 生成更贴近业务场景的回复。';
  }

  return '已收到您的问题，您可以继续描述使用场景，我会为您提供对应的功能说明。';
}

function SupportPanel({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, open]);

  const sendMessage = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      from: 'user',
      text: trimmed,
    };
    const assistantMessage: ChatMessage = {
      id: Date.now() + 1,
      from: 'assistant',
      text: getAssistantReply(trimmed),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInputValue('');
  };

  return (
    <Box
      display={{ base: 'none', xl: 'flex' }}
      position="fixed"
      right="6"
      bottom="6"
      zIndex="30"
      flexDirection="column"
      alignItems="flex-end"
      w="360px"
      maxW="calc(100vw - 48px)"
    >
      {open ? (
        <Box mb="4" w="100%">
          <SurfaceCard
            overflow="hidden"
            borderRadius="28px"
            boxShadow="float"
            display="flex"
            flexDirection="column"
            h="min(720px, calc(100vh - 112px))"
            maxH="calc(100vh - 112px)"
          >
            <Box
              px="6"
              py="5"
              bg="linear-gradient(135deg, #4574ff 0%, #2f54eb 100%)"
              color="white"
              flexShrink="0"
            >
              <SimpleGrid columns={3} gap="2" mb="4">
                {[
                  { label: '产品助手', icon: Bot, active: false },
                  { label: '人工服务', icon: Headphones, active: true },
                  { label: '帮助中心', icon: BookOpen, active: false },
                ].map((item) => (
                  <Flex
                    key={item.label}
                    align="center"
                    justify="center"
                    gap="2"
                    px="3"
                    py="2.5"
                    borderRadius="16px"
                    bg={item.active ? 'white' : 'rgba(255,255,255,0.12)'}
                    color={item.active ? 'brand.600' : 'white'}
                    fontSize="13px"
                    fontWeight="600"
                  >
                    <item.icon size={14} />
                    <Text>{item.label}</Text>
                  </Flex>
                ))}
              </SimpleGrid>
              <Text fontSize="24px" fontWeight="700" letterSpacing="-0.03em">
                人工服务
              </Text>
              <Text mt="1" fontSize="14px" color="rgba(255,255,255,0.78)">
                在线解答常见问题
              </Text>
            </Box>

            <VStack align="stretch" gap="0" bg="#fbfcff" flex="1" minH="0">
              <Stack gap="3.5" p="5" flex="1" minH="0" overflowY="auto">
                {messages.map((message) => (
                  <Flex
                    key={message.id}
                    justify={message.from === 'user' ? 'flex-end' : 'flex-start'}
                  >
                    <Box
                      maxW="85%"
                      px="4"
                      py="3"
                      borderRadius="18px"
                      bg={message.from === 'user' ? 'brand.500' : 'white'}
                      color={message.from === 'user' ? 'white' : 'ink.800'}
                      border={message.from === 'user' ? 'none' : '1px solid rgba(163, 174, 194, 0.22)'}
                      boxShadow={message.from === 'user' ? 'none' : '0 10px 22px rgba(15, 23, 42, 0.05)'}
                      fontSize="14px"
                      lineHeight="1.7"
                    >
                      {message.text}
                    </Box>
                  </Flex>
                ))}
                <Box ref={messagesEndRef} />
              </Stack>

              <Box px="5" pb="4" flexShrink="0" bg="#fbfcff">
                <HStack gap="2" flexWrap="wrap" mb="4">
                  {quickReplies.map((reply) => (
                    <Box
                      key={reply}
                      as="button"
                      onClick={() => sendMessage(reply)}
                      px="3"
                      py="1.5"
                      borderRadius="full"
                      bg="white"
                      border="1px solid rgba(163, 174, 194, 0.22)"
                      fontSize="12px"
                      color="ink.500"
                      cursor="pointer"
                    >
                      {reply}
                    </Box>
                  ))}
                </HStack>

                <HStack gap="3">
                  <Input
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        sendMessage(inputValue);
                      }
                    }}
                    placeholder="输入问题..."
                    h="12"
                    borderRadius="full"
                    bg="white"
                    borderColor="rgba(163, 174, 194, 0.22)"
                  />
                  <Button
                    onClick={() => sendMessage(inputValue)}
                    w="12"
                    h="12"
                    minW="12"
                    borderRadius="full"
                    bg="brand.500"
                    color="white"
                    _hover={{ bg: 'brand.600' }}
                  >
                    <Send size={16} />
                  </Button>
                </HStack>
              </Box>

              <Flex
                align="center"
                justify="space-between"
                px="5"
                py="4"
                borderTop="1px solid rgba(160, 172, 194, 0.18)"
                bg="white"
              >
                <Text fontSize="12px" color="ink.400">
                  云栖AI 提供软件支持
                </Text>
                <Text fontSize="12px" color="ink.400">
                  在线
                </Text>
              </Flex>
            </VStack>
          </SurfaceCard>
        </Box>
      ) : null}

      <Box
        as="button"
        onClick={onToggle}
        w="16"
        h="16"
        borderRadius="full"
        bg="brand.500"
        color="white"
        boxShadow="float"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        flexShrink="0"
      >
        <MessageCircleMore size={22} />
      </Box>
    </Box>
  );
}

export function MainLayout({ children, title, subtitle, actions }: MainLayoutProps) {
  const navigate = useNavigate();
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <Flex minH="100vh" bg="#eef2f7">
      <AppSidebar />

      <Flex flex="1" minW="0" direction="column" position="relative">
        <TopBar />

        <Box
          flex="1"
          position="relative"
          px={{ base: '5', md: '8' }}
          py={{ base: '6', md: '8' }}
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-120px"
            right="-80px"
            w="340px"
            h="340px"
            borderRadius="full"
            bg="rgba(61, 104, 255, 0.12)"
            filter="blur(80px)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            top="80px"
            left="18%"
            w="240px"
            h="240px"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.88)"
            filter="blur(72px)"
            pointerEvents="none"
          />

          <Box maxW="1280px" mx="auto" position="relative" zIndex="1">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align={{ base: 'flex-start', md: 'flex-end' }}
              justify="space-between"
              gap="5"
              mb="7"
            >
              <Box>
                <Text
                  fontSize={{ base: '30px', md: '38px' }}
                  lineHeight="1.1"
                  letterSpacing="-0.04em"
                  fontWeight="700"
                  color="ink.900"
                >
                  {title}
                </Text>
                {subtitle ? (
                  <Text mt="3" fontSize="15px" color="ink.500" maxW="720px" lineHeight="1.8">
                    {subtitle}
                  </Text>
                ) : null}
              </Box>
              {actions ? <Flex gap="3">{actions}</Flex> : null}
            </Flex>

            <Box display={{ base: 'block', lg: 'none' }} mb="6">
              <SurfaceCard px="4" py="4">
                <SimpleGrid columns={2} gap="2">
                  {primaryNav.map((item) => (
                    <Box
                      key={item.label}
                      as="button"
                      onClick={() => navigate(item.path)}
                      cursor="pointer"
                      px="4"
                      py="3"
                      borderRadius="18px"
                      bg="ink.50"
                    >
                      <HStack gap="2.5" color="ink.700">
                        <item.icon size={16} />
                        <Text fontSize="14px" fontWeight="600">
                          {item.label}
                        </Text>
                      </HStack>
                    </Box>
                  ))}
                </SimpleGrid>
              </SurfaceCard>
            </Box>

            {children}
          </Box>
        </Box>
      </Flex>

      <SupportPanel
        open={supportOpen}
        onToggle={() => setSupportOpen((current) => !current)}
      />
    </Flex>
  );
}
