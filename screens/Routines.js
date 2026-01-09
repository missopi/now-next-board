// Main routine screen 

import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DraggableFlatList from 'react-native-draggable-flatlist';
import RoutineCard from "./components/RoutineCard";
import getStyles from "./styles/RoutineStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./modals/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import SaveModal from "./modals/SaveModal";
import { activityLibrary } from "../data/ActivityLibrary";
import useHandheldPortraitLock from "../utilities/useHandheldPortraitLock";
import BackButton from "./components/BackButton";

export default function RoutineScreen({ navigation, route }) {
  const { mode, board } = route.params || {};
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // track the activities added
  const [activities, setActivities] = useState(() => {
    if (mode === 'load' && board?.cards?.length) {
      return board.cards.map(card => ({ ...card, id: card.id || uuid.v4() }));
    }
    return [{ id: uuid.v4(), name: null, image: null }];
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

  // automatically add one empty slot for new routines
  useEffect(() => {
    if (mode === 'new' && activities.length === 0) {
      setActivities([{ id: uuid.v4(), name: null, image: null }]);
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
  const listTopPadding = isHandheld ? 50 : 10;
  const styles = getStyles(width, height, "edit");

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
      style={{ paddingHorizontal: 20, flex: 1 }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <View>
        <DraggableFlatList
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
          contentContainerStyle={
            { 
              gap: '1%', 
              paddingTop: listTopPadding, 
              paddingBottom: isPortrait ? 50 : 0,
              paddingLeft: isPortrait ? 0 : 20, 
            }
          }

          // footer button that follows the last card
          ListFooterComponent={
            <AddCardFooter
              onPress={addEmptySlot}
              isPortrait={isPortrait}
              styles={styles}
              cardWidth={styles.cardWidth || width * 0.4}
            />
          }
          ListFooterComponentStyle={
            { 
              justifyContent: 'center', 
              paddingTop: isPortrait ? 20 : 0, 
              paddingBottom: isPortrait ? 80 : 0, 
              paddingRight: isPortrait ? 0 : 80,
              paddingLeft: isPortrait ? 0 : 20, 
            }
          }
        />
      </View>
      <BackButton onPress={() => navigation.goBack()} style={{ zIndex: 10 }} />

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
    </SafeAreaView>
  );
};
