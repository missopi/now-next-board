import { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from '../styles/SlideshowStyles';

const Slideshow = ({ route, navigation }) => {
  const { title, activities } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const insets = useSafeAreaInsets();

  const toggleControls = () => setControlsVisible(!controlsVisible);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const headerPaddingTop = Math.max(styles.header.paddingTop - insets.top, 0);
  const dotsMarginBottom = Math.max(styles.dotsContainer.marginBottom - insets.bottom, 0);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: '#E0F2FE' }]}
      edges={['top', 'bottom', 'left', 'right']}
    >
      {controlsVisible && (
        <View style={[styles.header, { paddingTop: headerPaddingTop }]}>
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
        <View style={[styles.dotsContainer, { marginBottom: dotsMarginBottom }]}>
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
