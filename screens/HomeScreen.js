import React from 'react';
import { View, Button } from 'react-native';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title='Today' onPress={() => navigation.navigate('Today')} />
      <Button title='Now/Next Boards' onPress={() => navigation.navigate('Now/Next Board')} />
      <Button title='Choice Boards' onPress={() => navigation.navigate('Choice Boards')} />
      <Button title='Tools' onPress={() => navigation.navigate('Tools')} />
      <Button title='Settings' onPress={() => navigation.navigate('Settings')} />
      <Button title='Activity Library' onPress={() => navigation.navigate('Library')} />
    </View>
  );
}
