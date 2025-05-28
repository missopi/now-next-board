import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  boardBlock: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteIcon: {
    fontSize: 20,
    color: 'red',
  },
  cardPreview: {
    width: 80,
    marginRight: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: '#eee',
  },
  cardLabel: {
    fontSize: 12,
    textAlign: 'center',
    color: '#444',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
});