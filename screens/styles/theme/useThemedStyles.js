import { useThemeContext } from './ThemeContext';
import { useMemo } from 'react';

export const useThemedStyles = (stylesFactory) => {
  const { theme } = useThemeContext();

  const styles = useMemo(() => stylesFactory(theme), [theme]);

  return { styles, theme };
};
