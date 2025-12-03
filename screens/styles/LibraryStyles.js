import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 8,
    marginHorizontal: 25,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderColor: '#fff',
    marginBottom: 12,
    borderWidth: 1,
    marginHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
})