import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from '../styles/styles';

const Countdown = ({ route }) => {
  const { activity, countStart = 10 } = route.params
  const [count, setCount] = useState(countStart);
  const [showActivity, setShowActivity] = useState(false);

  const handleNext = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(0);
      setShowActivity(true);
    }
  };

  return (
    <Pressable 
      style={[
        styles.countdownContainer,
        showActivity ? styles.activityBackground : styles.countdownBackground
      ]}
      onPress={handleNext}>
      {!showActivity ? (
        <Text style={styles.count}>{count}</Text>
      ) : (
        <>
          <Image
              source={activity.image}
              style={styles.activityCountdownEndImage}
              resizeMode="contain"
          />
          <Text style={styles.activityText}>{activity.name}</Text>
        </>
      )}
    </Pressable>
  );
};

export default Countdown;
