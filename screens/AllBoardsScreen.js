import { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, FlatList, Image, ScrollView, Modal, TouchableOpacity, Pressable } from 'react-native';
import { getBoards, deleteBoard } from '../utilities/BoardStore';
import { useFocusEffect } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';
import styles from './styles/AllBoardsStyles';

export default function HomeScreen({ navigation, route }) {
  const [boards, setBoards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);

  const modalRef = useRef(null);

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

  const handleDelete = async (boardId) => {
    const updated = await deleteBoard(boardId);
    setBoards(updated);
  };

  const navigateToBoard = (board, action = 'edit') => {
    switch (board.type) {
      case 'routine':
        if (action === 'edit') {
          navigation.navigate('Routines', { mode: 'load', board });
        } else if (action === 'view') {
          navigation.navigate('FinishedRoutine', { board });
        } else if (action === 'slideshow') {
          navigation.navigate('Slideshow', { board });
        }
        break;

      case 'nowNextThen':
        if (action === 'edit') {
          navigation.navigate('Now/Next', { mode: 'load', board });
        } else if (action === 'view') {
          navigation.navigate('FinishedNowNext', { board });
        }
        break;

      default:
        console.warn('Unknown board type:', board.type);
    }
  };


  const renderBoard = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
              setSelectedBoard(item);
              modalRef.current?.open();
            }}
      style={styles.boardCard}
    >
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>{item.title || 'No Title'}</Text>
        <TouchableOpacity
          onPress={() => {
            setBoardToDelete(item);
            setDeleteModalVisible(true);
          }}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
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
      <Modal
        transparent
        animationType="fade"
        visible={showAddModal}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Create a new...</Text>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowAddModal(false);
                navigation.navigate('Now/Next');
              }}
            >
              <Text style={styles.optionText}>Now & Next</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                setShowAddModal(false);
                navigation.navigate('Routines');
              }}
            >
              <Text style={styles.optionText}>Routine</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAddModal(false)}
            >
              <Text style={styles.optionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Delete Board</Text>
            <Text style={styles.modalDialog}>Are you sure you want to delete "{boardToDelete?.title}"?</Text>
            <View style={styles.buttonRow}>
              <Pressable
                style={styles.deleteButton}
                onPress={async () => {
                  const updated = await deleteBoard(boardToDelete.id);
                  setBoards(updated);
                  setDeleteModalVisible(false);
                  setBoardToDelete(null);
                }}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
              <Pressable
                style={styles.cancelDeleteButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelDeleteText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {selectedBoard && (
        <Modalize
          ref={modalRef}
          modalHeight={250}
          handlePosition="inside"
          handleStyle={styles.handle}
          modalStyle={styles.modal}
        >
          <View style={{ height: 15 }} />

          {/* Single option group */}
          <View style={styles.group}>
            <TouchableOpacity
              style={[styles.row, { borderBottomWidth: 0 }]}
              onPress={() => {
                modalRef.current?.close();
                navigateToBoard(selectedBoard, 'edit');
              }}
            >
              <Text style={styles.text}>Edit Board</Text>
              <Feather name="edit" size={20} color="#999"  />
            </TouchableOpacity>
          </View>

          {/* Grouped options */}
          <View style={styles.group}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => {
                modalRef.current?.close();
                navigateToBoard(selectedBoard, 'view');
              }}
            >
              <Text style={styles.text}>View Board</Text>
              <Feather name="eye" size={20} color="#999"  />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.row, { borderBottomWidth: 0 }]}
              onPress={() => {
                modalRef.current?.close();
                navigateToBoard(selectedBoard, 'slideshow');
              }}
            >
              <Text style={styles.text}>View Slideshow</Text>
              <Feather name="film" size={20} color="#999" />
            </TouchableOpacity>
          </View> 
        </Modalize>
      )}
    </>
  );
};

