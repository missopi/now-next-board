import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3eda6'
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landscape: {
    flexDirection: 'row',  // switch to horizontal layout
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  portrait: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  column: {
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 2,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
  },
  smallButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },

  // card modal

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
    paddingTop: 10,
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

  // Settings Modal

  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    paddingBottom: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    flex: 1,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 30,
    zIndex: 1,
  },
  closeX: {
    fontSize: 28,
    fontWeight: 400,
    color: '#000',
  }
});