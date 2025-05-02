import React from "react";
import { View, StyleSheet, Button } from "react-native";

export default function ToolsScreen({ navigation }) {
  return (
    <View style={StyleSheet.container}>
      <Button title="Timers" onPress={() => navigation.navigate('Timers')} />
      <Button title="Countdown" onPress={() => navigation.navigate('Countdown')} />
      <Button title="Traffic Lights" onPress={() => navigation.navigate('Traffic Lights')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
});