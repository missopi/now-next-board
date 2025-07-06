import { useThemeContext } from './ThemeContext';
import { useMemo } from 'react';

const useThemedStyles = (stylesFunc) => {
  const { theme } = useThemeContext();
  return useMemo(() => stylesFunc(theme), [stylesFunc, theme]);
};

export default useThemedStyles;
