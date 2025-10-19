import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },

  // library

  activityImage: {
    width: 200,
    height: 200,
    padding: 10,
    resizeMode: 'contain',
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  // home screen
 button: {
    width: 325,
    height: 100,
    borderRadius:12,
    backgroundColor: '#22aefe',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // for android
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 5,
  },
  buttonColumn: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 10,
  },

  // footer

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    paddingBottom: 12,
  },
  footerButton: {
    alignItems: 'center',
    flexDirection: 'column',
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
});