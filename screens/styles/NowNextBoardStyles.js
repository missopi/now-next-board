import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = 'edit') {

  const isPad = Math.min(width, height) >= 768;

  const EDGE = isPad ? (isPortrait ? 160 : 50) : (isPortrait ? 30 : 90);
  const GAP  = isPortrait ? 12 : 22; 
  const MAX_PORTRAIT_CARD = isPad ? 820 : 720;
  const RATIO_LIBRARY = 1.05;
  
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
    },
    wrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: isPortrait ? 'column' : 'row',
      gap: isPortrait ? 5 : 40,
      paddingHorizontal: isPortrait ? 0 : 20,
    },
    textRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    icon: {
      height: 50,
      width: 40,
    },
    textTitle: {
      fontSize: isPad ? 40 : 20,
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
      gap: 6,
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
      marginBottom: 10,
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
      fontSize: isPad ? 40 : 28,
      fontWeight: '800',
      color: '#333',
    },
    placeholder: {
      fontSize: 18,
      color: '#aaa',
    },
  });
};
