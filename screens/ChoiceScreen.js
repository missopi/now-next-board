import React, {useLayoutEffect, useCallback} from "react";
import { View, Pressable } from 'react-native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import CogIcon from '../assets/icons/cog.svg';

export default function ChoiceScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  
      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('HomeSettings')} style={{ marginRight: 15 }}>
            <CogIcon width={24} height={24} />
          </Pressable>
        ),
      });
  }, [navigation]);

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
    </View>
  );
}
