import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = "edit") {

  const isPad = Math.min(width, height) >= 768;

  const EDGE = isPad
    ? (isPortrait ? 130 : 50)
    : (isPortrait ? 30 : 70);
  
  const GAP  = isPortrait ? 12 : 24; 
  const MAX_PORTRAIT_CARD = isPad ? 820 : 720;

  const RATIO_LIBRARY = isPad
    ? (isPortrait ? 1.2 : 1.05)  
    : (isPortrait ? 1.05 : 1.1);
  
  // ---- Grid math ----
  const columns = isPortrait ? 1 : 2;
  const totalGaps = (columns - 1) * GAP;
  const contentWidth = width - EDGE * 2;
  const columnWidth = Math.floor((contentWidth - totalGaps) / columns);

  // Portrait card width (centred with a max)
  const portraitCardWidth = Math.min(contentWidth, MAX_PORTRAIT_CARD);

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
      gap: mode === "view" ? 6 : 8,
      width: isPortrait ? portraitCardWidth : columnWidth,
    },
    card: {
      alignSelf: "stretch",
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
      aspectRatio: RATIO_LIBRARY,
    },
    cardShadowWrapper: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 5,             // Android
      borderRadius: 20,
      alignSelf: "stretch",   
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
      backgroundColor: '#fff',
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
