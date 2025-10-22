import { View, useWindowDimensions } from "react-native";
import NowNextBoard from "../components/NowNextBoard";
import getStyles from "../styles/NowNextBoardStyles"; 

export default function FinishedNowNext({ route }) {
  const { board } = route.params || {};

  const nowActivity = board?.cards?.[0] || null;
  const nextActivity = board?.cards?.[1] || null;

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getStyles(isPortrait, width, height, "view");

  return (
    <View style={{ flex: 1 }}>
      <NowNextBoard
        nowActivity={nowActivity}
        nextActivity={nextActivity}
        onSelectSlot={null} // disables interactivity
        readOnly={true}
        styles={styles}
      />
    </View>
  );
}