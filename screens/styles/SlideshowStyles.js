import { StyleSheet } from 'react-native';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getSlideshowStyles = (width, height, isPortrait) => {
  const maxImageWidth = clamp(width * 0.92, 280, 1100);
  const maxImageHeight = isPortrait
    ? clamp(height * 0.62, 260, height * 0.82)
    : clamp(height * 0.78, 240, height * 0.9);

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      paddingTop: clamp(height * 0.05, 32, 72),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: '#0f172a',
      textAlign: 'center',
    },
    slide: {
      width,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: isPortrait ? 28 : 18,
      paddingHorizontal: clamp(width * 0.04, 12, 36),
    },
    cardWrapper: {
      backgroundColor: '#1f2937',
      borderRadius: 20,
      padding: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.35,
      shadowRadius: 6,
    },
    cardInner: {
      backgroundColor: 'white',
      borderRadius: 17,
      overflow: 'hidden',
      padding: isPortrait ? 16 : 14,
      paddingBottom: isPortrait ? 26 : 20,
      alignItems: 'center',
      gap: 14,
    },
    image: {
      width: maxImageWidth,
      height: maxImageHeight,
      borderRadius: 14,
      borderColor: '#0f172a',
      borderWidth: 1,
    },
    noImageText: {
      color: '#64748b',
      backgroundColor: 'transparent',
      fontSize: 18,
      textAlign: 'center',
      paddingVertical: 12,
    },
    cardTitle: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      color: '#0f172a',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: isPortrait ? 30 : 18,
    },
    dot: {
      width: 11,
      height: 11,
      borderRadius: 6,
      backgroundColor: '#cbd5e1',
      marginHorizontal: 7,
    },
    activeDot: {
      backgroundColor: '#0f172a',
      width: 13,
      height: 13,
    },
  });
};

export default getSlideshowStyles;
