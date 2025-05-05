import React from "react";
import { View } from "react-native";
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';

export default function ToolsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Timers"
        onPress={() => navigation.navigate('Timers')}
      />
      <CustomButton
        title="Countdown"
        onPress={() => navigation.navigate('Countdown')}
      />
      <CustomButton
        title="Traffic Lights"
        onPress={() => navigation.navigate('Traffic Lights')}
      />
    </View>
  );
}
