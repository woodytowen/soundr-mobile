export type ThemeType = {
  colors: {
    background: string;
    primary: string;
    accent: string;
    text: string;
    card: string;
    border: string;
    overlay: string;
    shadow: string;
  };
  fonts: {
    regular: string;
    bold: string;
  };
};

export const theme: ThemeType = {
  colors: {
    background: '#1A1A1A',
    primary: '#00E5FF',
    accent: '#FF0080',
    text: '#FFFFFF',
    card: '#222',
    border: 'rgba(0, 229, 255, 0.6)',
    overlay: 'rgba(0,0,0,0.3)',
    shadow: '#00E5FF',
  },
  fonts: {
    regular: 'JosefinSans_400Regular',
    bold: 'JosefinSans_700Bold',
  },
};
