import { View, Text, TouchableOpacity, Image } from "react-native";

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
  const resolvedImage = resolveActivityImage
    ? resolveActivityImage(activity)
    : activity?.image || null;

  const isSvg = typeof resolvedImage === "function";
  const ImageComponent = isSvg ? resolvedImage : null;

  return (
    <View style={styles.card}>
      {!readOnly && (
        <View style={{ flexShrink: 1, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
          <TouchableOpacity onLongPress={drag}>
            <Text style={styles.dragText}>≡</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => !readOnly && onPress?.(index)}
        activeOpacity={0.7}
        disabled={readOnly}
        style={styles.cardContent}
      >
        {resolvedImage ? (
          isSvg ? (
            <ImageComponent width="100%" height="100%" />
          ) : (
            <Image
              source={
                activity?.image?.uri
                  ? { uri: activity.image.uri }
                  : resolvedImage
              }
              style={styles.image}
              resizeMode="cover"
            />
          )
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Add Activity</Text>
          </View>
        )}

        {/* Only show title if not from library */}
        {!activity?.fromLibrary && activity?.name && (
          <Text style={styles.title}>{activity.name}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RoutineCard;
