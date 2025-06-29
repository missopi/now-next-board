import { useEffect, useLayoutEffect } from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import styles from '../screens/styles/NowNextBoardStyles';

const NowNextBoardFinished = ({ navigation, route }) => {
  const { board } = route.params || {};
  const { title, cards = [] } = board || {};

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
      <Text style={styles.finishedTitle}>{title}</Text>

      <View style={styles.finishedCardRow}>
        {cards.map((card, index) => (
          <View key={index} style={styles.finishedCardContainer}>
            <Text style={styles.finishedCardLabel}>
              {index === 0 ? 'Now' : index === 1 ? 'Next' : 'Then'}
            </Text>

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