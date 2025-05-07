import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import styles from "../styles/nowNextStyles";

const NowNextBoard = ({ nowActivity, nextActivity, thenActivity, onSelect, showThen }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderCard = (activity, label) => (
    <TouchableOpacity 
      style={[
        styles.card, { width: isLandscape ? height * 0.25 : width * 0.7, height: isLandscape ? height * 0.5 : height * 0.25 },
      ]} 
      onPress={() => onSelect && onSelect(label)}
    >
      {activity ? (
        <>
          <Image source={activity.image} style={styles.image} />
          <Text style={styles.label}>{activity.name || 'No label'}</Text>
        </>
      ) : (
        <Text style={styles.placeholder}>Set {label}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Text style={styles.header}>Now</Text>
        {renderCard(nowActivity, 'Now')}
      </View>
      <View style={styles.cardContainer}>
        <Text style={styles.header}>Next</Text>
        {renderCard(nextActivity, 'Next')}
      </View>
      {showThen && (
        <View style={styles.cardContainer}>
          <Text style={styles.header}>Then</Text>
          {renderCard(thenActivity, 'Then')}
        </View>
      )}
    </View>
  );
};

export default NowNextBoard;