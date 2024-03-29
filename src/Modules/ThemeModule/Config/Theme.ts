import {THEME_TYPE} from '../Types/CommonTypes';

export const DayTheme: THEME_TYPE = {
  type: 'light',
  colors: {
    primary: '#3a86ff',
    accent: '#00b4d8',
    background: '#f8f9fa',
    surface: '#ffffff',
    error: '#e63946',
    text: '#000000',
    onSurface: '#000000',
    disabled: '#6c757d',
    placeholder: '#6c757d',
    backdrop: 'rgba(0,0,0,0.5)',
    notification: '#ff006e',
    white: '#ffffff',
    black: '#000000',
    success: '#25a820',
    transparent: 'transparent',
    adaptivePrimary: '#3a86ff',
    divider: 'rgba(0,0,0,0.26)',
  },
  fonts: {
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
  spacingSizes: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
  },
};

export const NightTheme: THEME_TYPE = {
  type: 'dark',
  colors: {
    primary: '#BB86FC',
    accent: '#03dac6',
    background: '#121212',
    surface: '#121212',
    error: '#CF6679',
    onSurface: '#FFFFFF',
    text: '#FFFFFF',
    disabled: 'rgba(255,255,255,0.38)',
    placeholder: 'rgba(255,255,255,0.54)',
    backdrop: 'rgba(255,255,255,0.5)',
    notification: '#f8bbd0',
    white: '#ffffff',
    black: '#000000',
    success: '#25a820',
    transparent: 'transparent',
    adaptivePrimary: '#121212',
    divider: 'rgba(255,255,255,0.38)',
  },
  fonts: {
    light: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    regular: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'System',
      fontWeight: '700',
    },
  },
  spacingSizes: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
  },
};
