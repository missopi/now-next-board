import React, { useLayoutEffect, useCallback } from 'react';
import { View, Pressable } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import CogIcon from '../assets/icons/cog.svg';

export default function HomeScreen({ navigation }) {
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
        <Pressable onPress={() => navigation.navigate('HomeSettings')} style={{ maarginRight: 15 }}>
          <CogIcon width={24} height={24} />
        </Pressable>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomButton
        title="Routines"
        onPress={() => navigation.navigate('Routines')}
      />
      <CustomButton
        title="Now/Next"
        onPress={() => navigation.navigate('Now/Next')}
      />
      <CustomButton
        title="Choices"
        onPress={() => navigation.navigate('Choices')}
      />
      <CustomButton
        title="Tools"
        onPress={() => navigation.navigate('Tools')}
      />
      <CustomButton
        title="Activity Library"
        onPress={() => navigation.navigate('LibraryScreen')}
      />
    </View>
  );
}
