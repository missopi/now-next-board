import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.25;

export default (theme) => StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.background,
    flex: 1,
  },
  searchInput: {
    padding: 10,
    backgroundColor: theme.modalBackground,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 15,
    fontSize: 16,
    color: theme.text,
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
    backgroundColor: theme.tabBackground,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: theme.activeTab,
  },
  tabText: {
    color: theme.text,
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
    borderColor: theme.cardBorder,
    borderWidth: 1,
    marginBottom: 2,
    backgroundColor: '#eee',
  },
  cardLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: theme.cardLabel,
  },
  boardCard: {
    backgroundColor: theme.card,
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
    color: theme.text,
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    gap: 12,
  },
  iconButton: {
    padding: 6,
  },
  handle: {
    backgroundColor: theme.handle,
    width: 40,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10, // adds space between handle and first item
  },
  modal: {
    backgroundColor: theme.modalBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  group: {
    backgroundColor: theme.groupBackground,
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
    borderBottomColor: theme.rowBorder,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
    color: theme.text,
    fontWeight: '600',
  },
});