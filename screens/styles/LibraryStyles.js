import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    marginHorizontal: 25,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 26,
    borderWidth: 2,
    borderRadius: 15,
  },
  tabText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderColor: '#ccc',
    marginBottom: 12,
    borderWidth: 1,
    marginHorizontal: 25,
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