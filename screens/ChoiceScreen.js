import React from "react";
import { View, Text, Button } from "react-native";
import styles from './styles';

export default function ChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="I Feel..." onPress={() => navigation.navigate('Feelings Board')} />
      <Button title="I Wan't..." onPress={() => navigation.navigate('Want Board')} />
      <Button title="I Need..." onPress={() => navigation.navigate('Need Board')} />
      <Button title='Activity Library' onPress={() => navigation.navigate('Library')} />
    </View>
  );
}
