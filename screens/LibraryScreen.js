// Flatlist of all available activity cards for users to choose from

import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, SafeAreaView, ScrollView, TextInput } from "react-native";
import styles from './styles/styles';
import { activityLibrary } from "../data/ActivityLibrary";
import { setActivityCallback, triggerActivityCallback } from "./components/CallbackStore";

const LibraryScreen = ({ navigation, route }) => {  
  const slot = route?.params?.slot;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All', 
    'Personal Care', 
    'Food', 
    'Holiday & Travel', 
    'Activities', 
    'Places', 
    'Medical', 
    'Early Years',
    'School'
  ];

  const filteredActivities = activityLibrary.filter((activity) => {
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory;
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                marginRight: 8,
                backgroundColor: selectedCategory === cat ? '#444' : '#ccc',
                borderRadius: 18,
                minHeight: 35,
              }}
            >
              <Text style={{ textAlign: 'center', color: selectedCategory === cat ? 'white' : 'black' }}>{cat}</Text>
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
    </SafeAreaView>
  );
};

export default LibraryScreen;