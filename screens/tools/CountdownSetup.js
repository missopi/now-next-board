import React, { useState } from "react";
import { View, Text, Button, Pressable, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "../styles/styles";

const CountdownSetup = ({ onStart }) => {
  const [count, setCount] = useState(10);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activityLibrary = [
    { id: 1, name: 'Hair Cut', image: require('../images/hair_cut.jpg') },
    { id: 2, name: 'Cut Nails', image: require('../images/cut_nails.jpg') },
    { id: 3, name: 'Wash Hands', image: require('../images/wash_hands.jpg') },
  ];

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
        vertical
        data={activityLibrary}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.activityCard,
              selectedActivity?.id === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedActivity(item)}
          >
            <Image source={item.image} style={styles.activityImage} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Start Countdown"
        onPress={() => onStart((count), selectedActivity)}
        disabled={!Number.isInteger(count) || count <= 0 || !selectedActivity}
      />
    </View>
  );
};

export default CountdownSetup;
