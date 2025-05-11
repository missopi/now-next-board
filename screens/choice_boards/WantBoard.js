import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Modal } from "react-native";
import styles from '../styles/ChoiceBoardStyles';
import CogIcon from "../../assets/icons/cog.svg";
import Footer from "../components/Footer";

const WantBoard = ({ navigation }) => {
  const [settingsVisible, setSettingsVisible] = useState(false);

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
    <View style={{ flex: 1 }}>
      <Text>Want Board</Text>
      <Modal  // setting for toggling on 'then' activity at bottom of screen
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
        >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default WantBoard;