import { useState, useRef, useLayoutEffect } from 'react';
import { View, Text, FlatList, Image, SafeAreaView } from 'react-native';
import styles from '../styles/SlideshowStyles';
import Circle from "../../assets/icons/circle.svg"
import CircleTick from "../../assets/icons/hollowCircleTick.svg";

const NowNextSlideshow = ({ navigation, route }) => {
  const { board } = route.params || {};
  const { title, cards = [] } = board || {};

  const [currentIndex, setCurrentIndex] = useState(0);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const flatListRef = useRef(null);

  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Text style={styles.slideLabel}>
        {index === 0 ? 'Now' : index === 1 ? 'Next' : 'Then'}
      </Text>
      <View style={styles.card}>
        <View style={styles.cardInner}>
          <Image source={{ uri: item.image.uri }} style={styles.image} />
        </View>
        <Text style={styles.cardTitle}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={cards}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={renderItem}
        keyExtractor={(_, index) => `card-${index}`}
      />

      <View style={styles.dotsRow}>
        {cards.map((_, index) =>
          index === currentIndex ? (
            <CircleTick key={index} style={styles.tick} />
          ) : (
            <Circle key={index} style={styles.tick}/>
          )
        )}
      </View>
    </SafeAreaView>
  );
};

export default NowNextSlideshow;
