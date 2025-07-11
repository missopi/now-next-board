// Visual layout for activity cards on Today screen

import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/RoutineStyles";

const RoutineCard = ({ activity, index, onPress, onDelete, strokeColor, drag }) => {
  return (
    <View style={[styles.card, { borderColor: strokeColor }]}>
      <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 8, padding: 12, backgroundColor: 'white' }}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onDelete}
        >
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>

        {/* Drag handle */}
        <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
          <Text style={styles.dragText}>≡</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress(index)}
          style={styles.cardContent}
          activeOpacity={0.7}
        >
          {activity?.image?.uri ? (
            <Image source={{ uri: activity.image.uri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Tap to add</Text>
            </View>
          )}
          <Text style={styles.title}>{activity?.name || 'Untitled'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default RoutineCard;
