import { Modal, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function EditCardImageModal({ visible, onChooseCamera, onChooseGallery, onClose }) {
  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalHeader}>Change image</Text>
          <Text style={styles.modalDialog}>Choose where to get a new image.</Text>
          <View style={styles.buttonColumn}>
            <TouchableOpacity onPress={onChooseCamera} style={styles.imageButton}>
              <Text style={styles.addText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onChooseGallery} style={styles.imageButton}>
              <Text style={styles.addText}>Photo Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
