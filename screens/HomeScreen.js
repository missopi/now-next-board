import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import CogIcon from '../assets/icons/cog.svg';

export default function HomeScreen({ navigation }) {
  const [settingsVisible, setSettingsVisible] = useState(false);

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
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
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
      <Modal  // setting for toggling on 'then' activity at bottom of screen
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
