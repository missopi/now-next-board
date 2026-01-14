import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ActivityCard from "./components/ActivityCard";
import BackButton from "./components/BackButton";
import ImageCardCreatorModal from "./modals/ImageCardCreatorModal";
import SaveCardModal from "./modals/SaveCardModal";
import StatusModal from "./modals/StatusModal";
import { allCategories } from "../data/Categories";
import { getCardImageUri, saveCustomCard } from "../utilities/CustomCardStore";
import { pickImage } from "../utilities/imagePickerHelper";
import getCardBaseStyles from "./styles/CardBaseStyles";
import useHandheldPortraitLock from "../utilities/useHandheldPortraitLock";

const LibraryCardCreatorScreen = ({ navigation }) => {
  const [draftCard, setDraftCard] = useState(null);
  const [newCardImage, setNewCardImage] = useState(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isNewCardVisible, setIsNewCardVisible] = useState(false);
  const [isPickingImage, setIsPickingImage] = useState(false);
  const [modalStep, setModalStep] = useState("create");
  const [isSaveCardModalVisible, setIsSaveCardModalVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState({ visible: false, title: "", message: "" });
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const shorter = Math.min(width, height);

  useHandheldPortraitLock();

  const categoryOptions = useMemo(
    () => allCategories.filter((cat) => cat.key !== "All").map((cat) => cat.label),
    []
  );

  const cardStyles = useMemo(() => {
    const { baseStyles, metrics } = getCardBaseStyles(width, height);
    const isTablet = shorter >= 700;
    const cardWidth = isTablet
      ? Math.min(shorter * 0.9, metrics.cardWidth + 60)
      : Math.min(shorter * 0.82, metrics.cardWidth);
    const cardPadding = isTablet ? "5%" : baseStyles.card.padding;
    return {
      ...baseStyles,
      card: {
        ...baseStyles.card,
        width: cardWidth,
        padding: cardPadding,
      },
    };
  }, [width, height, shorter]);

  const styles = useMemo(() => {
    const buttonWidth = Math.min(width * 0.82, 360);
    const buttonFontSize = Math.max(16, Math.min(shorter * 0.045, 22));
    const isTablet = shorter >= 700;
    const primaryButtonSpacing = isTablet ? 50 : 18;
    const secondaryButtonSpacing = 12;
    return StyleSheet.create({
      safe: {
        flex: 1,
      },
      content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: Math.max(insets.bottom, 20),
        paddingTop: 20,
      },
      button: {
        marginTop: secondaryButtonSpacing,
        backgroundColor: "#0792e2",
        borderRadius: 16,
        paddingVertical: 14,
        minWidth: buttonWidth,
        minHeight: 52,
        alignItems: "center",
        justifyContent: "center",
      },
      primaryButton: {
        marginTop: primaryButtonSpacing,
      },
      secondaryButton: {
        marginTop: secondaryButtonSpacing,
        backgroundColor: "#e6f1fb",
        borderRadius: 16,
        paddingVertical: 14,
        minWidth: buttonWidth,
        minHeight: 52,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#0792e2",
      },
      buttonDisabled: {
        backgroundColor: "#b7d7ef",
      },
      buttonText: {
        color: "#fff",
        fontSize: buttonFontSize,
        fontWeight: "700",
      },
      secondaryButtonText: {
        color: "#155a8f",
        fontSize: buttonFontSize,
        fontWeight: "700",
      },
    });
  }, [insets.bottom, shorter, width]);

  const openNewCardModal = () => {
    setNewCardTitle("");
    setNewCardImage(null);
    setIsPickingImage(false);
    setModalStep("create");
    setIsNewCardVisible(true);
  };

  const closeModal = () => {
    setIsNewCardVisible(false);
    setNewCardImage(null);
    setNewCardTitle("");
    setIsPickingImage(false);
    setModalStep("create");
  };

  const handleImagePick = async (type) => {
    setModalStep("create");
    setIsPickingImage(true);
    const imageUri = await pickImage(type);
    if (imageUri) {
      setNewCardImage(imageUri);
    } else {
      console.warn("[LibraryCardCreator] no image returned");
    }
  };

  const saveNewCardDraft = () => {
    if (!newCardImage || !newCardTitle.trim()) {
      alert("Please provide both an image and title.");
      return;
    }
    setDraftCard({
      name: newCardTitle.trim(),
      image: { uri: newCardImage },
    });
    closeModal();
  };

  const openSaveModal = () => {
    if (!draftCard) {
      alert("Please add a card first.");
      return;
    }
    setIsSaveCardModalVisible(true);
  };

  const closeSaveModal = () => {
    setIsSaveCardModalVisible(false);
  };

  const handleSaveCard = async (category) => {
    if (!draftCard) return;
    const imageUri = getCardImageUri(draftCard);
    const name = draftCard?.name?.trim();
    if (!name || !imageUri) {
      alert("Please make sure this card has a title and image.");
      return;
    }

    const result = await saveCustomCard({ name, category, imageUri });
    closeSaveModal();
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
    setDraftCard(null);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom", "left", "right"]}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <ActivityCard
          activity={draftCard}
          label="Add Card"
          onPress={openNewCardModal}
          styles={cardStyles}
        />
        <TouchableOpacity
          onPress={openSaveModal}
          style={[
            styles.button,
            styles.primaryButton,
            !draftCard && styles.buttonDisabled,
          ]}
          disabled={!draftCard}
        >
          <Text style={styles.buttonText}>Save to library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LibraryScreen", { readOnly: true })}
          style={styles.button}
        >
          <Text style={styles.buttonText}>View Library</Text>
        </TouchableOpacity>
      </View>

      <ImageCardCreatorModal
        visible={isNewCardVisible}
        modalStep={modalStep}
        setModalStep={setModalStep}
        slotRef={{ current: null }}
        handleSetActivity={() => { }}
        newCardTitle={newCardTitle}
        setNewCardTitle={setNewCardTitle}
        isPickingImage={isPickingImage}
        setIsPickingImage={setIsPickingImage}
        pickImage={handleImagePick}
        newCardImage={newCardImage}
        setNewCardImage={setNewCardImage}
        setIsNewCardVisible={setIsNewCardVisible}
        saveNewCard={saveNewCardDraft}
        setActivityCallback={() => { }}
        navigation={navigation}
        closeModal={closeModal}
      />
      <SaveCardModal
        visible={isSaveCardModalVisible}
        cardName={draftCard?.name || ""}
        categories={categoryOptions}
        initialCategory={draftCard?.category || ""}
        onSave={handleSaveCard}
        onClose={closeSaveModal}
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

export default LibraryCardCreatorScreen;
