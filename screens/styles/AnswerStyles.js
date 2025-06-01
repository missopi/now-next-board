import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
  card: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
  },
  yes: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
  },
})