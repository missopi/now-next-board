import { StyleSheet } from "react-native";

export default StyleSheet.create({
  timerCount: {
    fontSize: 120,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8cc'
  },
  timerButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 30,
  },
  timerButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  }, 
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'centre',
    marginBottom: 20,
  },
  timeOption: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 6,
  },
  selectorTimeOption: {
    backgroundColor: '#4caf50',
  },
  timeOptionText: {
    color: '#333',
    fontWeight: '500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});