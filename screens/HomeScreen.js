import React from 'react';
import { View, Text, Pressable, Button } from 'react-native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="Today"
        icon="today"
        color="#f0ad4e"
        onPress={() => navigation.navigate('Today')}
      />
      <CustomButton
        title="Now/Next Board"
        onPress={() => navigation.navigate('Now/Next Board')}
      />
      <CustomButton
        title="Choice Boards"
        onPress={() => navigation.navigate('Choice Boards')}
      />
      <CustomButton
        title="Tools"
        icon="construction"
        color="#f0ad4e"
        onPress={() => navigation.navigate('Tools')}
      />
      <CustomButton
        title="Settings"
        icon="settings"
        color="#f0ad4e"
        onPress={() => navigation.navigate('Settings')}
      />
      <CustomButton
        title="Activity Library"
        onPress={() => navigation.navigate('Library')}
      />
    </View>
  );
}
