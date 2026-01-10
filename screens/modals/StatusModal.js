import { Modal, Text, Pressable, TouchableOpacity, useWindowDimensions } from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function StatusModal({ visible, title = "Saved", message, buttonLabel = "OK", onClose }) {
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getModalStyles(isPortrait, width, height);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      <Pressable style={styles.addOverlay} onPress={onClose}>
        <Pressable style={styles.addBox} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.addTitle}>{title}</Text>
          {message ? <Text style={styles.deleteDialog}>{message}</Text> : null}
          <TouchableOpacity style={styles.addButton} onPress={onClose}>
            <Text style={styles.addText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
