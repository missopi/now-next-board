import { StyleSheet } from "react-native";
import getCardBaseStyles from "./CardBaseStyles";

export default function getStyles(width, height, mode = "edit") {
  const shorter = Math.min(width, height);
  const isPortrait = height >= width;
  const { baseStyles, metrics } = getCardBaseStyles(width, height, mode);
  const textBody = metrics.textBody;
  const cardWidth = metrics.cardWidth;
  const pagePadding = Math.min(shorter * 0.08, 35);

  const bigScreenBoost = shorter >= 800 ? shorter * 0.025 : shorter >= 700 ? shorter * 0.015 : 0;
  const portraitBoost = bigScreenBoost;
  const landscapeBoost = bigScreenBoost * 0.6;

  // In view mode keep header off the cards but allow more breathing room in portrait.
  const topPadding = mode === "view"
    ? (isPortrait
      ? Math.max(pagePadding * 1.1 + portraitBoost, 28)
      : Math.max(pagePadding * 0.4 + landscapeBoost, 12))
    : pagePadding;
  const horizontalPadding = mode === "view" ? Math.min(pagePadding, 32) : pagePadding;
  const contentTopPadding = mode === "view"
    ? (isPortrait ? Math.max(topPadding * 0.95, 22) : Math.max(topPadding * 0.65, 12))
    : 0;

  return StyleSheet.create({
    ...baseStyles,
    safeContainer: {
      flex: 1,
      paddingTop: topPadding,
      paddingHorizontal: horizontalPadding,
      justifyContent: 'center',
    },
    floatingTitle: {
      position: 'absolute',
      top: 0,
      left: horizontalPadding,
      right: horizontalPadding,
      alignItems: 'center',
      zIndex: 2,
      pointerEvents: 'none',
    },
    floatingTitleInner: {
      alignItems: 'center',
      paddingTop: Math.max(topPadding * 0.3, 6),
    },
    card: {
      ...baseStyles.card,
      width: cardWidth,
    },
    image: {
      ...baseStyles.image,
      flex: 1,
    },
    topTitle: {
      fontSize: shorter * 0.08,
      fontWeight: '700',
      alignSelf: 'center',
    },
    titleUnderline: {
      height: 2,
      width: "60%",
      alignSelf: "center",
      backgroundColor: "#ccc",
      marginTop: 8,
    },
    cardFooter: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    addButton: {
      width: cardWidth,
      paddingVertical: shorter * 0.015,
      borderRadius: 15,
      alignItems: 'center',
      backgroundColor: '#38b6ff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 3,
    },
    addText: {
      color: '#fff',
      fontSize: textBody,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    listContentPaddingTop: contentTopPadding,
    dragText: {
      fontSize: shorter * 0.05,
      color: '#ccc',
    },
    deleteText: {
      color: '#ccc',
      fontSize: shorter * 0.04,
      fontWeight: 'bold',
      lineHeight: shorter * 0.04,
    },
  });
}
