import React, { createContext, useContext, ReactNode } from 'react';
import { theme, ThemeType } from './theme';

const ThemeContext = createContext<ThemeType>(theme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);

export const useTheme = () => useContext(ThemeContext);
