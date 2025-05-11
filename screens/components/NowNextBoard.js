// Visual layout for Now/Next boards

import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import styles from "../styles/NowNextBoardStyles";

const NowNextBoard = ({ nowActivity, nextActivity, thenActivity, onSelect, showThen }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderCard = (activity, label) => {
    return (
      <TouchableOpacity // USed for selecting each card
        style={[
          styles.card, 
          { 
            width: isLandscape ? height * 0.6 : width * 0.7,  // orientation aware layout using useWindowDimentions
            height: isLandscape ? height * 0.65 : height * 0.24, 
          },
        ]} 
        onPress={() => onSelect(label)}
      >
        {activity ? (
          <>
            <Image source={activity.image} style={styles.image} />
            <Text style={styles.label}>{activity.name}</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>Set {label}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isLandscape ? styles.landscape : styles.portrait]}>
        <View style={styles.column}>
          <Text style={styles.header}>Now</Text>
          {renderCard(nowActivity, 'Now')}
        </View>
        <View style={styles.column}>
          <Text style={styles.header}>Next</Text>
          {renderCard(nextActivity, 'Next')}
        </View>
        {showThen && ( // showthen determines if 'then' card is displayed on screen
          <View style={styles.column}>
            <Text style={styles.header}>Then</Text>
            {renderCard(thenActivity, 'Then')}
          </View>
        )}
      </View>
    </View>
  );
};

export default NowNextBoard;