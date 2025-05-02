import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f6f8fa',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%', // stretch button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // for android
  },
  buttonPressed: {
    backgroundColor: '#357ab8',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});