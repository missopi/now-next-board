// Visual layout for emotion selection

import { Text, TouchableOpacity, useWindowDimensions, SafeAreaView, FlatList } from "react-native";
import styles from "../styles/EmotionStyles";
import { useState } from "react";

// SVG imports
import Amused from "../../assets/emotions/amused.svg";
import Angry from "../../assets/emotions/angry.svg";
import Confused from "../../assets/emotions/confused.svg";
import Happy from "../../assets/emotions/happy.svg";
import Sad from "../../assets/emotions/sad.svg";
import Hurt from "../../assets/emotions/hurt.svg";
import Silly from "../../assets/emotions/silly.svg";
import Sick from "../../assets/emotions/sick.svg";
import Tired from "../../assets/emotions/tired.svg";
import Upset from "../../assets/emotions/upset.svg";
import Shocked from "../../assets/emotions/shocked.svg";
import Scared from "../../assets/emotions/scared.svg";
import Hot from "../../assets/emotions/hot.svg";
import Cold from "../../assets/emotions/cold.svg";
import Embarressed from "../../assets/emotions/embarressed.svg";
import Worried from "../../assets/emotions/worried.svg";
import Cheeky from "../../assets/emotions/cheeky.svg";
import Annoyed from "../../assets/emotions/annoyed.svg";

// List of emotion icons and labels
const emotions = [
  {id: '1', Icon: Happy, label: 'happy'},
  {id: '2', Icon: Sad, label: 'sad'},
  {id: '3', Icon: Angry, label: 'angry'},
  {id: '4', Icon: Hurt, label: 'hurt'},
  {id: '5', Icon: Silly, label: 'silly'},
  {id: '6', Icon: Sick, label: 'sick'},
  {id: '7', Icon: Tired, label: 'tired'},
  {id: '8', Icon: Upset, label: 'upset'},
  {id: '9', Icon: Amused, label: 'amused'},
  {id: '10', Icon: Shocked, label: 'shocked'},
  {id: '11', Icon: Scared, label: 'scared'},
  {id: '12', Icon: Hot, label: 'hot'},
  {id: '13', Icon: Cold, label: 'cold'},
  {id: '14', Icon: Embarressed, label: 'embarressed'},
  {id: '15', Icon: Confused, label: 'confused'},
  {id: '16', Icon: Worried, label: 'worried'},
  {id: '17', Icon: Cheeky, label: 'cheeky'},
  {id: '18', Icon: Annoyed, label: 'annoyed'},
];

const EmotionBoard = () => {
  const { height } = useWindowDimensions();

  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const toggleEmotion = (label) => {
    setSelectedEmotions((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const renderEmotion = ({ Icon, label }) => {  
    const isSelected = selectedEmotions.includes(label);

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
        onPress={() => toggleEmotion(label)}
      >
        <Icon width={60} height={60} />
        {console.log('emotion label:', label)}
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  };
  console.log('Emotions:', emotions);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={emotions}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => renderEmotion(item)}
        contentContainerStyle={[styles.portrait]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default EmotionBoard;