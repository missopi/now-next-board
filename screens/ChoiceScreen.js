import { useCallback } from "react";
import { View } from 'react-native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

export default function ChoiceScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <CustomButton
        title="Answer Card"
        onPress={() => navigation.navigate('AnswerCard')}
      />
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
    </View>
  );
}
