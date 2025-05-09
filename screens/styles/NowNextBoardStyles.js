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

  // Settings Modal

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 24,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
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
  },
});