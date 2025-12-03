import { View, Text, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableFlatList from "react-native-draggable-flatlist";
import RoutineCard from "../components/RoutineCard";
import getStyles from "../styles/RoutineStyles";
import { activityLibrary } from "../../data/ActivityLibrary";
import useHandheldPortraitLock from "../../utilities/useHandheldPortraitLock";
import BackButton from "../components/BackButton";

export default function RoutineViewScreen({ route, navigation }) {
  const { board } = route.params || {};

  if (!board) return null;

  const activities = board.cards || [];

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getStyles(width, height, "view");

  useHandheldPortraitLock();

  function resolveActivityImage(activity) {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  }

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'bottom', 'left', 'right']}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={{marginBottom: isPortrait ? 10 : 5}}>
        <Text style={styles.topTitle}>{board.title || "Routine"}</Text>
        <View style={styles.titleUnderline}/>
      </View>
      <DraggableFlatList
        data={activities}
        style={{ height: '100%', width: '100%' }}
        horizontal={!isPortrait}
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
        contentContainerStyle={{ gap: '1%', paddingBottom: isPortrait ? 50 : 0, paddingRight: isPortrait? 0 : 50 }}
      />
    </SafeAreaView>
  );
}
