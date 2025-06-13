import { View, Text, FlatList, Image, Dimensions, StyleSheet, SafeAreaView } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Slideshow = ({ route }) => {
  const { title, activities } = route.params || {};

  if (!activities || activities.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.emptyText}>No cards to show.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <FlatList
        data={activities}
        keyExtractor={(item, index) => item?.id || index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.cardTitle}>{item?.name || 'Untitled'}</Text>
            {item?.image?.uri ? (
              <Image
                source={{ uri: item.image.uri }}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <Text style={{ color: '#999' }}>No image</Text>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  slide: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 100,
    color: '#888',
  },
});

export default Slideshow;
