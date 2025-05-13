// Visual layout for activity cards on Today screen

import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import styles from "../styles/TodayStyles";

const TodayCard = ({ firstActivity, secondActivity, thirdActivity, fourthActivity, fifthActivity, onSelect }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderCard = (activity, label) => {
    return (
      <TouchableOpacity // USed for selecting each card
        style={[
          styles.card, 
          { 
            width: isLandscape ? height * 0.36 : width * 0.7,  // orientation aware layout using useWindowDimentions
            height: isLandscape ? height * 0.35 : height * 0.24, 
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
          <Text style={styles.placeholder}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isLandscape ? styles.landscape : styles.portrait]}>
        <View style={styles.column}>
            {renderCard(firstActivity, 'First Activity')}
        </View>
        <View style={styles.column}>
            {renderCard(secondActivity, 'Second Activity')}
        </View>
        <View style={styles.column}>
            {renderCard(thirdActivity, 'Third Activity')}
        </View>
        <View style={styles.column}>
            {renderCard(fourthActivity, 'Fourth Activity')}
        </View>
        <View style={styles.column}>
            {renderCard(fifthActivity, 'Fifth Activity')}
        </View>
      </View>
    </View>
  );
};

export default TodayCard;
