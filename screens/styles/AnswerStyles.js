import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
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
    marginHorizontal: 8,
    marginVertical: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cardOne: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 5,
    backgroundColor: 'green',
  },
  cardTwo: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 5,
    backgroundColor: 'red',
  },
  cardThree: {
    borderWidth: 3,
    borderColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 5,
    backgroundColor: 'blue',
  },
  yes: {
    width: 120,
    height: 180,
    paddingHorizontal: 75,
    marginHorizontal: 40,
  },
})