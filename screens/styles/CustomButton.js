import React, { useRef } from "react";
import { Pressable, Text, View, Animated } from "react-native";
import styles from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

const darkenColor = (hex, amount = 0.15) => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - 255 * amount);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - 255 * amount);
  const b = Math.max(0, (num & 0x0000ff) - 255 * amount);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

const CustomButton = ({ title, onPress, icon, color = '#6395e0' }) => {
  const animation = useRef(new Animated.Value(0)).current;

  const pressedColor = darkenColor(color, 0.15); // darken by 15%

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [color, pressedColor],
  });

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[styles.button, { backgroundColor }]}>
      <Pressable 
      onPress={onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut}
      style={{ paddingVertical: 12, alignItems: 'center' }}
      >
        <View style={styles.buttonContent}>
          {icon && (
            <MaterialIcons name={icon} size={25} color="#fff" style={styles.icon} />
          )}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        </Pressable>
    </Animated.View>
  );
};

export default CustomButton;