import React, { useState, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Switch } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles/styles';
import CustomButton from './styles/CustomButton';
import CogIcon from '../assets/icons/cog.svg';
import Timer from '../assets/icons/timer.svg';
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
        title="Now & Next"
        onPress={() => navigation.navigate('Now/Next')}
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.countdownButton} onPress={() => navigation.navigate('Countdown')}>
          <Text style={styles.ten}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timerButton} onPress={() => navigation.navigate('Timers')}>
          <Timer width={70} height={70} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.trafficButton} onPress={() => navigation.navigate('TrafficLights')}>
            <View style={{ flex: 1, backgroundColor: "#7dbf7d" }} />
            <View style={{ flex: 1, backgroundColor: "#e0a958" }} />
            <View style={{ flex: 1, backgroundColor: "#d96c6c" }} />
        </TouchableOpacity>
      </View>
      
      <CustomButton
        title="Choice Boards"
        onPress={() => navigation.navigate('Choices')}
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
