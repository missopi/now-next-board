import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
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
  tick: {
    width: 30,
    height: 30,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingBottom: 12,
  },
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    paddingVertical: 6,
    gap: 11,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 20,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: '40%',
    height: '75%',
    borderRadius: 8,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    fontSize: 18,
    marginTop: 4,
    paddingBottom: 2,
    fontWeight: 'bold',
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
    paddingTop: 4,
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
    marginHorizontal: 40,
    marginBottom: 1,
    backgroundColor: '#fff',
  },
  showThenButton: {
    flex: 1,
    marginLeft: 8,
    alignSelf: 'center',
    backgroundColor: '#4a90e2',
    padding: 12,
    alignItems: 'center', 
    borderRadius: 8,
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideshowButton: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Settings Modal

  handle: {
    backgroundColor: '#ccc',
    width: 40,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10, // adds space between handle and first item
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    padding: 30,
    alignItems: 'center',
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

  // finished view

  finishedContainer: {
    flex: 1,
    padding: 16,
  },
  finishedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 18,
    color: '#000',
  },
  finishedCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    gap: 5,
    flex: 1,
  },
  finishedCardContainer: {
    alignItems: 'center',
  },
  finishedCardLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  finishedCard: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#fff',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 4,
  },
  finishedCardInner: {
    backgroundColor: 'white',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  finishedImage: {
    width: 230,
    height: 190,
    borderBottomWidth: 1,
  },
  finishedCardTitle: {
    marginTop: 8,
    fontSize: 18,
    paddingBottom: 12,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
});