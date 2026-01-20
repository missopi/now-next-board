// Flatlist of all available activity cards for users to choose from

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  TextInput,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styles from './styles/LibraryStyles';
import { activityLibrary } from "../data/ActivityLibrary";
import { setActivityCallback, triggerActivityCallback } from "./components/CallbackStore";
import Search from "../assets/icons/search.svg";
import { allCategories } from '../data/Categories';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import useHandheldPortraitLock from "../utilities/useHandheldPortraitLock";
import BackButton from "./components/BackButton";
import ActivityCard from "./components/ActivityCard";
import getCardBaseStyles from "./styles/CardBaseStyles";
import DeleteCardModal from "./modals/DeleteCardModal";
import EditCardModal from "./modals/EditCardModal";
import EditCardNameModal from "./modals/EditCardNameModal";
import EditCardImageModal from "./modals/EditCardImageModal";
import { pickImage } from "../utilities/imagePickerHelper";
import { deleteCustomCard, getCachedCustomCards, getCustomCards, updateCustomCard } from "../utilities/CustomCardStore";

const LibraryScreen = ({ navigation, route }) => {
  const slot = route?.params?.slot;
  const isReadOnly = route?.params?.readOnly;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySettings, setCategorySettings] = useState(allCategories);
  const [customCards, setCustomCards] = useState(() => getCachedCustomCards() || []);
  const [deleteCardVisible, setDeleteCardVisible] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [editCardVisible, setEditCardVisible] = useState(false);
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editImageVisible, setEditImageVisible] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const GAP = 8;
  const EDGE = 20;
  const horizontalPadding = EDGE + Math.max(insets.left, insets.right);
  const { baseStyles, metrics } = getCardBaseStyles(width, height);
  const isPortrait = height >= width;
  const isPhone = Math.min(width, height) < 600;
  const rowGap = isPhone ? GAP - 3 : GAP * 1.5;
  const columnGap = isPhone ? 22 : GAP * 3;
  const desiredCols = useMemo(() => {
    if (!isPortrait) {
      if (width >= 1150) return 5;
      if (width >= 800) return 4;
      if (width >= 600) return 3;
      return 3;
    } else {
      if (width >= 1150) return 5;
      if (width >= 800) return 4;
      if (width >= 600) return 3;
      return 2;
    }
  }, [width, isPortrait]);

  // Mirror the column update pattern from AllBoardsScreen to force quick remounts on size change.
  const [numColumns, setNumColumns] = useState(desiredCols);

  useEffect(() => {
    if (numColumns !== desiredCols) {
      setNumColumns(desiredCols);
    }
  }, [desiredCols, numColumns]);

  const listKey = useMemo(
    () => `library-cols-${numColumns}-cat-${selectedCategory}`,
    [numColumns, selectedCategory]
  );
  const containerWidth = Math.max(width - (horizontalPadding * 2), 240);
  const availableWidth = Math.max(containerWidth - (columnGap * (numColumns - 1)), 240);
  const cardWidth = Math.min(metrics.cardWidth, availableWidth / numColumns);
  const cardStyles = {
    ...baseStyles,
    card: {
      ...baseStyles.card,
      width: cardWidth,
      marginHorizontal: 0, // prevent double spacing now that column gap handles gutters
    },
  };
  const customTitleSize = isPhone ? Math.max(metrics.textBody * 1.1, 12) : Math.max(metrics.textBody * 0.5, 12);
  const customCardStyles = useMemo(() => ({
    ...cardStyles,
    card: {
      ...cardStyles.card,
      padding: isPhone ? '4%' : '2.5%',
    },
    image: {
      ...cardStyles.image,
      marginBottom: Math.max(metrics.textBody * 0.3, 4),
    },
    title: {
      ...cardStyles.title,
      fontSize: customTitleSize,
      marginTop: 2,
    },
  }), [cardStyles, metrics.textBody, customTitleSize]);

  useEffect(() => {
    if (!visibleCategories.some(cat => cat.label === selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [categorySettings]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const saved = await AsyncStorage.getItem('categorySettings');
        if (saved) {
          setCategorySettings(JSON.parse(saved));
        }
      } catch (e) {
        console.error('Failed to load category settings', e);
      }
    };
    loadSettings();
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const loadCustomCards = async () => {
        const saved = await getCustomCards();
        if (!isActive) return;
        setCustomCards((current) => {
          if (current.length === saved.length && saved.every((card, index) => card.id === current[index]?.id)) {
            return current;
          }
          return saved;
        });
      };
      loadCustomCards();
      return () => {
        isActive = false;
      };
    }, [])
  );

  const combinedActivities = useMemo(() => {
    const userCards = customCards.map((card) => ({
      id: card.id,
      name: card.name,
      category: card.category || "Personal Care",
      image: card.imageUri,
      isCustom: true,
    }));
    const libraryCards = activityLibrary.map((card) => ({
      ...card,
      isCustom: false,
    }));
    return [...userCards, ...libraryCards];
  }, [customCards]);

  const filteredActivities = combinedActivities.filter((activity) => {
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter out the manual "All" tab so it only renders once.
  const visibleCategories = categorySettings.filter(cat => cat.visible && cat.key !== 'All');

  useEffect(() => {
    if (!slot && !isReadOnly) {
      console.warn("No slot provided to LibraryScreen");
      return;
    }

    // set activity callback so BoardScreen can handle selection
    if (slot) {
      setActivityCallback((activity) => {
        console.log('triggering activity with:', activity);
      });
    }
  }, [slot, isReadOnly]);

  useHandheldPortraitLock();

  const listRef = useRef(null);

  useEffect(() => {
    // Reset scroll when filters change so cards start at the top of the list.
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [selectedCategory, searchQuery]);

  const handlePress = (activity) => {
    if (!slot || isReadOnly) return;

    if (activity.isCustom) {
      const customImage = typeof activity.image === "string"
        ? { uri: activity.image }
        : activity.image;
      const simplifiedActivity = {
        id: activity.id,
        name: activity.name,
        category: activity.category,
        image: customImage,
      };

      triggerActivityCallback(slot, simplifiedActivity);
      navigation.goBack();
      return;
    }

    const simplifiedActivity = {
      id: activity.id,
      name: activity.name,
      category: activity.category,
      fromLibrary: true,
      imageKey: activity.id,
    };

    triggerActivityCallback(slot, simplifiedActivity);
    navigation.goBack();
  };

  const handleDeleteCard = async () => {
    if (!cardToDelete) return;
    const updated = await deleteCustomCard(cardToDelete.id);
    setCustomCards(updated);
    setDeleteCardVisible(false);
    setCardToDelete(null);
  };

  const handleOpenEdit = (activity) => {
    if (!activity?.isCustom) return;
    setCardToEdit(activity);
    setEditCardVisible(true);
  };

  const handleCloseEdit = () => {
    setEditCardVisible(false);
    setCardToEdit(null);
  };

  const handleChangeName = () => {
    setEditCardVisible(false);
    setEditNameVisible(true);
  };

  const handleSaveName = async (name) => {
    if (!cardToEdit) return;
    const updated = await updateCustomCard(cardToEdit.id, { name });
    setCustomCards(updated);
    setEditNameVisible(false);
    setCardToEdit(null);
  };

  const handleChangeImage = () => {
    setEditCardVisible(false);
    setEditImageVisible(true);
  };

  const handlePickImage = async (source) => {
    if (!cardToEdit) return;
    setEditImageVisible(false);
    const newImageUri = await pickImage(source);
    if (!newImageUri) {
      setCardToEdit(null);
      return;
    }
    const updated = await updateCustomCard(cardToEdit.id, { imageUri: newImageUri });
    setCustomCards(updated);
    setCardToEdit(null);
  };

  const paddingTop = Math.max(40 - insets.top, 0);
  const paddingBottom = Math.max(0 - insets.bottom, 0);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop, paddingBottom, backgroundColor: "#f7fbff" }}
      edges={['top', 'left', 'right']}
    >
      <BackButton onPress={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: horizontalPadding, paddingBottom: 8 }}>
        <View style={styles.searchContainer}>
          <Search width={20} height={20} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#777'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.tabs, { marginTop: 10 }]}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', gap: 7 }}
        >
          <TouchableOpacity
            key="All"
            onPress={() => setSelectedCategory('All')}
            style={[styles.tab, {
              backgroundColor: selectedCategory === 'All' ? '#cdedffff' : '#fff',
              borderColor: selectedCategory === 'All' ? '#2b7cceff' : '#fff',
              borderWidth: selectedCategory === 'All' ? 2 : 1
            }]}
          >
            <Text style={[styles.tabText, { color: selectedCategory === 'All' ? '#2b7cceff' : '#ccc' }]}>
              All
            </Text>
          </TouchableOpacity>
          {visibleCategories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setSelectedCategory(cat.label)}
              style={[styles.tab, {
                backgroundColor: selectedCategory === cat.label ? '#cdedffff' : '#fff',
                borderColor: selectedCategory === cat.label ? '#2b7cceff' : '#fff',
                borderWidth: selectedCategory === cat.label ? 2 : 1
              }]}
            >
              <Text style={[styles.tabText, { color: selectedCategory === cat.label ? '#2b7cceff' : '#ccc' }]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        ref={listRef}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          gap: rowGap,
        }}
        columnWrapperStyle={numColumns > 1 ? { gap: columnGap, justifyContent: 'flex-start' } : undefined}
        ListEmptyComponent={<Text style={{ color: '#888',paddingTop: 20, textAlign: 'center' }}>No activities in this category</Text>}
        showsVerticalScrollIndicator={false}
        data={filteredActivities}
        key={listKey}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={{ ...item, fromLibrary: !item.isCustom, imageKey: item.id }}
            label=""
            onPress={() => {
              if (item.isCustom && (isReadOnly || !slot)) {
                handleOpenEdit(item);
                return;
              }
              handlePress(item);
            }}
            onLongPress={() => {
              if (!item.isCustom) return;
              setCardToDelete(item);
              setDeleteCardVisible(true);
            }}
            styles={item.isCustom ? customCardStyles : cardStyles}
            resolveActivityImage={(activity) => activity?.image || null}
          />
        )}
      />
      <DeleteCardModal
        visible={deleteCardVisible}
        card={cardToDelete}
        onClose={() => {
          setDeleteCardVisible(false);
          setCardToDelete(null);
        }}
        onDelete={handleDeleteCard}
      />
      <EditCardModal
        visible={editCardVisible}
        card={cardToEdit}
        onChangeImage={handleChangeImage}
        onChangeName={handleChangeName}
        onClose={handleCloseEdit}
      />
      <EditCardNameModal
        visible={editNameVisible}
        initialName={cardToEdit?.name || ""}
        onSave={handleSaveName}
        onClose={() => {
          setEditNameVisible(false);
          setCardToEdit(null);
        }}
      />
      <EditCardImageModal
        visible={editImageVisible}
        onChooseCamera={() => handlePickImage("camera")}
        onChooseGallery={() => handlePickImage("gallery")}
        onClose={() => {
          setEditImageVisible(false);
          setCardToEdit(null);
        }}
      />
    </SafeAreaView>
  );
};

export default LibraryScreen;
