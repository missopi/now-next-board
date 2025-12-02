import { useState, useRef, useLayoutEffect, useMemo } from 'react';
import { View, Text, FlatList, Image, Pressable, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import getStyles from '../styles/SlideshowStyles';
import { activityLibrary } from '../../data/ActivityLibrary';

const libraryImageMap = activityLibrary.reduce((acc, item) => {
  acc[item.id] = item.image;
  return acc;
}, {});

const getImageSource = (image) => {
  if (!image) return null;
  if (typeof image === 'function' || typeof image === 'number') return image;
  if (typeof image === 'string') return { uri: image };
  return image?.uri && typeof image.uri === 'string' ? { uri: image.uri } : null;
};

const resolveCardImage = (card) => {
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
              <View style={styles.cardWrapper}>
                <View style={styles.cardInner}>
                  {(() => {
                    const resolvedImage = resolveCardImage(item);
                    const imageSource = getImageSource(resolvedImage);
                    if (!imageSource) {
                      return <Text style={styles.noImageText}>No image</Text>;
                    }

                    const isSvg = typeof imageSource === 'function';
                    const ImageComponent = isSvg ? imageSource : null;

                    return isSvg ? (
                      <ImageComponent
                        width={styles.image.width}
                        height={styles.image.height}
                        preserveAspectRatio="xMidYMid slice"
                      />
                    ) : (
                      <Image
                        source={imageSource}
                        style={styles.image}
                        resizeMode="cover"
                      />
                    );
                  })()}
                  <Text style={styles.cardTitle}>{item?.name || ''}</Text>
                </View>
              </View>
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
