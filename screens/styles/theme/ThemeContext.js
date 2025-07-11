import React, { createContext, useContext, useState } from 'react';
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from './colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // system default
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemedStyles = (stylesFactory) => {
  const { theme } = useThemeContext();
  const styles = stylesFactory(theme);
  return { styles, theme };
};

export const useThemeContext = () => useContext(ThemeContext);
