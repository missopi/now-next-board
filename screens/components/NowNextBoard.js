// Visual layout for Now/Next boards

import { View, Text, TouchableOpacity, Image, useWindowDimensions, Pressable } from "react-native";
import styles from "../styles/NowNextBoardStyles";

const NowNextBoard = ({ nowActivity, nextActivity, thenActivity, onSelectLibrary, onSelectCreate, showThen }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderCard = (activity, label) => {
    console.log(`Rendering activity for ${label}:`, activity);

    const getImageSource = (image) => {
      if (!image) return null;
      if (typeof image === 'number') return image;
      if (typeof image === 'string') return { uri: image };
      if (image.uri && typeof image.uri === 'string') return { uri: image.uri };
      return null;
    };
    
    return (
      <TouchableOpacity // Used for selecting each card
        style={[
          styles.card, 
          { 
            width: isLandscape ? width * 0.29 : width * 0.68,  // orientation aware layout using useWindowDimentions
            height: isLandscape ? height * 0.65 : height * 0.24, 
          },
        ]} 
        onPress={() => onSelect({ slot: label })}
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
          <>
            <View style={styles.buttonColumn}>
              <Pressable onPress={() => onSelectLibrary(label)} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Choose from Library</Text>
              </Pressable>
              <Pressable onPress={() => onSelectCreate(label)} style={styles.smallButton}>
                <Text style={styles.smallButtonText}>Create New Card</Text>
              </Pressable>
            </View>
          </>
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