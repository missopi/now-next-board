import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist';
import RoutineCard from "./components/RoutineCard";
import styles from "./styles/RoutineStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./components/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";
import Footer from "../screens/components/Footer";

const RoutineScreen = ({ navigation, route }) => {
  const { mode, board } = route.params || {};
  const modalRef = useRef(null);

  // track the activities added
  const [activities, setActivities] = useState([]);

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

  // loading saved boards
  useEffect(() => {
    if (mode === 'load' && board) {
      loadRoutineBoard(board);
    }
  }, [mode, board]);

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

  const saveCurrentRoutineBoard = async () => {
    // check if routine title is missing
    if (!newBoardTitle || newBoardTitle.trim() === "") {
      alert("Please give your routine a title before saving.");
      return;
    }

    // check if there are no valid activities with an image
    const validActivities = activities.filter(
      (a) => a && a.image && a.image.uri
    );

    if (validActivities.length === 0) {
      alert("Please add at least one activity with an image before saving.");
      return;
    }
    
    const board = {
      id: currentBoardId || uuid.v4(),
      type: 'routine',
      title: newBoardTitle,
      cards: activities.filter(Boolean),
    };
    if (currentBoardId) {
      await updateBoard(board);
    } else {
      await saveBoard(board);
    }
    setCurrentBoardId(board.id);
    alert('Routine saved!');
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
      <View style={styles.chooserTop}>
        <TextInput
          placeholder="Enter new routine title..."
          value={newBoardTitle}
          onChangeText={setNewBoardTitle}
          style={styles.chooserTextInput}
          placeholderTextColor={"#777"}
        />
      </View>

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
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 80 }}  // leave room at bottom for button
          showsVerticalScrollIndicator={false} 
        />
      </View>
      
      <View style={{ flexDirection: 'row', marginHorizontal: 25, marginVertical: 5 }}>
        <TouchableOpacity
          onPress={addEmptySlot}
          style={styles.addEmptySlotButton}
        >
          <Text style={styles.blueText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={saveCurrentRoutineBoard}
          style={styles.saveButton}
        >
          <Text style={styles.blueText}>Save Routine</Text>
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

      < Footer />
    </View>
  );
};

export default RoutineScreen;
