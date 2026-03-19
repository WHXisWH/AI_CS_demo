import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
} from '@xyflow/react';
import type { Connection, Edge, Node, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Bot,
  FolderKanban,
  GitBranch,
  Play,
  Send,
  Sparkles,
  SquareTerminal,
  UserRoundCog,
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

type DemoNodeType = 'trigger' | 'decision' | 'assistant' | 'handoff' | 'action';
type DemoNodeData = { title: string; subtitle: string; type: DemoNodeType };
type DemoFlowNode = Node<DemoNodeData, DemoNodeType>;

function nodeStyles(type: DemoNodeType) {
  if (type === 'trigger') {
    return {
      bg: 'linear-gradient(135deg, #3d68ff 0%, #547eff 100%)',
      border: '1px solid rgba(84, 126, 255, 0.24)',
      color: '#ffffff',
    };
  }

  if (type === 'assistant') {
    return {
      bg: 'linear-gradient(135deg, #f5f8ff 0%, #eaf0ff 100%)',
      border: '1px solid rgba(84, 126, 255, 0.24)',
      color: '#1d2537',
    };
  }

  if (type === 'handoff') {
    return {
      bg: 'linear-gradient(135deg, #eef8f2 0%, #f8fcf9 100%)',
      border: '1px solid rgba(31, 139, 89, 0.18)',
      color: '#1d2537',
    };
  }

  if (type === 'decision') {
    return {
      bg: 'linear-gradient(135deg, #fff7ec 0%, #fffdf8 100%)',
      border: '1px solid rgba(184, 111, 0, 0.2)',
      color: '#1d2537',
    };
  }

  return {
    bg: '#ffffff',
    border: '1px solid rgba(165, 176, 198, 0.24)',
    color: '#1d2537',
  };
}

function FlowNode({ data }: NodeProps<DemoFlowNode>) {
  const styles = nodeStyles(data.type);

  return (
    <Box
      minW="220px"
      px="4"
      py="4"
      borderRadius="20px"
      bg={styles.bg}
      border={styles.border}
      color={styles.color}
      boxShadow="0 16px 34px rgba(15, 23, 42, 0.08)"
    >
      <Handle type="target" position={Position.Top} style={{ width: 10, height: 10, background: '#3d68ff', border: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ width: 10, height: 10, background: '#3d68ff', border: 'none' }} />
      <Text fontSize="15px" fontWeight="700">
        {data.title}
      </Text>
      <Text mt="2" fontSize="12px" lineHeight="1.7" color={data.type === 'trigger' ? 'rgba(255,255,255,0.8)' : '#5b6883'}>
        {data.subtitle}
      </Text>
    </Box>
  );
}

const nodeTypes = {
  trigger: FlowNode,
  decision: FlowNode,
  assistant: FlowNode,
  handoff: FlowNode,
  action: FlowNode,
};

const initialNodes: DemoFlowNode[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 220, y: 40 },
    data: { title: '消息进入', subtitle: '微信 / 网页 / 企业微信统一接入', type: 'trigger' },
  },
  {
    id: '2',
    type: 'decision',
    position: { x: 220, y: 180 },
    data: { title: '识别客户意图', subtitle: '判断是否属于标准问答与售后规则范围', type: 'decision' },
  },
  {
    id: '3',
    type: 'assistant',
    position: { x: 40, y: 340 },
    data: { title: 'AI 自动回复', subtitle: '调用知识库、变量和标准话术完成接待', type: 'assistant' },
  },
  {
    id: '4',
    type: 'handoff',
    position: { x: 390, y: 340 },
    data: { title: '人工接管', subtitle: '复杂问题、重点客户或高风险场景转给坐席', type: 'handoff' },
  },
  {
    id: '5',
    type: 'action',
    position: { x: 220, y: 500 },
    data: { title: '沉淀分析数据', subtitle: '记录命中率、转人工率与满意度反馈', type: 'action' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#8ea7ff', strokeWidth: 2 } },
  { id: 'e2-3', source: '2', target: '3', label: '标准场景', style: { stroke: '#8ea7ff', strokeWidth: 2 } },
  { id: 'e2-4', source: '2', target: '4', label: '复杂问题', style: { stroke: '#8ea7ff', strokeWidth: 2 } },
  { id: 'e3-5', source: '3', target: '5', style: { stroke: '#8ea7ff', strokeWidth: 2 } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: '#8ea7ff', strokeWidth: 2 } },
];

const templates: Array<{
  type: DemoNodeType;
  title: string;
  description: string;
  icon: typeof Play;
}> = [
  { type: 'trigger', title: '触发节点', description: '接收客户消息', icon: Play },
  { type: 'decision', title: '判断节点', description: '条件分支处理', icon: GitBranch },
  { type: 'assistant', title: 'AI 节点', description: '知识与变量回复', icon: Bot },
  { type: 'handoff', title: '人工节点', description: '转接人工坐席', icon: UserRoundCog },
  { type: 'action', title: '动作节点', description: '执行记录或通知', icon: Send },
];

