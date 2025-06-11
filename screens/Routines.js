import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, SafeAreaView } from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist';
import CogIcon from "../assets/icons/cog.svg";
import RoutineCard from "./components/RoutineCard";
import RoutineSettingsModal from "./settings/RoutineSettings";
import styles from "./styles/RoutineStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./components/ImageCardCreatorModal";
import uuid from "react-native-uuid";
import { saveBoard, updateBoard } from "../utilities/BoardStore";

const RoutineScreen = ({ navigation, route }) => {
  const { mode, board } = route.params || {};

  // track the activities added
  const [activities, setActivities] = useState([]);

  // title
  const [customTitle, setCustomTitle] = useState('');
  const [newBoardTitle, setNewBoardTitle] = useState('');

  // modal for settings
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#bbb');

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

  // setting cog in header
  useEffect(() => { 
    navigation.setOptions({
      headerTitle: customTitle,
      headerTitleAlign: 'center',
      headerRight: () => (
        <TouchableOpacity onPress={() => setSettingsVisible(true)}>
          <CogIcon width={24} height={24} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, customTitle]);

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
    <SafeAreaView style={styles.container}>
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
                strokeColor={strokeColor}
                drag={drag}
              />
            );
          }}
          contentContainerStyle={{ paddingBottom: 80 }}  // leave room at bottom for button
        />
      </View>


      <TouchableOpacity
        onPress={addEmptySlot}
        style={styles.addEmptySlotButton}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Add Card</Text>
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

      {/*<TouchableOpacity
        onPress={() => {
          if (!newBoardTitle.trim()) {
            alert('Please enter a title for your new routine.');
            return;
          }
          navigation.navigate('FinishedRoutine', { 
            mode: 'new',
            initialTitle: newBoardTitle.trim(), 
          });
        }}
        style={styles.chooserCreateButton}
      >
        <Text style={styles.chooserCreateText}>Create New Routine</Text>
      </TouchableOpacity>*/}

      <Modal visible={settingsVisible} transparent animationType="slide">
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>✕</Text>
          </TouchableOpacity>
          <RoutineSettingsModal strokeColor={strokeColor} setStrokeColor={setStrokeColor} />
          <TouchableOpacity onPress={saveCurrentRoutineBoard}>
            <Text style={styles.saveText}>Save This Routine</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RoutineScreen;
