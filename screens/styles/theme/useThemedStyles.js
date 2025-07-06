import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './colors';

export default function useThemedStyles(stylesFunc) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return stylesFunc(theme);
}