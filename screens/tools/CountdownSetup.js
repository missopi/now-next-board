import React, { useState } from "react";
import { View, Text, Button, Pressable, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "../styles/styles";
import { activityLibrary } from "../ActivityLibrary";

const CountdownSetup = ({ navigation }) => {
  const [count, setCount] = useState(10);
  const [selectedActivity] = useState(null);
  const handleActivitySelect = (activity, countStart) => {
    navigation.navigate('Countdown', { activity, countStart});
  };

  const handleChange = (text) => {
    if (/^\d+$/.test(text) || text === '') {  // Allow only digits or empty input
      setCount(text === '' ? '' : Number(text));
    }
  }; 

  return (
    <View style={styles.countdownSetupContainer}>
      <Text style={styles.label}>Countdown From:</Text>
      <TextInput
        style={styles.input}
        value={count.toString()}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder="Enter countdown value"
      />

      <Text style={styles.label}>Choose Activity:</Text>
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
};

export default CountdownSetup;
