import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Handle,
  Position,
} from '@xyflow/react';
import type { Connection, Edge, Node, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Play,
  GitBranch,
  Bot,
  Zap,
  StopCircle,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Settings,
  Trash2,
} from 'lucide-react';
import { MainLayout } from '../../components/layout';
import { Card, Button, Input, Badge } from '../../components/ui';

const nodeTypes = {
  trigger: TriggerNode,
  condition: ConditionNode,
  aiProcess: AIProcessNode,
  action: ActionNode,
  end: EndNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'New Message', config: { platform: 'all' } },
  },
  {
    id: '2',
    type: 'condition',
    position: { x: 250, y: 180 },
    data: { label: 'Contains Keyword?', config: { keyword: 'help' } },
  },
  {
    id: '3',
    type: 'aiProcess',
    position: { x: 100, y: 320 },
    data: { label: 'AI Response', config: { model: 'gpt-4' } },
  },
  {
    id: '4',
    type: 'action',
    position: { x: 400, y: 320 },
    data: { label: 'Human Handover', config: { priority: 'high' } },
  },
  {
    id: '5',
    type: 'end',
    position: { x: 250, y: 460 },
    data: { label: 'End' },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', label: 'Yes' },
  { id: 'e2-4', source: '2', target: '4', label: 'No' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' },
];

function TriggerNode({ data }: NodeProps) {
  return (
    <div className="bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-xl p-4 min-w-[160px] shadow-lg text-white">
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
      <div className="flex items-center gap-2 mb-2">
        <Play className="w-5 h-5" />
        <span className="font-semibold">Trigger</span>
      </div>
      <p className="text-sm text-white/80">{data.label as string}</p>
    </div>
  );
}

function ConditionNode({ data }: NodeProps) {
  return (
    <div className="bg-white rounded-xl p-4 min-w-[160px] shadow-lg border-2 border-[#F59E0B]">
      <Handle type="target" position={Position.Top} className="!bg-[#F59E0B] !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-[#F59E0B] !w-3 !h-3" id="yes" />
      <Handle type="source" position={Position.Right} className="!bg-[#F59E0B] !w-3 !h-3" id="no" />
      <div className="flex items-center gap-2 mb-2">
        <GitBranch className="w-5 h-5 text-[#F59E0B]" />
        <span className="font-semibold text-[var(--color-gray-900)]">Condition</span>
      </div>
      <p className="text-sm text-[var(--color-gray-600)]">{data.label as string}</p>
    </div>
  );
}

function AIProcessNode({ data }: NodeProps) {
  return (
    <div className="bg-gradient-to-br from-[#4FACFE] to-[#00F2FE] rounded-xl p-4 min-w-[160px] shadow-lg text-white">
      <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-white !w-3 !h-3" />
      <div className="flex items-center gap-2 mb-2">
        <Bot className="w-5 h-5" />
        <span className="font-semibold">AI Process</span>
      </div>
      <p className="text-sm text-white/80">{data.label as string}</p>
    </div>
  );
}

function ActionNode({ data }: NodeProps) {
  return (
    <div className="bg-white rounded-xl p-4 min-w-[160px] shadow-lg border-2 border-[#10B981]">
      <Handle type="target" position={Position.Top} className="!bg-[#10B981] !w-3 !h-3" />
      <Handle type="source" position={Position.Bottom} className="!bg-[#10B981] !w-3 !h-3" />
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-5 h-5 text-[#10B981]" />
        <span className="font-semibold text-[var(--color-gray-900)]">Action</span>
      </div>
      <p className="text-sm text-[var(--color-gray-600)]">{data.label as string}</p>
    </div>
  );
}

function EndNode({ data }: NodeProps) {
  return (
    <div className="bg-[var(--color-gray-800)] rounded-xl p-4 min-w-[120px] shadow-lg text-white">
      <Handle type="target" position={Position.Top} className="!bg-white !w-3 !h-3" />
      <div className="flex items-center gap-2">
        <StopCircle className="w-5 h-5" />
        <span className="font-semibold">{data.label as string}</span>
      </div>
    </div>
  );
}

const nodeTemplates = [
  {
    type: 'trigger',
    label: 'Trigger',
    description: 'Start the flow',
    icon: Play,
    color: 'from-[#667EEA] to-[#764BA2]',
  },
  {
    type: 'condition',
    label: 'Condition',
    description: 'Branch logic',
    icon: GitBranch,
    color: 'from-[#F59E0B] to-[#D97706]',
  },
  {
    type: 'aiProcess',
    label: 'AI Process',
    description: 'AI response',
    icon: Bot,
    color: 'from-[#4FACFE] to-[#00F2FE]',
  },
  {
    type: 'action',
    label: 'Action',
    description: 'Execute action',
    icon: Zap,
    color: 'from-[#10B981] to-[#059669]',
  },
  {
    type: 'end',
    label: 'End',
    description: 'End the flow',
    icon: StopCircle,
    color: 'from-[#6B7280] to-[#374151]',
  },
];

export function FlowDesigner() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left - 80,
        y: event.clientY - reactFlowBounds.top - 30,
      };

      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: { label: `New ${type}` },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <MainLayout title="Flow Designer" subtitle="Create and manage automation workflows">
      <div className="flex gap-6 h-[calc(100vh-140px)]">
        {/* Left Panel - Node Templates */}
        <Card className="w-60 flex-shrink-0 !p-4">
          <h3 className="font-semibold text-[var(--color-gray-900)] mb-4">
            Nodes
          </h3>
          <div className="space-y-2">
            {nodeTemplates.map((template) => (
              <div
                key={template.type}
                draggable
                onDragStart={(e) => onDragStart(e, template.type)}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-gray-50)] hover:bg-[var(--color-gray-100)] cursor-grab active:cursor-grabbing transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center text-white`}
                >
                  <template.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm text-[var(--color-gray-900)]">
                    {template.label}
                  </p>
                  <p className="text-xs text-[var(--color-gray-500)]">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Canvas */}
        <Card className="flex-1 !p-0 overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-gray-100)]">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Undo className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Redo className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-[var(--color-gray-200)] mx-2" />
              <Button variant="ghost" size="sm">
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ZoomOut className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success">Draft</Badge>
              <Button variant="outline" size="sm" icon={<Settings className="w-4 h-4" />}>
                Settings
              </Button>
              <Button size="sm" icon={<Save className="w-4 h-4" />}>
                Save Flow
              </Button>
            </div>
          </div>

          {/* React Flow Canvas */}
          <div className="h-[calc(100%-60px)]" onDrop={onDrop} onDragOver={onDragOver}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls className="!bg-white !shadow-lg !rounded-xl !border-none" />
              <MiniMap
                className="!bg-white !shadow-lg !rounded-xl"
                nodeColor={(node) => {
                  switch (node.type) {
                    case 'trigger':
                      return '#667EEA';
                    case 'condition':
                      return '#F59E0B';
                    case 'aiProcess':
                      return '#4FACFE';
                    case 'action':
                      return '#10B981';
                    default:
                      return '#6B7280';
                  }
                }}
              />
              <Background gap={20} size={1} />
            </ReactFlow>
          </div>
        </Card>

        {/* Right Panel - Node Config */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Card className="w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--color-gray-900)]">
                  Node Config
                </h3>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="p-1 rounded-lg hover:bg-[var(--color-gray-100)]"
                >
                  <Trash2 className="w-4 h-4 text-[var(--color-gray-400)]" />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Label"
                  value={selectedNode.data.label as string}
                  onChange={(e) => {
                    setNodes((nds) =>
                      nds.map((n) =>
                        n.id === selectedNode.id
                          ? { ...n, data: { ...n.data, label: e.target.value } }
                          : n
                      )
                    );
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Node Type
                  </label>
                  <Badge variant="primary">{selectedNode.type}</Badge>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                    Position
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="px-3 py-2 rounded-lg bg-[var(--color-gray-100)] text-sm">
                      X: {Math.round(selectedNode.position.x)}
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-[var(--color-gray-100)] text-sm">
                      Y: {Math.round(selectedNode.position.y)}
                    </div>
                  </div>
                </div>

                {selectedNode.type === 'condition' && (
                  <Input
                    label="Condition"
                    placeholder="Enter condition..."
                  />
                )}

                {selectedNode.type === 'aiProcess' && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      AI Model
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl border border-[var(--color-gray-200)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#667EEA]">
                      <option>GPT-4 Turbo</option>
                      <option>GPT-3.5 Turbo</option>
                      <option>Claude 3</option>
                    </select>
                  </div>
                )}

                {selectedNode.type === 'action' && (
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Action Type
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl border border-[var(--color-gray-200)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#667EEA]">
                      <option>Send Message</option>
                      <option>Human Handover</option>
                      <option>Update Record</option>
                      <option>Send Email</option>
                    </select>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
