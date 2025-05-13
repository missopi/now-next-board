// Flatlist of all available activity cards for users to choose from

import React from "react";
import { Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "../data/ActivityLibrary";
import { SafeAreaView } from "react-native-safe-area-context";

const LibraryScreen = ({ navigation, route }) => {   
  const onSelectActivity = route?.params?.onSelectActivity; // for board screen - selecting activity triggers callback and returns to board

  const handlePress = (activity) => {
    if (onSelectActivity) {
      onSelectActivity(activity);
      navigation.goBack();
    } else {
      console.warn('onSelectActivity not defined');
    }
  };

  return ( // wrapped in safeview to respect notches/status bar
    <SafeAreaView style={{ flex: 1, backgroundColor: '#abaf' }}> 
      <FlatList
        contentContainerStyle={{ alignItems: 'center', paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
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