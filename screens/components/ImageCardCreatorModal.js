import { Modal, View, Text, Pressable, TextInput, Image } from "react-native";
import styles from '../styles/ModalStyles';

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
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.modalCard}>
        {modalStep === 'choose' && (
          <>
            <Text style={styles.modalHeader}>Choose Source</Text>
            <Text style={styles.modalDialog}>Please pick an option to add to your card.</Text>
            <View style={styles.buttonColumn}>
              <Pressable
                onPress={() => {
                  const slotKey = typeof slotRef.current === 'string'
                    ? slotRef.current
                    : slotRef.current?.slot;
                  
                  setActivityCallback(slotKey, handleSetActivity);
                  {console.log('[Pressable setActivityCallback] slotKey', slotKey, ' and handleSetActivity', handleSetActivity)}
                  navigation.navigate('LibraryScreen', { slot: slotKey });
                  {console.log('libary current slot:', slotKey )}
                  closeModal();
                }}
                style={styles.smallButton}
              >
                <Text style={styles.smallButtonText}>Image Library</Text>
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
                <Text style={styles.smallButtonText}>Create New Card</Text>
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
                style={styles.addButton}
              >
                <Text style={styles.addText}>Next</Text>
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
            <Text style={styles.modalDialog}>Please choose an image source.</Text>
    
            {!newCardImage && (
              <View style={styles.buttonColumn}>
                <Pressable onPress={() => pickImage('camera')} style={styles.imageButton}>
                  <Text style={styles.addText}>Camera</Text>
                </Pressable>
                <Pressable onPress={() => pickImage('gallery')} style={styles.imageButton}>
                  <Text style={styles.addText}>Photo Gallery</Text>
                </Pressable>
              </View>
            )}
    
            {newCardImage && (
              <View style={styles.previewView}>
                <Image source={{ uri: newCardImage }} style={styles.previewImage} resizeMode="cover" />
              </View>
            )}
    
            <View style={styles.buttonRow}>
              <Pressable onPress={saveNewCard} style={styles.addButton}>
                <Text style={styles.addText}>Add</Text>
              </Pressable>
              <Pressable onPressIn={closeModal} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable> 
            </View>
          </>
        )}
      </View>
    </Modal>
  )
}