import { Bell, ChevronDown } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { SearchInput } from '../ui/Input';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[var(--color-gray-100)] px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-[var(--color-gray-900)]">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[var(--color-gray-500)]">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="w-64">
          <SearchInput placeholder="Search..." />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
          <Bell className="w-5 h-5 text-[var(--color-gray-600)]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--color-error)] rounded-full" />
        </button>

        {/* User Menu */}
        <button className="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--color-gray-100)] transition-colors">
          <Avatar name="John Doe" size="sm" online />
          <div className="text-left hidden md:block">
            <p className="text-sm font-medium text-[var(--color-gray-900)]">
              John Doe
            </p>
            <p className="text-xs text-[var(--color-gray-500)]">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-[var(--color-gray-400)]" />
        </button>
      </div>
    </header>
  );
}
