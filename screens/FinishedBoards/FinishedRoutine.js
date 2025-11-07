import { View, Text, useWindowDimensions } from "react-native";
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

  function resolveActivityImage(activity) {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  }

  return (
    <View style={styles.container}>
      {isPortrait ? (
        // 📱 Portrait: title scrolls with list
        <DraggableFlatList
          data={activities}
          key={isPortrait ? 'portrait' : 'landscape'}
          horizontal={false}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          onDragEnd={() => {}}
          renderItem={({ item }) => (
            <RoutineCard
              activity={item}
              readOnly={true}
              styles={styles}
              resolveActivityImage={resolveActivityImage}  
            />
          )}
          ListHeaderComponent={() => (
            <View style={{ alignItems: "center", marginVertical: 5 }}>
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
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        // 💻 Landscape: title fixed, list below
        <>
          <View style={{ alignItems: "center", marginVertical: 5 }}>
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
            onDragEnd={() => {}}
            renderItem={({ item }) => (
              <RoutineCard
                activity={item}
                readOnly={true}
                styles={styles}
                resolveActivityImage={resolveActivityImage} 
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </>
      )}
    </View>
  );
}
