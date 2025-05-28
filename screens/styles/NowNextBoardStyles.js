import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
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
    padding: 5,
  },
  image: {
    width: '80%',
    height: '80%',
    marginTop: 10,
    borderRadius: 8,
    resizeMode: 'contain',
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

  // chooser screen

  chooserContainer: {
    flex: 1,
    padding: 20,
  },
  chooserTop: {
    padding: 16,
    paddingTop: 24,
  },
  chooserCreateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderColor: '#aaa',
    borderWidth: 1,
  },
  chooserCreateText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chooserLoadText: {
    textAlign: 'center',
    color: '#007bff',
    marginTop: 12,
    fontSize: 15,
  },
  chooserTextInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: 'f9f9f9',
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