// Visual layout for Now/Next boards

import { View, Text, TouchableOpacity, Image, useWindowDimensions } from "react-native";
import styles from "../styles/NowNextBoardStyles";
import Now from "../../assets/cards/now.svg";
import Next from "../../assets/cards/next.svg";

const NowNextBoard = ({ nowActivity, nextActivity, onSelectSlot }) => {
  const { width, height } = useWindowDimensions();

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
            width: width * 0.80,
            height: height * 0.33, 
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
      <View style={styles.wrapper}>
        <View style={styles.column}>
          {<View style={styles.iconRow}>
            <Now width={60} height={50} />
            <Text style={styles.textTitle}>Now </Text>
          </View>}
          {renderCard(nowActivity, 'Now')}
        </View>
        <View style={styles.column}>
          {<View style={styles.iconRow}>
            <Next width={60} height={50} />
            <Text style={styles.textTitle}>Next </Text>
          </View>}
          {renderCard(nextActivity, 'Next')}
        </View>
      </View>
    </View>
  );
};

export default NowNextBoard;