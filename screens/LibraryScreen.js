// Flatlist of all available activity cards for users to choose from

import { useEffect, useState, useRef } from "react";
import { Text, View, FlatList, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import styles from './styles/LibraryStyles';
import { activityLibrary } from "../data/ActivityLibrary";
import { setActivityCallback, triggerActivityCallback } from "./components/CallbackStore";
import Search from "../assets/icons/search.svg";
import { allCategories } from '../data/Categories';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useHandheldPortraitLock from "../utilities/useHandheldPortraitLock";
import BackButton from "./components/BackButton";
import ActivityCard from "./components/ActivityCard";
import getCardBaseStyles from "./styles/CardBaseStyles";

const LibraryScreen = ({ navigation, route }) => {  
  const slot = route?.params?.slot;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categorySettings, setCategorySettings] = useState(allCategories);
  const modalRef = useRef(null);
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const { baseStyles, metrics } = getCardBaseStyles(width, height);
  const cardStyles = {
    ...baseStyles,
    card: {
      ...baseStyles.card,
      width: metrics.cardWidth,
    },
  };

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

  const filteredActivities = activityLibrary.filter((activity) => {
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const visibleCategories = categorySettings.filter(cat => cat.visible);

  useEffect(() => {
    if (!slot) {
      console.warn("No slot provided to LibraryScreen");
      return;
    }

    console.log('Library screen received slot:', slot);

    // set activity callback so BoardScreen can handle selection
    setActivityCallback((activity) => {
      console.log('triggering activity with:', activity)

    });
  }, [slot]);

  useHandheldPortraitLock();

  const handlePress = (activity) => {
    if (!slot) return;

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

  const paddingTop = Math.max(60 - insets.top, 0);
  const paddingBottom = Math.max(0 - insets.bottom, 0);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop, paddingBottom }}
      edges={['top', 'bottom', 'left', 'right']}
    >
      <BackButton onPress={() => navigation.goBack()} />
      <View style={{ flex: 1, minHeight: '50%' }}>
        {/* search bar */}
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
        {/* category scroll bar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.tabs}
          contentContainerStyle={{ alignContent: 'center', justifyContent: 'center', gap: 7 }}
        >
          <TouchableOpacity // 'ALL' tab always visible on far left of screen
            key="All"
            onPress={() => setSelectedCategory('All')}
            style={[ styles.tab, {
              backgroundColor: selectedCategory === 'All' ? '#cdedffff' : '#fff',
              borderColor: selectedCategory === 'All' ? '#01a2ffff' : '#ccc',
              borderWidth: selectedCategory === 'All' ? 2 : 1 }
            ]}
          >
            <Text style={[ styles.tabText, { color: selectedCategory === 'All' ? '#01a2ffff' : '#ccc' } ]}>
              All
            </Text>
          </TouchableOpacity>
          {visibleCategories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setSelectedCategory(cat.label)}
              style={[ styles.tab, { 
                backgroundColor: selectedCategory === cat.label ? '#cdedffff' : '#fff', 
                borderColor: selectedCategory === cat.label ? '#01a2ffff' : '#ccc' ,
                borderWidth: selectedCategory === cat.label ? 2 : 1 }
              ]}>
            <Text style={[ styles.tabText, { color: selectedCategory === cat.label ? '#01a2ffff' : '#ccc' }]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}

        </ScrollView>
        {/* list of image cards */}
        <FlatList
          contentContainerStyle={{
            flexGrow: 1, // Fill the screen even with fewer items
            minHeight: 700,
            alignItems: 'center',
          }}
          ListEmptyComponent={<Text style={{ color: '#888', marginTop: 40, textAlign: 'center' }}>No activities in this category</Text>}
          showsVerticalScrollIndicator={false} // remove line on right when scrolling
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ActivityCard
              activity={{ ...item, fromLibrary: true, imageKey: item.id }}
              label=""
              onPress={() => handlePress(item)}
              styles={cardStyles}
              resolveActivityImage={(activity) => activity?.image || null}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default LibraryScreen;
