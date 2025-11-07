import { useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

export default function useDeviceLayout() {
  const { width, height, scale, fontScale } = useWindowDimensions();
  const shortest = Math.min(width, height);
  const longest  = Math.max(width, height);

  const isTablet = Platform.OS === 'ios'
    ? (Platform.isPad ?? (shortest >= 820 && longest >= 1024))
    : (shortest >= 800 && longest >= 960);

  const bp = useMemo(() => {
    if (shortest >= 1024) return 'xl';
    if (shortest >= 820)  return 'lg';
    if (shortest >= 600)  return 'md';
    return 'sm';
  }, [shortest]);

  const isLandscape = width > height;

  const columns = useMemo(() => {
    if (bp === 'xl') return 4;
    if (bp === 'lg') return 3;
    if (bp === 'md') return 3;
    return 2;
  }, [bp]);

  // scale a bit with device size but cap it
  const maxContentWidth = isTablet ? Math.min(Math.round(longest * 0.6), 1024) : 680;

  return { width, height, isTablet, isLandscape, bp, columns, maxContentWidth, scale, fontScale };
}
