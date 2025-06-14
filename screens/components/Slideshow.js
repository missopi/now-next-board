import { View, Text, FlatList, Image, SafeAreaView } from 'react-native';
import styles from '../styles/SlideshowStyles';

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

export default Slideshow;
