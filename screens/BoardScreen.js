import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BoardScreen() {
  return (
    <View style={StyleSheet.container}>
      <Text>Now/Next Board</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});