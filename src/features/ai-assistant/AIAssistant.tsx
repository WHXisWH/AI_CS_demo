import {
  Bot,
  Database,
  FileText,
  FolderOpen,
  MessageSquareText,
  Settings2,
  Sparkles,
  WandSparkles,
} from 'lucide-react';
import {
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MainLayout, SurfaceCard } from '../../components/layout';

const knowledgeBases = [
  {
    name: '产品知识库',
    description: '沉淀产品卖点、能力边界、常见问题与演示答法。',
    status: '已就绪',
    count: '126 份文档',
  },
  {
    name: '售后政策库',
    description: '用于退款规则、工作时间、服务标准等问答场景。',
    status: '训练中',
    count: '42 份文档',
  },
  {
    name: '行业案例库',
    description: '补充案例讲法，让回复更像有经验的售前顾问。',
    status: '已就绪',
    count: '18 份案例',
  },
];

const modelCards = [
  {
    title: '默认接待策略',
    description: '语气专业、克制，优先解释清楚功能和业务价值，再引导下一步操作。',
  },
  {
    title: '转人工策略',
    description: '识别高风险、高价值或长链路问题时，主动建议人工介入，避免演示显得失控。',
  },
  {
    title: '变量补全策略',
    description: '自动引用联系人标签、订单字段和渠道来源，让对话更贴近真实业务。',
  },
];

