import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Switch } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import CogIcon from '../assets/icons/cog.svg';
import { useThemeContext } from './styles/theme/ThemeContext';
import { Modalize } from 'react-native-modalize';

export default function HomeScreen({ navigation }) {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const modalRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

      return () => {
        ScreenOrientation.unlockAsync();
      };
    }, [])
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => modalRef.current?.open()}>
          <CogIcon width={24} height={24} style={{ marginRight: 10 }} />
        </TouchableOpacity>
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
        title="Now/Next/Then"
        onPress={() => navigation.navigate('Now/Next')}
      />
      <CustomButton
        title="Choice Boards"
        onPress={() => navigation.navigate('Choices')}
      />
      <CustomButton
        title="Timers"
        onPress={() => navigation.navigate('Tools')}
      />
      <CustomButton
        title="Image Library"
        onPress={() => navigation.navigate('LibraryScreen')}
      />
      <CustomButton
        title="Saved Boards"
        onPress={() => navigation.navigate('AllBoardsScreen')}
      />

      <Modalize
        ref={modalRef}
        modalHeight={250}
        handlePosition="inside"
        handleStyle={styles.handle}
        modalStyle={styles.modal}
      >
        <View style={{ height: 15 }} />

        <View style={styles.modalView}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
          />
        </View>
      </Modalize>
    </View>
  );
}
