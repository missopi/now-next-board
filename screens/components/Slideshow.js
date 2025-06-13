import { View, Text, FlatList, Image, Dimensions, StyleSheet, SafeAreaView } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Slideshow = ({ route }) => {
  const { title, activities, strokeColor = '#FFF5B5' } = route.params || {};

  if (!activities || activities.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: strokeColor }]}>
        <Text style={styles.emptyText}>No cards to show.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: strokeColor }]}>
      {/* Routine title */}
      <View style={styles.header}>
        <Text style={styles.routineTitle}>{title}</Text>
      </View>

      <FlatList
        data={activities}
        keyExtractor={(item, index) => item?.id || index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.cardWrapper}>
              <View style={styles.cardInner}>
                {item?.image?.uri ? (
                  <Image
                    source={{ uri: item.image.uri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={{ color: '#999' }}>No image</Text>
                )}
                <Text style={styles.cardTitle}>{item?.name || 'Untitled'}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default Slideshow;
