import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: 'primary' | 'secondary' | 'none';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export function Card({
  children,
  className = '',
  hover = false,
  gradient = 'none',
  padding = 'md',
  onClick,
}: CardProps) {
  const gradients = {
    primary: 'gradient-primary text-white',
    secondary: 'gradient-secondary text-white',
    none: 'bg-white',
  };

  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'cursor-pointer hover:shadow-xl hover:-translate-y-1'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgb(102 126 234 / 0.2)' } : {}}
      className={`rounded-2xl shadow-lg transition-all duration-300 ${gradients[gradient]} ${paddings[padding]} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon: ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning';
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'increase',
  icon,
  color = 'primary',
}: StatCardProps) {
  const iconColors = {
    primary: 'bg-gradient-to-br from-[#667EEA] to-[#764BA2]',
    secondary: 'bg-gradient-to-br from-[#4FACFE] to-[#00F2FE]',
    success: 'bg-gradient-to-br from-[#10B981] to-[#059669]',
    warning: 'bg-gradient-to-br from-[#F59E0B] to-[#D97706]',
  };

  return (
    <Card hover className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--color-gray-500)] mb-1">{title}</p>
          <p className="text-3xl font-bold text-[var(--color-gray-900)]">{value}</p>
          {change !== undefined && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${
                changeType === 'increase'
                  ? 'text-[var(--color-success)]'
                  : 'text-[var(--color-error)]'
              }`}
            >
              <span>{changeType === 'increase' ? '↑' : '↓'}</span>
              <span>{Math.abs(change)}%</span>
              <span className="text-[var(--color-gray-400)]">vs last week</span>
            </p>
          )}
        </div>
        <div
          className={`p-3 rounded-xl ${iconColors[color]} text-white shadow-lg`}
        >
          {icon}
        </div>
      </div>
      <div
        className={`absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-10 ${iconColors[color]}`}
      />
    </Card>
  );
}
