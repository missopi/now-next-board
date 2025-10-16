import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.25;

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    marginLeft: 10,
    paddingVertical: 8,
  },
  titleText:{
    fontSize: 28,
    fontWeight: '700',
  },
  searchInput: {
    padding: 9,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    marginHorizontal: 10,
    fontSize: 17,
    color: '#111',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 26,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
  },
  activeTab: {
    backgroundColor: '#cdedffff',
    borderWidth: 2,
    borderColor: '#01a2ffff',
  },
  tabText: {
    color: '#ccc',
    fontSize: 15,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#01a2ffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cardPreview: {
    width: 85,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 80,
    height: 75,
    borderRadius: 12,
    borderColor: '#111',
    borderWidth: 1,
    marginBottom: 2,
    backgroundColor: '#eee',
  },
  boardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  boardCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    borderColor: '#aaa',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    marginHorizontal: 10,
    elevation: 2,
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
    color: '#000',
  },
  deleteIcon: {
    color: '#bbb',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 18,
    position: 'absolute',
    top: 1,
    right: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    color: '#444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
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
  iconColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
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
    paddingBottom: 20,
    paddingTop: 10,
  },
  group: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 12,
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',

    borderRadius: 10, // match your image radius if needed
  },
  overlayText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 45,
    fontWeight: 'bold',
  },
});