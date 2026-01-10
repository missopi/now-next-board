import { Text, TouchableOpacity } from "react-native";
import ActivityCard from "./ActivityCard";

const RoutineCard = ({
  activity,
  index,
  onPress,
  onLongPress,
  onDelete,
  drag,
  readOnly = false,
  styles,
  resolveActivityImage,
}) => {
  const hasImage = activity && (resolveActivityImage ? !!resolveActivityImage(activity) : !!activity?.image);
  const hasName = !!activity?.name;
  const isEmpty = !activity || (!hasImage && !hasName);
  const cardActivity = isEmpty ? null : activity;

  return (
    <ActivityCard
      activity={cardActivity}
      label="Add Routine Card"
      onPress={() => onPress?.(index)}
      onLongPress={onLongPress ? () => onLongPress(cardActivity, index) : undefined}
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
