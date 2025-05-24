import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles/NowNextBoardStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RoutineSettingsModal = ({ showFourth, setShowFourth, showFifth, setShowFifth}) => {

  return (
    <View style={styles.modal}>
      <Text style={styles.modalTitle}>Settings</Text>
      <TouchableOpacity
        style={styles.modalRow}
        onPress={async () => {
          const newShowFourth = !showFourth;
          setShowFourth(newShowFourth);
          if (!newShowFourth) {
            setShowFifth(false);
            await AsyncStorage.setItem('showFifth', 'false');
          }
          await AsyncStorage.setItem('showFourth', newShowFourth.toString());
        }}
      >
        <Text style={styles.modalLabel}>Fourth Activity    </Text>
        <View style={styles.radioCircle}>
          {showFourth && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>
      <Text style={[styles.modalText, { paddingBottom: 20}]}>Add a fourth step to the sequence.</Text>

      <TouchableOpacity
        style={[styles.modalRow, !showFourth && { opacity: 0.3 }]}
        disabled={!showFourth}
        onPress={async () => {
          const newShowFifth = !showFifth;
          setShowFifth(newShowFifth);
          await AsyncStorage.setItem('showFifth', newShowFifth.toString());
        }}
      >
        <Text style={styles.modalLabel}>Fifth Activity   </Text>
        <View style={styles.radioCircle}>
          {showFourth && showFifth && <View style={styles.radioDot} />}
        </View>
      </TouchableOpacity>
      <Text style={styles.modalText}>Add a final fifth step to provide an even broader list of events.</Text>
    </View>
  );
};

export default RoutineSettingsModal;