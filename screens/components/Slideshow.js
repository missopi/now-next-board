import { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, SafeAreaView, Pressable } from 'react-native';
import styles from '../styles/SlideshowStyles';

const Slideshow = ({ route, navigation }) => {
  const { title, activities, strokeColor = '#FFF5B5' } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);

  const toggleControls = () => setControlsVisible(!controlsVisible);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: strokeColor }]}>
      {controlsVisible && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}

      <FlatList
        data={activities}
        keyExtractor={(item, index) => item?.id || index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <Pressable style={styles.slide} onPress={toggleControls}>
            <View>
              {item?.image?.uri ? (
                <View style={styles.cardWrapper}>
                  <View style={styles.cardInner}>
                    <Image
                      source={{ uri: item.image.uri }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <Text style={styles.cardTitle}>{item?.name}</Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.noImageText}>No image</Text>
              )}
            </View>
          </Pressable>
        )}
      />

      {controlsVisible && (
        <View style={styles.dotsContainer}>
          {activities.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Slideshow;
