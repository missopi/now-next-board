import React from "react";
import { View } from "react-native";
import styles from "./styles/styles";
import Footer from "./components/footer";

export default function Today() {
  return (
    <View style={styles.container}>
      <Footer />
    </View>
  );
}
