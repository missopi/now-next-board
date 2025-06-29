import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from '../screens/styles/NowNextBoardStyles';
import Circle from "../assets/icons/circle.svg";
import CircleTick from "../assets/icons/hollowCircleTick.svg";

const NowNextBoardFinished = ({ navigation, route }) => {
  const { board } = route.params || {};
  const { title, cards = [] } = board || {};

  const renderCardIcons = (index) => {
    switch (index) {
      case 0: // Now
        return (
          <View style={styles.iconRow}>
            <CircleTick style={styles.tick} />
            <Circle style={styles.circle} />
            <Circle />
          </View>
        );
      case 1: // Next
        return (
          <View style={styles.iconRow}>
            <Circle />
            <CircleTick style={styles.tick} />
            <Circle style={styles.circle} />
          </View>
        );
      case 2: // Then
        return (
          <View style={styles.iconRow}>
            <Circle style={styles.circle} />
            <Circle />
            <CircleTick style={styles.tick} />
          </View>
        );
      default:
        return null;
    }
  };


  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    // Lock this screen to LANDSCAPE only
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);

    return () => {
      // Unlock when leaving
      ScreenOrientation.unlockAsync();
    };
  }, []);

  return (
    <SafeAreaView style={styles.finishedContainer}>
      <View style={styles.finishedCardRow}>
        {cards.map((card, index) => (
          <View key={index} style={styles.finishedCardContainer}>
            <Text style={styles.finishedCardLabel}>
              {index === 0 ? 'Now' : index === 1 ? 'Next' : 'Then'}
            </Text>
            {renderCardIcons(index)}

            <View style={styles.finishedCard}>
              <View style={styles.finishedCardInner}>
                {card?.image?.uri ? (
                  <Image
                    source={{ uri: card.image.uri }}
                    style={styles.finishedImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.finishedImage, styles.finishedImagePlaceholder]}>
                    <Text>No Image</Text>
                  </View>
                )}
              </View>
              <Text style={styles.finishedCardTitle}>{card.name}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default NowNextBoardFinished;