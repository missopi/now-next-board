import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/nowNextStyles";

const NowNextBoard = ({ nowActivity, nextActivity, thenActivity, onSelect, showThen }) => {
  const renderCard = (activity, label) => (
    <TouchableOpacity style={styles.card} onPress={() => onSelect(label)}>
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
      <View style={styles.column}>
        <Text style={styles.header}>Now</Text>
        {renderCard(nowActivity, 'Now')}
      </View>
      <View style={styles.column}>
        <Text style={styles.header}>Next</Text>
        {renderCard(nextActivity, 'Next')}
      </View>
      <View style={styles.column}>
        <Text style={styles.header}>Next</Text>
        {renderCard(thenActivity, 'Then')}
      </View>
    </View>
  );
};

export default NowNextBoard;