export function AIAssistant() {
  return (
    <MainLayout
      title="AI 助手配置"
      subtitle="配置和管理 AI 助手的知识、回复策略和提示词。"
      actions={
        <>
          <Button variant="outline" borderRadius="full" px="5">
            导入文档
          </Button>
          <Button bg="brand.500" color="white" borderRadius="full" px="5" _hover={{ bg: 'brand.600' }}>
            保存配置
          </Button>
        </>
      }
    >
      <SimpleGrid columns={{ base: 1, xl: 3 }} gap="6" alignItems="start">
        <Stack gap="6" gridColumn={{ xl: 'span 2' }}>
          <SurfaceCard p="6">
            <Flex justify="space-between" align={{ base: 'start', md: 'center' }} gap="4" direction={{ base: 'column', md: 'row' }}>
              <Box>
                <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                  助手总览
                </Text>
                <Text mt="2" fontSize="30px" fontWeight="700" letterSpacing="-0.04em" color="ink.900">
                  配置知识、模型和回复策略
                </Text>
              </Box>
              <HStack gap="3">
                {[
                  ['知识完备度', '92%'],
                  ['回复状态', '稳定'],
                ].map(([label, value]) => (
                  <Box key={label} px="4" py="3" borderRadius="20px" bg="#f7f8fc">
                    <Text fontSize="12px" color="ink.400">
                      {label}
                    </Text>
                    <Text mt="1.5" fontSize="20px" fontWeight="700" color="ink.900">
                      {value}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </Flex>
          </SurfaceCard>

          <SurfaceCard p="6">
            <HStack justify="space-between" mb="5">
              <Box>
                <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                  知识库
                </Text>
                <Text mt="2" fontSize="24px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
                  管理用于回复的知识文档
                </Text>
              </Box>
              <Button variant="outline" borderRadius="full">
                <FolderOpen size={14} />
                查看文档
              </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap="4">
              {knowledgeBases.map((item) => (
                <Box
                  key={item.name}
                  p="4.5"
                  borderRadius="22px"
                  bg="#fbfcff"
                  border="1px solid rgba(165, 176, 198, 0.18)"
                >
                  <HStack justify="space-between" align="start" mb="3">
                    <Box
                      w="11"
                      h="11"
                      borderRadius="18px"
                      bg="#eef3ff"
                      color="brand.600"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Database size={18} />
                    </Box>
                    <Box
                      px="3"
                      py="1.5"
                      borderRadius="full"
                      bg={item.status === '训练中' ? '#fff4e8' : '#eef8f2'}
                      color={item.status === '训练中' ? '#b86f00' : '#1f8b59'}
                      fontSize="12px"
                      fontWeight="600"
                    >
                      {item.status}
                    </Box>
                  </HStack>
                  <Text fontSize="18px" fontWeight="700" color="ink.900">
                    {item.name}
                  </Text>
                  <Text mt="2.5" fontSize="14px" lineHeight="1.8" color="ink.500">
                    {item.description}
                  </Text>
                  <Text mt="4" fontSize="12px" color="ink.400">
                    {item.count}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </SurfaceCard>

          <SurfaceCard p="6">
            <HStack justify="space-between" mb="5">
              <Box>
                <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
                  回复策略
                </Text>
                <Text mt="2" fontSize="24px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
                  设置默认回复逻辑
                </Text>
              </Box>
              <Settings2 size={18} color="#2f54eb" />
            </HStack>

            <Stack gap="4">
              {modelCards.map((item, index) => (
                <Flex
                  key={item.title}
                  gap="4"
                  p="4.5"
                  borderRadius="22px"
                  border="1px solid rgba(165, 176, 198, 0.18)"
                  align="start"
                >
                  <Box
                    w="11"
                    h="11"
                    borderRadius="18px"
                    bg={index === 0 ? '#eef3ff' : index === 1 ? '#eef8f2' : '#fff4e8'}
                    color={index === 0 ? 'brand.600' : index === 1 ? '#1f8b59' : '#b86f00'}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    {index === 0 ? <Bot size={18} /> : index === 1 ? <WandSparkles size={18} /> : <Sparkles size={18} />}
                  </Box>
                  <Box>
                    <Text fontSize="17px" fontWeight="700" color="ink.900">
                      {item.title}
                    </Text>
                    <Text mt="2" fontSize="14px" lineHeight="1.85" color="ink.500">
                      {item.description}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </SurfaceCard>
        </Stack>

        <Stack gap="6">
          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              系统提示词
            </Text>
            <Text mt="2" fontSize="22px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
              系统提示词
            </Text>
            <Textarea
              mt="4"
              minH="250px"
              resize="none"
              borderRadius="24px"
              bg="#f7f8fc"
              borderColor="rgba(165, 176, 198, 0.18)"
              defaultValue={`你是云栖AI的产品助手。\n\n请遵循以下要求：\n1. 使用清晰、专业、简洁的语气回答问题。\n2. 优先引用知识库内容，确保回复准确。\n3. 当问题超出当前能力范围时，引导用户联系人工服务。\n4. 不要做出无法确认的承诺。`}
            />
            <Button mt="4" w="full" bg="brand.500" color="white" borderRadius="full" _hover={{ bg: 'brand.600' }}>
              保存提示词
            </Button>
          </SurfaceCard>

          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              测试对话
            </Text>
            <Text mt="2" fontSize="22px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
              预览回复效果
            </Text>

            <Stack mt="4" gap="3.5">
              <Box px="4" py="3.5" borderRadius="20px" bg="#f7f8fc">
                <Text fontSize="13px" color="ink.500">
                  客户：这个系统能不能接微信和网页咨询？
                </Text>
              </Box>
              <Box px="4" py="3.5" borderRadius="20px" bg="#eef3ff">
                <Text fontSize="13px" lineHeight="1.8" color="brand.700">
                  可以。系统支持多渠道接待、AI 自动回复、转人工配置和数据分析能力，可统一管理客户会话。
                </Text>
              </Box>
            </Stack>

            <Button mt="4" variant="outline" w="full" borderRadius="full">
              <MessageSquareText size={14} />
              开始测试
            </Button>
          </SurfaceCard>

          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              配置建议
            </Text>
            <Stack mt="4" gap="3">
              {[
                '优先补齐售后政策与工作时间规则。',
                '完善常见问题和标准回复示例。',
                '补充联系人字段和业务变量配置。',
              ].map((item) => (
                <HStack key={item} align="start" gap="3">
                  <Box w="2" h="2" borderRadius="full" bg="brand.500" mt="2.5" />
                  <Text fontSize="14px" lineHeight="1.85" color="ink.500">
                    {item}
                  </Text>
                </HStack>
              ))}
            </Stack>
            <HStack mt="5" color="ink.400">
              <FileText size={14} />
              <Text fontSize="13px">建议在发布前完成知识库训练和测试问答校验。</Text>
            </HStack>
          </SurfaceCard>
        </Stack>
      </SimpleGrid>
    </MainLayout>
  );
}
