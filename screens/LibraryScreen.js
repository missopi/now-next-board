// Flatlist of all available activity cards for users to choose from

import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView, Switch, TextInput, Modal } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "../data/ActivityLibrary";
import { setActivityCallback, triggerActivityCallback } from "./components/CallbackStore";
import CogIcon from "../assets/icons/cog.svg";
import { defaultCategories } from '../data/Categories';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LibraryScreen = ({ navigation, route }) => {  
  const slot = route?.params?.slot;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [categorySettings, setCategorySettings] = useState(defaultCategories);

  useEffect(() => {
    if (!visibleCategories.some(cat => cat.label === selectedCategory)) {
      setSelectedCategory('All');
    }
  }, [categorySettings]);

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

  const handlePress = (activity) => {
   
    if (!slot) return; // avoid breaking things

    console.log('library picked activity:', activity);
    
    triggerActivityCallback(slot, activity);
    navigation.goBack();
  };


  return ( // wrapped in safeview to respect notches/status bar
    <SafeAreaView style={{ flex: 1, backgroundColor: '#abaf' }}>
      <View style={{ flex: 1, minHeight: '50%' }}>
        {/* search bar */}
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            margin: 10,
            backgroundColor: '#fff',
          }}
        />
        {/* category scroll bar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={{ marginBottom: 10, paddingHorizontal: 10 }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <TouchableOpacity // 'ALL' tab always visible on far left of screen
            key="All"
            onPress={() => setSelectedCategory('All')}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 14,
              marginRight: 8,
              backgroundColor: selectedCategory === 'All' ? '#444' : '#ccc',
              borderRadius: 18,
              minHeight: 35,
            }}
          >
            <Text style={{ textAlign: 'center', color: selectedCategory === 'All' ? 'white' : 'black' }}>
              All
            </Text>
          </TouchableOpacity>
          {visibleCategories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              onPress={() => setSelectedCategory(cat.label)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                marginRight: 8,
                backgroundColor: selectedCategory === cat.label ? '#444' : '#ccc',
                borderRadius: 18,
                minHeight: 35,
              }}
            >
            <Text style={{ textAlign: 'center', color: selectedCategory === cat.label ? 'white' : 'black' }}>
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
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 20,
          }}
          ListEmptyComponent={<Text style={{ color: '#888', marginTop: 40, textAlign: 'center' }}>No activities in this category</Text>}
          showsVerticalScrollIndicator={false} // remove line on right when scrolling
          data={filteredActivities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => handlePress(item)} 
              style={{ alignItems: 'center', margin: 5 }}
            >
              <Image source={item.image} style={styles.activityImage} />
              <Text style={styles.activityName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal  // setting for toggling on 'then' activity at bottom of screen
        visible={settingsVisible}
        transparent={true}
        animationType="slide"
        supportedOrientations={['portrait']}
        >
        <View style={styles.modalView}>
          <Text style={{ marginVertical: 20, fontSize: 18, fontWeight: 'bold' }}>Show/Hide Categories</Text>
          {categorySettings.map((cat, index) => (
            <View key={cat.key} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 7 }}>
              <Text style={{ flex: 1 }}>{cat.label}</Text>
              <Switch
                value={cat.visible}
                onValueChange={async (newValue) => {
                  const updated = [...categorySettings];
                  updated[index].visible = newValue;
                  setCategorySettings(updated);
                  try {
                    await AsyncStorage.setItem('categorySettings', JSON.stringify(updated));
                  } catch (e) {
                    console.error('Failed to save category settings', e);
                  }
                }}
              />
            </View>
          ))}
          <View style={{ height: 1, backgroundColor: '#ccc', marginVertical: 12 }} />
          <TouchableOpacity
            onPress={async () => {
              setCategorySettings(defaultCategories); // reset
              try {
                await AsyncStorage.setItem('categorySettings', JSON.stringify(defaultCategories));
              } catch (e) {
                console.error('Failed to reset category settings', e);
              }
            }}
            style={{ marginTop: 10, backgroundColor: '#eee', padding: 10, borderRadius: 8, alignItems: 'center' }}
          >
            <Text style={{ color: '#333' }}>Reset to Default</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSettingsVisible(false)}>
            <Text style={styles.closeX}>x</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LibraryScreen;