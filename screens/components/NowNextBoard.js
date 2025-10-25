// Visual layout for Now/Next boards

import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { activityLibrary } from "../../data/ActivityLibrary";
import Now from "../../assets/cards/now.svg";
import Next from "../../assets/cards/next.svg";

const NowNextBoard = ({ nowActivity, nextActivity, onSelectSlot, readOnly, styles }) => {
  const resolveActivityImage = (activity) => {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  };

  const getImageSource = (image) => {
    if (!image) return null;
    if (typeof image === "function") return image;
    if (typeof image === 'number') return image;
    if (typeof image === 'string') return { uri: image };
    if (image.uri && typeof image.uri === 'string') return { uri: image.uri };
    return null;
  };

  const renderCard = (activity, label) => {
    const isLibraryCard = activity?.fromLibrary; // flag from LibraryScreen
    const resolvedImage = resolveActivityImage(activity);
    const imageSource = getImageSource(resolvedImage);
    const isSvg = typeof imageSource === "function";
    const ImageComponent = isSvg ? imageSource : null;

    return (
      <TouchableOpacity
        disabled={readOnly}
        style={[
          styles.card,
          isLibraryCard && styles.libraryCard,
        ]}
        onPress={() => !readOnly && onSelectSlot({ slot: label })}
      >
        {activity && (
          <>
            {isLibraryCard ? (
              // Full-card library image
              isSvg ? (
                <View style={StyleSheet.absoluteFill}>
                  <ImageComponent
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </View>
              ) : (
                <Image
                  source={imageSource}
                  style={styles.libraryImage}
                />
              )
            ) : (
              // Regular user-created card
              imageSource && (
                <Image
                  source={imageSource}
                  style={styles.image}
                />
              )
            )}

            {/* Only show the text for non-library cards */}
            {!isLibraryCard && activity?.name && (
              <Text style={styles.label}>{activity.name}</Text>
            )}
          </>
        )}
        {!activity && (
          <Text style={styles.placeholder}>Add {label}</Text>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.column}>
          {<View style={styles.iconRow}>
            <Now width={50} height={40} />
            <Text style={styles.textTitle}>Now </Text>
          </View>}
          {renderCard(nowActivity, "Now")}
        </View>
        <View style={styles.column}>
          {<View style={styles.iconRow}>
            <Next width={50} height={40} />
            <Text style={styles.textTitle}>Next </Text>
          </View>}
          {renderCard(nextActivity, "Next")}
        </View>
      </View>
    </View>
  );
};

export default NowNextBoard;
