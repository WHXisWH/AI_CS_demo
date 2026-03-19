import { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  PhoneCall,
  Search,
  Sparkles,
  Star,
  Tags,
  UserRound,
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
  Textarea,
} from '@chakra-ui/react';
import { MainLayout, SurfaceCard } from '../../components/layout';

const conversations = [
  {
    id: 'c-001',
    name: '林雨桐',
    channel: '微信私聊',
    summary: '咨询退款规则，并追问能否由 AI 直接处理售后。',
    status: 'AI 处理中',
    latest: '2 分钟前',
    tags: ['高频售后', '已下单'],
  },
  {
    id: 'c-002',
    name: '周靖',
    channel: '网页会话',
    summary: '想了解套餐价格，询问有没有企业版能力和上线周期。',
    status: '待跟进',
    latest: '12 分钟前',
    tags: ['售前咨询', '企业客户'],
  },
  {
    id: 'c-003',
    name: '陈昭',
    channel: '企业微信',
    summary: '希望配置人工工作时间与转人工策略，准备做正式演示。',
    status: '人工已接管',
    latest: '25 分钟前',
    tags: ['方案演示', '重点客户'],
  },
];

const transcript = [
  { role: 'user', text: '如果客户晚上发消息，系统能不能先接住，再在白天转给人工？' },
  {
    role: 'assistant',
    text: '可以。你可以在 AI 流程里设置“非工作时间自动接待”，先给出标准回复，再在工作时间内提醒人工继续跟进。',
  },
  { role: 'user', text: '那这样演示的时候，能把联系人标签和订单信息一起展示出来吗？' },
  {
    role: 'assistant',
    text: '可以，建议将联系人字段、订单号和渠道来源接入对话变量，这样回复会更像真实业务系统。',
  },
];

function StatusPill({ value }: { value: string }) {
  const color =
    value === 'AI 处理中'
      ? { bg: '#eef3ff', color: '#2f54eb' }
      : value === '人工已接管'
      ? { bg: '#eef8f2', color: '#1f8b59' }
      : { bg: '#fff4e8', color: '#b86f00' };

  return (
    <Box px="3" py="1.5" borderRadius="full" bg={color.bg} color={color.color} fontSize="12px" fontWeight="600">
      {value}
    </Box>
  );
}

