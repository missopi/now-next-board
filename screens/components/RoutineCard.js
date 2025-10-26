import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

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
    <View style={styles.cardShadowWrapper}>
      {/* Clip only when we want full-bleed SVG in read-only */}
      <View
        style={[
          styles.card,
          readOnly && isSvg && styles.cardClip, // overflow hidden for full-bleed
        ]}
      >
        {/* Edit-only controls */}
        {!readOnly && (
          <>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
              <Text style={styles.dragText}>≡</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity
          onPress={() => !readOnly && onPress?.(index)}
          activeOpacity={0.7}
          disabled={readOnly}
          style={[
            styles.cardContent,
            readOnly && isSvg && styles.cardContentFlush, // remove padding for full-bleed svg
          ]}
        >
          {/* Image / SVG */}
          {resolvedImage ? (
            isSvg ? (
              // SVG
              readOnly ? (
                // FULL BLEED (read-only)
                <View style={StyleSheet.absoluteFillObject}>
                  <ImageComponent
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </View>
              ) : (
                // INSET (edit) — same box as photos
                <View style={styles.svgInsetWrapper}>
                  <ImageComponent
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </View>
              )
            ) : (
              // PHOTO — always use the same inset image box
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
    </View>
  );
};

export default RoutineCard;
