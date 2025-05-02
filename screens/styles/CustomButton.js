import React from "react";
import { Pressable, Text } from "react-native";
import styles from "./styles";

const darkenColor = (hex, amount = 0.01) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - 255 * amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - 255 * amount);
  const b = Math.max(0, (num & 0x0000ff) - 255 * amount);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

const CustomButton = ({ title, onPress, icon, color = '#4a90e2' }) => {
  const pressedColor = darkenColor(color, 0.15); // darken by 15%

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? pressedColor : color,
        },
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