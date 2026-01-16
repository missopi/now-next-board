// Main board screen containing the Now/Next/Then board

import { useEffect, useMemo, useRef, useState } from "react";  
import { Platform, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import NowNextBoard from "./components/NowNextBoard";
import getStyles from "./styles/NowNextBoardStyles";
import getCardBaseStyles from "./styles/CardBaseStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./modals/ImageCardCreatorModal";
import SaveCardModal from "./modals/SaveCardModal";
import StatusModal from "./modals/StatusModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import SaveModal from "./modals/SaveModal";
import { activityLibrary } from "../data/ActivityLibrary";
import { allCategories } from "../data/Categories";
import { getCardImageUri, saveCustomCard } from "../utilities/CustomCardStore";
import useHandheldPortraitLock from "../utilities/useHandheldPortraitLock";
import BackButton from "./components/BackButton";

export default function NowNextBoardScreen({ navigation, route }) {  // useState used to track selected activities
  const { mode, board } = route.params || {};
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaveCardModalVisible, setIsSaveCardModalVisible] = useState(false);
  const [cardToSave, setCardToSave] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ visible: false, title: "", message: "" });

  function resolveActivityImage(activity) {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  };

  // hydrate initial state immediately so the transition doesn't render an empty shell
  const initialNow = mode === 'load' && board?.cards?.[0]
    ? { ...board.cards[0], image: resolveActivityImage(board.cards[0]) }
    : null;
  const initialNext = mode === 'load' && board?.cards?.[1]
    ? { ...board.cards[1], image: resolveActivityImage(board.cards[1]) }
    : null;

  const [boardTitle, setBoardTitle] = useState(mode === 'load' ? (board?.title || '') : '');
  const [nowActivity, setNowActivity] = useState(initialNow);
  const [nextActivity, setNextActivity] = useState(initialNext);
  
  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  // modal steps: choose || create || preview
  const [modalStep, setModalStep] = useState('choose');

  // saving boards
  const [currentBoardId, setCurrentBoardId] = useState(mode === 'load' ? board?.id || null : null);

  // screen orientation
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const shorterSide = Math.min(width, height);
  const isHandheld = shorterSide < 700;
  const iconScale = Math.min(Math.max(shorterSide / 430, 1), 1.6);
  const saveButtonHeight = Math.round(40 * iconScale);
  const { metrics } = getCardBaseStyles(width, height);
  const baseColumn = Math.min(shorterSide * 0.9, metrics.cardWidth);
  const columnWidth = isPortrait ? baseColumn : Math.min(width * 0.42, metrics.cardWidth);
  const gapSize = Math.round(width * 0.005);
  const rowWidth = isPortrait ? columnWidth : columnWidth * 2 + gapSize;
  const cardOuterInset = Math.max(16, Math.round((width - rowWidth) / 2));
  const styles = getStyles(isPortrait, width, height, "edit");
  const insets = useSafeAreaInsets();
  const topButtonOffset = insets.top + (isHandheld ? 5 : 10);
  const isSaveEnabled = hasChanges && !!(nowActivity && nextActivity);
  const saveButtonBackground = isSaveEnabled ? "#0d63b9ff" : "#cfcfcf";
  const saveButtonTextColor = "#fff";
  const categoryOptions = useMemo(
    () => allCategories.filter((cat) => cat.key !== "All").map((cat) => cat.label),
    []
  );

  useHandheldPortraitLock();

  // Intercept navigation to show Save modal if unsaved changes exist
  const pendingActionRef = useRef(null);

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', (e) => {
      if (!hasChanges) return;

      const action = e.data.action;
      e.preventDefault();
      pendingActionRef.current = action;
      setIsSaveModalVisible(true);
    });

    return unsub; // cleanup when unmounting
  }, [navigation, hasChanges]);

  const completeNavigation = async () => {
    const action = pendingActionRef.current;
    pendingActionRef.current = null;
    if (action) navigation.dispatch(action);
  };

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board && board.id !== currentBoardId) {
      loadNowNextBoard(board);
    }
  }, [mode, board, currentBoardId]);

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
    const currentSlot = typeof slotRef.current === 'string'
      ? slotRef.current
      : slotRef.current?.slot;
      
    if (currentSlot === 'Now') setNowActivity(activity);
    else if (currentSlot === 'Next') setNextActivity(activity);
    else console.warn('Invalid slot. Could not assign activity.');

    setHasChanges(true);
  };

  async function handleImagePick(type) {
    setModalStep('create');
    setIsPickingImage(true);
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

  const openSaveCardModal = (activity) => {
    if (!activity || activity.fromLibrary) return;
    setCardToSave(activity);
    setIsSaveCardModalVisible(true);
  };

  const closeSaveCardModal = () => {
    setIsSaveCardModalVisible(false);
    setCardToSave(null);
  };

  const handleSaveCard = async (category) => {
    if (!cardToSave) return;
    const imageUri = getCardImageUri(cardToSave);
    const name = cardToSave?.name?.trim();
    if (!name || !imageUri) {
      alert("Please make sure this card has a title and image.");
      return;
    }

    const result = await saveCustomCard({ name, category, imageUri });
    closeSaveCardModal();
    if (result?.wasDuplicate) {
      setSaveStatus({
        visible: true,
        title: "Already saved",
        message: "This card is already in your library.",
      });
      return;
    }
    if (!result?.savedCard) {
      setSaveStatus({
        visible: true,
        title: "Save failed",
        message: "Unable to save this card. Please try again.",
      });
      return;
    }
    setSaveStatus({
      visible: true,
      title: "Card saved",
      message: "This card is now in your library.",
    });
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

  const swapNowAndNext = () => {
    if (!nowActivity || !nextActivity) return; // nothing to swap
    const now = nowActivity;
    const next = nextActivity;
    setNowActivity(next);
    setNextActivity(now);
    setHasChanges(true);
  };

  const canSwap = !!(nowActivity && nextActivity);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Math.max(0 - insets.top, 0), paddingBottom: Math.max(0 - insets.bottom, 0), backgroundColor: "#f7fbff" }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <BackButton onPress={() => navigation.goBack()} />
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Save board"
        disabled={!isSaveEnabled}
        onPress={() => setIsSaveModalVisible(true)}
        style={{
          position: "absolute",
          top: topButtonOffset,
          right: cardOuterInset,
          minWidth: 96,
          height: saveButtonHeight,
          paddingHorizontal: 16,
          borderRadius: 10,
          borderWidth: 0,
          borderColor: saveButtonBackground,
          backgroundColor: saveButtonBackground,
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          elevation: 10,
          opacity: 1,
        }}
      >
        <Text style={{ color: saveButtonTextColor, fontSize: 18, fontWeight: "600" }}>
          Save
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <NowNextBoard 
          nowActivity={nowActivity}
          nextActivity={nextActivity} 
          onSelectSlot={onSelectSlot}
          onSwap={swapNowAndNext}
          canSwap={canSwap}
          readOnly={false} 
          styles={styles}
          onLongPressActivity={openSaveCardModal}
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
      <SaveCardModal
        visible={isSaveCardModalVisible}
        cardName={cardToSave?.name || ""}
        categories={categoryOptions}
        initialCategory={cardToSave?.category || ""}
        onSave={handleSaveCard}
        onClose={closeSaveCardModal}
      />
      <StatusModal
        visible={saveStatus.visible}
        title={saveStatus.title}
        message={saveStatus.message}
        onClose={() => setSaveStatus({ visible: false, title: "", message: "" })}
      />
    </SafeAreaView>
  );
};
