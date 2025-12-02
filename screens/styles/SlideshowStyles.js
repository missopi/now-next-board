import { StyleSheet } from 'react-native';
import getCardBaseStyles from "./CardBaseStyles";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const getSlideshowStyles = (width, height, isPortrait) => {
  const shorter = Math.min(width, height);
  const { baseStyles, metrics } = getCardBaseStyles(width, height);
  const pagePadding = clamp(shorter * 0.05, 18, 38);
  const cardAspect = baseStyles.card?.aspectRatio || 1.05;
  const headerAllowance = clamp(height * 0.05, 32, 72) + 30; // title row height buffer
  const dotsAllowance = (isPortrait ? 30 : 18) + 10;
  const slidePadding = isPortrait ? pagePadding : pagePadding * 0.75;
  const availableHeight = Math.max(
    height - headerAllowance - dotsAllowance - slidePadding * 2,
    200
  );
  const heightLimitedWidth = availableHeight * cardAspect * 0.96;
  const targetWidth = shorter * 0.95;
  const maxWidth = isPortrait ? width * 0.9 : width * 0.8;
  const cardWidth = Math.min(clamp(targetWidth, 320, maxWidth), heightLimitedWidth);

  return StyleSheet.create({
    ...baseStyles,
    container: {
      flex: 1,
      backgroundColor: '#E0F2FE',
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
