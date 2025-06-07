// Visual layout for activity cards on Today screen

import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/RoutineStyles";

const RoutineCard = ({ activity, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {activity?.image?.uri ? (
        <Image source={{ uri: activity.image.uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Tap to add</Text>
        </View>
      )}
      <Text style={styles.title}>{activity?.name || 'Untitled'}</Text>
    </TouchableOpacity>
  );
};

export default RoutineCard;
