import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
    maxWidth: 400, // optional for larger screens
    backgroundColor: '#fff',
    width: '100%',
  },
  button: {
    paddingVertical: 15,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  icon: {
    marginRight: 8,
  },

  // libary

  libraryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,

  },

  // countdown screens

  countdownContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownSetupContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: '#f5f5f5',
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
  activityText: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 10,
  },
  label: { fontSize: 24, marginTop: 20, marginBottom: 15, fontWeight: 'bold' },
  input: {
    fontSize: 30,
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    marginRight: 80,
    marginLeft: 80,
    marginBottom: 20,
    textAlign: 'center',
  },
  activityImage: {
    width: 250,
    height: 250,
    marginBottom: 2,
    borderColor: '#000',
    borderWidth: 4,
    borderRadius: 20,
  },
  activityCountdownEndImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
    borderColor: '#000',
    borderWidth: 5,
    borderRadius: 20,
  },
  countdownBackground: {
    backgroundColor: '#add8e6',
  },
  activityBackground: {
    backgroundColor: '#fff',
  },
  pressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  // traffic lights

  trafficContainer: {
    flex: 1,
  },

  trafficText: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});