import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = "edit") {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: isPortrait? 60 : mode === "view" ? 10 : 25,
      paddingHorizontal: mode === "edit" ? 20 : 20,
    },
    card: {
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 12,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
      position: 'relative',
      marginLeft: isPortrait && mode === "edit" ? 0 : 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 5,
      elevation: 4,
      width: isPortrait ? width * 0.8 : mode === "view" ? width * 0.35 : width * 0.29,
      height: isPortrait
        ? (mode === "edit" ? height * 0.28 : height * 0.34)
        : (mode === "view" ? height * 0.73 : height * 0.68),
    },
    deleteButton: {
      position: 'absolute',
      top: 7,
      right: 1,
      width: 24,
      height: 24,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    deleteText: {
      color: '#ccc',
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 18,
    },
    cardContent: {
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingTop: isPortrait
        ? (mode === "edit" ? 23 : 16)
        : (mode === "view" ? 16 : 35),
      paddingBottom: 8,
    },
    image: {
      width: mode === "edit" ? 187.5 : 250,
      height: mode === "edit" ? 168.75 : 225,
      borderRadius: 10,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: '#333',
    },
    placeholder: {
      width: 190,
      height: 180,
      borderRadius: 10,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 8,
    },
    placeholderText: {
      color: '#aaa',
      fontSize: 18,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    dragHandle: {
      position: 'absolute',
      top: 3,
      left: 1,
      zIndex: 2,
      borderRadius: 16,
      paddingHorizontal: 6,
      paddingTop: 0.5,
      paddingBottom: 2,
    },
    dragText: {
      fontSize: 25,
      color: '#ccc',
    },
    saveButton: {
      width: '40%',
      paddingVertical: 7,
      borderRadius: 12,
      marginTop: 15,
      marginBottom: 28,
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
    saveText: {
      color: '#fff', 
      fontSize: 16, 
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonRow: {
      flexDirection: 'row', 
      justifyContent: 'center', 
      gap: 10, 
      backgroundColor: 'transparent', 
      position: "absolute", 
      bottom: 3,
      left: 0,
      right: 0
    },
    listContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    // title chooser

    chooserTop: {
      paddingHorizontal: 16,
      paddingTop: 65,
    },
    chooserTextInput: {
      padding: 9,
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 12,
      marginHorizontal: 10,
      fontSize: 17,
      color: '#111',
      borderColor: '#ccc',
      borderWidth: 1,
    },
  });
};
