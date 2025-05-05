import React, { useState } from "react";
import { Text, Pressable } from "react-native";
import styles from "../styles/styles";

const trafficLightData = [
  { backgroundColor: "#7dbf7d", textColor: "#4e8e4e", text: "Starting", marginTop: 150 },
  { backgroundColor: "#e0a958", textColor: "#b27833", text: "Nearly Finished", marginTop: 310 },
  { backgroundColor: "#d96c6c", textColor: "#a54242", text: "Finished", marginTop: 600 },
];

const TrafficLights = () => {
  const [index, setIndex] = useState(0);

  const handleNextTraffic = () => {
    setIndex((prevIndex) => (prevIndex +1) % trafficLightData.length);
  };

  const { backgroundColor, textColor, text, marginTop } = trafficLightData[index];

  return (
    <Pressable onPress={handleNextTraffic} style={[styles.trafficContainer, { backgroundColor }]}>
      <Text style={[styles.trafficText, { color: textColor, marginTop: marginTop }]}>{text}</Text>
    </Pressable>  
  );
};

export default TrafficLights;