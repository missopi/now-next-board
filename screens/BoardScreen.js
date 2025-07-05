// Main board screen containing the Now/Next/Then board

import { useEffect, useRef, useState } from "react";  
import { View, Text, TouchableOpacity, Modal, SafeAreaView, TextInput } from "react-native";
import NowNextBoard from "./components/NowNextBoard";
import CogIcon from "../assets/icons/cog.svg";
import NowNextSettingsModal from "./settings/NowNextBoardSettings";
import styles from "./styles/NowNextBoardStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./components/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function NowNextBoardScreen({ navigation, route }) {  // useState used to track selected activities
  const { mode, board } = route.params || {};

  // track the 3 activities
  const [nowActivity, setNowActivity] = useState(null);
  const [nextActivity, setNextActivity] = useState(null);
  const [thenActivity, setThenActivity] = useState(null);

  // modal for settings
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [showThen, setShowThen] = useState(true);
  
  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  // modal steps: choose || create || preview
  const [modalStep, setModalStep] = useState('choose');

  // saving boards
  const [customTitle, setCustomTitle] = useState('');
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board) {
      loadNowNextBoard(board);
    }
  }, [mode, board]);

  // grab title
  useEffect(() => {
    if (route.params?.mode === 'new' && route.params.initialTitle) {
      setCustomTitle(route.params.initialTitle);
    }
  }, [route.params]);


  // lock screen orientation
  useEffect(() => {
    console.log('Locking to portrait...');
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    
    return () => {
    // Unlock when leaving
    ScreenOrientation.unlockAsync();
  };
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
    else if (currentSlot === 'Then') setThenActivity(activity);
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
    else if (currentSlot === 'Then') setThenActivity(newCard);
    else console.warn("Invalid slot. Could not assign activity.");
    
    // reset and close
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
    slotRef.current = null;
  };

  const saveCurrentNowNextBoard = async () => {
    const board = {
      id: currentBoardId || uuid.v4(),
      type: 'nowNextThen',
      title: customTitle,
      cards: [nowActivity, nextActivity, showThen ? thenActivity : null].filter(Boolean),
      Settings: { showThen },
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
    setCustomTitle(board.title);
    setNowActivity(board.cards[0] || null);
    setNextActivity(board.cards[1] || null);
    setThenActivity(board.cards[2] || null);
    setShowThen(board.settings?.showThen ?? false);
    setCurrentBoardId(board.id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NowNextBoard 
        nowActivity={nowActivity}
        nextActivity={nextActivity} 
        thenActivity={thenActivity}
        onSelectSlot={onSelectSlot}
        showThen={showThen} 
      />
      <View style={{ marginHorizontal: 40, height: 60, paddingBottom: 10, }}>
        <TouchableOpacity
          onPress={saveCurrentNowNextBoard}
          style={styles.saveButton}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>Save Board</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 40 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NowNextBoardFinished', {
            board: {
              title: newBoardTitle,
              cards: [nowActivity, nextActivity, thenActivity].filter(Boolean),
            },
          })}
          style={styles.slideshowButton}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>View Now/Next Board</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('NowNextSlideshow', {
            board: {
              title: newBoardTitle,
              cards: [nowActivity, nextActivity, thenActivity].filter(Boolean),
            },
          })}
          style={styles.slideshowButton}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'center' }}>View as Slideshow</Text>
        </TouchableOpacity>
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

      <Modal  // setting for toggling on 'then' activity at bottom of screen
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
        >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>✕</Text>
          </TouchableOpacity>
          <NowNextSettingsModal />
        </View>
      </Modal>
    </SafeAreaView>
  );
};
