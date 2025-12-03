import { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, Image, ScrollView, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { activityLibrary } from "../data/ActivityLibrary";
import { getBoards } from '../utilities/BoardStore';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import AddModal from './modals/AddModal';
import styles from './styles/AllBoardsStyles';
import DeleteModal from './modals/DeleteModal';
import Search from "../assets/icons/search.svg";
import useHandheldPortraitLock from '../utilities/useHandheldPortraitLock';

const TAB_TYPE_MAP = {
  'Now & Next': 'nowNextThen',
  'Routine': 'routine',
};

const TABS = ['All'].concat(Object.keys(TAB_TYPE_MAP));

// Layout constants
const GAP = 12;            // space between items
const EDGE = 12;           // uniform screen padding
const CARD_INNER = 10;     // inner padding

export default function HomeScreen({ navigation, route }) {
  const [boards, setBoards] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);

  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

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

  useFocusEffect(
    useCallback(() => {
      const loadBoards = async () => {
        const all = await getBoards();
        setBoards(all);
      };
      loadBoards();
    }, [])
  );

  useHandheldPortraitLock();

  useEffect(() => {
    if (route.params?.showAddModal) {
      setShowAddModal(true);
      navigation.setParams({ showAddModal: false }); // reset
    }
  }, [route.params?.showAddModal]);

  const libraryImageMap = useMemo(() => {
    return activityLibrary.reduce((acc, item) => {
      acc[item.id] = item.image;
      return acc;
    }, {});
  }, []);

  const filteredBoards = useMemo(() => boards.filter((board) => {
    const matchesType = activeTab === 'All' || board.type === TAB_TYPE_MAP[activeTab];
    const matchesSearch = board.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  }), [boards, activeTab, searchQuery]);

  const resolveActivityImage = useCallback((card) => {
    if (!card) return null;
    if (card.fromLibrary && card.imageKey) {
      return libraryImageMap[card.imageKey] || null;
    }
    return card.image || null;
  }, [libraryImageMap]);

  // gap between items (none when single column)
  const totalGaps = (numColumns - 1) * GAP;
  const available = width - (EDGE * 2) - totalGaps;
  const itemWidth = Math.floor(available / numColumns);

  const cardSpacingStyle = useMemo(() => ({
    marginRight: GAP,
    marginBottom: GAP,
  }), [numColumns]);

  const renderBoard = useCallback(({ item }) => (
    <View style={[styles.cardWrapper, cardSpacingStyle, { width: itemWidth }]}>
      <View style={[styles.boardCard, { padding: CARD_INNER }]}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Delete ${item.title || 'board'}`}
          hitSlop={8}
          style={styles.deleteButton}
          onPress={() => {
            setBoardToDelete(item);
            setDeleteModalVisible(true);
          }}
        >
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cardBody}
          activeOpacity={0.7}
          onPress={() => {
            if (item.type === 'routine') {
              navigation.navigate('FinishedRoutine', { board: item });
            } else if (item.type === 'nowNextThen') {
              navigation.navigate('FinishedNowNext', { board: item });
            } else {
              console.warn('Unknown board type:', item.type);
            }
          }}
        >
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
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonColumn}>
          {item.type === 'routine' && (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Play slideshow for ${item.title || 'routine'}`}
              hitSlop={4}
              onPress={() => {
                const slides = (item.cards || []).filter(
                  (card) => card && ((card.image && card.image.uri) || card.fromLibrary)
                );
                navigation.navigate('Slideshow', {
                  title: item.title || 'Routine',
                  activities: slides,
                });
              }}
            >
              <Feather name="play-circle" size={22} color="#999" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Edit ${item.title || 'board'}`}
            hitSlop={4}
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
      </View>
    </View>
  ), [cardSpacingStyle, itemWidth, navigation, resolveActivityImage]);

  const isPhonePortrait = isPortrait && width < 600;
  const stackGap = isPhonePortrait ? 8 : 10;
  
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: EDGE }} edges={['left', 'right', 'bottom']}>
      <View>
        <View
          style={[
            styles.headerRow,
            {
              flexDirection: isPhonePortrait ? 'column' : 'row',
              gap: stackGap,
              marginTop: 15,
              marginBottom: isPhonePortrait ? 3 : 10,
            }
          ]}
        >
          <View style={[
            styles.searchContainer,
            {
              flex: isPhonePortrait ? 0 : 1,
              width: isPhonePortrait ? '100%' : undefined,
              marginBottom: isPhonePortrait ? 4 : undefined,
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
          initialNumToRender={8}
          windowSize={5}
          maxToRenderPerBatch={8}
          removeClippedSubviews
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No boards yet</Text>
              <Text style={styles.emptySubtitle}>Tap the + button to create your first board.</Text>
            </View>
          }
          columnWrapperStyle={numColumns > 1 ? undefined : undefined}
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
