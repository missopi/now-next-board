import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import styles from "../styles/nowNextStyles";

const NowNextBoard = ({ nowActivity, nextActivity, thenActivity, onSelect, showThen }) => {
  const { width, height } = useWindowDimensions();
  console.log('width', width, 'height', height);
  const isLandscape = width > height;

  const renderCard = (activity, label) => {
    return (
      <TouchableOpacity 
        style={[
          styles.card, 
          { 
            width: isLandscape ? height * 0.4 : width * 0.7, 
            height: isLandscape ? height * 0.7 : height * 0.23, 
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
        {showThen && (
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