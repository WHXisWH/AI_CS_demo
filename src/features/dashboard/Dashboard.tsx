import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography } from 'antd';
import { ArrowRightOutlined, BookOutlined, PhoneOutlined, RightOutlined } from '@ant-design/icons';
import { MainLayout } from '../../components/layout';

const { Title, Text } = Typography;

/* ── Section header with blue left border ── */
function SectionTitle({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
      <div style={{ width: 3, height: 18, borderRadius: 2, background: '#1677ff', flexShrink: 0 }} />
      <Title level={5} style={{ margin: 0, fontSize: 15, color: '#1e2130' }}>{text}</Title>
    </div>
  );
}

/* ── SVG Illustrations ── */
function IlluFlow() {
  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle cx="260" cy="30" r="50" fill="#818cf8" fillOpacity="0.12" />
      <circle cx="60" cy="130" r="40" fill="#6366f1" fillOpacity="0.08" />
      <path d="M72 80 L112 80" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M168 80 L208 80" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M264 80 L284 80" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="24" y="60" width="48" height="40" rx="10" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
      <circle cx="48" cy="74" r="8" fill="#6366f1" />
      <rect x="36" y="87" width="24" height="3" rx="1.5" fill="#a5b4fc" />
      <rect x="112" y="60" width="56" height="40" rx="10" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1" />
      <path d="M140 70 L148 80 L140 90 L132 80Z" fill="#7c3aed" />
      <rect x="128" y="92" width="32" height="3" rx="1.5" fill="#c4b5fd" />
      <rect x="208" y="56" width="56" height="48" rx="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
      <rect x="220" y="69" width="32" height="4" rx="2" fill="#3b82f6" fillOpacity="0.6" />
      <rect x="220" y="77" width="24" height="4" rx="2" fill="#3b82f6" fillOpacity="0.4" />
      <rect x="220" y="85" width="28" height="4" rx="2" fill="#3b82f6" fillOpacity="0.25" />
      <rect x="284" y="64" width="26" height="32" rx="8" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
      <path d="M291 76 L302 80 L291 84Z" fill="#16a34a" />
      <text x="48" y="113" textAnchor="middle" fontSize="8" fill="#6366f1" fontFamily="sans-serif">触发器</text>
      <text x="140" y="113" textAnchor="middle" fontSize="8" fill="#7c3aed" fontFamily="sans-serif">条件判断</text>
      <text x="236" y="116" textAnchor="middle" fontSize="8" fill="#2563eb" fontFamily="sans-serif">AI处理</text>
    </svg>
  );
}

function IlluVariable() {
  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle cx="280" cy="140" r="60" fill="#38bdf8" fillOpacity="0.1" />
      <circle cx="40" cy="20" r="36" fill="#0ea5e9" fillOpacity="0.08" />
      <rect x="47" y="32" width="226" height="106" rx="14" fill="black" fillOpacity="0.04" transform="translate(3,4)" />
      <rect x="47" y="32" width="226" height="106" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="47" y="32" width="226" height="30" rx="14" fill="#0ea5e9" />
      <rect x="47" y="47" width="226" height="15" fill="#0ea5e9" />
      <circle cx="68" cy="47" r="8" fill="white" fillOpacity="0.25" />
      <rect x="84" y="43" width="60" height="4" rx="2" fill="white" fillOpacity="0.7" />
      <rect x="168" y="68" width="90" height="22" rx="10" fill="#0ea5e9" />
      <text x="213" y="83" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="sans-serif">您好，怎么退款？</text>
      <rect x="55" y="98" width="170" height="28" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <rect x="63" y="107" width="28" height="12" rx="4" fill="#dbeafe" />
      <text x="77" y="117" textAnchor="middle" fontSize="7.5" fill="#1677ff" fontFamily="monospace">{'{{姓名}}'}</text>
      <rect x="97" y="107" width="34" height="12" rx="4" fill="#ede9fe" />
      <text x="114" y="117" textAnchor="middle" fontSize="7.5" fill="#7c3aed" fontFamily="monospace">{'{{订单}}'}</text>
      <text x="138" y="117" fontSize="8" fill="#64748b" fontFamily="sans-serif">已发货</text>
    </svg>
  );
}

function IlluContact() {
  const people = [
    { x: 88,  y: 68,  init: '张', bg: '#3b82f6', tag: 'VIP',   tc: '#1677ff' },
    { x: 160, y: 68,  init: '李', bg: '#10b981', tag: '高意向', tc: '#059669' },
    { x: 232, y: 68,  init: '王', bg: '#8b5cf6', tag: '企业',  tc: '#7c3aed' },
    { x: 88,  y: 118, init: '陈', bg: '#f59e0b', tag: '微信',  tc: '#d97706' },
    { x: 160, y: 118, init: '赵', bg: '#ef4444', tag: '电话',  tc: '#dc2626' },
    { x: 232, y: 118, init: '孙', bg: '#06b6d4', tag: '新客',  tc: '#0891b2' },
  ];
  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle cx="160" cy="80" r="90" fill="#f0fdf4" />
      <circle cx="160" cy="80" r="90" stroke="#bbf7d0" strokeWidth="1" />
      {people.map(p => (
        <g key={p.x + p.y}>
          <circle cx={p.x} cy={p.y} r="20" fill={p.bg} fillOpacity="0.15" />
          <circle cx={p.x} cy={p.y} r="16" fill={p.bg} />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fill="white" fontWeight="600" fontFamily="sans-serif">{p.init}</text>
          <rect x={p.x - 18} y={p.y + 19} width="36" height="13" rx="6" fill={p.tc} fillOpacity="0.12" />
          <text x={p.x} y={p.y + 29} textAnchor="middle" fontSize="7" fill={p.tc} fontFamily="sans-serif">{p.tag}</text>
        </g>
      ))}
    </svg>
  );
}

