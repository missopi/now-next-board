import React from "react";
import { Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "../data/ActivityLibrary";

const LibraryScreen = ({ navigation, route }) => {
  const onSelectActivity = route?.params?.onSelectActivity;

  const handlePress = (activity) => {
    if (onSelectActivity) {
      onSelectActivity(activity);
      navigation.goBack();
    } else {
      console.warn('onSelectActivity not defined');
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ padding: 16 }}
      data={activityLibrary}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)} style={{ alignItems: 'center', margin: 10 }}>
          <Image source={item.image} style={styles.activityImage} />
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default LibraryScreen;