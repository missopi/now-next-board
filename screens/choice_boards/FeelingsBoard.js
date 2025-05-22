import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, SafeAreaView } from "react-native";
import styles from '../styles/ChoiceBoardStyles';
import CogIcon from "../../assets/icons/cog.svg";
import Emotions from "../components/Emotions";

const FeelingsBoard = ({ navigation }) => {
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>Feelings Board</Text>
        <Text>Pick which emotions you want to include on your board.</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Emotions />
      </View>
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
    </SafeAreaView>
  );
};

export default FeelingsBoard;