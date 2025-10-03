// Main board screen containing the Now/Next/Then board

import { useEffect, useRef, useState } from "react";  
import { View, Text, TouchableOpacity } from "react-native";
import NowNextBoard from "./components/NowNextBoard";
import styles from "./styles/NowNextBoardStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./components/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import Footer from "../screens/components/Footer";

export default function NowNextBoardScreen({ navigation, route }) {  // useState used to track selected activities
  const { mode, board } = route.params || {};

  // track the 3 activities
  const [nowActivity, setNowActivity] = useState(null);
  const [nextActivity, setNextActivity] = useState(null);
  
  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  // modal steps: choose || create || preview
  const [modalStep, setModalStep] = useState('choose');

  // saving boards
  const [currentBoardId, setCurrentBoardId] = useState(null);

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board) {
      loadNowNextBoard(board);
    }
  }, [mode, board]);

  const slotRef = useRef(null);

  function onSelectSlot(slot) {
    slotRef.current = slot;
    setNewCardTitle('');
    setNewCardImage(null);
    setIsPickingImage(false);
    setModalStep('choose');
    setIsNewCardVisible(true);
  };

  const closeModal = () => {
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
    setIsPickingImage(false);
    setModalStep('choose');
  };

  function handleSetActivity(activity) {
    console.log('[handleSetActivity slot ref:', slotRef.current);
    const currentSlot = typeof slotRef.current === 'string'
      ? slotRef.current
      : slotRef.current?.slot;

    console.log('[handleSetActivity] Current Slot Ref:', currentSlot);
      
    if (currentSlot === 'Now') setNowActivity(activity);
    else if (currentSlot === 'Next') setNextActivity(activity);
    else console.warn('Invalid slot. Could not assign activity.');
  };

  async function handleImagePick(type) {
    const imageUri = await pickImage(type);
    if (imageUri) {
      setNewCardImage(imageUri);
    } else {
      console.warn('[handleImagePick] no image returned');
    }
  };
  
  function saveNewActivityCard() {
    if (!newCardImage || !newCardTitle.trim()){
      alert("Please provide both an image and title.");
      return;
    }

    const newCard = { name: newCardTitle.trim(), image: { uri: newCardImage } };
    const currentSlot = typeof slotRef.current === 'string'
      ? slotRef.current
      : slotRef.current?.slot;

    if (currentSlot === 'Now') setNowActivity(newCard);
    else if (currentSlot === 'Next') setNextActivity(newCard);
    else console.warn("Invalid slot. Could not assign activity.");
    
    // reset and close
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
    slotRef.current = null;
  };

  const saveCurrentNowNextBoard = async () => {
    // check if no images/cards are set
    if (![nowActivity, nextActivity].filter(Boolean).length) {
      alert("Please add at least one image (Now or Next) before saving.");
      return;
    }

    const board = {
      id: currentBoardId || uuid.v4(),
      type: 'nowNextThen',
      title: 'Now & Next',
      cards: [nowActivity, nextActivity].filter(Boolean),
    };

    if (currentBoardId) {
      await updateBoard(board); // replace existing
    } else {
      await saveBoard(board) // new board
    };
    setCurrentBoardId(board.id);
    alert('Board saved!');
  };

  const loadNowNextBoard = (board) => {
    setNowActivity(board.cards[0] || null);
    setNextActivity(board.cards[1] || null);
    setCurrentBoardId(board.id);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NowNextBoard 
          nowActivity={nowActivity}
          nextActivity={nextActivity} 
          onSelectSlot={onSelectSlot}
        />
      </View>
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 10, justifyContent: 'space-between' }}>
          <TouchableOpacity
            onPress={saveCurrentNowNextBoard}
            style={styles.saveButton}
          >
            <Text style={styles.saveText}>Save Board</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Slideshow', {
              title: newBoardTitle,
              activities: activities.filter(Boolean),
            })}
            style={styles.slideshowButton}
          >
            <Text style={styles.slideshowText}>View Slideshow</Text>
          </TouchableOpacity>
        </View>
        <Footer />
      </View>
      <ImageCardCreatorModal
        visible={isNewCardVisible}
        modalStep={modalStep}
        setModalStep={setModalStep}
        slotRef={slotRef}
        handleSetActivity={handleSetActivity}
        newCardTitle={newCardTitle}
        setNewCardTitle={setNewCardTitle}
        isPickingImage={isPickingImage}
        setIsPickingImage={setIsPickingImage}
        pickImage={handleImagePick}
        newCardImage={newCardImage}
        setNewCardImage={setNewCardImage}
        setIsNewCardVisible={setIsNewCardVisible}
        saveNewCard={saveNewActivityCard}
        setActivityCallback={setActivityCallback}
        navigation={navigation}
        closeModal={closeModal}
      />
    </View>
  );
};
