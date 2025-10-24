// Visual layout for activity cards on Today screen

import { View, Text, TouchableOpacity, Image } from "react-native";

const RoutineCard = ({ activity, index, onPress, onDelete, drag, readOnly = false, styles }) => {
  return (
    <View style={styles.card}>
      <View style={{ borderRadius: 12, backgroundColor: '#fff' }}>
        {!readOnly && (
          <View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDelete}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
              <Text style={styles.dragText}>≡</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => onPress(index)}
          style={styles.cardContent}
          activeOpacity={0.7}
        >
          {activity?.image?.uri ? (
            <Image source={{ uri: activity.image.uri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>Add Activity</Text>
            </View>
          )}
          <Text style={styles.title}>{activity?.name || ''}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default RoutineCard;
