import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
  },
  button: {
    paddingVertical: 25,
    paddingHorizontal: 16,
    borderRadius: 15,
    marginVertical: 8,
    width: '75%', // stretch button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // for android
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
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

  // library

  activityImage: {
    width: 280,
    height: 200,
    padding: 10,
    resizeMode: 'contain',
    borderColor: '#000',
    borderWidth: 3,
    borderRadius: 15,
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  activityName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
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

  // footer

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingBottom: 30,
  },
  footerButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    flex: 1,
  },
  footerLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
    marginLeft: 6,
  },
  activeFooterLabel: {
    color: '#000',
  },
  
// Settings Modal

  handle: {
    backgroundColor: '#ccc',
    width: 40,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10, // adds space between handle and first item
  },
  modal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    padding: 30,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 16,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 30,
    zIndex: 1,
  },
  closeX: {
    fontSize: 28,
    fontWeight: 400,
    color: '#000',
  }
});