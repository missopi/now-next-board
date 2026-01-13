import { StyleSheet } from 'react-native';
import getCardBaseStyles from "./CardBaseStyles";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getSlideshowStyles = (width, height, isPortrait) => {
  const shorter = Math.min(width, height);
  const { baseStyles } = getCardBaseStyles(width, height);
  const pagePadding = clamp(shorter * 0.05, 18, 38);
  const cardAspect = baseStyles.card?.aspectRatio || 1.05;
  // Allow more space for the larger header title, especially in landscape.
  const headerAllowance = isPortrait
    ? clamp(height * 0.045, 24, 60)
    : clamp(height * 0.07, 28, 80);
  const dotsAllowance = clamp(shorter * 0.05, isPortrait ? 20 : 16, 40);
  const slidePadding = isPortrait ? pagePadding : pagePadding * 0.75;
  const availableHeight = Math.max(
    height - headerAllowance - dotsAllowance - slidePadding * 2,
    200
  );
  const heightLimitedWidth = availableHeight * cardAspect * (isPortrait ? 0.94 : 0.9);
  const targetWidth = shorter * 0.95;
  const maxWidth = isPortrait ? width * 0.9 : width * 0.8;
  const cardWidth = Math.min(clamp(targetWidth, 320, maxWidth), heightLimitedWidth);

  return StyleSheet.create({
    ...baseStyles,
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: isPortrait ? clamp(height * 0.06, 26, 58) : clamp(height * 0.04, 18, 44),
      paddingBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      zIndex: 2,
      pointerEvents: 'box-none',
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
      paddingVertical: isPortrait ? pagePadding : pagePadding * 0.75,
      paddingHorizontal: clamp(width * 0.04, 12, 36),
    },
    card: {
      ...baseStyles.card,
      width: cardWidth,
      maxHeight: availableHeight,
    },
    image: {
      ...baseStyles.image,
      flex: 1,
    },
    bitmapEditImage: {
      ...baseStyles.bitmapEditImage,
    },
    placeholder: {
      ...baseStyles.placeholder,
    },
    placeholderText: {
      ...baseStyles.placeholderText,
    },
    title: {
      ...baseStyles.title,
    },
    cardContainer: {
      width: cardWidth,
      maxWidth: cardWidth,
      alignSelf: 'center',
    },
    dotsContainer: {
      position: 'absolute',
      bottom: isPortrait ? 22 : 14,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      zIndex: 2,
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
