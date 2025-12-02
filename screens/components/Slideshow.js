import { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { View, Text, FlatList, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import getStyles from '../styles/SlideshowStyles';
import { activityLibrary } from '../../data/ActivityLibrary';
import ActivityCard from './ActivityCard';

const libraryImageMap = activityLibrary.reduce((acc, item) => {
  acc[item.id] = item.image;
  return acc;
}, {});

const resolveActivityImage = (card) => {
  if (!card) return null;
  if (card.fromLibrary && card.imageKey) {
    return libraryImageMap[card.imageKey] || null;
  }
  return card.image || null;
};

const Slideshow = ({ route, navigation }) => {
  const { title, activities = [] } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const styles = useMemo(() => getStyles(width, height, isPortrait), [width, height, isPortrait]);

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
      style={styles.container}
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
            <View style={styles.cardContainer}>
              <ActivityCard
                activity={item}
                label="No activity"
                readOnly
                styles={styles}
                resolveActivityImage={resolveActivityImage}
              />
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
