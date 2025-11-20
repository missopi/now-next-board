// Main board screen containing the Now/Next/Then board

import { useEffect, useRef, useState } from "react";  
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import NowNextBoard from "./components/NowNextBoard";
import getStyles from "./styles/NowNextBoardStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./modals/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import SaveModal from "./modals/SaveModal";
import { activityLibrary } from "../data/ActivityLibrary";

export default function NowNextBoardScreen({ navigation, route }) {  // useState used to track selected activities
  const { mode, board } = route.params || {};
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

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

  // screen orientation
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = getStyles(isPortrait, width, height, "edit");

  // Intercept navigation to show Save modal if unsaved changes exist
  const pendingActionRef = useRef(null);

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', (e) => {
      if (!hasChanges) return;      // allow normal navigation if nothing to save
      e.preventDefault();           // block leaving
      pendingActionRef.current = e.data.action;
      setIsSaveModalVisible(true);  // show Save modal
    });

    return unsub; // cleanup when unmounting
  }, [navigation, hasChanges]);

  const completeNavigation = () => {
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    if (action) navigation.dispatch(action);
  };

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board) {
      loadNowNextBoard(board);
    }
  }, [mode, board]);

  const slotRef = useRef(null);

  function resolveActivityImage(activity) {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  };

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
    const currentSlot = typeof slotRef.current === 'string'
      ? slotRef.current
      : slotRef.current?.slot;
      
    if (currentSlot === 'Now') setNowActivity(activity);
    else if (currentSlot === 'Next') setNextActivity(activity);
    else console.warn('Invalid slot. Could not assign activity.');

    setHasChanges(true);
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
    setHasChanges(true);
    slotRef.current = null;
  };

  const handleSavePress = () => {
    setIsSaveModalVisible(true);
  };

  const saveCurrentNowNextBoard = async (titleFromModal) => {
    const titleToUse = titleFromModal || boardTitle;

    if (![nowActivity, nextActivity].filter(Boolean).length) {
      alert("Please add Now and Next images before saving.");
      return;
    }

    const board = {
      id: currentBoardId || uuid.v4(),
      type: 'nowNextThen',
      title: titleToUse || "Now & Next",
      cards: [nowActivity, nextActivity].filter(Boolean),
    };

    if (currentBoardId) {
      await updateBoard(board);
    } else {
      await saveBoard(board);
    }

    setBoardTitle(titleToUse);
    setCurrentBoardId(board.id);
    setIsSaveModalVisible(false);
    setHasChanges(false);
    if (pendingActionRef.current) completeNavigation(); 
  };

  const handleDiscard = () => {
    setIsSaveModalVisible(false);
    setHasChanges(false); 
    completeNavigation();  
  };

  const loadNowNextBoard = (board) => {
    const now = board.cards[0] ? { 
      ...board.cards[0], 
      image: resolveActivityImage(board.cards[0]) 
    } : null;

    const next = board.cards[1] ? { 
      ...board.cards[1], 
      image: resolveActivityImage(board.cards[1]) 
    } : null;

    setNowActivity(now);
    setNextActivity(next);
    setCurrentBoardId(board.id);
    setBoardTitle(board.title || '');
    setHasChanges(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NowNextBoard 
          nowActivity={nowActivity}
          nextActivity={nextActivity} 
          onSelectSlot={onSelectSlot}
          readOnly={false} 
          styles={styles}
        />
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
      <SaveModal
        visible={isSaveModalVisible}
        initialTitle={boardTitle}
        onClose={() => { setIsSaveModalVisible(false); pendingActionRef.current = null; }}
        onSave={(title) => saveCurrentNowNextBoard(title)}
        onDiscard={handleDiscard} 
      />
    </View>
  );
};
