// Main board screen containing the Now/Next/Then board

import { useEffect, useRef, useState } from "react";  
import { View, Text, TouchableOpacity, Modal, Pressable, TextInput } from "react-native";
import NowNextBoard from "./components/NowNextBoard";
import CogIcon from "../assets/icons/cog.svg";
import NowNextSettingsModal from "./settings/NowNextBoardSettings";
import styles from "./styles/NowNextBoardStyles";
import { setActivityCallback } from "./components/CallbackStore";
import * as ImagePicker from "expo-image-picker";

export default function NowNextBoardScreen({ navigation }) {   // useState used to track selected activities
  // track which slot (Now | Next | Then) was tapped
  const [slot, setSlot] = useState(null);

  // track the 3 activities
  const [nowActivity, setNowActivity] = useState(null);
  const [nextActivity, setNextActivity] = useState(null);
  const [thenActivity, setThenActivity] = useState(null);

  // modal for settings
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [showThen, setShowThen] = useState(false);
  
  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isImageSourceVisible, setIsImageSourceVisible] = useState(false);

  // ask for gallery permissions
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need media library permissions to make this work!');
      }
    })();
  }, []);

  // setting cog in header
  useEffect(() => { 
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <CogIcon width={24} height={24} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const slotRef = useRef(null);
  function pickOrCaptureImage(slot) { // pop up option to choose type of image for activity card
    setSlot(slot);
    slotRef.current = slot;
    setIsImageSourceVisible(true);
  }

  async function handleImagePick(type = 'camera') {
    try {
      let permissionStatus;

      if (type === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        permissionStatus = status;
      } else if (type === 'gallery') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        permissionStatus = status;
      }

      if (permissionStatus !== 'granted') {
        alert('Permission denied. Please enable permissions in settings.');
        return;
      }

      let result;
      if (type === 'camera') {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else if (type === 'gallery') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images', 'videos'],
          allowsEditing: false,
          base64: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const based64Image = `data:image/jpeg;base64,${asset.base64}`;
        console.log('Base64 image file:', based64Image);

        setNewCardImage(based64Image);
        setTimeout(() => setIsNewCardVisible(true), 200);
      } else {
        alert("No image was selected.");
      }
    } catch (e) {
      console.error('Image picking error:', e);
      alert('Something went wrong while picking the image.');
    } finally {
      setIsImageSourceVisible(false);
    }
  }
  
  function handleLibraryPick() {
    setIsImageSourceVisible(false);
    setActivityCallback(slot, (activity) => {
      if (slot === 'Now') setNowActivity(activity);
      else if (slot === 'Next') setNextActivity(activity);
      else setThenActivity(activity);
    });
    navigation.navigate('LibraryScreen', { slot: slot });
  }
  
  function saveNewActivityCard() {
    if (!newCardImage || !newCardTitle.trim()){
      alert("Please provide both an image and title.");
      return;
    }

    const newCard = { name: newCardTitle.trim(), image: { uri: newCardImage } };
    const currentSlot = slotRef.current;

    if (currentSlot === 'Now') setNowActivity(newCard);
    else if (currentSlot === 'Next') setNextActivity(newCard);
    else if (currentSlot === 'Then') setThenActivity(newCard);
    else console.warn("Invalid slot. Could not assign activity.");
    
    // reset and close
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
    slotRef.current = null;
  };

  return (
    <View style={{ flex: 1 }}>
      <NowNextBoard 
        nowActivity={nowActivity}
        nextActivity={nextActivity} 
        thenActivity={thenActivity} 
        onSelect={({ slot }) => { 
          setSlot(slot);
          pickOrCaptureImage(slot);
        }}
        showThen={showThen} 
      />
      {/* Modal for entering card title */}
      <Modal visible={isNewCardVisible} transparent={true} animationType="fade">
        <View style={styles.modalCard}>
          <Text style={styles.modalHeader}>Enter Card Title</Text>
          <Text style={styles.modalDialog}>Please enter a title for your activity card.</Text>
          <TextInput
            placeholder="e.g., brush teeth"
            placeholderTextColor="#9999"
            value={newCardTitle}
            onChangeText={setNewCardTitle}
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <Pressable onPress={saveNewActivityCard} style={styles.addButton}>
              <Text style={styles.addText}>Add</Text>
            </Pressable>
            <Pressable onPressIn={() => setIsNewCardVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable> 
          </View>
        </View>
      </Modal>

      {/* Modal for choosing image source */}
      <Modal visible={isImageSourceVisible} transparent={true} animationType="fade">
        <View style={styles.modalCard}>
          <Text style={styles.modalHeader}>Add Image</Text>
          <Text style={styles.modalDialog}>Please choose an image source.</Text>
          <View style={styles.buttonColumn}>
            <Pressable onPress={() => handleImagePick('camera')} style={styles.imageButton}>
              <Text style={styles.addText}>Camera</Text>
            </Pressable>
            <Pressable onPress={() => handleImagePick('gallery')} style={styles.imageButton}>
              <Text style={styles.addText}>Photo Gallery</Text>
            </Pressable>
            <Pressable onPress={handleLibraryPick} style={styles.imageButton}>
              <Text style={styles.addText}>Image Library</Text>
            </Pressable>
            <Pressable onPressIn={() => setIsImageSourceVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal  // setting for toggling on 'then' activity at bottom of screen
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
        >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>x</Text>
          </TouchableOpacity>
          <NowNextSettingsModal showThen={showThen} setShowThen={setShowThen} />
        </View>
      </Modal>
    </View>
  );
};
