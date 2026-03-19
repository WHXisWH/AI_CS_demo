import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, App as AntApp } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
          colorBgContainer: '#ffffff',
          colorBgLayout: '#f7f8fa',
          borderRadius: 8,
          fontFamily: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', sans-serif",
        },
      }}
    >
      <AntApp>
        <App />
      </AntApp>
    </ConfigProvider>
  </StrictMode>,
)
