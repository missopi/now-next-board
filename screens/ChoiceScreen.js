import React from "react";
import { View } from "react-native";
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import Footer from "./components/Footer";

export default function ChoiceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <CustomButton
        title="I Feel..."
        onPress={() => navigation.navigate('FeelingsBoard')}
      />
      <CustomButton
        title="I Wan't..."
        onPress={() => navigation.navigate('WantBoard')}
      />
      <CustomButton
        title="I Need..."
        onPress={() => navigation.navigate('NeedsBoard')}
      />
      <Footer />
    </View>
  );
}
