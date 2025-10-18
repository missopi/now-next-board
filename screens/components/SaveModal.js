import { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from '../styles/ModalStyles';

export default function SaveModal({ visible, onClose, onSave }) {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    onSave(title.trim());
    setTitle("");
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalHeader}>Enter Title</Text>
          <Text style={styles.modalDialog}>Please enter a title to match your visual aids.</Text>
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