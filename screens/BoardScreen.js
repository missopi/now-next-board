// Main board screen containing the Now/Next/Then board

import React, { useState } from "react";  
import { View, Text, TouchableOpacity, Modal } from "react-native";
import NowNextBoard from "./components/NowNextBoard";
import CogIcon from "../assets/icons/cog.svg";
import NowNextSettingsModal from "./settings/NowNextBoardSettings";
import styles from "./styles/NowNextBoardStyles";

const NowNextBoardScreen = ({ navigation }) => {   // useState used to track selected activities
  const [nowActivity, setNowActivity] = useState(null);
  const [nextActivity, setNextActivity] = useState(null);
  const [thenActivity, setThenActivity] = useState(null);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [showThen, setShowThen] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <CogIcon width={24} height={24} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleSelect = (slot) => {  // navigates to library screen with a call back to receive activity cards
    navigation.navigate('LibraryScreen', {
      onSelectActivity: (activity) => {
        console.log('Selected Activity:', activity);
        if (slot === 'Now') setNowActivity(activity);
        else if (slot === 'Next') setNextActivity(activity);
        else setThenActivity(activity);
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <NowNextBoard 
        nowActivity={nowActivity}
        nextActivity={nextActivity} 
        thenActivity={thenActivity} 
        onSelect={handleSelect} 
        showThen={showThen} 
      />
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
          <NowNextSettingsModal
            showThen={showThen}
            setShowThen={setShowThen}
          />
        </View>
        </Modal>
    </View>
  );
};

export default NowNextBoardScreen;