export function FlowDesigner() {
  const [nodes, setNodes, onNodesChange] = useNodesState<DemoFlowNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<DemoFlowNode | null>(initialNodes[2]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((currentEdges) => addEdge({ ...params, animated: true, style: { stroke: '#8ea7ff', strokeWidth: 2 } }, currentEdges)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: DemoFlowNode) => {
    setSelectedNode(node);
  }, []);

  const onDragStart = (event: React.DragEvent, type: DemoNodeType) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as DemoNodeType;
      if (!type) return;

      const bounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left - 100,
        y: event.clientY - bounds.top - 40,
      };

      const template = templates.find((item) => item.type === type);
      if (!template) return;

      const newNode: DemoFlowNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          title: template.title,
          subtitle: template.description,
          type,
        },
      };

      setNodes((currentNodes) => [...currentNodes, newNode]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <MainLayout
      title="AI 流程"
      subtitle="创建和管理自动化工作流。"
      actions={
        <>
          <Button variant="outline" borderRadius="full" px="5">
            保存草稿
          </Button>
          <Button bg="brand.500" color="white" borderRadius="full" px="5" _hover={{ bg: 'brand.600' }}>
            发布流程
          </Button>
        </>
      }
    >
      <Stack display={{ base: 'flex', lg: 'none' }} gap="6">
        <SurfaceCard p="5">
          <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
            流程概览
          </Text>
          <Stack mt="4" gap="3.5">
            {initialNodes.map((node, index) => (
              <HStack key={node.id} align="start" gap="3">
                <Box
                  w="8"
                  h="8"
                  mt="1"
                  borderRadius="full"
                  bg={index === 0 ? 'brand.500' : '#e9eef8'}
                  color={index === 0 ? 'white' : 'ink.500'}
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="12px"
                  fontWeight="700"
                  flexShrink="0"
                >
                  {index + 1}
                </Box>
                <Box flex="1">
                  <Text fontSize="16px" fontWeight="700" color="ink.900">
                    {node.data.title}
                  </Text>
                  <Text mt="1.5" fontSize="13px" lineHeight="1.8" color="ink.500">
                    {node.data.subtitle}
                  </Text>
                </Box>
              </HStack>
            ))}
          </Stack>
        </SurfaceCard>

        <SurfaceCard p="5">
          <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
            可用节点
          </Text>
          <SimpleGrid columns={2} gap="3" mt="4">
            {templates.map((item) => (
              <Box key={item.title} p="4" borderRadius="20px" border="1px solid rgba(165, 176, 198, 0.18)" bg="#fbfcff">
                <HStack gap="3" align="start">
                  <Box
                    w="10"
                    h="10"
                    borderRadius="16px"
                    bg="#eef3ff"
                    color="brand.600"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <item.icon size={16} />
                  </Box>
                  <Box>
                    <Text fontSize="14px" fontWeight="700" color="ink.900">
                      {item.title}
                    </Text>
                    <Text mt="1" fontSize="12px" lineHeight="1.7" color="ink.500">
                      {item.description}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </SurfaceCard>

        <SurfaceCard p="5">
          <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
            节点配置
          </Text>
          <Text mt="2" fontSize="20px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
            {selectedNode?.data?.title?.toString() ?? 'AI 自动回复'}
          </Text>
          <Stack mt="4" gap="4">
            <Box>
              <Text fontSize="13px" color="ink.400" mb="2">
                节点名称
              </Text>
              <Input
                value={selectedNode?.data?.title?.toString() ?? ''}
                readOnly
                h="11"
                borderRadius="18px"
                bg="#f7f8fc"
                borderColor="rgba(165, 176, 198, 0.18)"
              />
            </Box>
            <Box>
              <Text fontSize="13px" color="ink.400" mb="2">
                节点说明
              </Text>
              <Textarea
                value={selectedNode?.data?.subtitle?.toString() ?? ''}
                readOnly
                minH="120px"
                resize="none"
                borderRadius="22px"
                bg="#f7f8fc"
                borderColor="rgba(165, 176, 198, 0.18)"
              />
            </Box>
          </Stack>
        </SurfaceCard>
      </Stack>

      <SimpleGrid display={{ base: 'none', lg: 'grid' }} columns={{ lg: 1, xl: 4 }} gap="6" alignItems="start">
        <Stack gap="6">
          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              节点库
            </Text>
            <Stack mt="4" gap="3">
              {templates.map((item) => (
                <Box
                  key={item.title}
                  draggable
                  onDragStart={(event) => onDragStart(event, item.type)}
                  p="4"
                  borderRadius="22px"
                  border="1px solid rgba(165, 176, 198, 0.18)"
                  bg="#fbfcff"
                  cursor="grab"
                  _active={{ cursor: 'grabbing' }}
                >
                  <HStack gap="3" align="start">
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
                      <item.icon size={18} />
                    </Box>
                    <Box>
                      <Text fontSize="15px" fontWeight="700" color="ink.900">
                        {item.title}
                      </Text>
                      <Text mt="1.5" fontSize="13px" color="ink.500" lineHeight="1.7">
                        {item.description}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </Stack>
          </SurfaceCard>

          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              流程提示
            </Text>
            <Stack mt="4" gap="3">
              {[
                '拖拽节点到画布中即可创建新的流程节点。',
                '通过连接不同节点，配置自动化处理逻辑。',
                '发布前建议检查触发条件和转人工规则。',
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

        <SurfaceCard p="0" overflow="hidden" gridColumn={{ xl: 'span 2' }}>
          <Flex
            px="6"
            py="5"
            borderBottom="1px solid rgba(165, 176, 198, 0.18)"
            align={{ base: 'start', md: 'center' }}
            justify="space-between"
            gap="4"
            direction={{ base: 'column', md: 'row' }}
          >
            <Box>
              <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              流程画布
            </Text>
            <Text mt="2" fontSize="26px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
              标准接待流程
            </Text>
            </Box>
            <HStack gap="3">
              <Button variant="outline" size="sm" borderRadius="full">
                <FolderKanban size={14} />
                复制流程
              </Button>
              <Button size="sm" borderRadius="full" bg="brand.500" color="white" _hover={{ bg: 'brand.600' }}>
                <Sparkles size={14} />
                生成节点
              </Button>
            </HStack>
          </Flex>

          <Box h="760px" onDrop={onDrop} onDragOver={onDragOver}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              fitView
            >
              <MiniMap
                pannable
                zoomable
                style={{
                  background: '#ffffff',
                  borderRadius: 18,
                  border: '1px solid rgba(165, 176, 198, 0.18)',
                }}
              />
              <Controls />
              <Background gap={18} size={1} color="#dce4f2" />
            </ReactFlow>
          </Box>
        </SurfaceCard>

        <Stack gap="6">
          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              节点配置
            </Text>
            <Text mt="2" fontSize="22px" fontWeight="700" letterSpacing="-0.03em" color="ink.900">
              {selectedNode?.data?.title?.toString() ?? 'AI 自动回复'}
            </Text>

            <Stack mt="4" gap="4">
              <Box>
                <Text fontSize="13px" color="ink.400" mb="2">
                  节点名称
                </Text>
                <Input
                  value={selectedNode?.data?.title?.toString() ?? ''}
                  readOnly
                  h="12"
                  borderRadius="18px"
                  bg="#f7f8fc"
                  borderColor="rgba(165, 176, 198, 0.18)"
                />
              </Box>
              <Box>
                <Text fontSize="13px" color="ink.400" mb="2">
                  节点说明
                </Text>
                <Textarea
                  value={selectedNode?.data?.subtitle?.toString() ?? ''}
                  readOnly
                  minH="140px"
                  resize="none"
                  borderRadius="22px"
                  bg="#f7f8fc"
                  borderColor="rgba(165, 176, 198, 0.18)"
                />
              </Box>
            </Stack>
          </SurfaceCard>

          <SurfaceCard p="5">
            <Text fontSize="12px" fontWeight="700" letterSpacing="0.14em" color="brand.600">
              当前流程价值
            </Text>
            <Stack mt="4" gap="3">
              {[
                {
                  icon: Bot,
                  title: 'AI 自动回复',
                  description: '基于知识库和变量生成标准回复内容。',
                },
                {
                  icon: UserRoundCog,
                  title: '人工接管',
                  description: '在复杂场景下转交人工处理，保障服务质量。',
                },
                {
                  icon: SquareTerminal,
                  title: '动作执行',
                  description: '支持记录结果、发送通知或执行后续处理动作。',
                },
              ].map((item) => (
                <HStack key={item.title} align="start" gap="3">
                  <Box
                    w="10"
                    h="10"
                    borderRadius="16px"
                    bg="#eef3ff"
                    color="brand.600"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink="0"
                  >
                    <item.icon size={16} />
                  </Box>
                  <Box>
                    <Text fontSize="15px" fontWeight="700" color="ink.800">
                      {item.title}
                    </Text>
                    <Text mt="1" fontSize="13px" lineHeight="1.75" color="ink.500">
                      {item.description}
                    </Text>
                  </Box>
                </HStack>
              ))}
            </Stack>
          </SurfaceCard>
        </Stack>
      </SimpleGrid>
    </MainLayout>
  );
}
