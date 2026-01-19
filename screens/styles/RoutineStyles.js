import { StyleSheet } from "react-native";
import getCardBaseStyles from "./CardBaseStyles";

export default function getStyles(width, height, mode = "edit") {
  const shorter = Math.min(width, height);
  const isPortrait = height >= width;
  const isTablet = shorter >= 700;
  const { baseStyles, metrics } = getCardBaseStyles(width, height, mode);
  const textBody = metrics.textBody;
  const cardWidth = metrics.cardWidth;
  const pagePadding = Math.min(shorter * 0.08, 35);

  const bigScreenBoost = shorter >= 800 ? shorter * 0.025 : shorter >= 700 ? shorter * 0.015 : 0;
  const portraitBoost = bigScreenBoost;
  const landscapeBoost = bigScreenBoost * 0.6;
  const iconScale = Math.min(Math.max(shorter / 430, 1), 1.6);

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
      backgroundColor: "#f7fbff",
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
      padding: mode === "view" && isTablet ? "5%" : baseStyles.card.padding,
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
      backgroundColor: '#2b7cceff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 3,
    },
    addButtonDisabled: {
      backgroundColor: '#b0b0b0',
      shadowOpacity: 0,
      elevation: 0,
    },
    addText: {
      color: '#fff',
      fontSize: textBody,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    addTextDisabled: {
      color: '#f5f5f5',
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
    saveButton: {
      position: "absolute",
      right: Math.round(width * 0.03),
      minWidth: Math.round(96 * (isTablet ? 1.4 : 1)),
      height: Math.round(40 * iconScale),
      paddingHorizontal: Math.round(16 * (isTablet ? Math.max(iconScale, 1.2) : 1)),
      borderRadius: 10,
      borderWidth: 0,
      borderColor: "transparent",
      backgroundColor: "transparent",
      alignItems: "flex-end",
      justifyContent: "center",
      zIndex: 10,
      opacity: 1,
    },
    landscapeAddButton: {
      position: "absolute",
      bottom: '5%',
      left: Math.max(0, Math.round((width - cardWidth) / 2)),
      width: cardWidth,
    },
  });
}
