import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, MessageSquare, Bot, Sparkles, Layers,
  TrendingUp, Phone, Users, BookOpen, Wrench,
  GitBranch, Target, BarChart2, GraduationCap,
  Settings, Grid3x3, ChevronRight,
  ChevronsLeft, ChevronsRight,
} from 'lucide-react';

/* ── types ── */
interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  children?: { label: string; path: string }[];
}

/* ── nav data ── */
const navItems: NavItem[] = [
  { path: '/',              icon: Home,         label: '首页' },
  { path: '/conversations', icon: MessageSquare,label: '聚合对话', badge: 5 },
  { path: '/ai-assistant',  icon: Bot,          label: 'AI助手' },
  { path: '/analytics',     icon: Sparkles,     label: 'AI智能总结' },
  { path: '/channels',      icon: Layers,       label: '对话渠道' },
  { path: '',               icon: TrendingUp,   label: 'AI微信营销',
    children: [
      { label: '群发消息',   path: '/wechat/broadcast' },
      { label: '自动化营销', path: '/wechat/auto' },
      { label: '营销数据',   path: '/wechat/data' },
    ],
  },
  { path: '/phone',         icon: Phone,        label: 'AI电话营销' },
  { path: '',               icon: Users,        label: '联系人管理',
    children: [
      { label: '联系人列表', path: '/contacts/list' },
      { label: '标签管理',   path: '/contacts/tags' },
      { label: '导入导出',   path: '/contacts/import' },
    ],
  },
  { path: '/knowledge',     icon: BookOpen,     label: '知识管理' },
  { path: '/tools',         icon: Wrench,       label: '工具管理' },
  { path: '/flow-designer', icon: GitBranch,    label: 'AI流程' },
  { path: '/intents',       icon: Target,       label: '意图管理' },
  { path: '/data',          icon: BarChart2,    label: '数据分析' },
  { path: '/tutorial',      icon: GraduationCap,label: '产品教学' },
  { path: '/settings',      icon: Settings,     label: '系统设置' },
  { path: '/more',          icon: Grid3x3,      label: '更多产品' },
];

/* ── CSS injected once ── */
const STYLE = `
  .nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 12px;
    border-radius: 8px;
    cursor: pointer;
    color: rgba(255,255,255,0.52);
    font-size: 13px;
    font-weight: 500;
    line-height: 1.4;
    transition: background 0.14s ease, color 0.14s ease;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
    user-select: none;
  }
  .nav-item:hover {
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.82);
  }
  .nav-item.active {
    background: rgba(255,255,255,0.14);
    color: #fff;
  }
  .sub-item {
    display: block;
    padding: 6px 12px 6px 30px;
    font-size: 12px;
    color: rgba(255,255,255,0.42);
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.12s, color 0.12s;
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
  }
  .sub-item:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); }
  .sub-item.active { color: #93c5fd; }
  .collapse-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 14px;
    font-size: 12px;
    color: rgba(255,255,255,0.32);
    cursor: pointer;
    transition: color 0.14s;
    border: none;
    background: none;
    width: 100%;
  }
  .collapse-btn:hover { color: rgba(255,255,255,0.6); }
`;

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const location = useLocation();

  const toggle = (label: string) =>
    setOpenMenus(p => ({ ...p, [label]: !p[label] }));

  const isActive = (item: NavItem) => {
    if (item.path) return location.pathname === item.path;
    return item.children?.some(c => location.pathname === c.path) ?? false;
  };

  return (
    <>
      {/* Inject nav styles once */}
      <style>{STYLE}</style>

      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 56 : 216 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          background: '#1b1e2e',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
        }}
      >
        {/* Logo */}
        <div
          style={{
            height: 56,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            flexShrink: 0,
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              background: 'linear-gradient(135deg,#f59e0b,#f97316)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            🪶
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.14 }}
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                }}
              >
                云栖AI
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav */}
        <nav
          className="sidebar-scroll"
          style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}
        >
          {navItems.map(item => {
            const active = isActive(item);
            const hasChildren = !!item.children?.length;
            const isOpen = openMenus[item.label];

            return (
              <div key={item.label}>
                {item.path ? (
                  <NavLink
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive: a }) => `nav-item${a ? ' active' : ''}`}
                  >
                    <item.icon size={15} style={{ flexShrink: 0 }} />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.1 }}
                          style={{ flex: 1 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {item.badge && !isCollapsed && (
                      <span
                        style={{
                          background: '#ff4d4f',
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 10,
                          flexShrink: 0,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                ) : (
                  <>
                    <div
                      className={`nav-item${active ? ' active' : ''}`}
                      onClick={() => !isCollapsed && toggle(item.label)}
                    >
                      <item.icon size={15} style={{ flexShrink: 0 }} />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            style={{ flex: 1 }}
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {hasChildren && !isCollapsed && (
                        <ChevronRight
                          size={12}
                          style={{
                            flexShrink: 0,
                            color: 'rgba(255,255,255,0.28)',
                            transform: isOpen ? 'rotate(90deg)' : 'none',
                            transition: 'transform 0.18s',
                          }}
                        />
                      )}
                    </div>
                    <AnimatePresence>
                      {hasChildren && isOpen && !isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ overflow: 'hidden' }}
                        >
                          {item.children!.map(child => (
                            <NavLink
                              key={child.path}
                              to={child.path}
                              className={({ isActive: a }) => `sub-item${a ? ' active' : ''}`}
                            >
                              {child.label}
                            </NavLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            );
          })}
        </nav>

        {/* Collapse button */}
        <button
          className="collapse-btn"
          onClick={onToggle}
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {isCollapsed ? <ChevronsRight size={14} /> : <ChevronsLeft size={14} />}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              >
                收起导航
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </motion.aside>
    </>
  );
}
