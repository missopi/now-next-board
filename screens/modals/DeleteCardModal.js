import { Modal, Text, Pressable, TouchableOpacity, View, useWindowDimensions } from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function DeleteCardModal({ visible, card, onClose, onDelete }) {
  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);

  const handleDelete = () => {
    onDelete?.(card);
  };

  const cardName = card?.name?.trim();
  const message = cardName
    ? `Are you sure you want to delete "${cardName}"?`
    : "Are you sure you want to delete this card?";

  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!visible && !!card}
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      {card ? (
        <Pressable style={styles.addOverlay} onPress={onClose}>
          <Pressable style={styles.addBox} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.addTitle}>Delete card</Text>
            <Text style={styles.deleteDialog}>{message}</Text>
            <View style={styles.deleteRow}>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelDeleteButton} onPress={onClose}>
                <Text style={styles.cancelDeleteText}>Cancel</Text>
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
