import { View } from "react-native";
import NowNextBoard from "../components/NowNextBoard";

export default function NowNextBoardViewScreen({ route }) {
  const { board } = route.params || {};

  const nowActivity = board?.cards?.[0] || null;
  const nextActivity = board?.cards?.[1] || null;

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 40 }}>
      <NowNextBoard
        nowActivity={nowActivity}
        nextActivity={nextActivity}
        onSelectSlot={null} // disables interactivity
        readOnly={true}  
      />
    </View>
  );
}