export function Conversations() {
  const [keyword, setKeyword] = useState('');
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const selectedConversation = conversations.find((item) => item.id === selectedId) ?? conversations[0];

  const filteredConversations = useMemo(
    () =>
      conversations.filter((item) => {
        const text = `${item.name}${item.channel}${item.summary}${item.tags.join('')}`.toLowerCase();
        return text.includes(keyword.trim().toLowerCase());
      }),
    [keyword]
  );

  return (
    <MainLayout
      title="聚合对话"
      subtitle="统一查看和处理来自不同渠道的客户会话。"
      actions={
        <>
          <Button variant="outline" borderRadius="full" px="5">
            筛选
          </Button>
          <Button bg="brand.500" color="white" borderRadius="full" px="5" _hover={{ bg: 'brand.600' }}>
            新建会话
          </Button>
        </>
      }
    >
      <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6" alignItems="start">
        <SurfaceCard p="5">
          <Stack gap="4">
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                会话列表
              </Text>

            <Box position="relative">
              <Box position="absolute" left="4" top="50%" transform="translateY(-50%)" color="ink.300">
                <Search size={16} />
              </Box>
              <Input
                pl="11"
                h="12"
                borderRadius="full"
                bg="#f7f8fc"
                borderColor="rgba(165, 176, 198, 0.18)"
                placeholder="搜索联系人、渠道或关键词"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </Box>

            <Stack gap="3">
              {filteredConversations.map((item) => {
                const isActive = item.id === selectedConversation.id;

                return (
                  <Box
                    key={item.id}
                    as="button"
                    textAlign="left"
                    onClick={() => setSelectedId(item.id)}
                    cursor="pointer"
                    p="4.5"
                    borderRadius="22px"
                    border="1px solid"
                    borderColor={isActive ? 'rgba(61, 104, 255, 0.38)' : 'rgba(165, 176, 198, 0.18)'}
                    bg={isActive ? '#f4f7ff' : 'white'}
                    transition="all 0.18s ease"
                    _hover={{ borderColor: 'rgba(61, 104, 255, 0.24)', bg: '#f8faff' }}
                  >
                    <Flex justify="space-between" gap="4" mb="3">
                      <Box>
                        <Text fontSize="17px" fontWeight="700" color="ink.900">
                          {item.name}
                        </Text>
                        <Text fontSize="13px" color="ink.400">
                          {item.channel}
                        </Text>
                      </Box>
                      <Text fontSize="12px" color="ink.300">
                        {item.latest}
                      </Text>
                    </Flex>

                    <Text fontSize="14px" lineHeight="1.8" color="ink.500">
                      {item.summary}
                    </Text>

                    <HStack mt="3.5" justify="space-between" align="center">
                      <StatusPill value={item.status} />
                      <HStack gap="2">
                        {item.tags.map((tag) => (
                          <Box key={tag} px="2.5" py="1" borderRadius="full" bg="#f6f7fb" fontSize="11px" color="ink.400">
                            {tag}
                          </Box>
                        ))}
                      </HStack>
                    </HStack>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </SurfaceCard>

        <SurfaceCard p="0" overflow="hidden">
          <Flex
            px="6"
            py="5"
            borderBottom="1px solid rgba(165, 176, 198, 0.18)"
            align="center"
            justify="space-between"
          >
            <Box>
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                对话现场
              </Text>
              <Text mt="2" fontSize="26px" lineHeight="1.1" letterSpacing="-0.03em" fontWeight="700" color="ink.900">
                {selectedConversation.name}
              </Text>
            </Box>
            <HStack gap="2">
              <Button variant="outline" size="sm" borderRadius="full">
                <PhoneCall size={14} />
                致电
              </Button>
              <Button size="sm" borderRadius="full" bg="brand.500" color="white" _hover={{ bg: 'brand.600' }}>
                转人工
              </Button>
            </HStack>
          </Flex>

          <Stack gap="4" px="6" py="6" minH="540px" bg="#fbfcff">
            {transcript.map((item, index) => {
              const isUser = item.role === 'user';

              return (
                <Flex key={index} justify={isUser ? 'flex-end' : 'flex-start'}>
                  <Box maxW="88%">
                    <HStack
                      mb="2"
                      justify={isUser ? 'flex-end' : 'flex-start'}
                      fontSize="12px"
                      color="ink.300"
                    >
                      {!isUser ? <Bot size={14} /> : null}
                      <Text>{isUser ? '客户' : 'AI 助手'}</Text>
                      {isUser ? <UserRound size={14} /> : null}
                    </HStack>
                    <Box
                      px="4.5"
                      py="3.5"
                      borderRadius="22px"
                      bg={isUser ? 'brand.500' : 'white'}
                      color={isUser ? 'white' : 'ink.700'}
                      border={isUser ? 'none' : '1px solid rgba(165, 176, 198, 0.18)'}
                      boxShadow={isUser ? 'none' : '0 14px 26px rgba(15, 23, 42, 0.04)'}
                    >
                      <Text fontSize="14px" lineHeight="1.9">
                        {item.text}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              );
            })}
          </Stack>

          <Box px="6" py="5" borderTop="1px solid rgba(165, 176, 198, 0.18)">
            <Textarea
              minH="120px"
              resize="none"
              borderRadius="24px"
              bg="#f7f8fc"
              borderColor="rgba(165, 176, 198, 0.18)"
              placeholder="输入人工回复内容，或继续演示 AI 协同处理过程"
            />
            <Flex mt="4" justify="space-between" align="center">
              <Text fontSize="13px" color="ink.400">
                当前会话支持 AI 回复、人工接管和上下文查看。
              </Text>
              <Button bg="brand.500" color="white" borderRadius="full" px="5" _hover={{ bg: 'brand.600' }}>
                发送回复
              </Button>
            </Flex>
          </Box>
        </SurfaceCard>

        <Stack gap="6">
          <SurfaceCard p="5">
            <Stack gap="4">
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                联系人画像
              </Text>
              <HStack gap="4" align="center">
                <Box
                  w="14"
                  h="14"
                  borderRadius="20px"
                  bg="#eef3ff"
                  color="brand.600"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <UserRound size={22} />
                </Box>
                <Box>
                  <Text fontSize="20px" fontWeight="700" color="ink.900">
                    {selectedConversation.name}
                  </Text>
                  <Text fontSize="13px" color="ink.400">
                    查看联系人标签、订单信息和最近跟进记录
                  </Text>
                </Box>
              </HStack>

              <Stack gap="3">
                {[
                  ['最近诉求', '咨询非工作时间自动接待和人工接管规则'],
                  ['客户阶段', '已进入沟通阶段，持续关注服务效率'],
                  ['推荐动作', '优先补充工作时间配置和联系人字段'],
                ].map(([label, value]) => (
                  <Box key={label} p="4" borderRadius="20px" bg="#f7f8fc">
                    <Text fontSize="12px" color="ink.400" mb="1.5">
                      {label}
                    </Text>
                    <Text fontSize="14px" lineHeight="1.8" color="ink.700">
                      {value}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </SurfaceCard>

          <SurfaceCard p="5">
            <Stack gap="4">
              <HStack justify="space-between">
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                会话建议
              </Text>
                <Sparkles size={16} color="#2f54eb" />
              </HStack>

              {[
                {
                  title: '建议补充工作时间配置',
                  description: '可明确说明非工作时间如何由 AI 自动接待并在工作时间内转交人工。',
                },
                {
                  title: '建议查看联系人字段',
                  description: '在回复中引用联系人字段、订单信息和渠道来源，可提高上下文完整度。',
                },
              ].map((item) => (
                <Box key={item.title} p="4" borderRadius="20px" border="1px solid rgba(165, 176, 198, 0.18)">
                  <Text fontSize="15px" fontWeight="600" color="ink.800">
                    {item.title}
                  </Text>
                  <Text mt="2" fontSize="14px" lineHeight="1.8" color="ink.500">
                    {item.description}
                  </Text>
                  <HStack mt="3" color="brand.600" fontSize="13px" fontWeight="600">
                    <Text>查看详情</Text>
                    <ArrowUpRight size={14} />
                  </HStack>
                </Box>
              ))}
            </Stack>
          </SurfaceCard>

          <SurfaceCard p="5">
            <HStack justify="space-between" mb="4">
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                关键标签
              </Text>
              <Tags size={16} color="#2f54eb" />
            </HStack>
            <HStack gap="3" flexWrap="wrap">
              {['高价值客户', '售后流程', '可转人工', '联系人字段', '工作时间'].map((tag) => (
                <Box key={tag} px="3.5" py="2" borderRadius="full" bg="#f4f7ff" color="brand.600" fontSize="12px" fontWeight="600">
                  {tag}
                </Box>
              ))}
            </HStack>
            <HStack mt="5" gap="2.5" color="ink.400">
              <Star size={14} />
              <Text fontSize="13px">优先展示会话处理能力、上下文信息和转人工规则。</Text>
            </HStack>
          </SurfaceCard>
        </Stack>
      </SimpleGrid>
    </MainLayout>
  );
}
