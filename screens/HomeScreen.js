import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={StyleSheet.container}>
      <Button title='Today' onPress={() => navigation.navigate('Today')} />
      <Button title='Now/Next Boards' onPress={() => navigation.navigate('Now/Next Board')} />
      <Button title='Choice Boards' onPress={() => navigation.navigate('Choice Boards')} />
      <Button title='Tools' onPress={() => navigation.navigate('Tools')} />
      <Button title='Settings' onPress={() => navigation.navigate('Settings')} />
      <Button title='Activity Library' onPress={() => navigation.navigate('Library')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 20 },
});