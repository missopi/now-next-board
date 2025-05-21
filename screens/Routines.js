import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import CogIcon from "../assets/icons/cog.svg";
import RoutineCard from "./components/RoutineCard";
import styles from "./styles/RoutineStyles";
import { setActivityCallback } from "./components/CallbackStore";
import { pickImage } from "../utilities/imagePickerHelper";
import ImageCardCreatorModal from "./components/ImageCardCreatorModal";

const RoutineScreen = ({ navigation }) => {
  // track the 5 activities
  const [firstActivity, setFirstActivity] = useState(null);
  const [secondActivity, setSecondActivity] = useState(null);
  const [thirdActivity, setThirdActivity] = useState(null);
  const [fourthActivity, setFourthActivity] = useState(null);
  const [fifthActivity, setFifthActivity] = useState(null);

  const slotMap = {
    'First Activity' : setFirstActivity,
    'Second Activity' : setSecondActivity,
    'Third Activity' : setThirdActivity,
    'Fourth Activity' : setFourthActivity,
    'Fifth Activity' : setFifthActivity,
  };

  // modal for settings
  const [settingsVisible, setSettingsVisible] = useState(false);

  // modal for adding custom card
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);

  // modal steps: choose || create || preview
  const [modalStep, setModalStep] = useState('choose');

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
    const currentSlot = typeof slotRef.current === 'string'
      ? slotRef.current
      : slotRef.current?.slot;

    const setSlot = slotMap[currentSlot];
    if (setSlot) setSlot(activity);
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

    const setSlot = slotMap[currentSlot];
    if (setSlot) setSlot(newCard);
    else console.warn('Invalid slot. Could not assign activity.');
    
    // reset and close
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle('');
    slotRef.current = null;
  };

  return (
    <View style={{ flex: 1 }}>
      <RoutineCard 
        firstActivity={firstActivity}
        secondActivity={secondActivity} 
        thirdActivity={thirdActivity} 
        fourthActivity={fourthActivity}
        fifthActivity={fifthActivity}
        onSelectSlot={onSelectSlot}
      />

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
            <Text style={styles.closeX}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default RoutineScreen;


