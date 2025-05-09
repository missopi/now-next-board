import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import styles from "../styles/NowNextBoardStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NowNextSettingsModal = ({ onClose }) => {

  console.log('Now/next settings loaded'); // test

  const [showThen, setShowThen] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('showThen').then(value => {
      if (value !== null) setShowThen(JSON.parse(value));
    });
  }, []);
    const toggleSwitch = async () => {
    const newValue = !showThen;
    setShowThen(newValue);
    await AsyncStorage.setItem('showThen', JSON.stringify(newValue));
    return newValue;
  };

  return (
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Settings</Text>
      <View style={styles.modalRow}>
        <Text style={styles.modalLabel}>Now/Next/Then</Text>
        <Switch value={showThen} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
};

export default NowNextSettingsModal;