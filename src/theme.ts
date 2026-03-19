import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  cssVarsPrefix: 'yx',
  globalCss: {
    'html, body, #root': {
      minHeight: '100%',
    },
    body: {
      margin: 0,
      bg: '#eef2f7',
      color: '#172033',
      fontFamily:
        '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
    },
    '*::selection': {
      bg: 'rgba(61, 104, 255, 0.18)',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: {
          value:
            '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
        },
        body: {
          value:
            '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
        },
      },
      colors: {
        brand: {
          50: { value: '#f3f6ff' },
          100: { value: '#e6edff' },
          200: { value: '#c7d7ff' },
          300: { value: '#9eb6ff' },
          400: { value: '#6f8dff' },
          500: { value: '#3d68ff' },
          600: { value: '#2f54eb' },
          700: { value: '#2444c8' },
          800: { value: '#1d379f' },
          900: { value: '#172d7b' },
        },
        ink: {
          50: { value: '#f6f8fc' },
          100: { value: '#e9edf5' },
          200: { value: '#d4dbe8' },
          300: { value: '#a8b3c7' },
          400: { value: '#7f8aa3' },
          500: { value: '#5b6883' },
          600: { value: '#44506a' },
          700: { value: '#303a4f' },
          800: { value: '#1d2537' },
          900: { value: '#101728' },
          950: { value: '#0b1120' },
        },
        success: {
          100: { value: '#def7ea' },
          500: { value: '#22a06b' },
        },
        warning: {
          100: { value: '#fff0d8' },
          500: { value: '#b86f00' },
        },
      },
      radii: {
        shell: { value: '32px' },
        panel: { value: '28px' },
        card: { value: '24px' },
        pill: { value: '999px' },
      },
      shadows: {
        shell: { value: '0 28px 60px rgba(15, 23, 42, 0.08)' },
        float: { value: '0 24px 48px rgba(24, 49, 108, 0.16)' },
        card: { value: '0 18px 38px rgba(15, 23, 42, 0.06)' },
        insetSoft: { value: 'inset 0 1px 0 rgba(255, 255, 255, 0.9)' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
