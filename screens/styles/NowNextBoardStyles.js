import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
    paddingTop: 50,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  textTitle: {
    fontSize: 20,
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
    paddingVertical: 6,
    gap: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
    paddingTop: 5,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: '85%',
    height: '80%',
    borderRadius: 8,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    fontSize: 20,
    marginTop: 4,
    paddingBottom: 2,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    fontSize: 18,
    color: '#aaa',
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
    padding: 15,
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
  modalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 14,
  },
});