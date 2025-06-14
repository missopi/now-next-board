import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 2,
    paddingBottom: 2,
    alignItems: 'center',
  },
  routineTitle: {
    fontSize: 22,
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
    borderRadius: 18,
    padding: 3,
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
    fontWeight: '600',
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


