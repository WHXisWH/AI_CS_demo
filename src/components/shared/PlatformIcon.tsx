import { MessageCircle, Globe, Send, Video, MessageSquare } from 'lucide-react';
import type { Platform } from '../../types';

interface PlatformIconProps {
  platform: Platform;
  size?: 'sm' | 'md' | 'lg';
  showBackground?: boolean;
}

export function PlatformIcon({
  platform,
  size = 'md',
  showBackground = true,
}: PlatformIconProps) {
  const sizes = {
    sm: { icon: 14, container: 'w-6 h-6' },
    md: { icon: 18, container: 'w-8 h-8' },
    lg: { icon: 24, container: 'w-10 h-10' },
  };

  const platformConfig = {
    wechat: {
      icon: MessageCircle,
      color: '#07C160',
      bgColor: 'bg-[#07C160]/10',
    },
    weibo: {
      icon: MessageSquare,
      color: '#E6162D',
      bgColor: 'bg-[#E6162D]/10',
    },
    douyin: {
      icon: Video,
      color: '#000000',
      bgColor: 'bg-[#000000]/10',
    },
    whatsapp: {
      icon: MessageCircle,
      color: '#25D366',
      bgColor: 'bg-[#25D366]/10',
    },
    telegram: {
      icon: Send,
      color: '#0088CC',
      bgColor: 'bg-[#0088CC]/10',
    },
    web: {
      icon: Globe,
      color: '#667EEA',
      bgColor: 'bg-[#667EEA]/10',
    },
  };

  const config = platformConfig[platform];
  const Icon = config.icon;
  const sizeConfig = sizes[size];

  if (!showBackground) {
    return <Icon size={sizeConfig.icon} style={{ color: config.color }} />;
  }

  return (
    <div
      className={`${sizeConfig.container} ${config.bgColor} rounded-lg flex items-center justify-center`}
    >
      <Icon size={sizeConfig.icon} style={{ color: config.color }} />
    </div>
  );
}

export function getPlatformLabel(platform: Platform): string {
  const labels: Record<Platform, string> = {
    wechat: 'WeChat',
    weibo: 'Weibo',
    douyin: 'Douyin',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    web: 'Web',
  };
  return labels[platform];
}
