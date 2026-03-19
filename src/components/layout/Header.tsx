import { HelpCircle, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title: _title, subtitle: _subtitle }: HeaderProps) {
  return (
    <header
      className="h-[56px] flex items-center justify-between px-5 flex-shrink-0"
      style={{
        background: '#fff',
        borderBottom: '1px solid #edf0f5',
        boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
      }}
    >
      {/* Left: empty (title shown in page) */}
      <div />

      {/* Right: action strip */}
      <div className="flex items-center gap-1.5">

        {/* Balance */}
        <div
          className="flex items-center gap-1.5 px-3 h-8 rounded-full text-[13px]"
          style={{ background: '#fff9e6', color: '#854d0e' }}
        >
          <span className="text-base">🪙</span>
          <span className="font-medium">余额：¥5</span>
          <button
            className="font-semibold hover:underline"
            style={{ color: '#1677ff' }}
          >
            充值
          </button>
        </div>

        {/* My plan */}
        <button
          className="flex items-center gap-1 h-8 px-3.5 rounded-full text-[13px] font-medium transition-opacity hover:opacity-85"
          style={{
            border: '1.5px solid #1677ff',
            color: '#1677ff',
            background: '#fff',
          }}
        >
          我的套餐
          <ChevronDown size={13} />
        </button>

        {/* Help center */}
        <button
          className="flex items-center gap-1 h-8 px-3 text-[13px] rounded-full transition-colors hover:bg-gray-50"
          style={{ color: '#677489' }}
        >
          <HelpCircle size={14} />
          帮助中心
        </button>

        {/* Vertical divider */}
        <div className="w-px h-4 mx-1" style={{ background: '#e4e7ed' }} />

        {/* User avatar */}
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[13px] font-bold"
          style={{ background: 'linear-gradient(135deg,#52c41a,#389e0d)' }}
        >
          轩
        </button>
      </div>
    </header>
  );
}
