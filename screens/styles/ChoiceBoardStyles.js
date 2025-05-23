import { StyleSheet } from "react-native";

export default StyleSheet.create({

  createBoardButton: {
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  createBoardButtonText: {
    fontWeight: '600',
  },

  // modal

  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    paddingBottom: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
},
modal: {
  justifyContent: 'flex-end',
  margin: 0,
  flex: 1,
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
},

});