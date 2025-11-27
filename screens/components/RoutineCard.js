import { Text, TouchableOpacity } from "react-native";
import ActivityCard from "./ActivityCard";

const RoutineCard = ({
  activity,
  index,
  onPress,
  onDelete,
  drag,
  readOnly = false,
  styles,
  resolveActivityImage,
}) => {
  return (
    <ActivityCard
      activity={activity}
      label="Add Activity"
      onPress={() => onPress?.(index)}
      readOnly={readOnly}
      styles={styles}
      resolveActivityImage={resolveActivityImage}
      shrinkBitmapImage={!readOnly}
      cornerContent={
        !readOnly ? (
          <>
            <TouchableOpacity
              onLongPress={drag}
              style={styles.cornerButton}
              hitSlop={5} // padding around button to make easier to press
            >
              <Text style={styles.dragText}>≡</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={styles.cornerButton}
              hitSlop={5}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </>
        ) : null
      }
    />
  );
};

export default RoutineCard;
