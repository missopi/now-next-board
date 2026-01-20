import { Modal, Pressable, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function EditCardModal({ visible, card, onChangeImage, onChangeName, onClose }) {
  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!visible && !!card}
      statusBarTranslucent
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      {card ? (
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalHeader}>Edit card</Text>
            <Text style={styles.modalDialog}>What would you like to change?</Text>
            <View style={styles.buttonColumn}>
              <TouchableOpacity style={styles.smallButton} onPress={onChangeImage}>
                <Text style={styles.smallButtonText}>Change image</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallButton} onPress={onChangeName}>
                <Text style={styles.smallButtonText}>Change name</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      ) : (
        <View />
      )}
    </Modal>
  );
}
