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

const RoutineScreen = ({ navigation, route }) => {
  const { mode, board } = route.params || {};
  const modalRef = useRef(null);

  // track the activities added
  const [activities, setActivities] = useState([]);

  // title
  const [customTitle, setCustomTitle] = useState('');
  const [newBoardTitle, setNewBoardTitle] = useState('');

  // modal for settings
  const [strokeColor, setStrokeColor] = useState('#FFF5B5');

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
      setCustomTitle(route.params.initialTitle);
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
    const board = {
      id: currentBoardId || uuid.v4(),
      type: 'routine',
      title: customTitle,
      cards: activities.filter(Boolean),
      strokeColor,
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
    setCustomTitle(board.title);
    setActivities(loaded);
    setStrokeColor(board.strokeColor || '#bbb');
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
          placeholderTextColor={"#aaa"}
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
      
      <View style={{ flexDirection: 'row', marginHorizontal: 25, marginTop: 10 }}>
        <TouchableOpacity
          onPress={addEmptySlot}
          style={styles.addEmptySlotButton}
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={saveCurrentRoutineBoard}
          style={styles.saveButton}
        >
          <Text style={styles.buttonText}>Save Routine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Slideshow', {
            title: newBoardTitle,
            activities: activities.filter(Boolean),
          })}
          style={styles.slideshowButton}
        >
          <Text style={styles.buttonText}>View Slideshow</Text>
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
    </View>
  );
};

export default RoutineScreen;
