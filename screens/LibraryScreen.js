// Flatlist of all available activity cards for users to choose from

import { useEffect } from "react";
import { Text, FlatList, TouchableOpacity, Image, SafeAreaView } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "../data/ActivityLibrary";
import { setActivityCallback, triggerActivityCallback } from "./components/CallbackStore";

const LibraryScreen = ({ navigation, route }) => {  
  const slot = route?.params?.slot;

  useEffect(() => {
    if (!slot) {
      console.warn("No slot provided to LibraryScreen");
      return;
    }

    console.log('Library screen received slot:', slot);

    // set activity callback so BoardScreen can handle selection
    setActivityCallback((activity) => {
      console.log('triggering activity with:', activity)

    });
  }, [slot]);

  const handlePress = (activity) => {
   
    if (!slot) return; // avoid breaking things

    console.log('library picked activity:', activity);
    
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