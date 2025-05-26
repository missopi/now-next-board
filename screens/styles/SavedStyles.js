import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontsize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 6,
  },
  boardItem: {
    flex: 1,
  },
  boardTitle: {
    fontsize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  deleteButton: {
    width: 34,
    height: 28,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ff0000',
    borderRadius: 14,
  },
  deleteText: {
    color: '#ffffff',
    fontsize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 6,
  },
  closeText: {
    color: '#ffffff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
  },
  previewRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  miniCard: {
    width: 64,
    height: 80,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  miniCardImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginBottom: 4,
  },
  miniCardText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
  },
})