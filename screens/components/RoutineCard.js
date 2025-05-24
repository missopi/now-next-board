// Visual layout for activity cards on Today screen

import { View, Text, TouchableOpacity, Image, useWindowDimensions, FlatList, SafeAreaView } from "react-native";
import styles from "../styles/RoutineStyles";

const RoutineCard = ({ firstActivity, secondActivity, thirdActivity, fourthActivity, fifthActivity, onSelectSlot, showFourth, showFifth }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const activities = [
    {id: '1', data: firstActivity, label: 'First Activity' },
    {id: '2', data: secondActivity, label: 'Second Activity' },
    {id: '3', data: thirdActivity, label: 'Third Activity' },
    ...(showFourth ? [{id: '4', data: fourthActivity, label: 'Fourth Activity' }] : []),
    ...(showFifth ? [{id: '5', data: fifthActivity, label: 'Fifth Activity' }] : []),
  ];

  const getImageSource = (image) => {
    if (!image) return null;
    if (typeof image === 'number') return image;
    if (typeof image === 'string') return { uri: image };
    if (image.uri && typeof image.uri === 'string') return { uri: image.uri };
    return null;
  };

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
        onPress={() => onSelectSlot({ slot: label })}
      >
        {activity ? (
          <>
            <Image 
              source={getImageSource(activity.image)}
              style={styles.image}
              resizeMode="cover"
            />
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
          {showFourth && (
            <View style={styles.column}>{renderCard(fourthActivity, 'Fourth Activity')}</View>
          )}
          {showFifth && (
            <View style={styles.column}>{renderCard(fifthActivity, 'Fifth Activity')}</View>
          )}
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}> 
          <FlatList 
            data={activities}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.column}>
                {renderCard(item.data, item.label)}
              </View>
            )}
            contentContainerStyle={[ styles.portrait]}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </View>
  );
};

export default RoutineCard;
