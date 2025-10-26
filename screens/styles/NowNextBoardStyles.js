import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = "edit") {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: isPortrait
        ? (mode === "edit" ? 25 : 0)
        : (mode === "view" ? 0 : 60),
    },
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: isPortrait ? 'column' : 'row',
      gap: isPortrait 
        ? (mode === "edit" ? 2 : 5) 
        : 50,
      paddingHorizontal: isPortrait ? 0 : 20,
    },
    textRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    textTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      paddingBottom: 5,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      marginVertical: 8,
      gap: mode === "view" ? 3 : 5,
      width: isPortrait ? '100%' : 'auto',
    },
    card: {
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 20,
      alignItems: 'center',
      backgroundColor: '#fff',
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',        
      gap: 5,
      paddingTop: 3,
      width: isPortrait ? width * 0.8 : mode === "view" ? width * 0.35 : width * 0.28,
      height: isPortrait
        ? (mode === "edit" ? height * 0.33 : height * 0.36)
        : (mode === "view" ? height * 0.75 : height * 0.60),
    },
    libraryCard: {
      backgroundColor: 'transparent',
      borderWidth: 0,
      overflow: 'hidden',  
    },
    cardShadowWrapper: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 5,             // Android
      borderRadius: 20,
    },
    image: {
      width: '90%',
      height: '75%',
      borderRadius: 8,
      resizeMode: 'cover',
      borderWidth: 1,
      borderColor: '#333',
    },
    libraryImage: {
      position: 'absolute',  
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: 20,
      resizeMode: 'cover',
    },
    label: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    placeholder: {
      fontSize: 18,
      color: '#aaa',
    },
    saveButton: {
      width: isPortrait ? '50%' : '25%',
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
      backgroundColor: 'transparent', 
      position: 'absolute', 
      bottom: isPortrait ? 3 : 1,
      left: 0,
      right: 0
    },
  });
};
