// Flatlist of all available activity cards for users to choose from

import React from "react";
import { Text, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "../data/ActivityLibrary";
import { triggerActivityCallback } from "./components/CallbackStore";

const LibraryScreen = ({ navigation, route }) => {  
  const slot = route?.params?.slot;
  if (!slot) {
    console.warn("No slot provided to LibraryScreen");
  }
  
  const handlePress = (activity) => {
    if (!slot) return; // avoid breaking things

    triggerActivityCallback(slot, activity);
    navigation.goBack();
  };

  return ( // wrapped in safeview to respect notches/status bar
    <SafeAreaView style={{ flex: 1, backgroundColor: '#abaf' }}> 
      <FlatList
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 16 }}
        showsVerticalScrollIndicator={false} // remove line on right when scrolling
        data={activityLibrary}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => handlePress(item)} 
            style={{ alignItems: 'center', margin: 7 }}
          >
            <Image source={item.image} style={styles.activityImage} />
            <Text style={styles.activityName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default LibraryScreen;