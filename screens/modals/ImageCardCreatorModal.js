import { useEffect } from "react";
import { Modal, View, Text, Pressable, TextInput, Image, useWindowDimensions } from "react-native";
import getModalStyles from '../styles/ModalStyles';

export default function ImageCardCreatorModal({
  visible,
  modalStep,
  slotRef,
  handleSetActivity,
  newCardTitle,
  setNewCardTitle,
  setModalStep,
  isPickingImage,
  setIsPickingImage,
  pickImage,
  newCardImage,
  setNewCardImage,
  saveNewCard,
  navigation,
  setActivityCallback,
  closeModal
}) {

  const isFeatureReady = true;

  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getModalStyles(isPortrait, width, height);

  useEffect(() => {
    if (!isFeatureReady && modalStep === 'choose') {
      //setModalStep('create');
    }
  }, [modalStep]);

  return (
    <Modal 
      visible={visible} 
      transparent={true} 
      animationType="fade" 
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={closeModal}  // ✅ Android back button
    >
      {/* ✅ FULL-SCREEN PRESSABLE OVERLAY */}
      <Pressable
        style={styles.overlay}
        onPress={closeModal}              // tap outside modal closes it
      >
        {/* ✅ INNER PRESSABLE stops touch propagation */}
        <Pressable
          style={styles.modalCard}
          onPress={(e) => e.stopPropagation()} // prevents overlay press
        >

          {/* Existing modal content unchanged below */}
          {modalStep === 'choose' && isFeatureReady && (
            <>
              <Text style={styles.modalHeader}>Choose Source</Text>
              <Text style={styles.modalDialog}>Please pick an option.</Text>
              <View style={styles.buttonColumn}>
                <Pressable
                  disabled={!isFeatureReady}
                  style={[
                    styles.smallButton,
                    !isFeatureReady && { backgroundColor: '#ccc', opacity: 0.6 }
                  ]}
                  onPress={() => {
                    if (!isFeatureReady) return;
                    const slotKey = typeof slotRef.current === 'string'
                      ? slotRef.current
                      : slotRef.current?.slot;
                    setActivityCallback(slotKey, handleSetActivity);
                    navigation.navigate('LibraryScreen', { slot: slotKey });
                    closeModal();
                  }}
                >
                  <Text style={[styles.imageAddText, !isFeatureReady && { color: '#666' }]}>Image Library</Text>
                </Pressable>
    
                <Pressable
                  onPress={() => {
                    setNewCardTitle('');
                    setNewCardImage(null);
                    setIsPickingImage(false);
                    setModalStep('create');
                  }}
                  style={styles.smallButton}
                >
                  <Text style={styles.smallButtonText}>Create New</Text>
                </Pressable>
    
                <Pressable onPress={closeModal} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </>
          )}

          {modalStep === 'create' && !isPickingImage && (
            <>
              <Text style={styles.modalHeader}>Enter Card Title</Text>
              <Text style={styles.modalDialog}>Please enter a title to match your image.</Text>
              <TextInput
                placeholder="e.g., brush teeth"
                placeholderTextColor="#9999"
                value={newCardTitle}
                onChangeText={setNewCardTitle}
                style={styles.input}
              />
              <View style={styles.buttonRow}>
                <Pressable
                  onPress={() => {
                    if (!newCardTitle.trim()) {
                      alert('Please enter a title.');
                      return;
                    }
                    setIsPickingImage(true);
                  }}
                  style={styles.imageAddButton}
                >
                  <Text style={styles.imageAddText}>Next</Text>
                </Pressable>
                <Pressable onPress={closeModal} style={styles.cancelButton}>
                  <Text style={styles.cancelText}>Cancel</Text>
                </Pressable>
              </View>
            </>
          )}

          {modalStep === 'create' && isPickingImage && (
            <>
              <Text style={styles.modalHeader}>Add Image</Text>

              {!newCardImage ? (
                <View style={styles.buttonColumn}>
                  <Text style={styles.modalDialog}>Please choose an image source.</Text>
                  <Pressable onPress={() => pickImage('camera')} style={styles.imageButton}>
                    <Text style={styles.addText}>Camera</Text>
                  </Pressable>
                  <Pressable onPress={() => pickImage('gallery')} style={styles.imageButton}>
                    <Text style={styles.addText}>Photo Gallery</Text>
                  </Pressable>
                  <Pressable onPressIn={closeModal} style={styles.cancelButton}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </Pressable> 
                </View>
              ) : (
                <>
                  <View style={styles.previewView}>
                    <Image source={{ uri: newCardImage }} style={styles.previewImage} resizeMode="cover" />
                  </View>

                  <View style={styles.buttonRow}>
                    <Pressable onPress={saveNewCard} style={styles.imageAddButton}>
                      <Text style={styles.imageAddText}>Add</Text>
                    </Pressable>
                    <Pressable onPressIn={closeModal} style={styles.cancelButton}>
                      <Text style={styles.cancelText}>Cancel</Text>
                    </Pressable> 
                  </View>
                </>
              )}
            </>
          )}

        </Pressable>
      </Pressable>
    </Modal>
  );
}
