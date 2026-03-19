import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-[var(--color-gray-100)] text-[var(--color-gray-700)]',
    primary: 'bg-[#667EEA]/10 text-[#667EEA]',
    secondary: 'bg-[#4FACFE]/10 text-[#4FACFE]',
    success: 'bg-[var(--color-success)]/10 text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]/10 text-[var(--color-error)]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
}

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'busy' | 'away';
  showLabel?: boolean;
}

export function StatusBadge({ status, showLabel = true }: StatusBadgeProps) {
  const statusConfig = {
    online: { color: 'bg-[var(--color-success)]', label: 'Online' },
    offline: { color: 'bg-[var(--color-gray-400)]', label: 'Offline' },
    busy: { color: 'bg-[var(--color-error)]', label: 'Busy' },
    away: { color: 'bg-[var(--color-warning)]', label: 'Away' },
  };

  const config = statusConfig[status];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`w-2 h-2 rounded-full ${config.color}`} />
      {showLabel && (
        <span className="text-sm text-[var(--color-gray-600)]">{config.label}</span>
      )}
    </span>
  );
}
