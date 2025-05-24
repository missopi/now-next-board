// Visual layout for emotion selection

import { View, Text, TouchableOpacity, useWindowDimensions, SafeAreaView, FlatList } from "react-native";
import styles from "../styles/EmotionStyles";
import { useState } from "react";
import emojiSet from "./emotionSets/EmojiMap";

const EmotionBoard = ({ onCreateBoard }) => {
  const { height } = useWindowDimensions();

  const emojis = emojiSet;
  console.log('emojiSet emojis:', emojis);

  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const toggleEmotion = (label) => {
    setSelectedEmotions((prev) => {
      const isSelected = prev.includes(label);

      if (isSelected) {
        return prev.filter((l) => l !== label);
      }

      // limits to 8 selected
      if (prev.length >= 8) {
        return prev; // do nothing if limit reached
      }

      return [...prev, label];
    });
  };

  const renderEmotion = ({ item }) => {
    if (!item || !item.label || !item.Icon) return null;

    const isSelected = selectedEmotions.includes(item.label);
    const Icon = item.Icon;

    return (
      <TouchableOpacity // to select each emotion
        style={[
          styles.card,
          {
            borderWidth: 4,
            borderRadius: 15,
            borderColor: isSelected ? 'green' : '#999',
            backgroundColor: isSelected ? '#cdffcd' : 'white',
            width: height * 0.13,
            height: height * 0.14,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          },
        ]} 
        onPress={() => toggleEmotion(item.label)}
      >
        <Icon width={60} height={60} />
        {console.log('emotion label:', item.label)}
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>Feelings Board</Text>
        <Text style={{ paddingBottom: 10 }}>Select which emotions you want to include on your "I feel..." board.</Text>

        <TouchableOpacity
         onPress={() => onCreateBoard(emojis.filter((e) => selectedEmotions.includes(e.label)))}
         disabled={selectedEmotions.length === 0}
         style={[
          styles.createBoardButton,
          { borderColor: selectedEmotions.length === 0 ? '#999' : '#007bff' },
         ]}
        >
          <Text 
            style={[
              styles.createBoardButtonText,
              { color: selectedEmotions.length === 0 ? '#999' : '#007bff' },
            ]}
          >Create Board</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={emojis}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderEmotion}
        contentContainerStyle={[styles.portrait]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default EmotionBoard;