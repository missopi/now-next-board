// Visual layout for Now/Next boards

import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import styles from "../styles/NowNextBoardStyles";
import Circle from "../../assets/icons/circle.svg";
import CircleTick from "../../assets/icons/hollowCircleTick.svg";

const NowNextBoard = ({ nowActivity, nextActivity, thenActivity, onSelectSlot, showThen }) => {
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
            width: isLandscape ? width * 0.29 : width * 0.63,  // orientation aware layout using useWindowDimentions
            height: isLandscape ? height * 0.65 : height * 0.21, 
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
          <Text style={styles.placeholder}>Set {label}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isLandscape ? styles.landscape : styles.portrait]}>
        <View style={styles.column}>
          <View style={styles.iconRow}>
            <CircleTick style={styles.tick} />
            <Circle style={styles.circle} />
            <Circle />
          </View>
          {renderCard(nowActivity, 'Now')}
        </View>
        <View style={styles.column}>
          <View style={styles.iconRow}>
            <Circle />
            <CircleTick style={styles.tick} />
            <Circle />
          </View>
          {renderCard(nextActivity, 'Next')}
        </View>
        {showThen && ( // showthen determines if 'then' card is displayed on screen
          <View style={styles.column}>
            <View style={styles.iconRow}>
              <Circle />
              <Circle />
              <CircleTick style={styles.tick} />
            </View>
            {renderCard(thenActivity, 'Then')}
          </View>
        )}
      </View>
    </View>
  );
};

export default NowNextBoard;