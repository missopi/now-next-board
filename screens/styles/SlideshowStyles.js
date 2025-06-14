import { Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  cardWrapper: {
    backgroundColor: 'black',
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
  },
  image: {
    width: screenWidth * 0.85,
    height: screenHeight * 0.55,
    borderRadius: 14,
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
    marginBottom: 24,
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


