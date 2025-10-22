import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist';
import RoutineCard from "./components/RoutineCard";
import styles from "./styles/RoutineStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./components/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import SaveModal from "./components/SaveModal";

const RoutineScreen = ({ navigation, route }) => {
  const { mode, board } = route.params || {};
  const [isSaveModalVisible, setIsSaveModalVisible] = useState(false);

  // track the activities added
  const [activities, setActivities] = useState(() => {
    return mode === 'new'
      ? [{ id: uuid.v4(), name: null, image: null }]
      : [];
  });

  // title
  const [newBoardTitle, setNewBoardTitle] = useState('');

  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  // modal steps: choose || create || preview
  const [modalStep, setModalStep] = useState('choose');

  // saving boards
  const [currentBoardId, setCurrentBoardId] = useState(null);

  useEffect(() => {
    console.log('RoutineScreen mount/params', { mode, activities });
  }, [mode, activities]);

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board) {
      loadRoutineBoard(board);
    }
  }, [mode, board]);

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

  const slotIndexRef = useRef(null);

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
  };

  function handleSetActivity(activity) {
    const index = slotIndexRef.current;
    if (typeof index === 'number') {
      const updated = [...activities];
      updated[index] = { ...activity, id: updated[index]?.id || uuid.v4() };
      setActivities(updated);
    }
    closeModal();
    slotIndexRef.current = null;
  }

  const handleImagePick = async (type) => {
    const imageUri = await pickImage(type);
    if (imageUri) {
      setNewCardImage(imageUri);
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
  };

  const handleSavePress = () => {
    setIsSaveModalVisible(true);
  };

  const saveCurrentRoutineBoard = async (titleFromModal) => {
    const titleToUse = titleFromModal || newBoardTitle;

    if (!titleToUse || titleToUse.trim() === "") {
      alert("Please give your routine a title before saving.");
      return;
    }

    const validActivities = activities.filter(a => a && a.image && a.image.uri);
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
  };

  const loadRoutineBoard = (board) => {
    const loaded = (board.cards || []).map(card => ({ ...card, id: card.id || uuid.v4() }));
    setNewBoardTitle(board.title);
    setActivities(loaded);
    setCurrentBoardId(board.id);
  };

  const addEmptySlot = () => {
    const newSlot = { id: uuid.v4(), name: null, image: null };
    setActivities([...activities, newSlot]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <DraggableFlatList
          data={activities}
          extraData={activities}
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
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 80 }}  // leave room at bottom for button
          showsVerticalScrollIndicator={false} 
        />
      </View>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={addEmptySlot}
          style={styles.saveButton}
        >
          <Text style={styles.saveText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSavePress}
          style={styles.saveButton}
>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

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
        onClose={() => setIsSaveModalVisible(false)}
        onSave={(title) => saveCurrentRoutineBoard(title)}
      />
    </View>
  );
};

export default RoutineScreen;
