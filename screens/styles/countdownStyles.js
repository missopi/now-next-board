import { StyleSheet } from "react-native";

export default StyleSheet.create({
  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
  },
  count: {
    fontSize: 280,
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    elevation: 3,
  },
  pressable: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    width: "100%",
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
  },
});