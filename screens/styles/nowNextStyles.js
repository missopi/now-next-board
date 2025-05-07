import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 15,
    backgroundColor: '#f5f5f5'
  },
  cardContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    width: screenWidth * 0.9,
    height: screenHeight * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
    // borderColor: '#222',
    // borderWidth: 2,
    // borderRadius: 10,
  },
  label: {
    fontSize: 15,
    marginTop: 4,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    fontSize: 15,
    color: '#aaa',
  },
});