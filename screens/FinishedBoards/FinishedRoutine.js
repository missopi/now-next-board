import { View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import RoutineCard from "../components/RoutineCard";
import styles from "../styles/RoutineStyles";

export default function FinishedRoutine({ route }) {
  const { board } = route.params || {};

  if (!board) return null;

  const activities = board.cards || [];

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RoutineCard
            activity={item}
            index={item.id}
            readOnly={true}  // disables edit/delete/drag
          />
        )}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        // disable dragging
        onDragEnd={() => {}}
      />
    </View>
  );
}
