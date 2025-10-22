import { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, useWindowDimensions } from "react-native";
import getModalStyles from '../styles/ModalStyles';

export default function SaveModal({ visible, initialTitle = "", onClose, onSave }) {
  const [title, setTitle] = useState(initialTitle);

  // Keep title in sync when modal reopens
  useEffect(() => {
    if (visible) setTitle(initialTitle || "");
  }, [visible, initialTitle]);

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    onSave(title.trim());
    setTitle("");
  };

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getModalStyles(isPortrait, width, height);

  return (
    <Modal visible={visible} transparent={true} animationType="fade" supportedOrientations={['portrait', 'landscape']}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalHeader}>
            {initialTitle ? "Edit Board Title" : "Name Your Board"}
          </Text>
          <Text></Text>
          <TextInput
            placeholder="e.g., Morning Routine"
            placeholderTextColor="#9999"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleSave} style={styles.addButton}>
              <Text style={styles.addText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
