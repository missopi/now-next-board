import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
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
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
    justifyContent: 'center',
    position: 'absolute',
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
  addButton: {
    flex: 1,
    backgroundColor: "#22aefe",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 8,
  },
  addText: {
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
    width: 260,
    height: 200,
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
});