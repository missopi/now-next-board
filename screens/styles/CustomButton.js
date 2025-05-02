import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

const CustomButton = ({ title, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default CustomButton;