import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = 'edit') {

  const shorter = Math.min(width, height);
  const longer = Math.max(width, height);
  const isPad = longer >= 1024 && shorter >= 810; 
  const isPadMini = shorter >= 744 && shorter < 810;

  const EDGE = isPad 
    ? (isPortrait ? 160 
    : (mode == 'edit' ? 80 : 50)) 
    : isPadMini
    ? (isPortrait ? 140 
    : (mode == 'edit' ? 80 : 50)) 
    : (isPortrait ? 30 : 90);
  const GAP = isPad ? 22 : isPadMini ? 16 : isPortrait ? 12 : 22;
  const MAX_PORTRAIT_CARD = isPad ? 820 : isPadMini ? 650 : 720;
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
      gap: isPortrait ? 5 : (mode == 'edit' ? 15 : 40),
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
      fontSize: isPad ? 40 : isPadMini ? 28 : 20,
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
      fontSize: isPad ? 40 : isPadMini ? 32 : 28,
      fontWeight: '800',
      color: '#333',
    },
    placeholder: {
      fontSize: 18,
      color: '#aaa',
    },
    swapButton: {
      alignSelf: "center",
    },
    swapButtonInline: {
      marginLeft: 8,
      paddingHorizontal: 4,
    },
    portraitNextHeader: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 5,
    },
    centerGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
    },
  });
};
