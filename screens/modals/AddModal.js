import { Modal, Text, TouchableOpacity, Pressable, useWindowDimensions } from "react-native";
import getModalStyles from '../styles/ModalStyles';

export default function AddModal({ visible, navigation, onClose}) {

  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      {/* OUTER PRESSABLE: closes modal when touched outside */}
      <Pressable
        style={styles.addOverlay}
        onPress={onClose}
      >
        {/* INNER PRESSABLE: stops outside touch from closing modal */}
        <Pressable
          style={styles.addBox}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.addTitle}>Create a new...</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              onClose();
              navigation.navigate('Now/Next');
            }}
          >
            <Text style={styles.addText}>Now & Next</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              onClose();
              navigation.navigate('Routines', { mode: "new" });
            }}
          >
            <Text style={styles.addText}>Routine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              onClose();
              navigation.navigate('LibraryCardCreator');
            }}
          >
            <Text style={styles.addText}>Library Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addCancelButton}
            onPress={onClose}
          >
            <Text style={styles.addText}>Cancel</Text>
          </TouchableOpacity>
        </Pressable>
    </Pressable>
  </Modal>
  )
};
