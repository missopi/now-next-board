import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = "edit") {
  // Pure responsive layout: everything is proportional to the screen, no clamp/scale.
  const paddingH = width * 0.06; // 6% gutters
  const contentWidth = width - paddingH * 2;

  // Keep cards square; bound by available width and a portion of height so they never overflow.
  const cardBase = isPortrait ? contentWidth * 0.95 : width * 0.44;
  const cardMaxByHeight = height * (isPortrait ? 0.55 : 0.75);
  const cardSize = Math.min(cardBase, cardMaxByHeight);
  const cardWidth = cardSize;
  const cardHeight = cardSize;

  const mediaWidth = cardWidth * (mode === "edit" ? 0.72 : 0.8);
  const mediaHeight = mediaWidth * 0.9;
  const saveButtonWidth = cardWidth * 0.7;

  const textLarge = width * 0.06;  // scales naturally with screen width
  const textBody = width * 0.048;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: isPortrait ? height * 0.07 : height * 0.02,
      paddingHorizontal: paddingH,
      justifyContent: isPortrait ? 'flex-start' : 'center',
      alignItems: isPortrait ? 'stretch' : 'center',
    },

    card: {
      paddingHorizontal: cardWidth * 0.04,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 14,
      backgroundColor: '#fff',
      position: 'relative',
      alignSelf: 'center', // center within the list container
      maxWidth: cardWidth,
      width: cardWidth,
      height: cardHeight,
    },

    // clip whole card only when full-bleed SVG (read-only)
    cardClip: {
      overflow: 'hidden',
    },

    cardShadowWrapper: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
      borderRadius: 20,
    },

    deleteButton: {
      position: 'absolute',
      top: height * 0.007,
      right: height * 0.007,
      width: width * 0.065,
      height: width * 0.065,
      borderRadius: width * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    deleteText: {
      color: '#ccc',
      fontSize: width * 0.048,
      fontWeight: 'bold',
      lineHeight: width * 0.048,
    },

    cardContent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: cardWidth * 0.035,
      paddingTop: isPortrait
        ? (mode === "edit" ? height * 0.025 : height * 0.018)
        : (mode === "view" ? height * 0.015 : height * 0.03),
      paddingBottom: height * 0.015,
      width: '100%',
      height: '100%',
    },

    // remove padding for full-bleed svg (read-only)
    cardContentFlush: {
      paddingHorizontal: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },

    image: {
      width: mediaWidth,
      height: mediaHeight,
      borderRadius: 10,
      marginBottom: height * 0.01,
      borderWidth: 1,
      borderColor: '#333',
    },

    placeholder: {
      width: mediaWidth,
      height: mediaHeight,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: height * 0.012,
    },
    placeholderText: {
      color: '#aaa',
      fontSize: textBody,
    },

    title: {
      fontSize: textLarge,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    dragHandle: {
      position: 'absolute',
      top: height * 0.004,
      left: width * 0.018,
      zIndex: 2,
      borderRadius: 16,
      paddingHorizontal: width * 0.016,
      paddingTop: height * 0.002,
      paddingBottom: height * 0.0035,
    },
    dragText: {
      fontSize: width * 0.064,
      color: '#ccc',
    },

    saveButton: {
      width: saveButtonWidth,
      paddingVertical: height * 0.012,
      borderRadius: 12,
      marginTop: height * 0.008,
      marginBottom: height * 0.012,
      alignItems: 'center',
      backgroundColor: '#38b6ff',
      borderWidth: 2,
      borderColor: '#38b6ff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 3,
      elevation: 3,
    },

    saveText: { color: '#fff', fontSize: width * 0.042, fontWeight: 'bold', textAlign: 'center' },

    listContainer: {
      justifyContent: 'flex-start',
      alignItems: isPortrait ? 'center' : 'center',
      paddingBottom: height * 0.035,
    },

    // SVG wrappers
    svgInsetWrapper: {
      width: mediaWidth,
      height: mediaHeight,
      borderRadius: 10,
      overflow: 'hidden',
      alignSelf: 'center',
      transform: mode === "edit" ? [{ scale: 1.05 }] : undefined,
    },
  });

  // Expose a few computed sizes for components that need to line up with the cards.
  return {
    ...styles,
    metrics: {
      cardWidth,
      cardHeight,
      mediaWidth,
      mediaHeight,
      saveButtonWidth,
    },
  };
}
