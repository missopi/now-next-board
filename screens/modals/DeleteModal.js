import { Modal, Text, Pressable, TouchableOpacity, View, useWindowDimensions } from "react-native";
import getModalStyles from '../styles/ModalStyles';
import { deleteBoard } from "../../utilities/BoardStore";

export default function DeleteModal({
  visible,
  boardToDelete,
  onClose,
  onDeleted,
  setBoards,
}) {
  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);

  const handleDelete = async () => {
    if (!boardToDelete) return;
    const updated = await deleteBoard(boardToDelete.id);
    setBoards(updated);          // update state in parent
    onDeleted?.();               // optional callback (e.g. clear selection)
    onClose();                   // close modal
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={!!visible && !!boardToDelete}  // safe visibility toggle
      onRequestClose={onClose}
      supportedOrientations={["portrait", "landscape"]}
    >
      {boardToDelete ? (
        // Only render content when there’s something to show
        <Pressable style={styles.addOverlay} onPress={onClose}>
          <Pressable style={styles.addBox} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.addTitle}>Delete Board</Text>
            <Text style={styles.deleteDialog}>
              Are you sure you want to delete "{boardToDelete.title}"?
            </Text>

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
        // keep stable tree even if no boardToDelete
        <View />
      )}
    </Modal>
  );
}
