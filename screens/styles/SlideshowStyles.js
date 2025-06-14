import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 12,
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 16,
    marginHorizontal: 14,
  },
  routineTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cardWrapper: {
    backgroundColor: 'black',
    borderRadius: 16,
    padding: 1.5,
  },
  cardInner: {
    backgroundColor: 'white',
    borderRadius: 14,
    padding: 22,
    overflow: 'hidden',
  },
  image: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.5,
    borderRadius: 14,
  },
  cardTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 100,
    color: '#666',
  },
});


