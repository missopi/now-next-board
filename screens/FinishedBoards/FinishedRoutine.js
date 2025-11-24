import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DraggableFlatList from "react-native-draggable-flatlist";
import RoutineCard from "../components/RoutineCard";
import getStyles from "../styles/RoutineStyles";
import { activityLibrary } from "../../data/ActivityLibrary";

export default function RoutineViewScreen({ route }) {
  const { board } = route.params || {};

  if (!board) return null;

  const activities = board.cards || [];

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getStyles(isPortrait, width, height, "view");
  const insets = useSafeAreaInsets();
  const containerStyle = StyleSheet.flatten([
    styles.container,
    {
      paddingTop: Math.max(styles.container.paddingTop - insets.top, 0),
      paddingBottom: Math.max((styles.container.paddingBottom || 0) - insets.bottom, 0),
    },
  ]);
  const minHeightLandscape = !isPortrait ? height : undefined;
  const gap = 16;

  function resolveActivityImage(activity) {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  }

  return (
    <SafeAreaView style={containerStyle} edges={['top', 'bottom', 'left', 'right']}>
      {isPortrait ? (
        <DraggableFlatList
          data={activities}
          key={isPortrait ? 'portrait' : 'landscape'}
          horizontal={false}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onDragEnd={() => { }}
          renderItem={({ item }) => (
            <RoutineCard
              activity={item}
              readOnly={true}
              styles={styles}
              resolveActivityImage={resolveActivityImage}
            />
          )}
          ListHeaderComponent={() => (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "700",
                  color: "#333",
                  textAlign: "center",
                }}
              >
                {board.title || "Routine"}
              </Text>
              <View
                style={{
                  height: 2,
                  width: "60%",
                  backgroundColor: "#ccc",
                  marginTop: 8,
                }}
              />
            </View>
          )}
          contentContainerStyle={{ gap: 20 }}
        />
      ) : (
        // 💻 Landscape: title fixed, list below
        <>
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#333",
                textAlign: "center",
              }}
            >
              {board.title || "Routine"}
            </Text>
            <View
              style={{
                height: 2,
                width: "60%",
                backgroundColor: "#ccc",
                marginTop: 8,
              }}
            />
          </View>

          <DraggableFlatList
            data={activities}
            key={isPortrait ? 'portrait' : 'landscape'}
            horizontal={!isPortrait}  // keep one column
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            onDragEnd={() => { }}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <RoutineCard
                activity={item}
                readOnly={true}
                styles={styles}
                resolveActivityImage={resolveActivityImage}
              />
            )}
            contentContainerStyle={{
              gap: 20,
              paddingBottom: 80,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: minHeightLandscape,
              flexGrow: !isPortrait ? 1 : undefined,
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}
