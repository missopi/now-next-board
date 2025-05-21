import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
  // NowNext & Routines cards

  modalCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    width: '80%',
    alignSelf: 'center',
    top: '30%',
  },
  modalHeader: {
    fontSize: 25,
    paddingBottom: 10,
  },
  modalDialog: {
    fontSize: 17,
    paddingBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'flex-end',
    paddingTop: 15,
  },
  buttonColumn: {
    flexDirection: 'column',
    gap: 12,
    alignSelf: 'center',
    padding: 15,
  },
  imageButton: {
    backgroundColor: "#6395e0",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  addButton: {
    backgroundColor: "#6395e0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  addText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  cancelButton: {
    backgroundColor: "#ff0000",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    color: '#333',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 20,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    marginTop: 20,
    borderRadius: 10,
  },
  previewView: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 8,
    overflow: 'hidden',
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
    backgroundColor: "#6395e0",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  smallButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});