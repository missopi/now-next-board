import { StyleSheet } from "react-native";

export default function getModalStyles(isPortrait, width, height) {
  return StyleSheet.create({
  
    // NowNext & Routines cards

    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // translucent tint
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalCard: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: 'flex-start',
      position: 'absolute',
      width: isPortrait ? width * 0.9 : width * 0.45,
      maxHeight: isPortrait ? height * 0.9 : height * 0.8,
    },
    modalHeader: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 10,
    },
    modalDialog: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginBottom: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      alignItems: 'center',
    },
    buttonColumn: {
      flexDirection: 'column',
      gap: 12,
      alignItems: 'stretch',
      marginVertical: 10,
    },
    imageButton: {
      backgroundColor: "#22aefe",
      borderRadius: 10,
      paddingHorizontal: 25,
      paddingVertical: 15,
    },
    imageAddButton: {
      flex: 1,
      backgroundColor: "#22aefe",
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
      marginRight: 8,
    },
    imageAddText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    cancelButton: {
      flex: 1,
      backgroundColor: "#ff0000",
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
    },
    cancelText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    input: {
      color: '#333',
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 20,
      fontSize: 18,
      borderRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 15,
      width: '100%',
    },
    previewImage: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    previewView: {
      width: 160,
      height: 120,
      alignSelf: 'center',
      borderRadius: 8,
      overflow: 'hidden',
      marginBottom: 10,
    },
    label: {
      fontSize: 20,
      marginTop: 4,
      fontWeight: '600',
      color: '#333',
    },
    placeholder: {
      fontSize: 15,
      color: '#aaa',
    },
    smallButton: {
      backgroundColor: "#22aefe",
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
    },
    smallButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
    smallText: {
      fontSize: 15,
      fontWeight: 500,
    },

    // modal for + feature

    addOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    addBox: {
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingVertical: 30,
      paddingHorizontal: 25,
      width: '80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 5,
    },
    addTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    addButton: {
      width: '100%',
      paddingVertical: 12,
      borderRadius: 12,
      marginVertical: 6,
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
    addText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: "center",
    },
    addCancelButton: {
      width: '100%',
      paddingVertical: 12,
      borderRadius: 12,
      marginTop: 10,
      alignItems: 'center',
      backgroundColor: '#ff0000',
      borderWidth: 2,
      borderColor: '#ff0000',
    },

    // modal for delete

    deleteRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      alignItems: 'center',
    },
    deleteButton: {
      flex: 1,
      borderRadius: 10,
      backgroundColor: '#fff',
      borderColor:'#ff0000',
      borderWidth: 2,
      paddingVertical: 14,
      alignItems: 'center',
      marginRight: 8,
    },
    deleteText: {
      fontSize: 18,
      color: '#ff0000',
      fontWeight: "bold",
      textAlign: "center",
    },
    deleteDialog: {
      fontSize: 16,
      color: '#555',
      textAlign: 'center',
      marginBottom: 20,
    },
    cancelDeleteButton: {
      flex: 1,
      backgroundColor: "#ff0000",
      borderColor:'#ff0000',
      borderWidth: 2,
      borderRadius: 10,
      paddingVertical: 14,
      alignItems: 'center',
    },
    cancelDeleteText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });
};
