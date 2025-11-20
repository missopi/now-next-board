import { StyleSheet } from "react-native";

export default function getStyles(isPortrait, width, height, mode = "edit") {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: isPortrait ? 60 : mode === "view" ? 10 : 25,
      paddingHorizontal: 20,
    },

    card: {
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 12,
      backgroundColor: '#fff',
      position: 'relative',
      marginLeft: isPortrait && mode === "edit" ? 0 : 20,
      width: isPortrait ? width * 0.8 : mode === "view" ? width * 0.35 : width * 0.29,
      height: isPortrait
        ? (mode === "edit" ? height * 0.28 : height * 0.34)
        : (mode === "view" ? height * 0.73 : height * 0.68),
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
      marginVertical: 10,
    },

    deleteButton: {
      position: 'absolute',
      top: 7,
      right: 7,
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
      justifyContent: 'center',           // center vertically
      paddingHorizontal: 12,
      paddingTop: isPortrait
        ? (mode === "edit" ? 23 : 16)
        : (mode === "view" ? 16 : 35),
      paddingBottom: 8,
      width: '100%',
      height: '100%',
    },

    // remove padding for full-bleed svg (read-only)
    cardContentFlush: {
      paddingHorizontal: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },

    // PHOTO size (kept as-is)
    image: {
      width: mode === "edit" ? 187.5 : 250,
      height: mode === "edit" ? 168.75 : 225,
      borderRadius: 10,
      marginBottom: 6,
      borderWidth: 1,
      borderColor: '#333',
    },

    placeholder: {
      width: mode === "edit" ? 187.5 : 250,
      height: mode === "edit" ? 168.75 : 225,
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
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },

    dragHandle: {
      position: 'absolute',
      top: 3,
      left: 7,
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
      width: isPortrait ? '55%' : 220,  // tweak as you like
      paddingVertical: 7,
      borderRadius: 12,
      marginTop: 6,
      marginBottom: 8,
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

    saveText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },

    listContainer: { justifyContent: 'center', alignItems: 'center' },

    // SVG wrappers
    // Edit mode: make SVG exactly the same size as photos so rows align
    svgInsetWrapper: {
      width: mode === "edit" ? 205 : 250,   // match .image sizes
      height: mode === "edit" ? 190 : 225,
      borderRadius: 10,
      overflow: 'hidden',
      alignSelf: 'center',
      transform: mode === "edit" ? [{ scale: 1.05 }] : undefined,
    },
  });
}
