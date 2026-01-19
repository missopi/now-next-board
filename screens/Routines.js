// Main routine screen 

import { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import DraggableFlatList from 'react-native-draggable-flatlist';
import RoutineCard from "./components/RoutineCard";
import getStyles from "./styles/RoutineStyles";
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

export default function RoutineScreen({ navigation, route }) {
  const { mode, board } = route.params || {};
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaveCardModalVisible, setIsSaveCardModalVisible] = useState(false);
  const [cardToSave, setCardToSave] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ visible: false, title: "", message: "" });

  // track the activities added
  const [activities, setActivities] = useState(() => {
    if (mode === 'load' && board?.cards?.length) {
      return board.cards.map(card => ({ ...card, id: card.id || uuid.v4() }));
    }
    return [
      { id: uuid.v4(), name: null, image: null },
      { id: uuid.v4(), name: null, image: null },
    ];
  });

  // title
  const [newBoardTitle, setNewBoardTitle] = useState(mode === 'load' ? (board?.title || '') : '');

  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  // modal steps: choose || create || preview
  const [modalStep, setModalStep] = useState('choose');

  // saving boards
  const [currentBoardId, setCurrentBoardId] = useState(mode === 'load' ? board?.id || null : null);

  useEffect(() => { }, [mode, activities]);

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board && board.id !== currentBoardId) {
      loadRoutineBoard(board);
    }
  }, [mode, board, currentBoardId]);

  // automatically add empty slots for new routines
  useEffect(() => {
    if (mode === 'new' && activities.length === 0) {
      setActivities([
        { id: uuid.v4(), name: null, image: null },
        { id: uuid.v4(), name: null, image: null },
      ]);
    }
  }, [mode, activities]);

  // grab title
  useEffect(() => {
    if (route.params?.mode === 'new' && route.params.initialTitle) {
      setNewBoardTitle(route.params.initialTitle);
    }
  }, [route.params]);

  // screen orientation
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const isHandheld = Math.min(width, height) < 700;
  const shorterSide = Math.min(width, height);
  const iconScale = Math.min(Math.max(shorterSide / 430, 1), 1.6);
  const listRef = useRef(null);
  const listTopPadding = isHandheld ? 50 : 10;
  const styles = getStyles(width, height, "edit");
  const insets = useSafeAreaInsets();
  const topButtonOffset = insets.top + (isHandheld ? 0 : 10);
  const hasValidActivities = activities.some(
    (activity) => activity && ((activity.image && activity.image.uri) || activity.fromLibrary)
  );
  const isSaveEnabled = hasChanges && hasValidActivities;
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

  const slotIndexRef = useRef(null);

  function resolveActivityImage(activity) {
    if (!activity) return null;
    if (activity.fromLibrary && activity.imageKey) {
      const match = activityLibrary.find(a => a.id === activity.imageKey);
      return match ? match.image : null;
    }
    return activity.image || null;
  };

  const onSelectSlot = (index) => {
    slotIndexRef.current = index;
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

  const deleteActivity = (index) => {
    const updated = [...activities];
    updated.splice(index, 1);
    setActivities(updated);
    setHasChanges(true);
  };

  function handleSetActivity(activity) {
    const index = slotIndexRef.current;
    if (typeof index === 'number') {
      const updated = [...activities];
      updated[index] = { ...activity, id: updated[index]?.id || uuid.v4() };
      setActivities(updated);
    }
    setHasChanges(true);
    closeModal();
    slotIndexRef.current = null;
  }

  const handleImagePick = async (type) => {
    setModalStep('create');
    setIsPickingImage(true);
    const imageUri = await pickImage(type);
    if (imageUri) {
      setNewCardImage(imageUri);
      setHasChanges(true);
    } else {
      console.warn('[handleImagePick] no image returned');
    }
  };

  const saveNewActivityCard = () => {
    if (!newCardImage || !newCardTitle.trim()) {
      alert('Please provide both an image and title.');
      return;
    }
    const newCard = {
      id: uuid.v4(),
      name: newCardTitle.trim(),
      image: { uri: newCardImage }
    };
    handleSetActivity(newCard);
    setHasChanges(true);
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

  const saveCurrentRoutineBoard = async (titleFromModal) => {
    const titleToUse = titleFromModal || newBoardTitle;

    if (!titleToUse || titleToUse.trim() === "") {
      alert("Please give your routine a title before saving.");
      return;
    }

    const validActivities = activities.filter(a => a && ((a.image && a.image.uri) || a.fromLibrary));
    if (validActivities.length === 0) {
      alert("Please add at least one activity with an image before saving.");
      return;
    }

    const board = {
      id: currentBoardId || uuid.v4(),
      type: "routine",
      title: titleToUse,
      cards: validActivities,
    };

    if (currentBoardId) {
      await updateBoard(board);
    } else {
      await saveBoard(board);
    }

    setCurrentBoardId(board.id);
    setNewBoardTitle(titleToUse);
    setIsSaveModalVisible(false);
    setHasChanges(false);
    if (pendingActionRef.current) completeNavigation();
  };

  const handleDiscard = () => {
    setIsSaveModalVisible(false);
    setHasChanges(false);
    completeNavigation();
  };

  const loadRoutineBoard = (board) => {
    const loaded = (board.cards || []).map(card => ({ ...card, id: card.id || uuid.v4() }));
    setNewBoardTitle(board.title);
    setActivities(loaded);
    setCurrentBoardId(board.id);
    setHasChanges(false);
  };

  const addEmptySlot = () => {
    const newSlot = { id: uuid.v4(), name: null, image: null };
    setActivities([...activities, newSlot]);
    requestAnimationFrame(() => {
      if (!listRef.current) return;
      listRef.current.scrollToEnd({ animated: true });
    });
  };

  const AddCardFooter = ({ onPress, styles }) => (
    <View style={styles.cardFooter}>
      <TouchableOpacity onPress={onPress} style={styles.addButton}>
        <Text style={styles.addText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{ 
        paddingTop: isHandheld ? 0 : (isPortrait ? 30 : 0),
        paddingHorizontal: 20, 
        flex: 1, 
        backgroundColor: "#f7fbff" 
      }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          ref={listRef}
          data={activities}
          extraData={activities}
          style={{ height: '100%', width: '100%' }}
          horizontal={!isPortrait}
          onDragEnd={({ data }) => setActivities(data)}
          keyExtractor={(item) => item.id}
          renderItem={(params) => {
            const { item, drag } = params;
            const index = params.getIndex();
            if (!item) return null;

            return (
              <RoutineCard
                activity={item}
                index={index}
                onPress={() => onSelectSlot(index)}
                onLongPress={openSaveCardModal}
                onDelete={() => deleteActivity(index)}
                drag={drag}
                readOnly={false}
                styles={styles}
                resolveActivityImage={resolveActivityImage}
              />
            );
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScrollToIndexFailed={({ index, averageItemLength }) => {
            requestAnimationFrame(() => {
              const estimatedOffset = averageItemLength
                ? Math.max(0, averageItemLength * index)
                : 0;
              listRef.current?.scrollToOffset({ offset: estimatedOffset, animated: true });
            })
          }}
          contentContainerStyle={
            {
              gap: Math.round(shorterSide * 0.01),
              paddingTop: listTopPadding,
              paddingBottom: isPortrait ? Math.max(120, insets.bottom + 80): 0,
            }
          }

          // footer button that follows the last card
          ListFooterComponent={
            isPortrait ? (
              <AddCardFooter
                onPress={addEmptySlot}
                isPortrait={isPortrait}
                styles={styles}
                cardWidth={styles.cardWidth || width * 0.4}
              />
            ) : null
          }
          ListFooterComponentStyle={
            isPortrait
              ? {
                justifyContent: 'center',
                paddingTop: 20,
                paddingBottom: Math.max(20, insets.bottom),
              }
              : null
          }
        />
        {!isPortrait ? (
          // Add button absolutely positioned in landscape orientation
          <View pointerEvents="box-none" style={styles.landscapeAddButton}>
            <TouchableOpacity onPress={addEmptySlot} style={styles.addButton}>
              <Text style={styles.addText}>Add Card</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <BackButton onPress={() => navigation.goBack()} style={{ zIndex: 10 }} />
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Save routine"
        disabled={!isSaveEnabled}
        onPress={() => setIsSaveModalVisible(true)}
        style={[styles.saveButton, { top: topButtonOffset + (isHandheld ? 0 : 8) }]}
      >
        <Text style={{ 
          color: isSaveEnabled ? "#2b7cceff" : "#8f8f8f", 
          fontSize: Math.round(18 * (isHandheld ? 1 : iconScale)), 
          fontWeight: "600", 
        }}>
          save
        </Text>
      </TouchableOpacity>

      <ImageCardCreatorModal
        visible={isNewCardVisible}
        modalStep={modalStep}
        setModalStep={setModalStep}
        slotRef={slotIndexRef}
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
        initialTitle={newBoardTitle}
        onClose={() => { setIsSaveModalVisible(false); pendingActionRef.current = null; }}
        onSave={(title) => saveCurrentRoutineBoard(title)}
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