function IlluWorkHours() {
  const days = ['一','二','三','四','五','六','日'];
  const on = [true,true,true,true,true,false,false];
  return (
    <svg viewBox="0 0 320 160" fill="none" style={{ width: '100%', height: '100%' }}>
      <circle cx="280" cy="20" r="56" fill="#fef3c7" fillOpacity="0.7" />
      <circle cx="40" cy="140" r="44" fill="#fde68a" fillOpacity="0.3" />
      <rect x="36" y="22" width="246" height="118" rx="14" fill="white" stroke="#fde68a" strokeWidth="1" />
      <text x="56" y="44" fontSize="10" fill="#374151" fontWeight="600" fontFamily="sans-serif">工作时间设置</text>
      <rect x="186" y="32" width="80" height="18" rx="9" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
      <text x="226" y="44" textAnchor="middle" fontSize="8.5" fill="#d97706" fontFamily="sans-serif">09:00 – 18:00</text>
      {days.map((d, i) => (
        <g key={d}>
          <rect x={56 + i*32} y={58} width="26" height="26" rx="8" fill={on[i] ? '#1677ff' : '#f1f5f9'} stroke={on[i] ? '#1677ff' : '#e2e8f0'} strokeWidth="1" />
          <text x={56 + i*32 + 13} y={75} textAnchor="middle" fontSize="9" fill={on[i] ? 'white' : '#94a3b8'} fontFamily="sans-serif" fontWeight={on[i] ? '600' : '400'}>{d}</text>
        </g>
      ))}
      <rect x="56" y="100" width="210" height="26" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="70" y="117" fontSize="9" fill="#374151" fontFamily="sans-serif">非工作时间由 AI 自动接待</text>
      <rect x="232" y="108" width="26" height="14" rx="7" fill="#1677ff" />
      <circle cx="251" cy="115" r="5" fill="white" />
    </svg>
  );
}

/* ── Feature cards data ── */
const featureCards = [
  { title: '创建AI流程',       desc: 'AI流程可以让AI按照指定方式完整任务，调用第三方工具解决', Illu: IlluFlow,       bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)', route: '/flow-designer' },
  { title: '使用对话变量',     desc: '将用联系人信息，工具，知识作为AI大模型提示词变量',       Illu: IlluVariable,   bg: 'linear-gradient(135deg,#f0f9ff,#e0f2fe)', route: '/ai-assistant'  },
  { title: '自定义联系人字段', desc: '在移动端处理客户消息，查看AI对话，或者人工回复',         Illu: IlluContact,    bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', route: '/conversations'  },
  { title: '如何设置人工工作时间', desc: '配置何时转入人工对话，非工作时间如何处理',           Illu: IlluWorkHours,  bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)', route: '/ai-assistant'  },
];

/* ── Page ── */
export function Dashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout title="首页">
      <div style={{ padding: 24, maxWidth: 1200 }}>

        {/* 功能导览 */}
        <SectionTitle text="功能导览" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {featureCards.map((c, i) => (
            <Card
              key={i}
              hoverable
              styles={{
                body: { padding: '18px 22px 20px' },
              }}
              style={{ borderRadius: 12, border: '1px solid #edf0f5', overflow: 'hidden' }}
              cover={
                <div style={{ height: 160, background: c.bg, overflow: 'hidden', padding: '12px 20px 0', display:'flex', alignItems:'flex-end' }}>
                  <c.Illu />
                </div>
              }
            >
              <Title level={5} style={{ margin: '0 0 6px', fontSize: 14, color: '#1e2130' }}>
                {c.title}
              </Title>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', lineHeight: 1.7, marginBottom: 16 }}>
                {c.desc}
              </Text>
              <div style={{ display: 'flex', gap: 10 }}>
                <Button size="small" style={{ borderRadius: 6, height: 30, fontSize: 12 }}>
                  帮助文档
                </Button>
                <Button
                  type="primary" size="small"
                  icon={<ArrowRightOutlined />}
                  iconPosition="end"
                  style={{ borderRadius: 6, height: 30, fontSize: 12 }}
                  onClick={() => navigate(c.route)}
                >
                  使用
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* 更多帮助 */}
        <SectionTitle text="更多帮助" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { icon: <BookOutlined style={{ fontSize: 22, color: '#fff' }} />, bg: 'linear-gradient(135deg,#f59e0b,#d97706)', title: '产品教学文章', desc: '查看更多帮助教学' },
            { icon: <PhoneOutlined style={{ fontSize: 22, color: '#fff' }} />, bg: 'linear-gradient(135deg,#22c55e,#16a34a)', title: '联系我们', desc: '点击这里联系客服' },
          ].map((h, i) => (
            <Card
              key={i} hoverable
              style={{ borderRadius: 12, border: '1px solid #edf0f5' }}
              styles={{ body: { padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16 } }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: h.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {h.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1e2130', marginBottom: 3 }}>{h.title}</div>
                <div style={{ fontSize: 12, color: '#9aa3b2' }}>{h.desc}</div>
              </div>
              <RightOutlined style={{ color: '#d9d9d9', fontSize: 12 }} />
            </Card>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
