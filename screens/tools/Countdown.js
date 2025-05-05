import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import styles from '../styles/countdownStyles';

const Countdown = ({ route }) => {
  const { activity, countStart = 10 } = route.params
  const [count, setCount] = useState(countStart);
  const [showActivity, setShowActivity] = useState(false);

  const backgroundColor = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(0);
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
      setShowActivity(true);
    }
  };

  const interpolatedBackground = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#87ceeb", "#ffffff"],
  });

  return (
    <Animated.View style={[styles.countdownContainer, { backgroundColor: interpolatedBackground }]}>
      <Pressable style={styles.pressable} onPress={handleNext}>
        {!showActivity ? (
          <Text style={styles.count}>{count}</Text>
        ) : (
          <>
            <Image source={activity.image} style={styles.activityCountdownEndImage} resizeMode="contain"/>
            <Text style={styles.activityText}>{activity.name}</Text>
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default Countdown;
