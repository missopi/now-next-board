import React, { useState } from "react";
import { View, Text, Pressable, Animated, Image } from "react-native";
import styles from '../styles/styles';

const Countdown = ({ activity, countStart }) => {
  const [count, setCount] = useState(countStart);
  const [isDone, setIsDone] = useState(false);

  const handleNext = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setIsDone(true);
    }
  };

  if (isDone) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          {activity.image && (
            <Image source={activity.image} style={styles.image} resizeMode="contain" />
          )}
          <Text style={styles.activityText}>{activity.name}</Text>
        </View>
      </View>
    );
  }

  return (
    <Pressable style={styles.countdownContainer} onPress={handleNext}>
      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
};

export default Countdown;
