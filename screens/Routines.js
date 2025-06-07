import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, SafeAreaView, ScrollView } from "react-native";
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
  const [activities, setActivities] = useState([null, null, null]);
  const slotIndexRef = useRef(null);

  // title
  const [customTitle, setCustomTitle] = useState('');

  // modal for settings
  const [settingsVisible, setSettingsVisible] = useState(false);

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

  const handleSetActivity = (activity) => {
    const index = slotIndexRef.current;
    if (typeof index === 'number') {
      const updated = [...activities];
      updated[index] = activity;
      setActivities(updated);
    }
  };

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
    const newCard = { name: newCardTitle.trim(), image: { uri: newCardImage } };
    handleSetActivity(newCard);
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
    slotIndexRef.current = null;
  };

  const saveCurrentRoutineBoard = async () => {
    const board = {
      id: currentBoardId || uuid.v4(),
      type: 'routine',
      title: customTitle,
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
    setCustomTitle(board.title);
    setActivities(board.cards || []);
    setCurrentBoardId(board.id);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {activities.map((activity, index) => (
          <RoutineCard
            key={index}
            activity={activity}
            onPress={() => onSelectSlot(index)}
          />
        ))}

        <TouchableOpacity onPress={() => setActivities([...activities, null])} style={{ marginTop: 20 }}>
          <Text style={{ color: 'blue', textAlign: 'center' }}>+ Add Another Activity</Text>
        </TouchableOpacity>
      </ScrollView>

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
      />

      <Modal
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>x</Text>
          </TouchableOpacity>
          <RoutineSettingsModal />
          <TouchableOpacity onPress={saveCurrentRoutineBoard}>
            <Text style={{ paddingTop: 30, color: 'black', textDecorationLine: 'underline', fontWeight: 'bold', textAlign: 'center' }}>
              Save This Routine
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default RoutineScreen;


