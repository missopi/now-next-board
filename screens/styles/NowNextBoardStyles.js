import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    width: 30,
    height: 30,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingBottom: 5,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 8,
    gap: 2,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
    paddingTop: 3,
    shadowColor: '#444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  image: {
    width: '85%',
    height: '80%',
    borderRadius: 8,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#333',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    fontSize: 18,
    color: '#aaa',
  },
  saveButton: {
    paddingBottom: 90,
    backgroundColor: '#fff',
  },
  saveText: {
    color: '#666', 
    fontSize: 18, 
    textAlign: 'center',
  },
});