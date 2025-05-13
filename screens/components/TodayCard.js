// Visual layout for activity cards on Today screen

import React from "react";
import { View, Text, TouchableOpacity, Image, useWindowDimensions, FlatList } from "react-native";
import styles from "../styles/TodayStyles";

const TodayCard = ({ firstActivity, secondActivity, thirdActivity, fourthActivity, fifthActivity, onSelect }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const activities = [
    {id: '1', data: firstActivity, label: 'First Activity' },
    {id: '2', data: secondActivity, label: 'Second Activity' },
    {id: '3', data: thirdActivity, label: 'Third Activity' },
    {id: '4', data: fourthActivity, label: 'Fourth Activity' },
    {id: '5', data: fifthActivity, label: 'Fifth Activity' },
  ];

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
      {isLandscape ? (
        <View style={[styles.wrapper, styles.landscape]}>
        {/* columns for landscape layout*/}
          <View style={styles.column}>{renderCard(firstActivity, 'First Activity')}</View>
          <View style={styles.column}>{renderCard(secondActivity, 'Second Activity')}</View>
          <View style={styles.column}>{renderCard(thirdActivity, 'Third Activity')}</View>
          <View style={styles.column}>{renderCard(fourthActivity, 'Fourth Activity')}</View>
          <View style={styles.column}>{renderCard(fifthActivity, 'Fifth Activity')}</View>
        </View>
      ) : (
        <FlatList 
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.column}>
              {renderCard(item.data, item.label)}
            </View>
          )}
          contentContainerStyle={[styles.wrapper, styles.portrait]}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TodayCard;
