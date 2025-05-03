import React, { useState } from "react";
import { View, Text, Button, Pressable, TextInput } from "react-native";
import styles from "../styles/styles";

const CountdownSetup = ({ onStart }) => {
  const [count, setCount] = useState(10);

  const handleChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {  // Allow only digits or empty input
      setCount(text === '' ? '' : Number(text));
    }
  }; 

  return (
    <View style={styles.countdownSetupContainer}>
      <Text style={styles.label}>Countdown From:</Text>
      <TextInput
        style={styles.input}
        value={count.toString()}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="Enter countdown value"
      />
      <Button
        title="Start Countdown"
        onPress={() => onStart(count)}
        disabled={!Number.isInteger(count) || count <= 0 }
      />
    </View>
  );
};

export default CountdownSetup;
