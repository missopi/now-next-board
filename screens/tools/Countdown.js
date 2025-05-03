import React, { useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import styles from '../styles/styles';

const Countdown = () => {
  const [count, setCount] = useState(10);

  const handleNext = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      console.log('Countdown Complete');
    }
  };

  return (
    <Pressable style={styles.countdownContainer} onPress={handleNext}>
      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
};

export default Countdown;
