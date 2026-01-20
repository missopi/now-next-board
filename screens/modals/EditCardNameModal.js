import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function EditCardNameModal({ visible, initialName, onSave, onClose }) {
  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);
  const [name, setName] = useState(initialName || "");

  useEffect(() => {
    if (visible) {
      setName(initialName || "");
    }
  }, [visible, initialName]);

  const handleSave = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      alert("Please enter a name.");
      return;
    }
    onSave?.(trimmedName);
  };

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
          <Text style={styles.modalHeader}>Edit card name</Text>
          <Text style={styles.modalDialog}>Update the name for this card.</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter a new name"
            placeholderTextColor="#9999"
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.imageAddButton} onPress={handleSave}>
              <Text style={styles.imageAddText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
