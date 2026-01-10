// Visual layout for Now/Next boards

import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { activityLibrary } from "../../data/ActivityLibrary";
import Now from "../../assets/cards/now.svg";
import Next from "../../assets/cards/next.svg";
import Swap from "../../assets/swap.svg";
import ActivityCard from "./ActivityCard";

const NowNextBoard = ({
  nowActivity,
  nextActivity,
  onSelectSlot,
  onSwap,
  canSwap,
  readOnly,
  styles,
  onLongPressActivity,
}) => {
  const resolveActivityImage = (activity) => {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  };

  const { width, height } = useWindowDimensions();
  const shorter = Math.min(width, height);
  const isPortrait = height > width;

  // Scale icons smoothly based on the current viewport size 
  const iconScale = Math.min(Math.max(shorter / 430, 1), 1.6);
  const iconWidth = 50 * iconScale;
  const iconHeight = 40 * iconScale;  
  const handleLongPress = (activity) => {
    if (readOnly || !onLongPressActivity || !activity || activity.fromLibrary) return;
    onLongPressActivity(activity);
  };

  return (
    <View style={styles.container}> 
      <View style={styles.wrapper}> 
        <View style={styles.column}> 
          <View style={styles.iconRow}> 
            <Now width={iconWidth} height={iconHeight} /> 
            <Text style={styles.textTitle}>Now </Text> 
          </View>
          <ActivityCard
            activity={nowActivity}
            label="Add Now"
            onPress={() => onSelectSlot({ slot: "Now" })}
            onLongPress={() => handleLongPress(nowActivity)}
            readOnly={readOnly}
            styles={styles}
            resolveActivityImage={resolveActivityImage}
          />
        </View> 
        {!readOnly && !isPortrait && ( 
          <TouchableOpacity 
            onPress={onSwap} 
            disabled={!canSwap} 
            style={[styles.swapButton, 
            !canSwap && { opacity: 0.4 }]} 
          > 
            <Swap width={iconWidth * 1.0} height={iconHeight * 1.2} style={{ transform: [{ rotate: "90deg" }] }} /> 
          </TouchableOpacity> 
        )}

        <View style={styles.column}>
          {isPortrait ? (
            <View style={styles.portraitNextHeader}>
              <View style={{ flex: 1 }} />
              <View style={styles.centerGroup}>
                <Next width={iconWidth} height={iconHeight} />
                <Text style={styles.textTitle}>Next</Text>
              </View>

              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                {!readOnly && (
                  <TouchableOpacity
                    onPress={onSwap}
                    disabled={!canSwap}
                    style={[styles.swapButtonInline, !canSwap && { opacity: 0.4 }]}
                  >
                    <Swap width={iconWidth * 1} height={iconHeight * 1.2} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ) : (
            <View style={styles.iconRow}>
              <Next width={iconWidth} height={iconHeight} />
              <Text style={styles.textTitle}>Next</Text>
            </View>
          )}

          <ActivityCard
            activity={nextActivity}
            label="Add Next"
            onPress={() => onSelectSlot({ slot: "Next" })}
            onLongPress={() => handleLongPress(nextActivity)}
            readOnly={readOnly}
            styles={styles}
            resolveActivityImage={resolveActivityImage}
          />
        </View>
      </View>
    </View>
  );
};

export default NowNextBoard;
