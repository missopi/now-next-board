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
      console.log('Opening image picker:', type);
      
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
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      console.log("Picker result:", result);

      if (!result.canceled && result.assets && result.assets.length > 0 && result.assets[0].uri) {
        const uri = result.assets[0].uri;
        console.log("Image URI:", uri);
        setNewCardImage(uri);
        setTimeout(() => setIsNewCardVisible(true), 200);
        console.log('setting newCardVisible = true');
      } else {
        console.warn("Invalid or unsupported image selected", result);
        alert("That image could not be used. Try another one or re-save it in your Photos app.");
      }
    } catch (e) {
      console.error('Image picking error:', e);
      alert('Something went wrong while picking the image.');
    } finally {
      console.log("Resetting isImageSourceVisible -> false from [handleImagePick]");
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
    console.log("===> SAVE TRIGGERED", newCardImage, newCardTitle);
    console.log("saving to slot:", slotRef.current);

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
    console.log("Resetting isNewCardVisible -> false from [saveNewActivityCard]");
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
        {console.log("Render: isNewCardVisible =", isNewCardVisible)}
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
            <Pressable 
              onPress={saveNewActivityCard} 
              style={styles.addButton}
            >
              <Text style={styles.addText}>Add</Text>
            </Pressable>
            <Pressable 
              onPressIn={() => setIsNewCardVisible(false)} 
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable> 
          </View>
        </View>
      </Modal>

      {/* Modal for choosing image source */}
      <Modal visible={isImageSourceVisible} transparent={true} animationType="fade">
        {console.log("Render: isImageSourceVisible =", isImageSourceVisible)}
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
            <Pressable 
              onPressIn={() => setIsImageSourceVisible(false)} 
              style={styles.cancelButton}
            >
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
          <NowNextSettingsModal
            showThen={showThen}
            setShowThen={setShowThen}
          />
        </View>
      </Modal>
    </View>
  );
};
