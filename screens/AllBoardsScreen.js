import { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, TextInput, useWindowDimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activityLibrary } from "../data/ActivityLibrary";
import { getBoards } from '../utilities/BoardStore';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AddModal from './modals/AddModal';
import styles from './styles/AllBoardsStyles';
import DeleteModal from './modals/DeleteModal';
import Search from "../assets/icons/search.svg";
import * as ScreenOrientation from 'expo-screen-orientation';

export default function HomeScreen({ navigation, route }) {
  const [boards, setBoards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);

  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
  const isIosPhone = Platform.OS === 'ios' && !Platform.isPad;
  const isIpad = Platform.OS === 'ios' && Platform.isPad;

  // ---------- Layout constants ----------
  // Single source of truth for spacing so everything stays consistent
  const GAP = 12;            // space between items
  const EDGE = 16;           // uniform screen padding
  const CARD_INNER = 10;     // inner padding

  const desiredCols = useMemo(() => {
    if (!isPortrait) {
      if (width >= 1200) return 4;
      if (width >= 900) return 3;
      if (width >= 600) return 2;
      return 2;
    } else {
      if (width >= 1200) return 4;
      if (width >= 900) return 3;
      if (width >= 600) return 2;
      return 1;
    }
  }, [width, isPortrait]);

  // hold the active columns in state (so we can control when the list remounts)
  const [numColumns, setNumColumns] = useState(desiredCols);

  // update columns AFTER layout changes; this triggers a remount via the key below
  useEffect(() => {
    if (numColumns !== desiredCols) {
      setNumColumns(desiredCols);
    }
  }, [desiredCols, numColumns]);

  // force-remount key
  const listKey = useMemo(() => `boards-cols-${numColumns}`, [numColumns]);

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

  useFocusEffect(
    useCallback(() => {
      const lockOrientation = async () => {
        try {
          if (isIosPhone) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          } else if (isIpad) {
            await ScreenOrientation.unlockAsync();
          }
        } catch (error) {
          console.warn('Could not set orientation on Home screen', error);
        }
      };

      lockOrientation();

      return () => {
        if (isIosPhone || isIpad) {
          ScreenOrientation.unlockAsync().catch(() => { });
        }
      };
    }, [isIosPhone, isIpad])
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

  function resolveActivityImage(card) {
    if (!card) return null;
    if (card.fromLibrary && card.imageKey) {
      const match = activityLibrary.find(a => a.id === card.imageKey);
      return match ? match.image : null;
    }
    return card.image || null;
  }

  const totalGaps = (numColumns - 1) * GAP;
  const available = width - (EDGE * 2) - totalGaps;
  const itemWidth = Math.floor(available / numColumns);

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
      style={[styles.boardCard,
      {
        width: itemWidth,
        marginRight: GAP,
        marginBottom: GAP,
        padding: CARD_INNER,
      }
      ]}
    >
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.boardHeader}>
          <Text style={styles.boardTitle}>{item.title || 'No Title'}</Text>
        </View>

        <View style={styles.boardContent}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {item.cards.slice(0, 3).map((card, idx) => {
              const extraCount = item.cards.length - 3;
              const isLastVisible = idx === 2 && extraCount > 0;

              return (
                <View key={idx} style={styles.shadowWrapper}>
                  <View style={styles.cardPreview}>
                    <View style={styles.imageWrapper}>
                      {(() => {
                        const resolvedImage = resolveActivityImage(card);

                        if (!resolvedImage) {
                          return (
                            <View style={[styles.cardImage, {
                              backgroundColor: '#f2f2f2',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }]}>
                              <Text style={{ color: '#aaa', fontSize: 12 }}>No image</Text>
                            </View>
                          );
                        }

                        // Check if it’s an SVG or bitmap
                        const isSvg = typeof resolvedImage === 'function';
                        const ImageComponent = isSvg ? resolvedImage : null;

                        return isSvg ? (
                          <ImageComponent width='80' height='75' style={styles.libraryImage} preserveAspectRatio="none" />
                        ) : (
                          <Image
                            source={typeof resolvedImage === 'string' ? { uri: resolvedImage } : resolvedImage}
                            style={[styles.cardImage, isLastVisible && { opacity: 0.7 }]}
                            resizeMode="cover"
                          />
                        );
                      })()}

                      {/* Overlay text for +N */}
                      {isLastVisible && (
                        <View style={styles.overlayContainer}>
                          <Text style={styles.overlayText}>+{extraCount}</Text>
                        </View>
                      )}
                    </View>
                  </View>
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
          <Feather name="edit" size={20} color="#999" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const isPhonePortrait = isPortrait && width < 600;
  const stackGap = isPhonePortrait ? 6 : 10;

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: EDGE }} edges={['left', 'right', 'bottom']}>
      <View>
        <View
          style={[
            styles.searchTabsRow,
            {
              flexDirection: isPhonePortrait ? 'column' : 'row',
              gap: stackGap,
              marginTop: 10,
              marginBottom: isPhonePortrait ? stackGap : 16,
            }
          ]}
        >
          <View style={[
            styles.searchContainer,
            {
              flex: isPhonePortrait ? 0 : 1,
              width: isPhonePortrait ? '100%' : undefined,
              marginBottom: isPhonePortrait ? 0 : undefined,
            }
          ]}>
            <Search width={20} height={20} style={styles.searchIcon} />
            <TextInput
              placeholder="Search"
              placeholderTextColor={'#777'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>

          <View style={[
            styles.tabs,
            {
              width: isPhonePortrait ? '100%' : 'auto',
              marginBottom: isPhonePortrait ? stackGap : undefined,
            }
          ]}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <FlatList
          key={listKey}
          data={filteredBoards}
          keyExtractor={(item) => item.id}
          renderItem={renderBoard}
          contentContainerStyle={{ paddingBottom: EDGE }}
          showsVerticalScrollIndicator={false}
          numColumns={numColumns}
          {...(numColumns > 1
            ? { columnWrapperStyle: { marginRight: -GAP } }
            : undefined)}
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
    </SafeAreaView>
  );
};
