import { View, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import RoutineCard from "../components/RoutineCard";
import styles from "../styles/RoutineStyles";

export default function RoutineViewScreen({ route }) {
  const { board } = route.params || {};

  if (!board) return null;

  const activities = board.cards || [];

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={activities}
        keyExtractor={(item) => item.id}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onDragEnd={() => {}} // no dragging
        renderItem={({ item }) => (
          <RoutineCard
            activity={item}
            readOnly={true} // hide delete + drag buttons
          />
        )}

        // 👇 Add header to scroll with list
        ListHeaderComponent={() => (
          <View style={{ alignItems: "center", marginVertical: 5 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
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
    </View>
  );
}


