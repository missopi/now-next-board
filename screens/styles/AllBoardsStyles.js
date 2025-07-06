import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.25;

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 15,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#000',
  },
  cardPreview: {
    width: 80,
    marginRight: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    borderColor: '#111',
    borderWidth: 1,
    marginBottom: 2,
    backgroundColor: '#eee',
  },
  cardLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: '#444',
  },
  boardCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 15,
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
    color: '#ccc',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: cardSize,
  },
  cardLabel: {
    fontSize: 14,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
});