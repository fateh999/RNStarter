export type COLORS = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  error: string;
  text: string;
  onSurface: string;
  disabled: string;
  placeholder: string;
  backdrop: string;
  notification: string;
  white: string;
  black: string;
  success: string;
  transparent: string;
  adaptivePrimary: string;
  divider: string;
};

export type FONTS = {
  light: {
    fontFamily: string;
    fontWeight: '300';
  };
  regular: {
    fontFamily: string;
    fontWeight: '400';
  };
  medium: {
    fontFamily: string;
    fontWeight: '500';
  };
  bold: {
    fontFamily: string;
    fontWeight: '700';
  };
};

export type SPACING_SIZES = {
  xs: 4;
  s: 8;
  m: 12;
  l: 16;
  xl: 20;
  xxl: 24;
};

export type THEME_TYPE = {
  type: 'light' | 'dark';
  colors: COLORS;
  fonts: FONTS;
  spacingSizes: SPACING_SIZES;
};

export type VARIANT = keyof COLORS;

export type FONT_TYPES = keyof FONTS;
