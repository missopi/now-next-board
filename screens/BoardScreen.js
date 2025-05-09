// Main board screen containing the Now/Next/Then board

import React, { useState } from "react";  
import { View, Text } from "react-native";
import NowNextBoard from "./components/NowNextBoard"

const NowNextBoardScreen = ({ navigation }) => {   // useState used to track selected activities
  const [nowActivity, setNowActivity] = useState(null);
  const [nextActivity, setNextActivity] = useState(null);
  const [thenActivity, setThenActivity] = useState(null);

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
        showThen={true} 
      />
    </View>
  );
};

export default NowNextBoardScreen;
