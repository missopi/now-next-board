import { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { getBoards } from '../utilities/BoardStore';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AddModal from './modals/AddModal';
import styles from './styles/AllBoardsStyles';
import DeleteModal from './modals/DeleteModal';

export default function HomeScreen({ navigation, route }) {
  const [boards, setBoards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    // Lock this screen to portrait when mounted
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    
    return () => {
      // Unlock on leaving, so the next screens can rotate freely
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const TAB_TYPE_MAP = {
    'Now & Next': 'nowNextThen',
    'Routine': 'routine',
  };

  const TABS = ['All'].concat(Object.keys(TAB_TYPE_MAP));

  useFocusEffect(
    useCallback(() => {
      const loadBoards = async () => {
        const all = await getBoards();
        setBoards(all);
      };
      loadBoards();
    }, [])
  );

  useEffect(() => {
    console.log('showAddModal param changed:', route.params?.showAddModal);
    if (route.params?.showAddModal) {
      setShowAddModal(true);
      navigation.setParams({ showAddModal: false }); // reset
    }
  }, [route.params?.showAddModal]);

  const filteredBoards = boards.filter((board) => {
    const matchesType = activeTab === 'All' || board.type === TAB_TYPE_MAP[activeTab];
    const matchesSearch = board.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const renderBoard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        if (item.type === 'routine') {
          navigation.navigate('FinishedRoutine', { board: item });
        } else if (item.type === 'nowNextThen') {
          navigation.navigate('FinishedNowNext', { board: item });
        } else {
          console.warn('Unknown board type:', item.type);
        }
      }}
      style={styles.boardCard}
    >
      <View style={{ flexDirection: 'column'}}>
        <View style={styles.boardHeader}>
          <Text style={styles.boardTitle}>{item.title || 'No Title'}</Text>
        </View>

        <View style={styles.boardContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.cards.slice(0, 3).map((card, idx) => {
              const extraCount = item.cards.length - 3;
              const isLastVisible = idx === 2 && extraCount > 0;

              return (
                <View key={idx} style={styles.cardPreview}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={typeof card.image === 'string' ? { uri: card.image } : card.image}
                      style={[styles.cardImage, isLastVisible && { opacity: 0.7 }]}
                    />

                    {/* Overlay text for +N */}
                    {isLastVisible && (
                      <View style={styles.overlayContainer}>
                        <Text style={styles.overlayText}>+{extraCount}</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.cardLabel}>{card.name}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
      
      <View style={styles.buttonColumn}>
        <TouchableOpacity
          onPress={() => {
            setBoardToDelete(item);
            setDeleteModalVisible(true);
          }}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (item.type === 'routine') {
              navigation.navigate('Routines', { mode: 'load', board: item });
            } else if (item.type === 'nowNextThen') {
              navigation.navigate('Now/Next', { mode: 'load', board: item });
            } else {
              console.warn('Unknown board type:', item.type);
            }
          }}
        >
          <Feather name="edit" size={20} color="#999"  />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        {/*<TextInput
          placeholder="Search"
          placeholderTextColor={'#777'}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />*/}

        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText,  activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredBoards}
          keyExtractor={(item) => item.id}
          renderItem={renderBoard}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false} 
        />
      </View>
      <AddModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        navigation={navigation}
      />
      <DeleteModal
        visible={deleteModalVisible}
        boardToDelete={boardToDelete}
        onClose={() => setDeleteModalVisible(false)}
        onDeleted={() => setBoardToDelete(null)}
        setBoards={setBoards}
      />
    </>
  );
};

