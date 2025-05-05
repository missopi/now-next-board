import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import styles from '../styles/countdownStyles';

const Countdown = () => {
  const [count, setCount] = useState(10);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCount(10);
    setCompleted(false);
  };

  return (
    <Pressable style={styles.countdownContainer} onPress={handleNext}>
      {!completed ? (
        <Text style={styles.count}>{count}</Text>
      ) : (
        <Pressable style={styles.pressable} onPress={handleReset}>
          <Text style={styles.buttonText}>reset</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default Countdown;
