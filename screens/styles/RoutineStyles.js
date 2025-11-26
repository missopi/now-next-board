import { StyleSheet } from "react-native";

export default function getStyles(width, height, mode = "edit") {
  const textLarge = Math.min(width, height) * 0.06;  // scales naturally with screen width
  const textBody = Math.min(width, height) * 0.035;

  const cardWidth = Math.min(Math.min(width, height) * 0.8, 500);

  return StyleSheet.create({
    safeContainer: {
      flex: 1,
      padding: 40,
      justifyContent: 'center',
    },
    card: {
      flex: 1,
      padding: 30,
      paddingTop: mode === "edit" ? 10 : 30,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 20,
      backgroundColor: '#fff',
      alignSelf: 'center', // center within the list container
      aspectRatio: 1.05,
      width: cardWidth,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
    },
    cardContent: {
      flex: 1,
    },
    image: {
      flex: 1,
      borderRadius: 20,
      borderColor: '#333',
      borderWidth: 1,
      marginBottom: 8,
    },
    placeholder: {
      flex: 1,
      width: '100%',
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
      paddingVertical: Math.min(width, height) * 0.015,
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
      fontSize: Math.min(width, height) * 0.064,
      color: '#ccc',
    },
    deleteText: {
      color: '#ccc',
      fontSize: Math.min(width, height) * 0.048,
      fontWeight: 'bold',
      lineHeight: Math.min(width, height) * 0.048,
    },
  });
}
