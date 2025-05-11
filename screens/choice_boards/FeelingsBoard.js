import React from "react";
import { View, Text, Image } from "react-native";
import styles from '../styles/ChoiceBoardStyles';
import CogIcon from "../../assets/icons/cog.svg";
import Footer from "../components/Footer";

export default function FeelingsBoard() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Feeling Board</Text>
      <Footer />
    </View>
  );
}