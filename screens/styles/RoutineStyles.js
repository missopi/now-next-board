import { StyleSheet } from "react-native";
import getCardBaseStyles from "./CardBaseStyles";

export default function getStyles(width, height, mode = "edit") {
  const shorter = Math.min(width, height);
  const { baseStyles, metrics } = getCardBaseStyles(width, height, mode);
  const textBody = metrics.textBody;
  const cardWidth = metrics.cardWidth;
  const pagePadding = Math.min(shorter * 0.08, 35);

  return StyleSheet.create({
    ...baseStyles,
    safeContainer: {
      flex: 1,
      paddingTop: pagePadding,
      paddingHorizontal: pagePadding,
      justifyContent: 'center',
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
    dragText: {
      fontSize: shorter * 0.064,
      color: '#ccc',
    },
    deleteText: {
      color: '#ccc',
      fontSize: shorter * 0.048,
      fontWeight: 'bold',
      lineHeight: shorter * 0.048,
    },
  });
}
