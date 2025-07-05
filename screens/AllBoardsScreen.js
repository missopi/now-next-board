import { useEffect, useState } from 'react';
import { Alert, View, Text, FlatList, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { getBoards, deleteBoard } from '../utilities/BoardStore';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const cardSize = screenWidth * 0.25;

const TAB_TYPE_MAP = {
  'Now/Next': 'nowNextThen',
  'Routine': 'routine',
  'Choice': 'choice',
};

const TABS = ['All'].concat(Object.keys(TAB_TYPE_MAP));

export default function AllBoardsScreen() {
  const navigation = useNavigation();
  const [boards, setBoards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const loadBoards = async () => {
      const all = await getBoards();
      setBoards(all);
    };
    loadBoards();
  }, []);

  const filteredBoards = boards.filter((board) => {
    const matchesType = activeTab === 'All' || board.type === TAB_TYPE_MAP[activeTab];
    const matchesSearch = board.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = (boardId) => {
    Alert.alert(
      'Delete Board',
      'Are you sure you want to delete this board?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
          const updated = await deleteBoard(boardId);
          setBoards(updated.filter((b) => b.type === boardType));
          },
        },
      ]
    );
  };

  const navigateToBoard = (board) => {
    switch (board.type) {
      case 'routine':
        navigation.navigate('Routines', { mode: 'load', board });
        break;
      case 'nowNextThen':
        navigation.navigate('Now/Next', { mode: 'load', board });
        break;
      case 'choice':
        navigation.navigate('ChoiceScreen', { mode: 'load', board });
        break;
      default:
        console.warn('Unknown board type:', board.type);
    }
  };

  const renderBoard = ({ item }) => (
    <TouchableOpacity style={styles.boardCard} onPress={() => navigateToBoard(item)}>
      <View style={styles.boardHeader}>
        <Text style={styles.boardTitle}>{item.title || 'Now / Next Board'}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteIcon}>✕</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.cards.map((card, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.cardPreview}
          >
            <Image 
              source={typeof card.image === 'string' ? { uri: card.image } : card.image} 
              style={styles.cardImage} />
            <Text style={styles.cardLabel}>{card.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search boards..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />

      <View style={styles.tabs}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
          >
            <Text style={styles.tabText}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredBoards}
        keyExtractor={(item) => item.id}
        renderItem={renderBoard}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  searchInput: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 15,
    fontSize: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-around',
    marginHorizontal: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabText: {
    color: '#000',
  },
  cardPreview: {
    width: 80,
    marginRight: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 12,
    borderColor: '#111',
    borderWidth: 1,
    marginBottom: 2,
    backgroundColor: '#eee',
  },
  cardLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    color: '#444',
  },
  boardCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 15,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteIcon: {
    color: '#ccc',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 15,
    borderColor: '#ccc',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fafafa',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: cardSize,
  },
  cardLabel: {
    fontSize: 14,
    color: '#333',
  },
});