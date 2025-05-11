import React, { useState, useEffect } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import styles from "../styles/NowNextBoardStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NowNextSettingsModal = ({ showThen, setShowThen }) => {

  useEffect(() => {
    AsyncStorage.getItem('showThen').then(value => {
      if (value !== null) setShowThen(JSON.parse(value));
    });
  }, []);
    const toggleSwitch = async () => {
    const newValue = !showThen;
    setShowThen(newValue);
    await AsyncStorage.setItem('showThen', JSON.stringify(newValue));
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Settings</Text>
      <TouchableOpacity
        style={styles.modalRow}
        onPress={async () => {
          setShowThen(false);
          await AsyncStorage.setItem('showThen', 'false');
        }}
      >
        <Text style={styles.modalLabel}>Now/Next   </Text>
        <View style={styles.radioCircle}>
          {!showThen && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.modalRow}
        onPress={async () => {
          setShowThen(true);
          await AsyncStorage.setItem('showThen', 'true');
        }}
      >
        <Text style={styles.modalLabel}>Now/Next/Then   </Text>
        <View style={styles.radioCircle}>
          {showThen && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>
      <Text style={styles.modalText}>Adds a third step, the eventual next step, to provide a broader sequence of events.</Text>
    </View>
  );
};

export default NowNextSettingsModal;