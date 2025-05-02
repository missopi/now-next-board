import React from "react";
import { View, Button } from "react-native";
import styles from './styles';

export default function ToolsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Timers" onPress={() => navigation.navigate('Timers')} />
      <Button title="Countdown" onPress={() => navigation.navigate('Countdown')} />
      <Button title="Traffic Lights" onPress={() => navigation.navigate('Traffic Lights')} />
    </View>
  );
}
