import { StyleSheet } from "react-native";

export default function getModalStyles(width, height) {
  const isTablet = Math.min(width, height) >= 768;
  const modalWidth = isTablet ? width * 0.5 : width * 0.9;
  const addBoxWidth = isTablet ? width * 0.5 : "80%";

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
      width: modalWidth,
      maxHeight: isTablet ? height * 0.8 : height * 0.9,
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
      backgroundColor: "#0792e2ff",
      borderRadius: 10,
      paddingHorizontal: 25,
      paddingVertical: 15,
    },
    imageAddButton: {
      flex: 1,
      backgroundColor: "#0792e2ff",
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
      backgroundColor: "#d40000ff",
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
    smallButton: {
      backgroundColor: "#0792e2ff",
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
      width: addBoxWidth,
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
      backgroundColor: '#0792e2ff',
      borderWidth: 2,
      borderColor: '#0792e2ff',
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
      backgroundColor: '#d40000ff',
      borderWidth: 2,
      borderColor: '#d40000ff',
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
      borderColor:'#d40000ff',
      borderWidth: 2,
      paddingVertical: 14,
      alignItems: 'center',
      marginRight: 8,
    },
    deleteText: {
      fontSize: 18,
      color: '#d40000ff',
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
      backgroundColor: "#d40000ff",
      borderColor:'#d40000ff',
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
    categoryPicker: {
      borderRadius: 10,
      borderColor: "#ccc",
      borderWidth: 1,
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: "center",
      marginBottom: 6,
    },
    categoryPickerText: {
      fontSize: 16,
      color: "#333",
      fontWeight: "600",
      textAlign: "center",
    },
    categoryList: {
      borderRadius: 10,
      borderColor: "#ddd",
      borderWidth: 1,
      maxHeight: 180,
      marginTop: 8,
      overflow: "hidden",
    },
    categoryOption: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    categoryOptionActive: {
      backgroundColor: "#cdedffff",
    },
    categoryOptionText: {
      fontSize: 16,
      color: "#333",
      fontWeight: "600",
    },
    categoryOptionTextActive: {
      color: "#01a2ffff",
    },
  });
};
