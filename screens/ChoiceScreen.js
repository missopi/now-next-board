import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function ChoiceScreen({ navigation }) {
  return (
    <View style={StyleSheet.container}>
      <Button title="I Feel..." onPress={() => navigation.navigate('Feelings Board')} />
      <Button title="I Wan't..." onPress={() => navigation.navigate('Want Board')} />
      <Button title="I Need..." onPress={() => navigation.navigate('Need Board')} />
      <Button title='Activity Library' onPress={() => navigation.navigate('Library')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
});