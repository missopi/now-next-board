// Main board screen containing the Now/Next/Then board

import { useEffect, useState } from "react";  
import { View, Text, TouchableOpacity, Modal, Alert, Image, Button, TextInput } from "react-native";
import NowNextBoard from "./components/NowNextBoard";
import CogIcon from "../assets/icons/cog.svg";
import NowNextSettingsModal from "./settings/NowNextBoardSettings";
import styles from "./styles/NowNextBoardStyles";
import { setActivityCallback, triggerActivityCallback } from "./components/CallbackStore";
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

  function pickOrCaptureImage(slot) { // pop up option to choose type of image for activity card
    Alert.alert(
      'Add Image',
      'Choose image source',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status === 'granted') {
              const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
              if (!result.canceled) {
                setNewCardImage(result.assets[0].uri);
                setIsNewCardVisible(true);
              }
            }
          },
        },
        {
          text: 'Photo Gallery',
          onPress: async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status === 'granted') {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images', 'videos'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
              });
              if (!result.canceled) {
                setNewCardImage(result.assets[0].uri);
                setIsNewCardVisible(true);
              }
            }
          }
        },
        {
          text: 'Activity Library',
          onPress: () => {  // navigates to library screen with a call back to receive activity cards
            setActivityCallback(slot, (activity) => {
              console.log('setting activity for:', slot, activity);
              if (slot === 'Now') setNowActivity(activity);
              else if (slot === 'Next') setNextActivity(activity);
              else setThenActivity(activity);
            });
            console.log('navigating to library screen with slot:', slot);
            navigation.navigate('LibraryScreen', { slot: slot });
          }
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  }
  
  function saveNewActivityCard() {
    const newCard = { name: newCardTitle, image: { uri: newCardImage } };
    console.log('saving new card', {
      title: newCardTitle,
      image: newCardImage,
    });

    if (slot === 'Now') setNowActivity(newCard);
    else if (slot === 'Next') setNextActivity(newCard);
    else setThenActivity(newCard);
    console.log('updating slot:', slot);

    // reset and close
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
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
      <Modal visible={isNewCardVisible} transparent={true} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            placeholder="Enter card title"
            value={newCardTitle}
            onChangeText={setNewCardTitle}
            style={styles.input}
          />
          <Button title="Save card" onPress={saveNewActivityCard} />
          <Button title="Cancel" onPressIn={() => setIsNewCardVisible(false)} />
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
