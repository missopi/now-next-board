import React from "react";
import { View, Text, Image } from "react-native";
import styles from '../styles/ChoiceBoardStyles';
import CogIcon from "../../assets/icons/cog.svg";
import Footer from "../components/Footer";

export default function WantBoard() {
  return (
    <View style={{ flex: 1 }}>
      <Text>Want Board</Text>
      <Footer />
    </View>
  );
}