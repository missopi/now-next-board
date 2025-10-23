import { Modal, Text, TouchableOpacity, Pressable, useWindowDimensions } from "react-native";
import getModalStyles from "../styles/AllBoardsStyles";

export default function SaveModal({ visible, navigation, onClose}) {

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getModalStyles(isPortrait, width, height);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* OUTER PRESSABLE: closes modal when touched outside */}
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        {/* INNER PRESSABLE: stops outside touch from closing modal */}
        <Pressable
          style={styles.modalBox}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.modalTitle}>Create a new...</Text>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              onClose();
              navigation.navigate('Now/Next');
            }}
          >
            <Text style={styles.optionText}>Now & Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              onClose();
              navigation.navigate('Routines', { mode: "new" });
            }}
          >
            <Text style={styles.optionText}>Routine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.optionText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
    </Pressable>
  </Modal>
  )
};
