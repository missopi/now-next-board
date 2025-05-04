import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "./ActivityLibrary";

export default function LibraryScreen() {
  return (
    <View style={styles.libraryContainer}>
      <Text></Text>
      <FlatList
        data={activityLibrary}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleActivitySelect(item, 10)}>
            <View style={{ alignItems: 'center', margin: 10 }}>
              <Image source={item.image} style={styles.activityImage} />
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

