import React from "react";
import { View, Text, Button } from "react-native";
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';

export default function ChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="I Feel..."
        onPress={() => navigation.navigate('Feelings Board')}
      />
      <CustomButton
        title="I Wan't..."
        onPress={() => navigation.navigate('Want Board')}
      />
      <CustomButton
        title="I Need..."
        onPress={() => navigation.navigate('Need Board')}
      />
      <CustomButton
        title="Activity Library"
        onPress={() => navigation.navigate('Library')}
      />
    </View>
  );
}
