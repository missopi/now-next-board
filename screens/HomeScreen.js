import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={StyleSheet.container}>
      <Button title='Start New Now/Next Board' onPress={() => navigation.navigate('Board')} />
      <Button title='Go to Settings' onPress={() => navigation.navigate('Settings')} />
      <Button title='Activity Library' onPress={() => navigation.navigate('Library')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
});