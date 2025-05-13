import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import CogIcon from "../assets/icons/cog.svg";
import TodayCard from "./components/TodayCard";
import styles from "./styles/TodayStyles";

const TodayScreen = ({ navigation }) => {
  const [firstActivity, setFirstActivity] = useState(null);
  const [secondActivity, setSecondActivity] = useState(null);
  const [thirdActivity, setThirdActivity] = useState(null);
  const [fourthActivity, setFourthActivity] = useState(null);
  const [fifthActivity, setFifthActivity] = useState(null);
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

  const handleSelect = (slot) => {  // navigates to library screen with a call back to receive activity cards
    navigation.navigate('LibraryScreen', {
      onSelectActivity: (activity) => {

        const slotMap = {
          'First Activity' : setFirstActivity,
          'Second Activity' : setSecondActivity,
          'Third Activity' : setThirdActivity,
          'Fourth Activity' : setFourthActivity,
          'Fifth Activity' : setFifthActivity,
        };

        (slotMap[slot] || setFifthActivity)(activity);
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <TodayCard 
        firstActivity={firstActivity}
        secondActivity={secondActivity} 
        thirdActivity={thirdActivity} 
        fourthActivity={fourthActivity}
        fifthActivity={fifthActivity}
        onSelect={handleSelect} 
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
        </View>
      </Modal>
    </View>
  );

}

export default TodayScreen;


