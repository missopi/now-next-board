import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  cardWrapper: {
    backgroundColor: '#444',
    borderRadius: 18,
    padding: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  cardInner: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    padding: 14,
    paddingBottom: 30,
  },
  image: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.55,
    borderRadius: 14,
    borderColor: 'black',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    color: '#000',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 34,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#999',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 12,
    height: 12,
  },
});


