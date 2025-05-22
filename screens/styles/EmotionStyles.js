import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
  },
  portrait: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
  },
  column: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})