import { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import getModalStyles from "../styles/ModalStyles";

export default function SaveCardModal({
  visible,
  cardName = "",
  categories = [],
  initialCategory = "",
  onSave,
  onClose,
}) {
  const normalizedCategories = useMemo(() => {
    return Array.from(
      new Set(categories.filter((category) => typeof category === "string" && category.trim()))
    );
  }, [categories]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (visible) {
      const defaultCategory = initialCategory || normalizedCategories[0] || "";
      setSelectedCategory(defaultCategory);
      setShowOptions(false);
    }
  }, [visible, initialCategory, normalizedCategories]);

  const handleSave = () => {
    if (!selectedCategory) {
      alert("Please choose a category.");
      return;
    }
    onSave?.(selectedCategory);
  };

  const { width, height } = useWindowDimensions();
  const styles = getModalStyles(width, height);
  const helperText = cardName
    ? `Choose a category for "${cardName}".`
    : "Choose a category for this card.";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      supportedOrientations={["portrait", "landscape"]}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.modalHeader}>Save card?</Text>
          <Text style={styles.modalDialog}>{helperText}</Text>

          <TouchableOpacity
            style={styles.categoryPicker}
            onPress={() => setShowOptions((prev) => !prev)}
          >
            <Text style={styles.categoryPickerText}>
              {selectedCategory || "Select category"}
            </Text>
          </TouchableOpacity>

          {showOptions && normalizedCategories.length > 0 ? (
            <ScrollView style={styles.categoryList}>
              {normalizedCategories.map((category) => {
                const isActive = category === selectedCategory;
                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => {
                      setSelectedCategory(category);
                      setShowOptions(false);
                    }}
                    style={[
                      styles.categoryOption,
                      isActive && styles.categoryOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        isActive && styles.categoryOptionTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null}

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={handleSave} style={styles.imageAddButton}>
              <Text style={styles.imageAddText}>Save</Text>
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
