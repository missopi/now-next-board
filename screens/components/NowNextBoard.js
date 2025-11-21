// Visual layout for Now/Next boards

import { View, Text, TouchableOpacity, Image, StyleSheet, useWindowDimensions } from "react-native";
import { activityLibrary } from "../../data/ActivityLibrary";
import Now from "../../assets/cards/now.svg";
import Next from "../../assets/cards/next.svg";
import Swap from "../../assets/swap.svg";

const NowNextBoard = ({ nowActivity, nextActivity, onSelectSlot, onSwap, canSwap, readOnly, styles }) => {
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
      <View style={styles.cardShadowWrapper}>
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
                      preserveAspectRatio="none"
                    />
                  </View>
                ) : (
                  <Image
                    source={imageSource}
                    style={styles.image}
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
      </View>
    );
  };

  const { width, height } = useWindowDimensions();
  const isPad = Math.min(width, height) >= 768;
  const isPortrait = height > width;

  const iconScale = isPad ? 1.6 : 1; // 1.6× bigger on iPad (tweak this number)
  const iconWidth = 50 * iconScale;
  const iconHeight = 40 * iconScale;  

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.column}>
          {<View style={styles.iconRow}>
            <Now width={iconWidth} height={iconHeight} />
            <Text style={styles.textTitle}>Now </Text>
          </View>}
          {renderCard(nowActivity, "Now")}
        </View>
        {/* LANDSCAPE: swap icon between cards */}
        {!readOnly && !isPortrait && (
          <TouchableOpacity
            onPress={onSwap}
            disabled={!canSwap}
            style={[styles.swapButton, !canSwap && { opacity: 0.4 }]}
          >
            <Swap
              width={iconWidth * 1.0}
              height={iconHeight * 1.2}
              style={{ transform: [{ rotate: "90deg" }] }}
            />
          </TouchableOpacity>
        )}
        <View style={styles.column}>
          {<View style={styles.iconRow}>
            <Next width={iconWidth} height={iconHeight} />
            <Text style={styles.textTitle}>Next </Text>
            {/* PORTRAIT: swap icon inline with “Next” */}
            {!readOnly && isPortrait && (
              <TouchableOpacity
                onPress={onSwap}
                disabled={!canSwap}
                style={[styles.swapButtonInline, !canSwap && { opacity: 0.4 }]}
              >
                <Swap width={iconWidth * 1} height={iconHeight * 1.2} />
              </TouchableOpacity>
            )}
          </View>}
          {renderCard(nextActivity, "Next")}
        </View>
      </View>
    </View>
  );
};

export default NowNextBoard;
