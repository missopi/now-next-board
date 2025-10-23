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
  if (!boardToDelete) return null;

  const handleDelete = async () => {
    const updated = await deleteBoard(boardToDelete.id);
    setBoards(updated);          // update state in parent
    onDeleted?.();               // optional callback (e.g. clear selection)
    onClose();                   // close modal
  };

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
          <Text style={styles.addTitle}>Delete Board</Text>
          <Text style={styles.deleteDialog}>Are you sure you want to delete "{boardToDelete?.title}"?</Text>
          <View style={styles.deleteRow}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelDeleteButton}
              onPress={onClose}
            >
              <Text style={styles.cancelDeleteText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
};
