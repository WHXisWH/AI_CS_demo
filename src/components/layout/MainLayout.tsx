import { useState, useRef, useEffect, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, Badge, Avatar, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  RobotOutlined,
  ThunderboltOutlined,
  ApartmentOutlined,
  RiseOutlined,
  PhoneOutlined,
  TeamOutlined,
  BookOutlined,
  ToolOutlined,
  BranchesOutlined,
  AimOutlined,
  BarChartOutlined,
  ReadOutlined,
  SettingOutlined,
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  CustomerServiceOutlined,
  CloseOutlined,
  SendOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const { Sider, Header, Content } = Layout;

/* ── route → title ── */
const routeMeta: Record<string, string> = {
  '/':              '首页',
  '/conversations': '聚合对话',
  '/ai-assistant':  'AI助手',
  '/analytics':     'AI智能总结',
  '/flow-designer': 'AI流程',
  '/settings':      '系统设置',
};

/* ── Menu items ── */
const menuItems: MenuProps['items'] = [
  { key: '/',              icon: <HomeOutlined />,        label: '首页' },
  { key: '/conversations', icon: <MessageOutlined />,     label: '聚合对话' },
  { key: '/ai-assistant',  icon: <RobotOutlined />,       label: 'AI助手' },
  { key: '/analytics',     icon: <ThunderboltOutlined />, label: 'AI智能总结' },
  { key: '/channels',      icon: <ApartmentOutlined />,   label: '对话渠道' },
  {
    key: 'wechat-group',
    icon: <RiseOutlined />,
    label: 'AI微信营销',
    children: [
      { key: '/wechat/broadcast', label: '群发消息' },
      { key: '/wechat/auto',      label: '自动化营销' },
      { key: '/wechat/data',      label: '营销数据' },
    ],
  },
  { key: '/phone',     icon: <PhoneOutlined />,     label: 'AI电话营销' },
  {
    key: 'contacts-group',
    icon: <TeamOutlined />,
    label: '联系人管理',
    children: [
      { key: '/contacts/list',   label: '联系人列表' },
      { key: '/contacts/tags',   label: '标签管理' },
      { key: '/contacts/import', label: '导入导出' },
    ],
  },
  { key: '/knowledge',     icon: <BookOutlined />,      label: '知识管理' },
  { key: '/tools',         icon: <ToolOutlined />,      label: '工具管理' },
  { key: '/flow-designer', icon: <BranchesOutlined />,  label: 'AI流程' },
  { key: '/intents',       icon: <AimOutlined />,       label: '意图管理' },
  { key: '/data',          icon: <BarChartOutlined />,  label: '数据分析' },
  { key: '/tutorial',      icon: <ReadOutlined />,      label: '产品教学' },
  { key: '/settings',      icon: <SettingOutlined />,   label: '系统设置' },
  { key: '/more',          icon: <AppstoreOutlined />,  label: '更多产品' },
];

/* ── Chat Widget ── */
interface Msg { id: number; from: 'ai' | 'user' | 'sys'; text: string }
const initMsgs: Msg[] = [
  { id: 0, from: 'sys',  text: '欢迎使用云栖AI产品助手' },
  { id: 1, from: 'ai',   text: '您好！我是云栖AI的产品助手，可以帮您解答产品使用问题、功能介绍、操作指导等。请问有什么需要帮助的吗？' },
];
const replies = [
  '好的，我来帮您解答。您可以在「AI助手」页面配置知识库，上传文档后 AI 即可自动学习。',
  '这个功能在「AI流程」页面，您可以拖拽节点创建自动化工作流。',
  '感谢您的反馈！如需人工服务，可切换到「人工服务」标签。',
  '请问您还有其他问题吗？我会尽力为您解答。',
];

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'ai' | 'human' | 'help'>('ai');
  const [msgs, setMsgs] = useState<Msg[]>(initMsgs);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [ri, setRi] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  const send = () => {
    const t = input.trim(); if (!t) return;
    setMsgs(m => [...m, { id: Date.now(), from: 'user', text: t }]);
    setInput(''); setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { id: Date.now() + 1, from: 'ai', text: replies[ri % replies.length] }]);
      setRi(i => i + 1);
    }, 1400);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}
          >
            <Button
              type="primary" shape="circle" size="large"
              icon={<CustomerServiceOutlined style={{ fontSize: 20 }} />}
              onClick={() => setOpen(true)}
              style={{ width: 50, height: 50, boxShadow: '0 4px 16px rgba(22,119,255,0.4)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
              width: 360, height: 500, borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              background: '#fff', display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg,#1677ff,#0958d9)', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🪶</div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 13 }}>云栖AI 客服</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#95f204', display: 'inline-block' }} />
                    <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11 }}>在线</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Button type="text" icon={<DownOutlined style={{ color: 'rgba(255,255,255,0.7)' }} />} size="small" style={{ color: 'rgba(255,255,255,0.7)' }} />
                <Button type="text" icon={<CloseOutlined style={{ color: 'rgba(255,255,255,0.7)' }} />} size="small" onClick={() => setOpen(false)} />
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              {([['ai','🤖','产品助手'],['human','👤','人工服务'],['help','📖','帮助中心']] as const).map(([k, icon, lbl]) => (
                <button key={k} onClick={() => setTab(k)}
                  style={{
                    flex: 1, padding: '10px 0', fontSize: 12, fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer',
                    color: tab === k ? '#1677ff' : '#8c8c8c',
                    borderBottom: tab === k ? '2px solid #1677ff' : '2px solid transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                  }}
                >
                  {icon} {lbl}
                </button>
              ))}
            </div>

            {tab === 'ai' && (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', background: '#f7f8fa', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {msgs.map(m => (
                    <div key={m.id}>
                      {m.from === 'sys' && (
                        <div style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: 11, color: '#bfbfbf', background: '#efefef', padding: '2px 10px', borderRadius: 10 }}>{m.text}</span>
                        </div>
                      )}
                      {m.from === 'ai' && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <Avatar size={28} style={{ background: 'linear-gradient(135deg,#1677ff,#0958d9)', fontSize: 11, flexShrink: 0 }}>AI</Avatar>
                          <div style={{ maxWidth: 220, background: '#fff', border: '1px solid #f0f0f0', borderRadius: '0 10px 10px 10px', padding: '8px 12px', fontSize: 12, color: '#262626', lineHeight: 1.6, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>{m.text}</div>
                        </div>
                      )}
                      {m.from === 'user' && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                          <div style={{ maxWidth: 220, background: '#1677ff', borderRadius: '10px 0 10px 10px', padding: '8px 12px', fontSize: 12, color: '#fff', lineHeight: 1.6 }}>{m.text}</div>
                          <Avatar size={28} icon={<UserOutlined />} style={{ background: '#f0f0f0', color: '#8c8c8c', flexShrink: 0 }} />
                        </div>
                      )}
                    </div>
                  ))}
                  {typing && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <Avatar size={28} style={{ background: 'linear-gradient(135deg,#1677ff,#0958d9)', fontSize: 11, flexShrink: 0 }}>AI</Avatar>
                      <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: '0 10px 10px 10px', padding: '10px 14px', display: 'flex', gap: 4 }}>
                        {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#bfbfbf', display: 'inline-block', animation: `blink 1.2s ${i*0.2}s infinite` }} />)}
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
                <div style={{ padding: '10px 14px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8, flexShrink: 0 }}>
                  <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                    placeholder="输入问题..."
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, color: '#262626', background: 'transparent' }}
                  />
                  <Button type="primary" size="small" shape="circle" icon={<SendOutlined />} onClick={send} disabled={!input.trim()} />
                </div>
              </>
            )}

            {tab === 'human' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center', gap: 12 }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg,#1677ff,#0958d9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>👨‍💼</div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#262626' }}>人工服务</div>
                <div style={{ fontSize: 12, color: '#8c8c8c' }}>工作时间：09:00 – 18:00（工作日）</div>
                <Button type="primary" shape="round" style={{ marginTop: 8 }}>申请接入人工客服</Button>
              </div>
            )}

            {tab === 'help' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['如何创建AI流程？','如何上传知识库文档？','如何设置工作时间？','如何配置对话变量？','如何查看数据报表？'].map(q => (
                  <div key={q} style={{ padding: '10px 14px', background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 8, fontSize: 12, color: '#262626', cursor: 'pointer' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#e6f4ff')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '#fafafa')}
                  >{q}</div>
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', padding: '6px 0', fontSize: 10, color: '#d9d9d9', borderTop: '1px solid #f5f5f5', flexShrink: 0 }}>
              🪶 云栖AI 提供软件支持
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── MainLayout ── */
interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pageTitle = routeMeta[location.pathname] ?? '云栖AI';

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sider
        collapsible collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="dark"
        width={216}
        collapsedWidth={56}
        trigger={null}
        style={{ background: '#1b1e2e', borderRight: '1px solid rgba(255,255,255,0.05)' }}
      >
        {/* Logo */}
        <div style={{ height: 56, display: 'flex', alignItems: 'center', padding: '0 14px', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: 10, overflow: 'hidden' }}>
          <div style={{ width: 30, height: 30, borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🪶</div>
          {!collapsed && <span style={{ fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>云栖AI</span>}
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, overflow: 'hidden auto', height: 'calc(100vh - 56px - 48px)' }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={({ key }) => { if (key.startsWith('/')) navigate(key); }}
            style={{ background: 'transparent', border: 'none', fontSize: 13 }}
          />
        </div>

        {/* Collapse trigger */}
        <div
          style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 16px', borderTop: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', gap: 8 }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed
            ? <RightOutlined style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }} />
            : <>
                <LeftOutlined style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }} />
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>收起导航</span>
              </>
          }
        </div>
      </Sider>

      <Layout style={{ overflow: 'hidden' }}>
        {/* Header */}
        <Header style={{ background: '#fff', borderBottom: '1px solid #edf0f5', padding: '0 20px', height: 56, lineHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: '#1e2130' }}>{pageTitle}</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Balance */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: '#fff9e6', borderRadius: 20, fontSize: 13, color: '#854d0e' }}>
              <span>🪙</span>
              <span style={{ fontWeight: 500 }}>余额：¥5</span>
              <a style={{ color: '#1677ff', fontWeight: 500, textDecoration: 'none', cursor: 'pointer' }}>充值</a>
            </div>

            {/* My plan */}
            <Button style={{ borderColor: '#1677ff', color: '#1677ff', borderRadius: 20, height: 32, fontSize: 13 }}>
              我的套餐 <DownOutlined style={{ fontSize: 11 }} />
            </Button>

            {/* Help */}
            <Button type="text" icon={<QuestionCircleOutlined />} style={{ color: '#677489', fontSize: 13 }}>
              帮助中心
            </Button>

            <div style={{ width: 1, height: 16, background: '#e4e7ed', margin: '0 4px' }} />

            {/* Notifications */}
            <Tooltip title="通知">
              <Badge dot offset={[-2, 2]}>
                <Button type="text" shape="circle" icon={<BellOutlined style={{ fontSize: 16, color: '#677489' }} />} />
              </Badge>
            </Tooltip>

            {/* Avatar */}
            <Avatar size={32} style={{ background: 'linear-gradient(135deg,#52c41a,#389e0d)', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              轩
            </Avatar>
          </div>
        </Header>

        {/* Content */}
        <Content style={{ overflow: 'auto', background: '#f7f8fa' }}>
          {children}
        </Content>
      </Layout>

      <ChatWidget />
    </Layout>
  );
}
