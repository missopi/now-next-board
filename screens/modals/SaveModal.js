import { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, Pressable, useWindowDimensions } from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function SaveModal({ visible, initialTitle = "", onClose, onSave, onDiscard }) {
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
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      supportedOrientations={["portrait", "landscape"]}
      onRequestClose={onClose} // Android back button closes modal
    >
      {/* OUTER PRESSABLE: closes modal when touched outside */}
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        {/* INNER PRESSABLE: stops outside touch from closing modal */}
        <Pressable
          style={styles.modalCard}
          onPress={(e) => e.stopPropagation()}
        >
          <Text style={styles.modalHeader}>
            {initialTitle ? "Edit Board Title" : "Name Your Board"}
          </Text>

          <TextInput
            placeholder="e.g., Morning Routine"
            placeholderTextColor="#9999"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleSave} style={styles.imageAddButton}>
              <Text style={styles.imageAddText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDiscard} style={styles.imageAddButton}>
              <Text style={styles.imageAddText}>Discard</Text>
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
