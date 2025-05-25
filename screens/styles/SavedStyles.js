import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontsize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  boardItem: {
    flex: 1,
  },
  boardTitle: {
    fontsize: 16,
  },
  deleteButton: {
    marginLeft: 12,
  },
  deleteText: {
    color: 'red',
    fontsize: 18,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 6,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
})