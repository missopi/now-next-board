import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  landscape: {
    flexDirection: 'row',  // switch to horizontal layout
    justifyContent: 'space-around',
  },
  portrait: {
    flexDirection: 'column',
  },
  column: {
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    borderWidth: 3,
    borderColor: '#aaa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 1,
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
    // borderColor: '#222',
    // borderWidth: 2,
    // borderRadius: 10,
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
});