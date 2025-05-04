import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "../styles/styles";

const trafficLightData = [
  { backgroundColor: "#7dbf7d", textColor: "#4e8e4e", text: "Starting", marginTop: 150 },
  { backgroundColor: "#e0a958", textColor: "#b27833", text: "Nearly Finished", marginTop: 250 },
  { backgroundColor: "#d96c6c", textColor: "#a54242", text: "Finished", marginTop: 400 },
];

export default function TrafficLights() {
  return (
    <View style={styles.startingBackground}>
      <Text style={styles.startingText}>Starting</Text>
    </View>
  );
}